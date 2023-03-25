package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// type ReqError struct {
// }

func (s *BackServer) Create(ctx context.Context, req *comms.ContractCreateRequest) (*comms.ContractResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}

	contract, err := db.ContractInsert(req, user, s.dbClient.Database(s.dbName))
	if err != nil {
		return nil, err
	}
	contractProto := contract.Proto()
	return &comms.ContractResponse{
		Contract: contractProto,
		Role:     req.Role,
	}, nil

}

func (s *BackServer) UpdateDraft(ctx context.Context, req *comms.ContractUpdateRequest) (*comms.ContractResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}
	contractId, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("You must provide a valid Contract Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}
	contract, err := db.ContractById(contractId, database)
	if err != nil {
		return nil, err
	}
	contract, err = contract.UpdateDraft(req, user, database)
	if err != nil {
		return nil, err
	}
	contractProto := contract.Proto()
	return &comms.ContractResponse{
		Contract: contractProto,
		Role:     req.Role,
	}, nil

}

func (s *BackServer) DeleteDraft(ctx context.Context, req *comms.ContractDeleteDraftRequest) (*comms.ContractEditResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}
	contractId, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}
	contract, err := db.ContractById(contractId, database)
	if err != nil {
		return nil, err
	}
	err = contract.DeleteDraft(user, database)
	if err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil

}

func (s *BackServer) FinishCreation(ctx context.Context, req *comms.ContractFinishCreationRequest) (*comms.ContractResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}
	contractId, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}
	contract, err := db.ContractById(contractId, database)
	if err != nil {
		return nil, err
	}

	contract, err = contract.FinishCreation(user, database)
	if err != nil {
		return nil, err
	}

	var role uint32
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		role = db.WORKER
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		role = db.BUYER
	} else {
		return nil, errors.New("You are neither a worker or buyer of this contract")
	}
	if err != nil {
		return nil, err
	}

	if contract.InvitedEmail != "" {
		go func(database *mongo.Database, contract *db.Contract, user *db.User) {
			err, secret := s.EmailAgent.SendInviteEmail(contract, user)
			if err != nil {
				return
			}
			contract.InvitePassword = secret
			filter := bson.D{{"_id", contract.Id}}
			update := bson.D{{"$set", bson.D{
				{"invite_password", secret},
			}}}
			_, err = database.Collection(db.CON_COL).UpdateOne(context.TODO(), filter, update)
		}(database, contract, user)
	} else if contract.LinkShare {
		secret := s.EmailAgent.GenerateInviteSecret()
		contract.InvitePassword = secret
		filter := bson.D{{"_id", contract.Id}}
		update := bson.D{{"$set", bson.D{
			{"invite_password", secret},
		}}}
		_, err = database.Collection(db.CON_COL).UpdateOne(context.TODO(), filter, update)
	}

	contractProto := contract.Proto()
	return &comms.ContractResponse{
		Contract: contractProto,
		Role:     role,
	}, nil

}

func (s *BackServer) ChangeInviteEmail(ctx context.Context, req *comms.EmailChangeRequest) (*comms.NullResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}
	contractId, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}
	contract, err := db.ContractById(contractId, database)
	if err != nil {
		return nil, err
	}
	contract.ChangeInviteEmail(req.NewEmail, database)
	go func(database *mongo.Database, contract *db.Contract, user *db.User) {
		err, secret := s.EmailAgent.SendInviteEmail(contract, user)
		if err != nil {
			return
		}
		contract.InvitePassword = secret
		filter := bson.D{{"_id", contract.Id}}
		update := bson.D{{"$set", bson.D{
			{"invite_password", secret},
		}}}
		_, err = database.Collection(db.CON_COL).UpdateOne(context.TODO(), filter, update)
	}(database, contract, user)
	return &comms.NullResponse{}, nil
}

// rpc ChangeInviteEmail(EmailChangeRequest) returns (NullResponse) {};
//     rpc ResendInviteEmail(EmailResendRequest) returns (NullResponse) {};
func (s *BackServer) ResendInviteEmail(ctx context.Context, req *comms.EmailResendRequest) (*comms.NullResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}
	contractId, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}
	contract, err := db.ContractById(contractId, database)
	if err != nil {
		return nil, err
	}
	go func(contract *db.Contract, user *db.User) {
		err, _ := s.EmailAgent.SendInviteEmail(contract, user, false)
		if err != nil {
			return
		}
	}(contract, user)
	return &comms.NullResponse{}, nil
}

func (s *BackServer) QueryById(ctx context.Context, req *comms.QueryByIdRequest) (*comms.ContractResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("invalid contract id")
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("invalid user id")
	}

	database := s.dbClient.Database(s.dbName)

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	if (contract.Worker != nil && contract.Worker.Id != user_id) && (contract.Buyer != nil && contract.Buyer.Id != user_id) {
		user, err := db.UserQueryId(user_id, database)
		if err != nil {
			return nil, err
		}
		if !user.AdminStatus {
			return nil, errors.New("incorrect user for contract")
		}

	}

	role := db.ADMIN
	if contract.Worker != nil && contract.Worker.Id == user_id {
		role = db.WORKER
	} else if contract.Buyer != nil && contract.Buyer.Id == user_id {
		role = db.BUYER
	}

	proto := contract.Proto()
	return &comms.ContractResponse{
		Contract: proto,
		Role:     role,
	}, nil
}

func (s *BackServer) InviteQuery(ctx context.Context, req *comms.InviteDataRequest) (*comms.ContractInviteNub, error) {
	log.Println("Query: ", req)
	contract_id, err := primitive.ObjectIDFromHex(req.Id)
	if err != nil {
		return nil, errors.New("Invalid contract id")
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	if contract.InvitePassword != req.Secret {
		return nil, errors.New("Invalid secret for contract invite")
	}

	proto := contract.InviteProto()
	exists := db.UserWEmailExists(contract.InvitedEmail, database)
	proto.InvitedUserInSystem = exists
	return proto, nil
}

func (s *BackServer) Claim(ctx context.Context, req *comms.ClaimContractRequest) (*comms.ContractResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if req.Password != contract.InvitePassword {
		return nil, errors.New("Incorrect password to claim contract")
	}
	err = db.ContractClaim(user, contract, database)
	if err != nil {
		return nil, err
	}
	role := db.BUYER
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		role = db.WORKER
	}
	return &comms.ContractResponse{
		Contract: contract.Proto(),
		Role:     role,
	}, nil
}

func (s *BackServer) Sign(ctx context.Context, req *comms.SignContractRequest) (*comms.ContractResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if contract.Buyer == nil || contract.Worker == nil {
		return nil, errors.New("You need both a buyer and worker to sign a contract")
	}

	err = db.ContractSign(user, contract, database)
	if err != nil {
		return nil, err
	}

	role := db.BUYER
	var worker *db.User
	var buyer *db.User
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		role = db.WORKER
		worker = user
		buyer, err = db.UserQueryId(contract.Buyer.Id, database)
		if err != nil {
			return nil, err
		}
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		buyer = user
		worker, err = db.UserQueryId(contract.Worker.Id, database)
		if err != nil {
			return nil, err
		}
	} else if user.AdminStatus {
		role = db.ADMIN
	}
	if contract.Stage == db.ACTIVE {
		err = s.StripeAgent.CreateContractSetupIntent(worker, buyer, contract, database)
		if err != nil {
			return nil, err
		}
	}

	// CreateContractSetupIntent

	err = s.ChatAgent.SendContractSignMessage(contract, user, database)
	if err != nil {
		return nil, err
	}
	return &comms.ContractResponse{
		Contract: contract.Proto(),
		Role:     role,
	}, nil
}

func (s *BackServer) Settle(ctx context.Context, req *comms.SettleContractRequest) (*comms.ContractResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}

	err = db.ContractSettle(user, contract, database)
	if err != nil {
		return nil, err
	}
	role := db.BUYER
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		role = db.WORKER
	}
	err = s.ChatAgent.SendContractSettleMessage(contract, contract.CurrentDeadline, user, database)
	if err != nil {
		return nil, err
	}
	return &comms.ContractResponse{
		Contract: contract.Proto(),
		Role:     role,
	}, nil
}

func (s *BackServer) RequestAdmin(ctx context.Context, req *comms.ContractAdminSupport) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	contract.AdminRequested = true
	err = db.ContractSaveAdminRequested(contract, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendRequestAdminMessage(contract, user, database)
	if err != nil {
		return nil, err
	}
	return &comms.NullResponse{}, nil
}

func (s *BackServer) ResolveAdmin(ctx context.Context, req *comms.ContractAdminSupport) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if !user.AdminStatus {
		return nil, errors.New("A non-admin cannot resolve an admin request")
	}
	contract.AdminRequested = false
	err = db.ContractSaveAdminRequested(contract, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendResolveAdminMessage(contract, user, database)
	if err != nil {
		return nil, err
	}
	return &comms.NullResponse{}, nil
}

func (s *BackServer) ToggleLock(ctx context.Context, req *comms.ContractToggleLockRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}

	if user.AdminStatus {
		err := db.ContractToggleLock(contract, req.ContractLock, database)
		if err != nil {
			return nil, err
		}
	}
	err = s.ChatAgent.SendToggleLockMessage(contract, user, req.ContractLock, db.SUGGEST, database)
	if err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactLock(ctx context.Context, req *comms.ContractReactLockRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)

	user, contract, msg, err := pullUserContractMessage(req.UserId, req.ContractId, req.MessageId, database)
	if err != nil {
		return nil, err
	}

	if user.Id == contract.Worker.Id {
		// role = db.WORKER
		msg.Body.WorkerStatus = req.Status
	} else if user.Id == contract.Buyer.Id {
		// role = db.BUYER
		msg.Body.BuyerStatus = req.Status
	} else if user.AdminStatus {
		msg.AdminOverride = true
		msg.AdminStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if user.AdminStatus {
		msg.Body.Resolved = true
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			err := db.ContractToggleLock(contract, msg.Body.ContractLock, database)
			if err != nil {
				return nil, err
			}
		} else {
			msg.Body.Resolved = true
			msg.Body.ResolStatus = db.RESOL_REJECTED
		}
	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		err := db.ContractToggleLock(contract, msg.Body.ContractLock, database)
		if err != nil {
			return nil, err
		}
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
	}
	if err = db.MessageReplace(msg, database); err != nil {
		return nil, err
	}
	// Revision Sideeffect message sent
	revMsgBody := &db.MessageBody{
		MsgId:        msg.Id,
		Resolved:     msg.Body.Resolved,
		ResolStatus:  msg.Body.ResolStatus,
		WorkerStatus: msg.Body.WorkerStatus,
		BuyerStatus:  msg.Body.BuyerStatus,
	}
	revMsg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.REVISION,
		Body:      revMsgBody,
		Label:     &db.LabelNub{},
	}
	if err = s.ChatAgent.SendRevMessage(revMsg, database); err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil

}

func (s *BackServer) QueryByUser(ctx context.Context, req *comms.QueryByUserRequest) (*comms.ContractNubSet, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Invalid user id for contract query")))
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contracts, err := db.ContractsByUser(user_id, database)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Error querying contracts: %s", err.Error())))
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	log.Println("Contracts queried successfully")

	if !req.Unsorted {
		contracts = db.SortContracts(contracts)
	}

	contractNubs := make([]*comms.ContractNub, len(contracts))
	for idx, contract := range contracts {
		conNub, err := contract.NubProto(user)
		if err != nil {
			return nil, err
		}
		contractNubs[idx] = conNub
	}
	log.Println("Contracts nubbed successfully")
	return &comms.ContractNubSet{
		UserId:       user_id.Hex(),
		ContractNubs: contractNubs,
	}, nil
}

func (s *BackServer) QueryByAdmin(ctx context.Context, req *comms.QueryByUserRequest) (*comms.ContractNubSet, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Invalid user id for contract query")))
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contracts, err := db.ContractsByAdmin(user_id, database)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Error querying contracts: %s", err.Error())))
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	contractNubs := make([]*comms.ContractNub, len(contracts))
	for idx, contract := range contracts {
		conNub, err := contract.NubProto(user)
		if err != nil {
			return nil, err
		}
		contractNubs[idx] = conNub
	}
	log.Println("Contracts nubbed successfully")
	return &comms.ContractNubSet{
		UserId:       user_id.Hex(),
		ContractNubs: contractNubs,
	}, nil
}
