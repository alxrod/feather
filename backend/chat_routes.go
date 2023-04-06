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

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You passed an invalid user id")
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
		if message != nil {
			protos[idx] = message.Proto()
			message.UpdateReadReceipts(user_id, database)
		}
	}
	return &comms.ChatMessageSet{
		RoomId:   room.Id.Hex(),
		Messages: protos,
	}, nil
}

func (s *BackServer) PullNewMessages(ctx context.Context, req *comms.NewMessagesRequest) (*comms.NewMessageSet, error) {
	database := s.dbClient.Database(s.dbName)
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You passed an invalid user id")
	}

	user, err := db.UserQueryId(user_id, database)

	protos := make([]*comms.NewMessageEntity, 0)

	documents, err := db.DocumentsByUser(user_id, database)
	if err != nil {
		return nil, err
	}
	for _, document := range documents {
		room, err := db.ChatRoomQueryId(document.RoomId, database)
		if err != nil {
			continue
		}
		for _, message := range room.Messages {
			if message != nil && message.ReadReceipts != nil {
				for _, receipt := range message.ReadReceipts {
					if receipt.UserId == user.Id && !receipt.Read {
						msgProto := message.Proto()
						documentNub, _ := document.NubProto(user)
						protos = append(protos, &comms.NewMessageEntity{
							Document: documentNub,
							Message:  msgProto,
						})
					}
				}
			}
		}
	}
	return &comms.NewMessageSet{
		Messages: protos,
	}, nil

}
