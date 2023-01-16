package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/account"
	"github.com/stripe/stripe-go/v74/customer"
	fcaccount "github.com/stripe/stripe-go/v74/financialconnections/account"
	"github.com/stripe/stripe-go/v74/paymentmethod"
	"github.com/stripe/stripe-go/v74/webhook"
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

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://127.0.0.1:27017"))
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

	// Testing, remove for prod
	r.router.HandleFunc("/web-hook/test", r.handleTest)
	r.router.HandleFunc("/web-hook/account-test/{id}", r.handleAccountTest).Methods("GET")
	r.router.HandleFunc("/web-hook/pms-test/{id}", r.handleGetPMs).Methods("GET")
	r.router.HandleFunc("/web-hook/cus-test/{id}", r.handleGetCus).Methods("GET")
	// r.router.HandleFunc("/web-hook/account-list/{ac_id}", r.handleAccountListFCs).Methods("GET")
	// r.router.HandleFunc("/web-hook/ba-test/{ac_id}/{ba_id}", r.handleBankAccountTest).Methods("GET")
	r.router.HandleFunc("/web-hook/fca-test/{fc_id}", r.handleFCAccountTest).Methods("GET")
	// r.router.HandleFunc("/web-hook/pm-test/{pm_id}", r.handleGetPM).Methods("GET")
	return r
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
	case "account.updated":
		// var account stripe.Account
		// err := json.Unmarshal(event.Data.Raw, &account)
		// if err != nil {
		// 	fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
		// 	w.WriteHeader(http.StatusBadRequest)
		// 	return
		// }

		// if account.BusinessType != stripe.AccountBusinessTypeIndividual {
		// 	fmt.Fprintf(os.Stderr, "Error: We do not account for non-individual businesses yet \n")
		// 	w.WriteHeader(http.StatusOK)
		// 	return
		// }

		// database := srv.dbClient.Database(srv.dbName)
		// var user *db.User
		// filter := bson.D{{"stripe_account_id", account.ID}}
		// if err := database.Collection(db.USERS_COL).FindOne(context.TODO(), filter).Decode(&user); err != nil {
		// 	log.Println(color.Ize(color.Red, err.Error()))
		// 	w.WriteHeader(http.StatusOK)
		// 	return
		// }
		// newInfo := &db.StripeNub{
		// 	FirstName: account.Individual.FirstName,
		// 	LastName:  account.Individual.LastName,
		// 	Phone:     account.Company.Phone,
		// 	Address: &db.AddressNub{
		// 		City:       account.Company.Address.City,
		// 		Country:    account.Company.Address.Country,
		// 		Line1:      account.Company.Address.Line1,
		// 		Line2:      account.Company.Address.Line2,
		// 		PostalCode: account.Company.Address.PostalCode,
		// 		State:      account.Company.Address.State,
		// 	},
		// 	Dob: &db.DobNub{
		// 		Day:   uint32(account.Individual.DOB.Day),
		// 		Month: uint32(account.Individual.DOB.Month),
		// 		Year:  uint32(account.Individual.DOB.Year),
		// 	},
		// }
		// if user.StripeInfo != nil {
		// 	newInfo.LastFourAccount = user.StripeInfo.LastFourAccount
		// 	newInfo.RoutingNumber = user.StripeInfo.RoutingNumber
		// }

		// if len(account.ExternalAccounts.Data) > 1 {
		// 	fmt.Fprintf(os.Stderr, "Error: We do not support multiple bank accounts for one account yet \n")
		// 	w.WriteHeader(http.StatusOK)
		// 	return
		// } else if len(account.ExternalAccounts.Data) == 1 {
		// 	curBankInfo := account.ExternalAccounts.Data[0]
		// 	if user.StripeBankId != curBankInfo.ID {
		// 		log.Printf("Polling for the bank account")

		// 		params := &stripe.BankAccountParams{
		// 			Account: stripe.String(account.ID),
		// 		}

		// 		ba, err := bankaccount.Get(
		// 			curBankInfo.ID,
		// 			params,
		// 		)
		// 		if err != nil {
		// 			log.Println(color.Ize(color.Red, err.Error()))
		// 			w.WriteHeader(http.StatusOK)
		// 			return
		// 		}
		// 		newInfo.LastFourAccount = ba.Last4
		// 		newInfo.RoutingNumber = ba.RoutingNumber
		// 		filter := bson.D{{"_id", user.Id}}
		// 		update := bson.D{{"$set", bson.D{{"stripe_bank_id", ba.ID}}}}
		// 		_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
		// 	}
		// }

		// filter = bson.D{{"_id", user.Id}}
		// update := bson.D{{"$set",
		// 	bson.D{
		// 		{"stripe_info", newInfo},
		// 		{"stripe_connected", true},
		// 	},
		// }}
		// _, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
		// log.Printf("Internal User %s updated with correct stripe info", user.Id)
		// Then define and call a func to handle the successful payment intent.
		// handlePaymentIntentSucceeded(paymentIntent)
	default:
		fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
	}

	w.WriteHeader(http.StatusOK)
}

// TESTING
func (srv *WebhookServer) handleTest(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello World"))
}

func (srv *WebhookServer) handleAccountTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id := params["id"]

	ac, err := account.GetByID(
		id,
		nil,
	)
	if err != nil {
		w.Write([]byte(fmt.Sprintf("Error: %s", err)))
	} else {
		json.NewEncoder(w).Encode(ac)
	}
}

func (srv *WebhookServer) handleGetPMs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id := params["id"]

	pm_params := &stripe.PaymentMethodListParams{
		Customer: stripe.String(id),
		// Type:     stripe.String("us_bank_account"),
	}
	i := paymentmethod.List(pm_params)

	pms := []*stripe.PaymentMethod{}
	for i.Next() {
		pm := i.PaymentMethod()
		pms = append(pms, pm)
	}
	json.NewEncoder(w).Encode(pms)

}

func (srv *WebhookServer) handleGetCus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	id := params["id"]

	cus, _ := customer.Get(id, nil)
	json.NewEncoder(w).Encode(cus)

}

// func (srv *WebhookServer) handleBankAccountTest(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	url_params := mux.Vars(r)
// 	ac_id := url_params["ac_id"]
// 	ba_id := url_params["ba_id"]

// 	params := &stripe.BankAccountParams{
// 		Account: stripe.String(ac_id),
// 	}

// 	ba, err := bankaccount.Get(
// 		ba_id,
// 		params,
// 	)

// 	if err != nil {
// 		w.Write([]byte(fmt.Sprintf("Error: %s", err)))
// 	} else {
// 		json.NewEncoder(w).Encode(ba)
// 	}
// }

func (srv *WebhookServer) handleFCAccountTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	url_params := mux.Vars(r)
	fc_id := url_params["fc_id"]

	ac, err := fcaccount.GetByID(
		fc_id,
		nil,
	)

	// refreshParams := &stripe.
	// 	FinancialConnectionsAccountRefreshParams{
	// 	Features: []*string{
	// 		stripe.String("balance"),
	// 	},
	// }
	// ac, err := fcaccount.Refresh(
	// 	fc_id,
	// 	refreshParams,
	// )

	if err != nil {
		w.Write([]byte(fmt.Sprintf("Error: %s", err)))
	} else {
		json.NewEncoder(w).Encode(ac)
	}

}

// func (srv *WebhookServer) handleAccountListFCs(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	url_params := mux.Vars(r)
// 	ac_id := url_params["ac_id"]

// 	params := &stripe.
// 		FinancialConnectionsAccountListParams{
// 		AccountHolder: &stripe.FinancialConnectionsAccountListAccountHolderParams{
// 			Account: stripe.String(ac_id),
// 		},
// 	}
// 	i := fcaccount.List(params)
// 	acs := []*stripe.FinancialConnectionsAccount{}
// 	for i.Next() {
// 		acs = append(acs, i.FinancialConnectionsAccount())
// 	}

// 	json.NewEncoder(w).Encode(acs)

// }

// func (srv *WebhookServer) handleGetPM(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	params := mux.Vars(r)
// 	id := params["pm_id"]

// 	pm, err := paymentmethod.Get(
// 		id,
// 		nil,
// 	)
// 	if err != nil {
// 		w.Write([]byte(fmt.Sprintf("Error: %s", err)))
// 	} else {
// 		json.NewEncoder(w).Encode(pm)
// 	}

// }

// return account.GetByID(
// 	account_id,
// 	nil,
// )
