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
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (s *BackServer) Register(ctx context.Context, req *comms.UserRegisterRequest) (*comms.UserSigninResponse, error) {
	database := s.dbClient.Database(s.dbName)
	if err := db.UserEmailCheck(req.Username, req.Email, database); err != nil {
		return nil, err
	}

	_, err := db.UserQueryUsername(req.Username, req.Password, database)
	switch err.(type) {
	case *db.ErrorUserNotFound:
		user, err := db.UserInsert(req.Username, req.Password, req.Email, req.FullName, req.UserType, database)
		if err != nil {
			return nil, err
		}
		tkn, tkn_timeout, err := s.JwtManager.Generate(user)
		if err != nil {
			return nil, err
		}

		return &comms.UserSigninResponse{
			Token:        tkn,
			TokenTimeout: timestamppb.New(tkn_timeout),
			User:         user.Proto(),
		}, nil

	// Handles nil case, meaning user query was successful, user already exists
	default:
		return nil, errors.New("user already exists")
	}
}

func (s *BackServer) Login(ctx context.Context, req *comms.UserLoginRequest) (*comms.UserSigninResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryUsername(req.Username, req.Password, database)
	if err != nil {
		log.Println(color.Ize(color.Yellow, fmt.Sprintf("Returning error: %s", err.Error())))
		return nil, err
	}
	tkn, tkn_timeout, err := s.JwtManager.Generate(user)
	if err != nil {
		return nil, err
	}
	log.Println(color.Ize(color.Yellow, fmt.Sprintf("Username %s is status %b", user.Username, user.AdminStatus)))
	return &comms.UserSigninResponse{
		Token:        tkn,
		TokenTimeout: timestamppb.New(tkn_timeout),
		User:         user.Proto(),
	}, nil

}
func (s *BackServer) Logout(ctx context.Context, req *comms.UserLogoutRequest) (*comms.UserLogoutResponse, error) {
	return &comms.UserLogoutResponse{}, nil
}

func (s *BackServer) Pull(ctx context.Context, req *comms.UserPullRequest) (*comms.UserEntity, error) {
	database := s.dbClient.Database(s.dbName)
	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}
	user, err := db.UserQueryId(id, database)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}
	proto := user.Proto()
	if err != nil {
		return nil, err
	}
	return proto, nil
}
