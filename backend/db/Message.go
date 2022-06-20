package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type Message struct {
	Id     primitive.ObjectID `bson:"_id,omitempty"`
	RoomId primitive.ObjectID `bson:"room_id"`

	Message string `bson:"message"`

	UserId primitive.ObjectID `bson:"user_id"`
	User   *User              `bson:"-"`

	Timestamp time.Time `bson:"timestamp"`
}

func (m *Message) Proto() *comms.ChatMessage {
	proto := &comms.ChatMessage{}
	if m == nil {
		return proto
	}

	proto.Id = m.Id.Hex()
	proto.User = m.User.Handle().Proto()
	proto.Message = m.Message
	proto.Timestamp = timestamppb.New(m.Timestamp)

	return proto
}

func MessageInsert(req *comms.SendRequest, room_id primitive.ObjectID, database *mongo.Database) (*Message, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("Invalid User Id")
	}

	userCollection := database.Collection(USERS_COL)
	user, err := UserQueryId(user_id, userCollection)
	if err != nil {
		return nil, err
	}

	message := &Message{
		RoomId:    room_id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
	}

	messageCollection := database.Collection(MSG_COL)
	res, err := messageCollection.InsertOne(context.TODO(), message)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Message for room %s for user %s", room_id.Hex(), user_id.Hex())))
		return nil, err
	}

	id := res.InsertedID.(primitive.ObjectID)
	message.Id = id
	return message, nil
}

func MessageQueryById(id primitive.ObjectID, collection *mongo.Collection) (*Message, error) {
	var msg *Message
	filter := bson.M{"_id": id}
	var err error
	err = collection.FindOne(context.TODO(), filter).Decode(&msg)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}
	return msg, err

}
