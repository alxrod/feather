package backend

import (
	"context"
	"errors"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) JoinChat(req *comms.UserJoin, stream comms.Chat_JoinChatServer) error {
	room_id, err := primitive.ObjectIDFromHex(req.RoomId)
	if err != nil {
		return errors.New("Invalid Room Id")
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return errors.New("Invalid Room Id")
	}

	database := s.dbClient.Database(s.dbName)
	conn, err := s.ChatAgent.UserJoin(room_id, user_id, stream, database)
	if err != nil {
		return err
	}
	err = <-conn.Err
	return err
}

func (s *BackServer) LeaveChat(ctx context.Context, req *comms.UserLeave) (*comms.UserClose, error) {
	room_id, err := primitive.ObjectIDFromHex(req.RoomId)
	if err != nil {
		return nil, errors.New("Invalid Room Id")
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("Invalid Room Id")
	}

	database := s.dbClient.Database(s.dbName)
	err = s.ChatAgent.UserLeave(room_id, user_id, database)
	if err != nil {
		return nil, err
	}
	return &comms.UserClose{}, nil
}

func (s *BackServer) SendCommentMessage(ctx context.Context, req *comms.SendRequest) (*comms.SendResponse, error) {
	if req.UserId == "" || req.RoomId == "" {
		return nil, errors.New("You must pass a user id, room id, and message to send a message")
	}
	database := s.dbClient.Database(s.dbName)
	err := s.ChatAgent.SendMessage(req, database)
	if err != nil {
		return nil, err
	}

	return &comms.SendResponse{}, nil
}

func (s *BackServer) PullChatHistory(ctx context.Context, req *comms.ChatPullRequest) (*comms.ChatMessageSet, error) {
	if req.RoomId == "" {
		return nil, errors.New("You must pass a room_id to get messages")
	}

	room_id, err := primitive.ObjectIDFromHex(req.RoomId)
	if err != nil {
		return nil, errors.New("You passed an invalid room id")
	}

	database := s.dbClient.Database(s.dbName)
	room, err := db.ChatRoomQueryId(room_id, database)
	if err != nil {
		return nil, err
	}

	protos := make([]*comms.ChatMessage, len(room.Messages))
	for idx, message := range room.Messages {
		protos[idx] = message.Proto()
	}
	return &comms.ChatMessageSet{
		RoomId:   room.Id.Hex(),
		Messages: protos,
	}, nil
}
