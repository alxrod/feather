package backend

import (
	"context"
	"errors"

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
		return nil, errors.New("User does not have a stripe account")
	}
	url, err := s.StripeAgent.GetAccountOnboardingLink(user.StripeConnectedAccountId)
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
		return nil, errors.New("User does not have a stripe account")
	}
	secret, err := s.StripeAgent.CreateInitialSetupIntentSecret(user, database)
	if err != nil {
		return nil, err
	}
	return &comms.IntentSecret{
		ClientSecret: secret,
	}, nil
}

// func (s *BackServer) TestCharge(ctx context.Context, req *comms.IntentCreateReq) (*comms.IntentSecret, error) {
// 	secret, _ := s.StripeAgent.CreateContractSetupIntent()
// 	return &comms.IntentSecret{
// 		ClientSecret: secret,
// 	}, nil
// }

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
	}}}

	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

// func (s *BackServer) CreateContractIntentSecret(ctx context.Context, req *comms.ContractIntentRequest) (*comms.NullResponse, error) {
// 	database := s.dbClient.Database(s.dbName)
// 	worker, err := stringToUser(req.WorkerId, database)
// 	if err != nil {
// 		return nil, err
// 	}
// 	buyer, err := stringToUser(req.BuyerId, database)
// 	if err != nil {
// 		return nil, err
// 	}
// 	_, err = s.StripeAgent.CreateContractSetupIntent(worker, buyer)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &comms.NullResponse{}, nil
// }

// func (s *BackServer) GetIntentSecret(ctx context.Context, req *comms.IntentCreateReq) (*comms.IntentSecret, error) {
// 	database := s.dbClient.Database(s.dbName)
// 	user, err := stringToUser(req.UserId, database)
// 	if err != nil {
// 		return nil, err
// 	}
// 	secret, err := s.StripeAgent.CreateContractSetupIntentSecret(user)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return &comms.IntentSecret{
// 		ClientSecret: secret,
// 	}, nil
// }

// func (s *BackServer) AddFCAccounts(ctx context.Context, req *comms.FCAccountSet) (*comms.NullResponse, error) {
// 	database := s.dbClient.Database(s.dbName)
// 	user, err := stringToUser(req.UserId, database)
// 	if err != nil {
// 		return nil, err
// 	}
// 	new_ids := make([]string, 0)
// 	for _, new_ac_id := range req.AccountIds {
// 		already_exists := false
// 		for _, existing_ac_id := range user.StripeFCIds {
// 			if existing_ac_id == new_ac_id {
// 				already_exists = true
// 			}
// 		}
// 		if !already_exists {
// 			new_ids = append(new_ids, new_ac_id)
// 		}
// 	}
// 	for _, id := range new_ids {
// 		user.StripeFCIds = append(user.StripeFCIds, id)
// 	}

// 	filter := bson.D{{"_id", user.Id}}
// 	update := bson.D{{"$set", bson.D{{"stripe_fca_ids", user.StripeFCIds}}}}
// 	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

// 	return &comms.NullResponse{}, nil
// }
