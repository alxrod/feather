package database

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProfileImage struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"`
	UserId     primitive.ObjectID `bson:"user_id"`
	FileType   string             `bson:"file_type"`
	InCache    bool               `bson:"in_cache"`
	LocalPath  string             `bson:"local_path"`
	BucketPath string             `bson:"bucket_path"`
}

func (img *ProfileImage) Proto() *comms.ProfileImageEntity {
	if img.UserId.IsZero() {
		return &comms.ProfileImageEntity{}
	}
	proto := &comms.ProfileImageEntity{
		UserId:     img.UserId.Hex(),
		FileType:   img.FileType,
		InCache:    img.InCache,
		LocalPath:  img.LocalPath,
		BucketPath: img.BucketPath,
	}
	return proto
}

func (img *ProfileImage) Insert(database *mongo.Database) error {
	log.Printf("Inserting profile")
	res, err := database.Collection(PROF_IMAGE_COL).InsertOne(context.TODO(), img)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Profile Image")))
		return err
	}
	id := res.InsertedID.(primitive.ObjectID)
	img.Id = id
	return nil
}

func (img *ProfileImage) Save(database *mongo.Database) error {
	// Indicates created not inserted
	if img.Id.IsZero() && !img.UserId.IsZero() {
		img.Insert(database)
		return nil
	} else if img.Id.IsZero() && !img.UserId.IsZero() {
		return errors.New("invalid profile image to insert into db")
	}
	filter := bson.D{{"_id", img.Id}}
	_, err := database.Collection(PROF_IMAGE_COL).ReplaceOne(context.TODO(), filter, img)
	if err != nil {
		return err
	}
	return nil
}
