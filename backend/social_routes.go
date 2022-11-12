package backend

import (
	"context"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) AddInstagram(ctx context.Context, req *comms.InstagramCreateRequest) (*comms.SocialResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)

	log.Println(color.Ize(color.Yellow, fmt.Sprintf("Trying to add isntagram for account %s", req.UserId)))
	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}

	err = db.UserAddInstagram(id, req.Account, req.Followers, req.Verified, userCollection)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	return &comms.SocialResponse{
		Account:   req.Account,
		Followers: req.Followers,
		Verified:  req.Verified,
		Platform:  "Instagram",
	}, nil
}
func (s *BackServer) AddTiktok(ctx context.Context, req *comms.TiktokCreateRequest) (*comms.SocialResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)

	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}

	err = db.UserAddTiktok(id, req.Account, req.Followers, req.Verified, userCollection)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	return &comms.SocialResponse{
		Account:   req.Account,
		Followers: req.Followers,
		Verified:  req.Verified,
		Platform:  "Tiktok",
	}, nil
}

func (s *BackServer) VerifyInstagram(ctx context.Context, req *comms.InstagramVerifyRequest) (*comms.SocialResponse, error) {
	database := s.dbClient.Database(s.dbName)

	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	// ADD CODE HERE TO TALK TO PAULS SERVER TO GET VERIFICATION FOR
	// req.Code
	// Right now this endpoint just automatically verifies you no matter the code.

	account, followers, err := db.UserVerifyInstagram(id, true, database)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	return &comms.SocialResponse{
		Account:   account,
		Followers: followers,
		Verified:  true,
		Platform:  "Instagram",
	}, nil
}

func (s *BackServer) VerifyTiktok(ctx context.Context, req *comms.TiktokVerifyRequest) (*comms.SocialResponse, error) {
	database := s.dbClient.Database(s.dbName)

	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	// ADD CODE HERE TO TALK TO PAULS SERVER TO GET VERIFICATION FOR
	// req.Code
	// Right now this endpoint just automatically verifies you no matter the code.

	account, followers, err := db.UserVerifyTiktok(id, true, database)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	return &comms.SocialResponse{
		Account:   account,
		Followers: followers,
		Verified:  true,
		Platform:  "Tiktok",
	}, nil
}
