package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	"github.com/gorilla/mux"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/webhook"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type WebhookServer struct {
	router *mux.Router

	dbClient            *mongo.Client
	dbName              string
	dbCtx               context.Context
	stripeWebhookSecret string
}

func NewWebHookServer(dbName ...string) *WebhookServer {

	dbIP := os.Getenv("DB_IP")
	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")

	credential := options.Credential{
		Username: dbUsername,
		Password: dbPassword,
	}

	opts := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:27017", dbIP))

	if os.Getenv("DB_DEBUG") == "false" {
		opts.SetAuth(credential)
	}
	client, err := mongo.NewClient(opts)

	if err != nil {
		log.Fatalf("Cannot setup web hook server because: %s", err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatalf("Cannot setup web hook server because: %s", err)
	}
	s_dbName := ""
	if len(dbName) == 1 {
		s_dbName = dbName[0]
	} else {
		s_dbName = "testing"
	}

	key_name := "STRIPE_WEBHOOK_SECRET"
	_, found := os.LookupEnv(key_name)
	if !found {
		log.Fatalln("You need the stripe webhook secret to run the webhook server")
	}
	secret := os.Getenv(key_name)

	r := &WebhookServer{
		router:              mux.NewRouter(),
		dbClient:            client,
		dbName:              s_dbName,
		dbCtx:               ctx,
		stripeWebhookSecret: secret,
	}

	r.router.HandleFunc("/web-hook/stripe-event", r.handleStripeEvents).Methods("POST")

	// // Testing, remove for prod
	// r.router.HandleFunc("/web-hook/test", r.handleTest)
	// r.router.HandleFunc("/web-hook/account-test/{id}", r.handleAccountTest).Methods("GET")
	// r.router.HandleFunc("/web-hook/pms-test/{id}", r.handleGetPMs).Methods("GET")
	// r.router.HandleFunc("/web-hook/cus-test/{id}", r.handleGetCus).Methods("GET")
	// // r.router.HandleFunc("/web-hook/account-list/{ac_id}", r.handleAccountListFCs).Methods("GET")
	// // r.router.HandleFunc("/web-hook/ba-test/{ac_id}/{ba_id}", r.handleBankAccountTest).Methods("GET")
	// r.router.HandleFunc("/web-hook/fca-test/{fc_id}", r.handleFCAccountTest).Methods("GET")
	// r.router.HandleFunc("/web-hook/pm-test/{pm_id}", r.handleGetPM).Methods("GET")
	return r
}

func (srv *WebhookServer) updateInternalChargeState(
	newState uint32,
	queryFilter bson.D,
	database *mongo.Database) (*db.InternalCharge, error) {

	var icharge *db.InternalCharge
	if err := database.Collection(db.CHARGE_COL).FindOne(context.TODO(), queryFilter).Decode(&icharge); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New(fmt.Sprintf("Error couldn't find PI in internal charges: %v\n", err))
	}
	icharge.State = newState

	filter := bson.D{{"_id", icharge.Id}}
	update := bson.D{{"$set", bson.D{{"state", icharge.State}}}}
	_, err := database.Collection(db.CHARGE_COL).UpdateOne(context.TODO(), filter, update)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		return nil, err
	}
	return icharge, nil

}
func (srv *WebhookServer) handleStripeEvents(w http.ResponseWriter, r *http.Request) {
	const MaxBodyBytes = int64(65536)
	r.Body = http.MaxBytesReader(w, r.Body, MaxBodyBytes)
	payload, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading request body: %v\n", err)
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	// Pass the request body and Stripe-Signature header to ConstructEvent, along
	// with the webhook signing key.
	event, err := webhook.ConstructEvent(payload, r.Header.Get("Stripe-Signature"),
		srv.stripeWebhookSecret)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Error verifying webhook signature: %v\n", err)
		w.WriteHeader(http.StatusBadRequest) // Return a 400 error on a bad signature
		return
	}

	if err := json.Unmarshal(payload, &event); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to parse webhook body json: %v\n", err.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Unmarshal the event data into an appropriate struct depending on its Type
	switch event.Type {

	case "payment_intent.processing":
		var pi stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &pi)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		filter := bson.D{{"payment_intent_id", pi.ID}}
		database := srv.dbClient.Database(srv.dbName)
		_, err = srv.updateInternalChargeState(db.CHARGE_STATE_INTENT_PROCESSING, filter, database)
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}
		w.WriteHeader(http.StatusOK)
		// database := srv.dbClient.Database(srv.dbName)

	case "payment_intent.created":
		var pi stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &pi)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		filter := bson.D{{"payment_intent_id", pi.ID}}
		database := srv.dbClient.Database(srv.dbName)
		icharge, err := srv.updateInternalChargeState(db.CHARGE_STATE_INTENT_CREATED, filter, database)

		filter = bson.D{{"_id", icharge.Id}}
		update := bson.D{{"$set", bson.D{{"amount", pi.Amount}}}}
		_, err = database.Collection(db.CHARGE_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}

		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}
	case "charge.pending":
		var charge stripe.Charge
		err := json.Unmarshal(event.Data.Raw, &charge)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		filter := bson.D{{"payment_intent_id", charge.PaymentIntent.ID}}
		database := srv.dbClient.Database(srv.dbName)
		icharge, err := srv.updateInternalChargeState(db.CHARGE_STATE_INTENT_PROCESSING, filter, database)

		filter = bson.D{{"_id", icharge.Id}}
		update := bson.D{{"$set", bson.D{{"charge_id", charge.ID}}}}
		_, err = database.Collection(db.CHARGE_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}
	case "balance.available":
		log.Printf("Not sure what to do w balance rn")
		// var balance stripe.Balance
		// err := json.Unmarshal(event.Data.Raw, &balance)
		// if err != nil {
		// 	fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
		// 	w.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

	case "transfer.created":
		var transfer stripe.Transfer
		err := json.Unmarshal(event.Data.Raw, &transfer)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		charge_id := transfer.SourceTransaction.ID
		filter := bson.D{{"charge_id", charge_id}}
		database := srv.dbClient.Database(srv.dbName)
		icharge, err := srv.updateInternalChargeState(db.CHARGE_STATE_TRANSFER_CREATED, filter, database)
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}
		filter = bson.D{{"_id", icharge.Id}}
		update := bson.D{{"$set", bson.D{{"transfer_id", transfer.ID}}}}
		_, err = database.Collection(db.CHARGE_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}

	case "charge.updated":
		var charge stripe.Charge
		err := json.Unmarshal(event.Data.Raw, &charge)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		filter := bson.D{{"payment_intent_id", charge.PaymentIntent.ID}}
		database := srv.dbClient.Database(srv.dbName)
		_, err = srv.updateInternalChargeState(db.CHARGE_STATE_CHARGE_UPDATED, filter, database)

		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}

	case "payment_intent.succeeded":
		var pi stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &pi)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		filter := bson.D{{"payment_intent_id", pi.ID}}
		database := srv.dbClient.Database(srv.dbName)
		_, err = srv.updateInternalChargeState(db.CHARGE_STATE_PAYMENT_INTENT_SUCCEEDED, filter, database)

		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}
	case "charge.succeeded":
		var charge stripe.Charge
		err := json.Unmarshal(event.Data.Raw, &charge)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		filter := bson.D{{"payment_intent_id", charge.PaymentIntent.ID}}
		database := srv.dbClient.Database(srv.dbName)
		_, err = srv.updateInternalChargeState(db.CHARGE_STATE_CHARGE_SUCCEEDED, filter, database)

		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}

	case "capability.updated":
		var capability stripe.Capability
		err := json.Unmarshal(event.Data.Raw, &capability)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if capability.ID == "card_payments" && capability.Status == "active" {

			log.Printf("Enabling worker mode for stripe account")
			filter := bson.D{{"stripe_account_id", capability.Account.ID}}
			update := bson.D{{"$set", bson.D{{"worker_mode_enabled", true}}}}

			database := srv.dbClient.Database(srv.dbName)
			_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
			if err != nil {
				w.WriteHeader(http.StatusServiceUnavailable)
				return
			}

		}
	default:
		fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
	}

	w.WriteHeader(http.StatusOK)
}

// return account.GetByID(
// 	account_id,
// 	nil,
// )
