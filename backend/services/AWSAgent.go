package services

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type AWSAgent struct {
	Client     *s3.Client
	BucketName string
}

func (agent *AWSAgent) Initialize() error {
	// Load the Shared AWS Configuration (~/.aws/config)
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	// Create an Amazon S3 service client
	agent.BucketName = "feather-backend"

	agent.Client = s3.NewFromConfig(cfg)
	return nil
}

func (agent *AWSAgent) GenerateProfilePicPresign(user *db.User, filename string, database *mongo.Database) (string, string, error) {
	if user.Id.IsZero() {
		return "", "", errors.New("invalid user id")
	}
	s3_type := os.Getenv("S3_TYPE")
	path := fmt.Sprintf("%s/user/%s/profile_pic/%s", s3_type, user.Id.Hex(), filename)
	url, err := agent.GeneratePresignPut(path, agent.BucketName, user.ProfilePhoto.Id, user.Id, database)

	return url, path, err
}

func (agent *AWSAgent) DownloadProfileToCache(user *db.User, filepath string) (string, error) {
	if user.Id.IsZero() {
		return "", errors.New("invalid user id")
	}

	downloader := manager.NewDownloader(agent.Client)

	split_filepath := strings.Split(filepath, "/")
	split_path := split_filepath[:len(split_filepath)-1]
	path := strings.Join(split_path, "/")

	localFilePath := fmt.Sprintf("./asset_cache/%s", path)
	localFilePathAndFile := fmt.Sprintf("./asset_cache/%s", filepath)

	err := os.MkdirAll(localFilePath, 0755)
	if err != nil {
		return "", err
	}

	ctx := context.TODO()

	file, err := os.Create(localFilePathAndFile)
	if err != nil {
		return "", err
	}
	defer file.Close()
	numBytesDownloaded, err := downloader.Download(ctx, file, &s3.GetObjectInput{
		Bucket: aws.String(agent.BucketName),
		Key:    aws.String(filepath),
	})

	if err != nil {
		return "", err
	}
	if numBytesDownloaded < 1 {
		return "", errors.New("zero bytes written to memory")
	}
	return filepath, nil
}

func (agent *AWSAgent) GeneratePresignPut(filePath, bucketName string, image_id, user_id primitive.ObjectID, database *mongo.Database) (string, error) {
	fmt.Println("Create Presign client")

	filter := bson.M{
		"$and": []bson.M{
			{"user_id": user_id},
			{"_id": bson.M{"$ne": image_id}},
		},
	}

	oldProfilePhotos := make([]*db.ProfileImage, 0)
	cur, err := database.Collection(db.PROF_IMAGE_COL).Find(context.TODO(), filter)
	if err == nil {
		for cur.Next(context.TODO()) {
			var pic *db.ProfileImage
			err := cur.Decode(&pic)
			if err == nil {
				oldProfilePhotos = append(oldProfilePhotos, pic)
			}
		}
	}
	cur.Close(context.TODO())

	presignClient := s3.NewPresignClient(agent.Client)

	presignParams := &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(filePath),
	}

	// Apply an expiration via an option function
	presignDuration := func(po *s3.PresignOptions) {
		po.Expires = 5 * time.Minute
	}

	presignResult, err := presignClient.PresignPutObject(context.TODO(), presignParams, presignDuration)

	if err != nil {
		log.Printf("PUT ERROR: ", err)
		return "", errors.New("Couldn't get presigned URL for PutObject")
	}

	for _, prevProfilePhoto := range oldProfilePhotos {
		_, err := database.Collection(db.PROF_IMAGE_COL).DeleteOne(context.TODO(), bson.D{{"_id", prevProfilePhoto.Id}})
		if err != nil {
			log.Printf("REMOVE PREV IMG ERROR: ", err)
			return "", errors.New("Couldn't remove old profile photo from DB")
		}

		removal := &s3.DeleteObjectInput{
			Bucket: aws.String(bucketName),
			Key:    aws.String(prevProfilePhoto.BucketPath),
		}

		_, err = agent.Client.DeleteObject(context.TODO(), removal)

		if err != nil {
			fmt.Printf("Got an error deleting old profile img: %s", err)
			return "", err
		}

		if prevProfilePhoto.InCache {
			err = os.Remove(fmt.Sprintf("./asset_cache/%s", prevProfilePhoto.LocalPath))
			if err != nil {
				log.Printf("Local Remove Error: %s", err.Error())
				return "", err
			}
		}

	}

	return presignResult.URL, nil
}

func (agent *AWSAgent) GeneratePresignGet(filePath, bucketName string) (string, error) {
	fmt.Println("Create Presign client")
	presignClient := s3.NewPresignClient(agent.Client)

	presignParams := &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(filePath),
	}

	// Apply an expiration via an option function
	presignDuration := func(po *s3.PresignOptions) {
		po.Expires = 30 * time.Minute
	}

	presignResult, err := presignClient.PresignGetObject(context.TODO(), presignParams, presignDuration)

	if err != nil {
		log.Printf("Presign Get URL ERROR: %s", err.Error())
		return "", errors.New("Couldn't get presigned URL for GetObject")
	}

	return presignResult.URL, nil
}
