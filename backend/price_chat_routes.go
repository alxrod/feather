package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) SuggestPrice(ctx context.Context, req *comms.ContractSuggestPrice) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting a price %d", req.NewPrice))
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	contract, _ = db.ContractUnsign(contract, database)

	oldPrice := contract.Price.Current
	user, err := db.UserQueryId(user_id, database)

	if user == nil || contract == nil {
		return nil, errors.New("either the user or contract is invalid")
	} else if !user.AdminStatus {
		con_member := false
		if contract.Worker != nil && contract.Worker.Id == user.Id {
			con_member = true
		}
		if contract.Buyer != nil && contract.Buyer.Id == user.Id {
			con_member = true
		}
		if !con_member {
			return nil, errors.New("you must be a worker or a buyer of the contract to change")
		}
	}
	err = db.ContractSuggestPrice(contract, user, req.NewPrice, database)
	if err != nil {
		return nil, err
	}
	log.Println("Price Updated, attempting to send message")

	err = s.ChatAgent.SendPriceMessage(contract, user, req.NewPrice, oldPrice, db.SUGGEST, database)
	log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	log.Println("Price Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactPrice(ctx context.Context, req *comms.ContractReactPrice) (*comms.ContractEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	contract, _ = db.ContractUnsign(contract, database)

	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	message_id, err := primitive.ObjectIDFromHex(req.MessageId)
	if err != nil {
		return nil, err
	}
	msg, err := db.MessageById(message_id, database)

	// var role uint32
	if user.Id == contract.Worker.Id {
		// role = db.WORKER
		msg.Body.WorkerStatus = req.Status
	} else if user.Id == contract.Buyer.Id {
		// role = db.BUYER
		msg.Body.BuyerStatus = req.Status
	} else if user.AdminStatus {
		msg.AdminOverride = true
		msg.AdminStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	saveContract := false
	// 1)
	if user.AdminStatus {
		msg.Body.Resolved = true
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			contract.Price.Current = msg.Body.PriceNew
			contract.Price.Worker = msg.Body.PriceNew
			contract.Price.Buyer = msg.Body.PriceNew
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			contract.Price.Current = msg.Body.PriceOld
			contract.Price.Worker = msg.Body.PriceOld
			contract.Price.Buyer = msg.Body.PriceOld
		}
		contract.Price.AwaitingApproval = false
		saveContract = true

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		contract.Price.Current = msg.Body.PriceNew
		contract.Price.Worker = msg.Body.PriceNew
		contract.Price.Buyer = msg.Body.PriceNew
		contract.Price.AwaitingApproval = false
		saveContract = true
		// 2)
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		contract.Price.Current = msg.Body.PriceOld
		contract.Price.Worker = msg.Body.PriceOld
		contract.Price.Buyer = msg.Body.PriceOld
		contract.Price.AwaitingApproval = false
		saveContract = true
	}
	if saveContract {
		db.ContractSavePrice(contract, database)
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
		AdminStatus:  msg.AdminStatus,
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
	if err = s.ChatAgent.SendRevMessage(revMsg, database); err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}
