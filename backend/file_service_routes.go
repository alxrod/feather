package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"

	// "errors"
	// "fmt"
	// "log"
	// "time"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const CACHE_URL_BASE = "https://localhost:8080/asset-cache/"

func (s *BackServer) PresignProfilePhoto(ctx context.Context, req *comms.ProfileUrlRequest) (*comms.ProfileUrlResponse, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	fileType := ""
	splitName := strings.Split(req.FileName, ".")
	if len(splitName) >= 2 {
		fileType = splitName[len(splitName)-1]
	}

	newFileName := fmt.Sprintf("%s", user.Id.Hex(), fileType)
	if fileType != "" {
		newFileName = fmt.Sprintf("%s.%s", user.Id.Hex(), fileType)

	}

	url, path, err := s.AWSAgent.GenerateProfilePicPresign(user, newFileName)
	if err != nil {
		return nil, err
	}

	user.ProfilePhoto = &db.ProfileImage{
		UserId:     user.Id,
		FileType:   fileType,
		InCache:    false,
		LocalPath:  "",
		BucketPath: path,
	}
	user.ProfilePhoto.Save(database)
	user.ProfilePhotoUploaded = true
	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{{"profile_photo_id", user.ProfilePhoto.Id}}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return &comms.ProfileUrlResponse{
		PresignedUrl: url,
		FilePath:     path,
	}, nil

}

func (s *BackServer) ConfirmProfileUploaded(ctx context.Context, req *comms.ProfileUploadStatus) (*comms.NullResponse, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	if user.ProfilePhoto == nil {
		return nil, errors.New("Confirming upload on user who does not have profile pic")
	}
	if req.UploadSucceeded {
		user.ProfilePhotoUploaded = true
		filter := bson.D{{"_id", user.Id}}
		update := bson.D{{"$set", bson.D{{"profile_photo_uploaded", user.ProfilePhotoUploaded}}}}
		_, err := database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return nil, err
		}
	}

	localPath, err := s.AWSAgent.DownloadProfileToCache(user, user.ProfilePhoto.BucketPath)
	log.Printf("Trying to save local path %s", localPath)
	user.ProfilePhoto.LocalPath = localPath
	user.ProfilePhoto.InCache = true
	err = user.ProfilePhoto.Save(database)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) GetProfilePhoto(ctx context.Context, req *comms.ProfileGetRequest) (*comms.ProfileGetResponse, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	if user.ProfilePhoto == nil {
		return nil, errors.New("profile photo does not exist for this user")
	}
	if !user.ProfilePhoto.InCache {
		localPath, err := s.AWSAgent.DownloadProfileToCache(user, user.ProfilePhoto.BucketPath)
		if err != nil {
			log.Printf("Error downloading profile: %s", err)
		}
		user.ProfilePhoto.LocalPath = localPath
		user.ProfilePhoto.InCache = true
		err = user.ProfilePhoto.Save(database)
		if err != nil {
			return nil, err
		}
	}

	url := fmt.Sprintf("%s%s", CACHE_URL_BASE, user.ProfilePhoto.LocalPath)
	return &comms.ProfileGetResponse{
		PresignedUrl: url,
	}, nil
}
