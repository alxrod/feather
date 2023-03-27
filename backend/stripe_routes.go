package backend

import (
	"context"
	"errors"
	"time"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func stringToUser(id_string string, database *mongo.Database) (*db.User, error) {
	user_id, err := primitive.ObjectIDFromHex(id_string)
	if err != nil {
		return nil, err
	}
	return db.UserQueryId(user_id, database)
}

func (s *BackServer) GetAccountOnboardLink(ctx context.Context, req *comms.PaymentRegisterRequest) (*comms.AccountLinkResp, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}

	if user.StripeConnectedAccountId == "" {
		user, err = s.StripeAgent.CreateConnectedAccount(user, database)
	}

	return_route := "/profile"
	if req.ReturnRoute != "" {
		return_route = req.ReturnRoute
	}

	url, err := s.StripeAgent.GetAccountOnboardingLink(user.StripeConnectedAccountId, return_route)
	if err != nil {
		return nil, err
	}

	return &comms.AccountLinkResp{
		Url: url,
	}, nil
}

func (s *BackServer) GetCustomerFCSecret(ctx context.Context, req *comms.PaymentRegisterRequest) (*comms.FCSSecret, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}

	if user.StripeCustomerId == "" {
		return nil, errors.New("User does not have a stripe account")
	}
	secret, err := s.StripeAgent.GetCustomerFCSecret(user.StripeCustomerId)
	if err != nil {
		return nil, err
	}
	return &comms.FCSSecret{
		ClientSecret: secret,
	}, nil
}

func (s *BackServer) GetInitialSetupSecret(ctx context.Context, req *comms.PaymentRegisterRequest) (*comms.IntentSecret, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}

	if user.StripeCustomerId == "" {
		user, err = s.StripeAgent.CreateCustomer(user, database)
	}
	dayAgo := time.Now().Add(time.Hour * -24)
	if user.AccountAddsInDay >= 5 && user.MostRecentAdd.Before(dayAgo) {
		user.AccountAddsInDay = 1
		user.MostRecentAdd = time.Now()
	} else if user.AccountAddsInDay >= 5 && user.MostRecentAdd.After(dayAgo) {
		return nil, errors.New("You have reached the maximum number of connections for a day. You can only connect 5 accounts in one day for security")
	} else {
		user.AccountAddsInDay += 1
		user.MostRecentAdd = time.Now()
	}
	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"account_adds_in_day", user.AccountAddsInDay},
		{"most_recent_add", user.MostRecentAdd},
	}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

	secret, err := s.StripeAgent.CreateInitialSetupIntentSecret(user, database)
	if err != nil {
		return nil, err
	}
	return &comms.IntentSecret{
		ClientSecret: secret,
	}, nil
}

func (s *BackServer) ListFcas(ctx context.Context, req *comms.ListRequest) (*comms.BASet, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}

	fcas := s.StripeAgent.ListFcas(user.StripeCustomerId)
	entities := make([]*comms.BankAccountEntity, 0, len(fcas))
	for _, fca := range fcas {
		exists := false
		for _, e := range user.StripeFCAlist {
			if fca.ID == e {
				exists = true
			}
		}
		if exists {
			entities = append(entities, &comms.BankAccountEntity{
				AccountId:    fca.ID,
				AccountLast4: fca.Last4,
				AccountType:  string(fca.Subcategory),
			})
		}
	}
	return &comms.BASet{
		Accounts: entities,
	}, nil
}

func (s *BackServer) ListExBAs(ctx context.Context, req *comms.ListRequest) (*comms.BASet, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}

	bas, err := s.StripeAgent.GetExternalBankAccounts(user.StripeConnectedAccountId)
	if err != nil {
		return nil, err
	}

	entities := make([]*comms.BankAccountEntity, len(bas))
	for idx, ba := range bas {
		entities[idx] = &comms.BankAccountEntity{
			AccountId:    ba.ID,
			AccountLast4: ba.Last4,
			AccountType:  string(ba.AccountType),
		}
	}
	return &comms.BASet{
		Accounts: entities,
	}, nil
}
func (s *BackServer) DisconnectFca(ctx context.Context, req *comms.FcaQuery) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}
	if len(user.StripeFCAlist) == 1 {
		contracts, err := db.ContractsByUser(user.Id, database)
		if err != nil {
			return nil, err
		}
		active_contract := false
		for _, contract := range contracts {
			if contract.Stage > db.CREATE && contract.Stage < db.COMPLETE {
				active_contract = true
				break
			}
		}
		if active_contract {
			return nil, errors.New("You cannot delete your only payment method while there is an active contract")
		}
	}

	err = s.StripeAgent.DisconnectFca(req.FcaId)
	if err != nil {
		return nil, err
	}
	removedFcas := make([]string, 0)
	for _, fca := range user.StripeFCAlist {
		if fca != req.FcaId {
			removedFcas = append(removedFcas, fca)
		}
	}

	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"fca_ids", removedFcas},
	}}}
	if user.StripeDefaultFCA == req.FcaId && len(removedFcas) > 0 {
		update = bson.D{{"$set", bson.D{
			{"fca_ids", removedFcas},
			{"default_fca", removedFcas[0]},
		}}}
	} else if len(removedFcas) == 0 {
		update = bson.D{{"$set", bson.D{
			{"fca_ids", removedFcas},
			{"default_fca", ""},
			{"buyer_mode_enabled", false},
		}}}
	}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) DisconnectExBa(ctx context.Context, req *comms.ExBaQuery) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}

	if req.BaId == "" {
		return nil, errors.New("No BA Id provided")
	}
	err = s.StripeAgent.DisconnectExBa(user.StripeConnectedAccountId, req.BaId)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"stripe_customer_id", ""},
		{"stripe_account_id", ""},
		{"worker_mode_enabled", false},
	}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) DeleteConnectedAccount(ctx context.Context, req *comms.DeleteConAccRequest) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}
	if !user.WorkerModeEnabled || user.StripeConnectedAccountId == "" {
		return nil, errors.New("User does not have a connected account")
	}
	contracts, err := db.ContractsByUser(user.Id, database)
	if err != nil {
		return nil, err
	}
	active_contract := false
	for _, contract := range contracts {
		if contract.Stage > db.CREATE && contract.Stage < db.COMPLETE {
			active_contract = true
			break
		}
	}
	if active_contract {
		return nil, errors.New("You cannot delete your stripe account while there is an active contract")
	}

	err = s.StripeAgent.DeleteConnectedAccount(user.StripeConnectedAccountId)
	if err != nil {
		return nil, err
	}

	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"stripe_account_id", ""},
		{"worker_mode_requested", false},
		{"worker_mode_enabled", false},
	}}}

	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) SetDefaultFca(ctx context.Context, req *comms.FcaQuery) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}
	exists := false
	for _, fca := range user.StripeFCAlist {
		if fca == req.FcaId {
			exists = true
		}
	}
	if !exists {
		return nil, errors.New("Not an existing FCA")
	}
	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"default_fca", req.FcaId},
	}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) ConfirmPaymentConnected(ctx context.Context, req *comms.SetupConfirm) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := stringToUser(req.UserId, database)
	if err != nil {
		return nil, err
	}
	pm, err := s.StripeAgent.GetPM(req.PmId)
	if pm.Type != "us_bank_account" {
		return nil, errors.New("Invalid PM type")
	}
	fca_id := pm.USBankAccount.FinancialConnectionsAccount
	if err != nil {
		return nil, err
	}
	filter := bson.D{{"_id", user.Id}}
	found := false

	for _, e_fca := range user.StripeFCAlist {
		if e_fca == fca_id {
			found = true
		}
	}

	if !found {
		user.StripeFCAlist = append(user.StripeFCAlist, fca_id)
	}

	update := bson.D{{"$set", bson.D{
		{"default_fca", fca_id},
		{"fca_ids", user.StripeFCAlist},
		{"buyer_mode_enabled", true},
	}}}

	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) GetInternalCharges(ctx context.Context, req *comms.InternalChargeRequest) (*comms.InternalChargeSet, error) {
	database := s.dbClient.Database(s.dbName)
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	charges, err := db.GetInternalChargesByUser(user, database)
	if err != nil {
		return &comms.InternalChargeSet{
			Charges: make([]*comms.InternalChargeEntity, 0),
		}, nil
	}
	protos := make([]*comms.InternalChargeEntity, len(charges))
	for i, charge := range charges {
		protos[len(charges)-(i+1)] = charge.Proto()
	}

	return &comms.InternalChargeSet{
		Charges: protos,
	}, nil

}
