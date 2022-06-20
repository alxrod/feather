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

	userNub := &db.UserNub{
		Id:       user.Id,
		Username: user.Username,
		Author:   true,
		Type:     user.Type,
	}

	contract, err := db.ContractInsert(req, userNub, s.dbClient.Database(s.dbName))
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

	contractCollection := s.dbClient.Database(s.dbName).Collection(db.CON_COL)

	contract, err := db.ContractById(contract_id, contractCollection)
	if err != nil {
		return nil, err
	}
	if contract.Worker.Id != user_id && contract.Buyer.Id != user_id {
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

func (s *BackServer) SuggestPrice(ctx context.Context, req *comms.ContractSuggestPrice) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}

func (s *BackServer) ReactPrice(ctx context.Context, req *comms.ContractReactPrice) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}
func (s *BackServer) SuggestDeadline(ctx context.Context, req *comms.ContractSuggestDeadline) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}

func (s *BackServer) ReactDeadline(ctx context.Context, req *comms.ContractReactDeadline) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}
