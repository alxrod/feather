package backend

import (
	"context"
	"errors"
	"log"
	"time"

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

// All Send Message Functions:
// ########################################################################################################################
func (s *BackServer) SendMessage(ctx context.Context, req *comms.SendRequest) (*comms.SendResponse, error) {
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

func (s *BackServer) SendPriceMessage(
	contract *db.Contract,
	user *db.User,
	newPrice float32,
	oldPrice float32,
	editType uint32) error {

	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return errors.New("You must provide both user and contract with 2 users to change price with")
	}
	body := &db.MessageBody{
		Type:         editType,
		PriceNew:     newPrice,
		PriceOld:     oldPrice,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	if contract.Worker.Id == user.Id {
		log.Println("Sender is worker")
		body.WorkerStatus = db.DECISION_YES
	} else if contract.Buyer.Id == user.Id {
		log.Println("Sender is buyer")
		body.BuyerStatus = db.DECISION_YES
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.PRICE,

		Body: body,
		Label: &db.LabelNub{
			Type: db.LABEL_PRICE,
			Name: "Price",
		},
	}

	database := s.dbClient.Database(s.dbName)
	err := s.ChatAgent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (s *BackServer) SendPayoutMessage(
	contract *db.Contract,
	user *db.User,
	deadline *db.Deadline,
	newPayout float32,
	oldPayout float32,
	editType uint32) error {

	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return errors.New("You must provide both user and contract with 2 users to change price with")
	}
	body := &db.MessageBody{
		Type:         editType,
		PayoutNew:    newPayout,
		PayoutOld:    oldPayout,
		DeadlineId:   deadline.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	if contract.Worker.Id == user.Id {
		log.Println("Sender is worker")
		body.WorkerStatus = db.DECISION_YES
	} else if contract.Buyer.Id == user.Id {
		log.Println("Sender is buyer")
		body.BuyerStatus = db.DECISION_YES
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Deadline"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.PAYOUT,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_DEADLINE,
			Name: label_name,
		},
	}

	database := s.dbClient.Database(s.dbName)
	err := s.ChatAgent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (s *BackServer) SendDateMessage(
	contract *db.Contract,
	user *db.User,
	deadline *db.Deadline,
	newDate time.Time,
	oldDate time.Time,
	editType uint32) error {

	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return errors.New("You must provide both user and contract with 2 users to change price with")
	}
	body := &db.MessageBody{
		Type:         editType,
		DateNew:      newDate,
		DateOld:      oldDate,
		DeadlineId:   deadline.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	if contract.Worker.Id == user.Id {
		log.Println("Sender is worker")
		body.WorkerStatus = db.DECISION_YES
	} else if contract.Buyer.Id == user.Id {
		log.Println("Sender is buyer")
		body.BuyerStatus = db.DECISION_YES
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Deadline"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DATE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_DEADLINE,
			Name: label_name,
		},
	}

	database := s.dbClient.Database(s.dbName)
	err := s.ChatAgent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (s *BackServer) SendItemMessage(
	item *db.ContractItem,
	contract *db.Contract,
	user *db.User,
	newBody string,
	oldBody string,
	editType uint32) error {

	body := &db.MessageBody{
		Type:         editType,
		ItemBodyNew:  newBody,
		ItemBodyOld:  oldBody,
		ItemId:       item.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	if contract.Worker.Id == user.Id {
		log.Println("Sender is worker")
		body.WorkerStatus = db.DECISION_YES
	} else if contract.Buyer.Id == user.Id {
		log.Println("Sender is buyer")
		body.BuyerStatus = db.DECISION_YES
	}
	label_name := item.Name
	if label_name == "" {
		label_name = "Item"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}

	database := s.dbClient.Database(s.dbName)
	err := s.ChatAgent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (s *BackServer) SendRevMessage(msg *db.Message) error {
	database := s.dbClient.Database(s.dbName)
	err := s.ChatAgent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
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
