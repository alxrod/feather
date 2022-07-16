package backend

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) Create(ctx context.Context, req *comms.ContractCreateRequest) (*comms.ContractResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	if req.Title == "" ||
		req.Summary == "" ||
		req.IntroMessage == "" ||
		req.Price == nil ||
		req.Deadline == nil {
		return nil, errors.New("Title, summary, intro, price, and deadline are all required to create a contract.")
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
	if (contract.Worker != nil && contract.Worker.Id != user_id) || (contract.Buyer != nil && contract.Buyer.Id != user_id) {
		return nil, errors.New("The queried contract does not belong to this user")
	}

	proto := contract.Proto()
	return &comms.ContractResponse{
		Contract: proto,
	}, nil
}

func (s *BackServer) QueryByUser(ctx context.Context, req *comms.QueryByUserRequest) (*comms.ContractNubSet, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Invalid user id for contract query")))
		return nil, err
	}

	contractCollection := s.dbClient.Database(s.dbName).Collection(db.CON_COL)
	contracts, err := db.ContractsByUser(user_id, contractCollection)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Error querying contracts: %s", err.Error())))
		return nil, err
	}
	contractNubs := make([]*comms.ContractNub, len(contracts))
	for idx, contract := range contracts {
		conNub, err := contract.NubProto(user_id)
		if err != nil {
			return nil, err
		}
		contractNubs[idx] = conNub
	}
	return &comms.ContractNubSet{
		UserId:       user_id.Hex(),
		ContractNubs: contractNubs,
	}, nil
}

func (s *BackServer) SuggestPrice(ctx context.Context, req *comms.ContractSuggestPrice) (*comms.ContactEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting a price %d", req.NewPrice))
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	oldPrice := contract.Price.Current
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	err = db.ContractSuggestPrice(contract, user, req.NewPrice, database)
	if err != nil {
		return nil, err
	}
	log.Println("Price Updated, attempting to send message")

	err = s.SendPriceMessage(contract, user, req.NewPrice, oldPrice, db.SUGGEST)
	log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	log.Println("Price Message Broadcast")
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) ReactPrice(ctx context.Context, req *comms.ContractReactPrice) (*comms.ContactEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}

	message_id, err := primitive.ObjectIDFromHex(req.MessageId)
	if err != nil {
		return nil, err
	}
	msg, err := db.MessageById(message_id, database)

	// var role uint32
	if user.Id == contract.Worker.Id {
		// role = db.WORKER
		msg.Body.WorkerStatus = req.Status
	} else if user.Id == contract.Buyer.Id {
		// role = db.BUYER
		msg.Body.BuyerStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	// What needs to be implemented:
	// 1) If the user reacts with accept
	// If the other user is accepted, mark the change as resolved and then update the price.
	// 2) If the user reacts with reject
	// Resolve the contract, make it cancelled no matter the other users reaction

	// Implementation:

	saveContract := false
	// 1)
	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		contract.Price.Current = msg.Body.PriceNew
		contract.Price.Worker = msg.Body.PriceNew
		contract.Price.Buyer = msg.Body.PriceNew
		saveContract = true
		// 2)
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		contract.Price.Current = msg.Body.PriceOld
		contract.Price.Worker = msg.Body.PriceOld
		contract.Price.Buyer = msg.Body.PriceOld
		saveContract = true
	}
	if saveContract {
		db.ContractSavePrice(contract, database)
	}
	if err = db.MessageReplace(msg, database); err != nil {
		return nil, err
	}

	return &comms.ContactEditResponse{}, nil
}
func (s *BackServer) SuggestDeadline(ctx context.Context, req *comms.ContractSuggestDeadline) (*comms.ContactEditResponse, error) {
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) ReactDeadline(ctx context.Context, req *comms.ContractReactDeadline) (*comms.ContactEditResponse, error) {
	return &comms.ContactEditResponse{}, nil
}
