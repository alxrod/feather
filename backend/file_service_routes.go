package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"

	// "errors"
	// "fmt"
	// "log"
	// "time"
	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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

	user.ProfilePhoto = &db.ProfileImage{
		Id:         primitive.NewObjectID(),
		UserId:     user.Id,
		FileType:   fileType,
		InCache:    false,
		LocalPath:  "",
		BucketPath: "",
	}

	newFileName := fmt.Sprintf("%s", user.ProfilePhoto.Id.Hex())
	if fileType != "" {
		newFileName = fmt.Sprintf("%s.%s", user.ProfilePhoto.Id.Hex(), fileType)
	}

	user.ProfilePhotoUploaded = false
	filter := bson.D{{"_id", user.Id}}
	update := bson.D{{"$set", bson.D{
		{"profile_photo_id", user.ProfilePhoto.Id},
		{"profile_photo_uploaded", false},
	}}}

	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}
	url, path, err := s.AWSAgent.GenerateProfilePicPresign(user, newFileName, database)
	if err != nil {
		return nil, err
	}

	user.ProfilePhoto.BucketPath = path
	err = user.ProfilePhoto.Insert(database)

	if err != nil {
		log.Printf("Error saving profile: %s", err.Error())
	}

	return &comms.ProfileUrlResponse{
		PresignedUrl: url,
		FilePath:     path,
	}, nil

}

func (s *BackServer) ConfirmProfileUploaded(ctx context.Context, req *comms.ProfileUploadStatus) (*comms.ProfileImageEntity, error) {
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
	if err != nil {
		return nil, err
	}
	user.ProfilePhoto.LocalPath = localPath
	cacheBase := fmt.Sprintf("%s/asset-cache/", os.Getenv("API_URL"))
	user.ProfilePhoto.CacheUrl = fmt.Sprintf("%s%s", cacheBase, user.ProfilePhoto.LocalPath)
	user.ProfilePhoto.InCache = true
	err = user.ProfilePhoto.Save(database)
	if err != nil {
		return nil, err
	}

	return user.ProfilePhoto.Proto(), nil
}

func (s *BackServer) GetProfilePhotos(ctx context.Context, req *comms.ProfileGetRequest) (*comms.ProfileGetResponse, error) {
	cached_urls := map[string]string{}
	database := s.dbClient.Database(s.dbName)
	for _, user_id_str := range req.UserIds {
		user_id, err := primitive.ObjectIDFromHex(user_id_str)
		if err != nil {
			return nil, err
		}
		filter := bson.D{{"user_id", user_id}}
		var profilePhoto *db.ProfileImage
		if err := database.Collection(db.PROF_IMAGE_COL).FindOne(context.TODO(), filter).Decode(&profilePhoto); err != nil {
			log.Println(color.Ize(color.Red, err.Error()))
			cached_urls[user_id.Hex()] = ""
			continue
		}
		if !profilePhoto.InCache {
			user, err := db.UserQueryId(user_id, database)
			if err != nil {
				return nil, err
			}
			localPath, err := s.AWSAgent.DownloadProfileToCache(user, user.ProfilePhoto.BucketPath)
			if err != nil {
				return nil, err
			}
			user.ProfilePhoto.LocalPath = localPath
			cacheBase := fmt.Sprintf("%s/asset-cache/", os.Getenv("API_URL"))
			user.ProfilePhoto.CacheUrl = fmt.Sprintf("%s%s", cacheBase, user.ProfilePhoto.LocalPath)
			user.ProfilePhoto.InCache = true
			err = user.ProfilePhoto.Save(database)
			profilePhoto = user.ProfilePhoto
			if err != nil {
				return nil, err
			}
		}
		cached_urls[user_id.Hex()] = profilePhoto.CacheUrl

	}

	return &comms.ProfileGetResponse{
		CacheUrls: cached_urls,
	}, nil
}
