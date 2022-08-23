package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	// "errors"
	// "fmt"
	// "log"
	// "time"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) SuggestItem(ctx context.Context, req *comms.ContractSuggestItem) (*comms.ContactEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting a item %d", req.NewBody))
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	item_id, err := primitive.ObjectIDFromHex(req.ItemId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}
	item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, err
	}

	oldBody := item.CurrentBody
	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return nil, errors.New("You must provide both user and contract with 2 users to change price with")
	}
	err = db.ContractItemSuggestBody(item, contract, user, req.NewBody, database)
	if err != nil {
		return nil, err
	}
	log.Println("Item Updated, attempting to send message")

	err = s.SendItemMessage(item, contract, user, req.NewBody, oldBody, db.SUGGEST)
	// log.Println("Finished attempting to send message")
	// if err != nil {
	// 	return nil, err
	// }
	// log.Println("Price Message Broadcast")
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) ReactItem(ctx context.Context, req *comms.ContractReactItem) (*comms.ContactEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	item_id, err := primitive.ObjectIDFromHex(req.ItemId)
	if err != nil {
		return nil, err
	}
	message_id, err := primitive.ObjectIDFromHex(req.MessageId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}
	item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, err
	}
	msg, err := db.MessageById(message_id, database)
	if err != nil {
		return nil, err
	}

	// var role uint32
	if user.Id == contract.Worker.Id {
		// role = db.WORKER
		msg.Body.WorkerStatus = req.Status
	} else if user.Id == contract.Buyer.Id {
		// role = db.BUYER
		msg.Body.BuyerStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		item.CurrentBody = msg.Body.ItemBodyNew
		item.WorkerBody = msg.Body.ItemBodyNew
		item.BuyerBody = msg.Body.ItemBodyNew
		item.AwaitingApproval = false
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		item.CurrentBody = msg.Body.ItemBodyOld
		item.WorkerBody = msg.Body.ItemBodyOld
		item.BuyerBody = msg.Body.ItemBodyOld
		item.AwaitingApproval = false
	}
	err = db.ContractItemReplace(item, database)
	if err != nil {
		return nil, err
	}
	if err = db.MessageReplace(msg, database); err != nil {
		return nil, err
	}
	// Revision Sideeffect message sent
	revMsgBody := &db.MessageBody{
		MsgId:        msg.Id,
		Resolved:     msg.Body.Resolved,
		ResolStatus:  msg.Body.ResolStatus,
		WorkerStatus: msg.Body.WorkerStatus,
		BuyerStatus:  msg.Body.BuyerStatus,
	}
	revMsg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.REVISION,
		Body:      revMsgBody,
		Label:     &db.LabelNub{},
	}
	if err = s.SendRevMessage(revMsg); err != nil {
		return nil, err
	}
	return &comms.ContactEditResponse{}, nil
}
