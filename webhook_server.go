package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"github.com/gorilla/mux"
	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/webhook"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/metadata"
)

type WebhookServer struct {
	router *mux.Router

	stripeWebhookSecret string
	backendStripeClient comms.StripeServiceClient
}

func loadTLSCfg() *tls.Config {
	config := &tls.Config{
		InsecureSkipVerify: true,
	}
	return config
}

func NewWebHookServer(dbName ...string) *WebhookServer {

	key_name := "STRIPE_WEBHOOK_SECRET"
	_, found := os.LookupEnv(key_name)
	if !found {
		log.Fatalln("You need the stripe webhook secret to run the webhook server")
	}
	secret := os.Getenv(key_name)

	creds := credentials.NewTLS(loadTLSCfg())
	conn, err := grpc.DialContext(
		context.Background(),
		fmt.Sprintf("%s:%s", os.Getenv("GRPC_IP"), os.Getenv("GRPC_PORT")),
		grpc.WithTransportCredentials(creds),
	)

	if err != nil {
		log.Fatal(err)
	}

	stripeClient := comms.NewStripeServiceClient(conn)
	r := &WebhookServer{
		router:              mux.NewRouter(),
		stripeWebhookSecret: secret,
		backendStripeClient: stripeClient,
	}

	r.router.HandleFunc("/web-hook/stripe-event", r.handleStripeEvents).Methods("POST")
	return r
}

func (srv *WebhookServer) updateInternalChargeState(
	newState uint32,
	filter_key string,
	filter_value string) (*comms.InternalChargeEntity, error) {

	loopback_password := os.Getenv("LOOPBACK_PASSWORD")
	ctx := metadata.AppendToOutgoingContext(context.TODO(), "loopback_password", loopback_password)
	icharge, err := srv.backendStripeClient.QueryICharge(ctx, &comms.InternalChargeCustomQuery{
		FilterKey:   filter_key,
		FilterValue: filter_value,
	})
	if err != nil {
		log.Printf("Issue and reason is %s", err)
		return nil, err
	}
	icharge, err = srv.backendStripeClient.UpdateState(ctx, &comms.InternalChargeUpdateStateRequest{
		Charge:   icharge,
		NewState: newState,
	})
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

		_, err = srv.updateInternalChargeState(
			db.CHARGE_STATE_INTENT_PROCESSING,
			"payment_intent_id",
			pi.ID,
		)
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}
		// database := srv.dbClient.Database(srv.dbName)

	case "payment_intent.created":
		var pi stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &pi)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		_, err = srv.updateInternalChargeState(
			db.CHARGE_STATE_INTENT_CREATED,
			"payment_intent_id",
			pi.ID,
		)
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
		// _, err = srv.updateInternalChargeState(
		// 	db.CHARGE_STATE_INTENT_PROCESSING,
		// 	"payment_intent_id",
		// 	charge.PaymentIntent.ID,
		// )
		// if err != nil {
		// 	w.WriteHeader(http.StatusServiceUnavailable)
		// 	return
		// }
	case "balance.available":
		log.Printf("Funds have hit the main account")
		var balance stripe.Balance
		err := json.Unmarshal(event.Data.Raw, &balance)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

	case "transfer.created":
		var transfer stripe.Transfer
		err := json.Unmarshal(event.Data.Raw, &transfer)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		// charge_id := transfer.SourceTransaction.ID
		// _, err = srv.updateInternalChargeState(
		// 	db.CHARGE_STATE_TRANSFER_CREATED,
		// 	"charge_id",
		// 	charge_id,
		// )
		// if err != nil {
		// 	w.WriteHeader(http.StatusServiceUnavailable)
		// 	return
		// }

	case "charge.updated":
		var charge stripe.Charge
		err := json.Unmarshal(event.Data.Raw, &charge)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// _, err = srv.updateInternalChargeState(
		// 	db.CHARGE_STATE_CHARGE_UPDATED,
		// 	"payment_intent_id",
		// 	charge.PaymentIntent.ID,
		// )

		// if err != nil {
		// 	w.WriteHeader(http.StatusServiceUnavailable)
		// 	return
		// }

	case "payment_intent.succeeded":
		var pi stripe.PaymentIntent
		err := json.Unmarshal(event.Data.Raw, &pi)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		_, err = srv.updateInternalChargeState(
			db.CHARGE_STATE_PAYMENT_INTENT_SUCCEEDED,
			"payment_intent_id",
			pi.ID,
		)

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

		loopback_password := os.Getenv("LOOPBACK_PASSWORD")
		ctx := metadata.AppendToOutgoingContext(context.TODO(), "loopback_password", loopback_password)
		icharge, err := srv.backendStripeClient.QueryICharge(ctx, &comms.InternalChargeCustomQuery{
			FilterKey:   "payment_intent_id",
			FilterValue: charge.PaymentIntent.ID,
		})
		if err != nil {
			w.WriteHeader(http.StatusServiceUnavailable)
			return
		}

		_, err = srv.backendStripeClient.TransferDeadlineFunds(ctx, icharge)
		if err != nil {
			log.Printf("Charge complete error occured: %s", err)
			w.WriteHeader(http.StatusServiceUnavailable)
			return
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
