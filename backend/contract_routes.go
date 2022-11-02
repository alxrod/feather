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
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s *BackServer) Create(ctx context.Context, req *comms.ContractCreateRequest) (*comms.ContractResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	if req.Title == "" ||
		req.Summary == "" ||
		req.IntroMessage == "" ||
		req.Price == nil {
		return nil, errors.New("Title, summary, intro, and price are all required to create a contract.")
	}

	if len(req.Deadlines) < 2 {
		return nil, errors.New("You must specify at least a start and end deadline for the contract")
	}

	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)
	user, err := db.UserQueryId(userId, userCollection)
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

func (s *BackServer) QueryById(ctx context.Context, req *comms.QueryByIdRequest) (*comms.ContractResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("Invalid contract id")
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("Invalid user id")
	}

	database := s.dbClient.Database(s.dbName)

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	if (contract.Worker != nil && contract.Worker.Id != user_id) && (contract.Buyer != nil && contract.Buyer.Id != user_id) {
		user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
		if err != nil {
			return nil, err
		}
		if !user.AdminStatus {
			return nil, errors.New("The queried contract does not belong to this user")
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

func (s *BackServer) InviteQuery(ctx context.Context, req *comms.InviteDataRequest) (*comms.InviteNub, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.Id)
	if err != nil {
		return nil, errors.New("Invalid contract id")
	}
	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	proto, err := contract.InviteProto()
	if err != nil {
		return nil, err
	}
	return proto, nil
}

func (s *BackServer) Claim(ctx context.Context, req *comms.ClaimContractRequest) (*comms.ContractResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if req.Password != contract.Password {
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

	err = db.ContractSign(user, contract, database)
	if err != nil {
		return nil, err
	}
	role := db.BUYER
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		role = db.WORKER
	}

	err = s.SendContractSignMessage(contract, user)
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
	err = s.SendContractSettleMessage(contract, contract.CurrentDeadline, user)
	if err != nil {
		return nil, err
	}
	return &comms.ContractResponse{
		Contract: contract.Proto(),
		Role:     role,
	}, nil
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
	err = s.SendToggleLockMessage(contract, user, req.ContractLock, db.SUGGEST)
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
	if err = s.SendRevMessage(revMsg); err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil

}

func (s *BackServer) SettleItem(ctx context.Context, req *comms.ContractSettleItemRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, deadline, item, err := pullUserContractDeadlineItem(req.UserId, req.ContractId, req.DeadlineId, req.ItemId, database)
	if err != nil {
		return nil, err
	}
	err = db.ContractItemChangeSettle(item, deadline, user, contract, req.NewState, database)
	if err != nil {
		return nil, err
	}

	err = s.SendItemSettleMessage(contract, deadline, user, item)
	if err != nil {
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}
	log.Println("Contracts queried successfully")

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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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

func pullUserContract(req_user_id, req_contract_id string, database *mongo.Database) (*db.User, *db.Contract, error) {
	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, errors.New("Invalid contract id")
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, errors.New("Invalid user id")
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, nil, err
	}
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, err
	}
	return user, contract, nil
}
func pullUserContractMessage(
	req_user_id,
	req_contract_id,
	req_msg_id string,
	database *mongo.Database) (*db.User, *db.Contract, *db.Message, error) {

	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, nil, err
	}
	message_id, err := primitive.ObjectIDFromHex(req_msg_id)
	if err != nil {
		return nil, nil, nil, err
	}

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, nil, nil, err
	}
	msg, err := db.MessageById(message_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	return user, contract, msg, nil
}
func pullUserContractDeadline(
	req_user_id,
	req_contract_id,
	req_deadline_id string,
	database *mongo.Database) (*db.User, *db.Contract, *db.Deadline, error) {

	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req_deadline_id)
	if err != nil {
		return nil, nil, nil, err
	}

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, nil, nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	return user, contract, deadline, nil
}

func pullUserContractDeadlineItem(
	req_user_id,
	req_contract_id,
	req_deadline_id,
	req_item_id string,
	database *mongo.Database) (*db.User, *db.Contract, *db.Deadline, *db.ContractItem, error) {

	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req_deadline_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	item_id, err := primitive.ObjectIDFromHex(req_item_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, nil, nil, nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, nil, nil, nil, err
	}
	return user, contract, deadline, item, nil
}
