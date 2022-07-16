package backend

import (
	"context"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (s *BackServer) Register(ctx context.Context, req *comms.UserRegisterRequest) (*comms.UserRegisterResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)
	if err := db.UserEmailCheck(req.Username, req.Email, userCollection); err != nil {
		return &comms.UserRegisterResponse{
			Success:  false,
			Error:    err.Error(),
			Token:    "",
			Username: "",
			Id:       "",
		}, nil
	}

	_, err := db.UserQueryUsername(req.Username, req.Password, userCollection)
	switch err.(type) {
	case *db.ErrorUserNotFound:
		user, err := db.UserInsert(req.Username, req.Password, req.Email, req.FullName, req.UserType, userCollection)
		if err != nil {
			return &comms.UserRegisterResponse{
				Success:  false,
				Error:    err.Error(),
				Token:    "",
				Username: "",
				Id:       "",
			}, nil
		}
		tkn, tkn_timeout, err := s.JwtManager.Generate(user)
		if err != nil {
			return nil, err
		}

		return &comms.UserRegisterResponse{
			Success:      true,
			Error:        "",
			Token:        tkn,
			TokenTimeout: timestamppb.New(tkn_timeout),
			Username:     user.Username,
			Id:           user.Id.Hex(),
			Role:         user.Role,
		}, nil

	// Handles nil case, meaning user query was successful, user already exists
	default:
		return &comms.UserRegisterResponse{
			Success:  false,
			Error:    db.GenErrorUserAlreadyExists(req.Username).Error(),
			Token:    "",
			Username: "",
			Id:       "",
		}, nil
	}
}

func (s *BackServer) Login(ctx context.Context, req *comms.UserLoginRequest) (*comms.UserLoginResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)
	user, err := db.UserQueryUsername(req.Username, req.Password, userCollection)
	if err != nil {
		log.Println(color.Ize(color.Yellow, fmt.Sprintf("Returning error: %s", err.Error())))
		return &comms.UserLoginResponse{Error: err.Error()}, nil
	}
	tkn, tkn_timeout, err := s.JwtManager.Generate(user)
	if err != nil {
		return &comms.UserLoginResponse{Error: err.Error()}, nil
	}
	return &comms.UserLoginResponse{
		Token:        tkn,
		TokenTimeout: timestamppb.New(tkn_timeout),
		Username:     user.Username,
		Id:           user.Id.Hex(),
		Role:         user.Role,
	}, nil

}
func (s *BackServer) Logout(ctx context.Context, req *comms.UserLogoutRequest) (*comms.UserLogoutResponse, error) {
	return &comms.UserLogoutResponse{}, nil
}

func (s *BackServer) Pull(ctx context.Context, req *comms.UserPullRequest) (*comms.UserPullResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)
	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}
	user, err := db.UserQueryId(id, userCollection)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}
	resp := &comms.UserPullResponse{
		UserId:         user.Id.Hex(),
		Username:       user.Username,
		Email:          user.Email,
		UserType:       user.Type,
		Role:           user.Role,
		FullName:       user.FullName,
		ContractIds:    user.Contracts,
		InstaAccount:   user.Instagram.Account,
		InstaFollowers: user.Instagram.Followers,
		InstaVerified:  user.Instagram.Verified,

		TiktokAccount:   user.Tiktok.Account,
		TiktokFollowers: user.Tiktok.Followers,
		TiktokVerified:  user.Tiktok.Verified,
	}
	if user.Payment.CardHolder != "" {
		resp.PaymentSetup = true
	} else {
		resp.PaymentSetup = false
	}
	return resp, nil
}
