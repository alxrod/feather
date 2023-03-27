package services

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	db "github.com/alxrod/feather/backend/db"
	"github.com/stripe/stripe-go/v74/account"
	"github.com/stripe/stripe-go/v74/bankaccount"
	"github.com/stripe/stripe-go/v74/customer"
	fcaccount "github.com/stripe/stripe-go/v74/financialconnections/account"
	"github.com/stripe/stripe-go/v74/financialconnections/session"
	"github.com/stripe/stripe-go/v74/paymentintent"
	"github.com/stripe/stripe-go/v74/paymentmethod"
	"github.com/stripe/stripe-go/v74/setupintent"
	"github.com/stripe/stripe-go/v74/transfer"

	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/accountlink"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Change to secure for prod

type StripeAgent struct {
	PrivateKey string
	PublicKey  string
	ServiceFee int64
}

func (agent *StripeAgent) Initialize() {
	agent.PrivateKey = os.Getenv("NEXT_PRIVATE_STRIPE_PRIVATE_KEY")
	agent.PublicKey = os.Getenv("NEXT_PUBLIC_STRIPE_PRIVATE_KEY")
	agent.ServiceFee = 5
}

func (agent *StripeAgent) CreateConnectedAccount(user *db.User, database *mongo.Database) (*db.User, error) {
	params := &stripe.AccountParams{
		Country: stripe.String("US"),
		Type:    stripe.String(string(stripe.AccountTypeCustom)),

		Email: stripe.String(user.Email),

		BusinessType: stripe.String("individual"),

		Individual: &stripe.PersonParams{
			Email:     stripe.String(user.Email),
			FirstName: stripe.String(user.FirstName),
			LastName:  stripe.String(user.LastName),
		},

		BusinessProfile: &stripe.AccountBusinessProfileParams{
			MCC: stripe.String("5734"),
			URL: stripe.String(fmt.Sprintf("www.feathercontracts.com/%s", user.Username)),
		},

		Company: &stripe.AccountCompanyParams{},

		Capabilities: &stripe.AccountCapabilitiesParams{
			CardPayments: &stripe.AccountCapabilitiesCardPaymentsParams{
				Requested: stripe.Bool(true),
			},
			Transfers: &stripe.AccountCapabilitiesTransfersParams{
				Requested: stripe.Bool(true),
			},
			USBankAccountACHPayments: &stripe.AccountCapabilitiesUSBankAccountACHPaymentsParams{
				Requested: stripe.Bool(true),
			},
		},
	}
	acc, err := account.New(params)
	if err != nil {
		return user, err
	}

	user.StripeConnectedAccountId = acc.ID

	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"stripe_account_id", user.StripeConnectedAccountId},
		{"worker_mode_requested", true},
	}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

	return user, nil
}

func (agent *StripeAgent) CreateCustomer(user *db.User, database *mongo.Database) (*db.User, error) {
	params := &stripe.CustomerParams{
		Email: stripe.String(user.Email),
		Name:  stripe.String(fmt.Sprintf("%s %s", user.FirstName, user.LastName)),
	}

	cus, err := customer.New(params)
	if err != nil {
		return nil, err
	}
	user.StripeCustomerId = cus.ID

	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"stripe_customer_id", user.StripeCustomerId},
		{"buyer_mode_requested", true},
	}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

	return user, nil
}

func (agent *StripeAgent) GetAccountOnboardingLink(account_id string, return_route string) (string, error) {

	ACCOUNT_SETUP_RETURN_URL := fmt.Sprintf("%s%s", os.Getenv("FRONTEND_URL"), return_route)
	ACCOUNT_SETUP_REFRESH_URL := fmt.Sprintf("%s/profile/onboarding-refresh", os.Getenv("FRONTEND_URL"))

	params := &stripe.AccountLinkParams{
		Account:    stripe.String(account_id),
		RefreshURL: stripe.String(ACCOUNT_SETUP_REFRESH_URL),
		ReturnURL:  stripe.String(ACCOUNT_SETUP_RETURN_URL),
		Type:       stripe.String("account_onboarding"),
	}
	al, err := accountlink.New(params)
	if err != nil {
		return "", err
	}
	return al.URL, nil
}

func (agent *StripeAgent) GetCustomerFCSecret(customer_id string) (string, error) {
	params := &stripe.FinancialConnectionsSessionParams{
		AccountHolder: &stripe.FinancialConnectionsSessionAccountHolderParams{
			Type:     stripe.String(string(stripe.FinancialConnectionsSessionAccountHolderTypeCustomer)),
			Customer: stripe.String(customer_id),
		},
		Filters: &stripe.FinancialConnectionsSessionFiltersParams{
			Countries: []*string{
				stripe.String("US"),
			},
		},
		Permissions: []*string{
			stripe.String(string(stripe.FinancialConnectionsSessionPermissionBalances)),
			stripe.String(string(stripe.FinancialConnectionsSessionPermissionOwnership)),
			stripe.String(string(stripe.FinancialConnectionsSessionPermissionPaymentMethod)),
			stripe.String(string(stripe.FinancialConnectionsSessionPermissionTransactions)),
		},
	}
	result, err := session.New(params)
	if err != nil {
		log.Printf("Error creating: %s", err)
		return "", err
	}
	// log.Printf("Successfully created %v", result.ClientSecret)
	return result.ClientSecret, nil
}

func (agent *StripeAgent) CreateInitialSetupIntentSecret(user *db.User, database *mongo.Database) (string, error) {
	params := &stripe.SetupIntentParams{
		Customer:           stripe.String(user.StripeCustomerId),
		PaymentMethodTypes: []*string{stripe.String("us_bank_account")},
		PaymentMethodOptions: &stripe.SetupIntentPaymentMethodOptionsParams{
			USBankAccount: &stripe.SetupIntentPaymentMethodOptionsUSBankAccountParams{
				FinancialConnections: &stripe.SetupIntentPaymentMethodOptionsUSBankAccountFinancialConnectionsParams{
					Permissions: []*string{
						stripe.String(string(stripe.SetupIntentPaymentMethodOptionsUSBankAccountFinancialConnectionsPermissionPaymentMethod)),
						stripe.String(string(stripe.SetupIntentPaymentMethodOptionsUSBankAccountFinancialConnectionsPermissionBalances)),
					},
				},
			},
		},
	}

	intent, _ := setupintent.New(params)

	return intent.ClientSecret, nil

	// return "", nil
}

func (agent *StripeAgent) ListPaymentMethods(customer_id string) []*stripe.PaymentMethod {
	pm_params := &stripe.PaymentMethodListParams{
		Customer: stripe.String(customer_id),
		Type:     stripe.String("us_bank_account"),
	}
	i := paymentmethod.List(pm_params)

	pms := []*stripe.PaymentMethod{}
	for i.Next() {
		pm := i.PaymentMethod()
		pms = append(pms, pm)
	}
	return pms
}

func (agent *StripeAgent) ListFcas(customer_id string) []*stripe.FinancialConnectionsAccount {
	params := &stripe.FinancialConnectionsAccountListParams{
		AccountHolder: &stripe.FinancialConnectionsAccountListAccountHolderParams{
			Customer: stripe.String(customer_id),
		},
	}
	i := fcaccount.List(params)
	fcas := []*stripe.FinancialConnectionsAccount{}
	for i.Next() {
		a := i.FinancialConnectionsAccount()
		fcas = append(fcas, a)
	}
	return fcas
}

func (agent *StripeAgent) DisconnectFca(fca_id string) error {
	_, err := fcaccount.Disconnect(
		fca_id,
		nil,
	)
	return err
}

func (agent *StripeAgent) DisconnectExBa(acct_id, ba_id string) error {
	params := &stripe.BankAccountParams{
		Account: stripe.String(acct_id),
	}
	_, err := bankaccount.Del(
		ba_id,
		params,
	)
	return err
}

func (agent *StripeAgent) DeleteConnectedAccount(acct_id string) error {
	_, err := account.Del(acct_id, nil)
	return err
}

func (agent *StripeAgent) GetSetupIntent(seti_id string) (*stripe.SetupIntent, error) {
	return setupintent.Get(
		seti_id,
		nil,
	)
}
func (agent *StripeAgent) GetPM(pm_id string) (*stripe.PaymentMethod, error) {
	return paymentmethod.Get(
		pm_id,
		nil,
	)
}

func (agent *StripeAgent) GetConnectedAccount(ac_id string) (*stripe.Account, error) {
	ac, err := account.GetByID(
		ac_id,
		nil,
	)
	return ac, err
}

func (agent *StripeAgent) VerifyConnectedAccountCapabilities(ac_id string) (bool, error) {
	account, err := agent.GetConnectedAccount(ac_id)
	if err != nil {
		return false, err
	}
	if account.Capabilities.Transfers == "active" && account.Capabilities.USBankAccountACHPayments == "active" {
		return true, nil
	} else {
		return false, nil
	}

}

func (agent *StripeAgent) GetExternalBankAccounts(ac_id string) ([]*stripe.BankAccount, error) {
	ac, err := account.GetByID(
		ac_id,
		nil,
	)
	if err != nil {
		return nil, err
	}
	bank_accounts := make([]*stripe.BankAccount, len(ac.ExternalAccounts.Data))
	for idx, ba := range ac.ExternalAccounts.Data {
		params := &stripe.BankAccountParams{
			Account: stripe.String(ac_id),
		}
		ba, err := bankaccount.Get(
			ba.ID,
			params,
		)
		if err != nil {
			return nil, err
		}
		bank_accounts[idx] = ba
	}
	return bank_accounts, nil
}

func (agent *StripeAgent) CreateContractTransfer(
	worker *db.User,
	amount int64,
	charge_id string,
	transfer_group string,
) (*stripe.Transfer, error) {

	log.Printf("Making a transfer of %d to wokrer %s", amount, worker.Username)
	params := &stripe.TransferParams{
		Amount:            stripe.Int64(amount),
		Currency:          stripe.String(string(stripe.CurrencyUSD)),
		SourceTransaction: stripe.String(charge_id),
		Destination:       stripe.String(worker.StripeConnectedAccountId),
		TransferGroup:     stripe.String(transfer_group),
	}
	tr, err := transfer.New(params)
	return tr, err
}

func (agent *StripeAgent) CreateContractPaymentIntent(
	buyer *db.User,
	amount int64,
	seti *stripe.SetupIntent,
	transfer_group string,
) (*stripe.PaymentIntent, error) {

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(amount),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		// TransferData: &stripe.PaymentIntentTransferDataParams{
		// 	Destination: stripe.String(worker.StripeConnectedAccountId),
		// },
		Customer:      stripe.String(buyer.StripeCustomerId),
		TransferGroup: stripe.String(transfer_group),
		PaymentMethod: &seti.PaymentMethod.ID,
		PaymentMethodTypes: []*string{
			stripe.String("us_bank_account"),
		},
		Mandate:    &seti.Mandate.ID,
		Confirm:    stripe.Bool(true),
		OffSession: stripe.Bool(true),
	}
	pi, err := paymentintent.New(params)
	return pi, err
}

func (agent *StripeAgent) CreateContractSetupIntent(worker, buyer *db.User, contract *db.Contract, database *mongo.Database) error {
	params := &stripe.SetupIntentParams{
		Customer:           stripe.String(buyer.StripeCustomerId),
		Confirm:            stripe.Bool(true),
		PaymentMethodTypes: []*string{stripe.String("us_bank_account")},
		PaymentMethodOptions: &stripe.SetupIntentPaymentMethodOptionsParams{
			USBankAccount: &stripe.SetupIntentPaymentMethodOptionsUSBankAccountParams{
				FinancialConnections: &stripe.SetupIntentPaymentMethodOptionsUSBankAccountFinancialConnectionsParams{
					Permissions: []*string{
						stripe.String(string(stripe.SetupIntentPaymentMethodOptionsUSBankAccountFinancialConnectionsPermissionPaymentMethod)),
						stripe.String(string(stripe.SetupIntentPaymentMethodOptionsUSBankAccountFinancialConnectionsPermissionBalances)),
					},
				},
			},
		},
		PaymentMethodData: &stripe.SetupIntentPaymentMethodDataParams{
			Type: stripe.String("us_bank_account"),
			USBankAccount: &stripe.SetupIntentPaymentMethodDataUSBankAccountParams{
				FinancialConnectionsAccount: stripe.String(buyer.StripeDefaultFCA),
			},
			BillingDetails: &stripe.SetupIntentPaymentMethodDataBillingDetailsParams{
				Email: stripe.String(buyer.Email),
				Name:  stripe.String(fmt.Sprint("%s %s", buyer.FirstName, buyer.LastName)),
			},
		},
		MandateData: &stripe.SetupIntentMandateDataParams{
			CustomerAcceptance: &stripe.SetupIntentMandateDataCustomerAcceptanceParams{
				AcceptedAt: stripe.Int64(time.Now().Unix()),
				Type:       stripe.MandateCustomerAcceptanceTypeOffline,
			},
		},
	}

	intent, _ := setupintent.New(params)
	contract.SetupIntentId = intent.ID
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"setup_intent_id", contract.SetupIntentId}}}}
	_, err := database.Collection(db.CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil

	// return "", nil
}

func (agent *StripeAgent) ChargeContract(contract *db.Contract, deadline *db.Deadline, database *mongo.Database) error {
	if contract.SetupIntentId == "" {
		return errors.New("The contract needs a setupintent to charge")
	}
	seti, err := agent.GetSetupIntent(contract.SetupIntentId)
	if err != nil {
		return err
	}

	worker, err := db.UserQueryId(contract.Worker.Id, database)
	buyer, err := db.UserQueryId(contract.Buyer.Id, database)

	if deadline.Id != contract.CurrentDeadline.Id {
		return errors.New("Contract does not have a current deadline")
	} else if deadline.Complete {
		return errors.New("Contract current deadline is complete")
	} else if deadline.Expired {
		return errors.New("Contract current deadline is expired")
	}
	amount := deadline.CurrentPayout
	if amount == 0 {
		return nil
	}
	var amount_w_fee int64
	if contract.FreeStatus {
		amount_w_fee = amount
	} else {
		amount_w_fee = amount + ((amount * agent.ServiceFee) / 100)
	}

	// What to do:
	// 1.Create payment intent to charge buyer for the correct contract amount +fee
	// 2.Transfer charge - fee to worker when funds become available
	transfer_group := deadline.Id.Hex()
	pi, err := agent.CreateContractPaymentIntent(
		buyer,
		amount_w_fee,
		seti,
		transfer_group,
	)
	charge_id := pi.LatestCharge.ID

	// tr, err := agent.CreateContractTransfer(
	// 	worker,
	// 	amount,
	// 	charge_id,
	// 	transfer_group,
	// )
	if !contract.Worker.WorkerModeEnabled {
		worker, err := db.UserQueryId(contract.Worker.Id, database)
		log.Printf("Adding to outstanding balance because worker does not have payout configured")
		worker.OutstandingBalance += amount
		filter := bson.D{{"_id", worker.Id}}
		update := bson.D{{"$set", bson.D{{"outstanding_balance", worker.OutstandingBalance}}}}
		_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return err
		}
	}

	_, err = db.InitializeInternalCharge(
		contract,
		worker,
		buyer,
		pi.ID,
		charge_id,
		"",
		transfer_group,
		amount,
		amount_w_fee,
		database)

	return err
}

// func (agent *StripeAgent) CreateContractCharge()
