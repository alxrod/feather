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

const (
	MSG_COMMENT  = 0
	MSG_ITEM     = 1
	MSG_DEADLINE = 2
	MSG_PRICE    = 3
)

type ChatRoom struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"`
	ContractId primitive.ObjectID `bson:"contract_id"`

	UserHandles []*UserHandle `bson:"user_handles"`
	Users       []*User       `bson:"-"`
	ActiveUsers []*User       `bson:"-"`

	MessageIds []primitive.ObjectID `bson:"message_ids"`
	Messages   []*Message           `bson:"-"`
}

func ChatRoomInsert(contract_id primitive.ObjectID, users []*User, database *mongo.Database) (*ChatRoom, error) {
	log.Println(color.Ize(color.Yellow, fmt.Sprintf("Inserting a chat room %s", contract_id.Hex())))
	handles := make([]*UserHandle, len(users))
	for idx, user := range users {
		handles[idx] = user.Handle()
	}

	room := &ChatRoom{
		ContractId:  contract_id,
		UserHandles: handles,
		Users:       users,
	}

	roomCollection := database.Collection(ROOM_COL)
	res, err := roomCollection.InsertOne(context.TODO(), room)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Room for contract %s", contract_id.Hex())))
		return nil, err
	}

	id := res.InsertedID.(primitive.ObjectID)
	room.Id = id
	return room, nil
}

func ChatRoomQueryId(room_id primitive.ObjectID, database *mongo.Database) (*ChatRoom, error) {
	var room *ChatRoom
	filter := bson.M{"_id": room_id}

	err := database.Collection(ROOM_COL).FindOne(context.TODO(), filter).Decode(&room)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}

	users := make([]*User, len(room.UserHandles))
	for idx, handle := range room.UserHandles {
		user, err := UserQueryId(handle.Id, database)
		if err != nil {
			return nil, err
		}
		users[idx] = user
	}

	messages := make([]*Message, len(room.MessageIds))
	for idx, id := range room.MessageIds {
		msg, err := MessageById(id, database)
		if err != nil {
			log.Println(color.Ize(color.Red, fmt.Sprintf("Couldn't find message id %s for room %s", id, room_id)))
		}
		messages[idx] = msg
	}
	room.Users = users
	room.Messages = messages

	return room, nil
}

func (room *ChatRoom) UserJoin(user_id primitive.ObjectID, database *mongo.Database) error {
	if room == nil {
		return errors.New("You called UserJoin on a nil chat")
	}
	user, err := UserQueryId(user_id, database)
	if err != nil {
		return err
	}
	room.ActiveUsers = append(room.ActiveUsers, user)
	notIn := true
	for _, handle := range room.UserHandles {
		if handle.Id == user.Id {
			notIn = false
		}
	}
	if notIn {
		handle := &UserHandle{
			Id:       user.Id,
			Username: user.Username,
		}

		room.UserHandles = append(room.UserHandles, handle)
		filter := bson.D{{"_id", room.Id}}
		update := bson.D{{"$set", bson.D{{"user_handles", room.UserHandles}}}}
		_, err = database.Collection(ROOM_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return err
		}
	}
	return nil
}

func (room *ChatRoom) UserLeave(user_id primitive.ObjectID, database *mongo.Database) error {
	if room == nil {
		return errors.New("You called UserLeave on a nil chat")
	}
	newUsers := room.ActiveUsers
	i := -1
	for idx, user := range newUsers {
		if user.Id == user_id {
			i = idx
		}
	}

	if i < 0 || i >= len(newUsers) {
		return errors.New("The user with this id is not an active user")
	} else {
		newUsers = append(newUsers[:i], newUsers[i+1:]...)
	}
	room.ActiveUsers = newUsers
	return nil
}

func (room *ChatRoom) AddMessage(req *comms.SendRequest, database *mongo.Database) (*Message, error) {
	if room == nil {
		return nil, errors.New("Attempted to add message to nil room")
	}
	added_msg, err := MessageInsert(req, room, database)
	if err != nil {
		return nil, err
	}
	room.MessageIds = append(room.MessageIds, added_msg.Id)
	room.Messages = append(room.Messages, added_msg)

	filter := bson.D{{"_id", room.Id}}
	update := bson.D{{"$set", bson.D{{"message_ids", room.MessageIds}}}}
	_, err = database.Collection(ROOM_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}
	return added_msg, nil
}

func (room *ChatRoom) AddMessageInternal(msg *Message, database *mongo.Database) (*Message, error) {
	if room == nil {
		return nil, errors.New("Attempted to add message to nil room")
	}
	if msg.Method == REVISION {
		msg.Id = primitive.NewObjectID()
		return msg, nil
	}
	var err error
	msg.Id, err = MessageInsertInternal(msg, room, database)
	if err != nil {
		return nil, err
	}

	room.MessageIds = append(room.MessageIds, msg.Id)
	room.Messages = append(room.Messages, msg)

	filter := bson.D{{"_id", room.Id}}
	update := bson.D{{"$set", bson.D{{"message_ids", room.MessageIds}}}}
	_, err = database.Collection(ROOM_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}
	return msg, nil

}

type UserHandle struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	Username string             `bson:"username"`
}

func (userH *UserHandle) Proto() *comms.UserHandle {
	proto := &comms.UserHandle{}
	if userH == nil {
		return proto
	}
	proto.Id = userH.Id.Hex()
	proto.Username = userH.Username
	return proto
}
