package backend

import (
	"context"
	"errors"

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

func (s *BackServer) Query(ctx context.Context, req *comms.ContractQueryRequest) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}

func (s *BackServer) SuggestPrice(ctx context.Context, req *comms.ContractSuggestPrice) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}

func (s *BackServer) ReactPrice(ctx context.Context, req *comms.ContractSuggestPrice) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}
func (s *BackServer) SuggestDeadline(ctx context.Context, req *comms.ContractSuggestDeadline) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}

func (s *BackServer) ReactDeadline(ctx context.Context, req *comms.ContractSuggestDeadline) (*comms.ContractResponse, error) {
	return &comms.ContractResponse{}, nil
}
