package services

import (
	"context"
	"errors"
	"fmt"
	"log"
	"math"
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

	"github.com/stripe/stripe-go/v74"
	"github.com/stripe/stripe-go/v74/accountlink"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// Change to secure for prod
const ACCOUNT_SETUP_RETURN_URL = "http://localhost:3000/profile"
const ACCOUNT_SETUP_REFRESH_URL = "https://localhost:8080/profile/onboarding-refresh"

type StripeAgent struct {
	Database   *mongo.Database
	PrivateKey string
	PublicKey  string
}

func (agent *StripeAgent) CreateConnectedAccount(user *db.User, database *mongo.Database) (*db.User, error) {
	params := &stripe.AccountParams{
		Country: stripe.String("US"),
		Type:    stripe.String(string(stripe.AccountTypeCustom)),

		Email: stripe.String(user.Email),

		BusinessType: stripe.String("individual"),

		Individual: &stripe.PersonParams{
			Email: stripe.String(user.Email),
			Phone: stripe.String(user.PhoneNumber),
			DOB: &stripe.PersonDOBParams{
				Day:   stripe.Int64(int64(user.DOB.Day)),
				Month: stripe.Int64(int64(user.DOB.Month)),
				Year:  stripe.Int64(int64(user.DOB.Year)),
			},
			FirstName: stripe.String(user.FirstName),
			LastName:  stripe.String(user.LastName),
		},

		BusinessProfile: &stripe.AccountBusinessProfileParams{
			MCC: stripe.String("5734"),
			URL: stripe.String(fmt.Sprintf("www.feathercontracts.com/%s", user.Username)),
		},

		Company: &stripe.AccountCompanyParams{
			Phone: stripe.String(user.PhoneNumber),
		},

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
	update := bson.D{{"$set", bson.D{{"stripe_account_id", user.StripeConnectedAccountId}}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

	return user, nil
}

func (agent *StripeAgent) CreateCustomer(user *db.User, database *mongo.Database) (*db.User, error) {
	params := &stripe.CustomerParams{
		Email: stripe.String(user.Email),
		Name:  stripe.String(fmt.Sprintf("%s %s", user.FirstName, user.LastName)),
		Phone: stripe.String(user.PhoneNumber),
	}

	cus, err := customer.New(params)
	if err != nil {
		return nil, err
	}
	user.StripeCustomerId = cus.ID

	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{{"stripe_customer_id", user.StripeCustomerId}}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

	return user, nil
}

func (agent *StripeAgent) GetAccountOnboardingLink(account_id string) (string, error) {
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

func (agent *StripeAgent) CreateContractPaymentIntent(customer_id, account_id string, amount int64, seti *stripe.SetupIntent) (*stripe.PaymentIntent, error) {
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(amount),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		TransferData: &stripe.PaymentIntentTransferDataParams{
			Destination: stripe.String(account_id),
		},
		Customer:      stripe.String(customer_id),
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
				Phone: stripe.String(buyer.PhoneNumber),
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
	amount := int64(math.Round(float64(deadline.CurrentPayout * 100)))
	if amount == 0 {
		return nil
	}
	pi, err := agent.CreateContractPaymentIntent(
		buyer.StripeCustomerId,
		worker.StripeConnectedAccountId,
		amount,
		seti,
	)
	_, err = db.InitializeInternalCharge(
		contract,
		contract.Worker,
		contract.Buyer,
		pi.ID,
		database)

	return err
}

// func (agent *StripeAgent) CreateContractCharge()
