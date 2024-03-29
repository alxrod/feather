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

func (s *BackServer) SuggestItem(ctx context.Context, req *comms.ContractSuggestItem) (*comms.ContractEditResponse, error) {
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
	contract, _ = db.ContractUnsign(contract, database)

	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, err
	}

	oldBody := item.CurrentBody
	err = db.ContractItemSuggestBody(item, contract, user, req.NewBody, database)
	if err != nil {
		return nil, err
	}

	if !contract.RoomId.IsZero() {
		log.Println("Item Updated, attempting to send message")
		err = s.ChatAgent.SendItemMessage(item, contract, user, req.NewBody, oldBody, db.SUGGEST, database)
		if err != nil {
			return nil, err
		}
	}
	// log.Println("Finished attempting to send message")
	// if err != nil {
	// 	return nil, err
	// }
	// log.Println("Price Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactItem(ctx context.Context, req *comms.ContractReactItem) (*comms.ContractEditResponse, error) {
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
	contract, _ = db.ContractUnsign(contract, database)

	user, err := db.UserQueryId(user_id, database)
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
	} else if user.AdminStatus {
		msg.AdminOverride = true
		msg.AdminStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if user.AdminStatus {
		msg.Body.Resolved = true
		item.AwaitingApproval = false
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			item.CurrentBody = msg.Body.ItemBodyNew
			item.WorkerBody = msg.Body.ItemBodyNew
			item.BuyerBody = msg.Body.ItemBodyNew

		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			item.CurrentBody = msg.Body.ItemBodyOld
			item.WorkerBody = msg.Body.ItemBodyOld
			item.BuyerBody = msg.Body.ItemBodyOld
		}

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
	if err = s.ChatAgent.SendRevMessage(revMsg, database); err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) SuggestAddItem(ctx context.Context, req *comms.ContractSuggestAddItem) (*comms.ItemEntity, error) {
	log.Println(fmt.Sprintf("Suggesting creating a item %d", req.Item.Name))
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
	contract, err = db.ContractUnsign(contract, database)
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	if contract.Stage == db.CREATE {
		req.Item.AwaitingApproval = false
		req.Item.AwaitingCreation = false
	} else if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer != nil {
			req.Item.AwaitingApproval = true
			req.Item.AwaitingCreation = true
		} else {
			req.Item.AwaitingApproval = false
			req.Item.AwaitingCreation = false
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker != nil {
			req.Item.AwaitingApproval = true
			req.Item.AwaitingCreation = true
		} else {
			req.Item.AwaitingApproval = false
			req.Item.AwaitingCreation = false
		}
	} else if user.AdminStatus {
		req.Item.AwaitingApproval = false
		req.Item.AwaitingCreation = false
	} else {
		return nil, errors.New("Invalid proposing user")
	}

	item, err := db.ItemInsert(req.Item, contract_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, err
	}

	err = db.ContractSuggestItemAdd(item, contract, user, database)
	if err != nil {
		return nil, err
	}

	if !contract.RoomId.IsZero() {
		log.Println("Item Updated, attempting to send message")
		err = s.ChatAgent.SendItemCreateMessage(item, contract, user, db.SUGGEST, database)
		// log.Println("Finished attempting to send message")
		if err != nil {
			return nil, err
		}
	}

	// log.Println("Price Message Broadcast")
	itemProtos := make([]*comms.ItemEntity, len(contract.Items))
	for i, item := range contract.Items {
		itemProtos[i] = item.Proto()
	}

	return item.Proto(), nil
}

func (s *BackServer) ReactAddItem(ctx context.Context, req *comms.ContractReactAddItem) (*comms.ContractEditResponse, error) {
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
	contract, _ = db.ContractUnsign(contract, database)

	user, err := db.UserQueryId(user_id, database)
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
	} else if user.AdminStatus {
		msg.AdminOverride = true
		msg.AdminStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if user.AdminStatus {
		msg.Body.Resolved = true
		item.AwaitingApproval = false
		item.AwaitingCreation = false
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			err := db.ContractItemReplace(item, database)
			if err != nil {
				return nil, err
			}
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			err := db.ContractRemoveItem(item, contract, user, database)
			if err != nil {
				return nil, err
			}
		}

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		item.AwaitingApproval = false
		item.AwaitingCreation = false
		err := db.ContractItemReplace(item, database)
		if err != nil {
			return nil, err
		}
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		item.AwaitingApproval = false

		err := db.ContractRemoveItem(item, contract, user, database)
		if err != nil {
			return nil, err
		}
		// As of now we don't delete because I want the old draft to stick around.
		// err = db.ContractItemDelete(item, database)
		// if err != nil {
		// 	return nil, err
		// }
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
	if err = s.ChatAgent.SendRevMessage(revMsg, database); err != nil {
		return nil, err
	}

	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) SuggestDeleteItem(ctx context.Context, req *comms.ContractSuggestDelItem) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting deleting a item %s", req.Item.Name))
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	log.Printf("Item Id: %s", req.Item.Id)
	item_id, err := primitive.ObjectIDFromHex(req.Item.Id)
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

	item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, err
	}

	if contract.Stage == db.CREATE {
		item.AwaitingApproval = false
		item.AwaitingDeletion = false
	} else if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer != nil {
			item.AwaitingApproval = true
			item.AwaitingDeletion = true
		} else {
			item.AwaitingApproval = false
			item.AwaitingDeletion = false
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker != nil {
			item.AwaitingApproval = true
			item.AwaitingDeletion = true
		} else {
			item.AwaitingApproval = false
			item.AwaitingDeletion = false
		}
	} else if user.AdminStatus {
		item.AwaitingApproval = false
		item.AwaitingDeletion = false
	} else {
		return nil, errors.New("Invalid proposing user")
	}

	err = db.ContractItemReplace(item, database)
	if err != nil {
		return nil, err
	}

	if !contract.RoomId.IsZero() {
		log.Printf("Item Updated, attempting to send message w status %b and %b", item.AwaitingApproval, item.AwaitingDeletion)
		err = s.ChatAgent.SendItemDeleteMessage(item, contract, user, db.SUGGEST, database)
		// log.Println("Finished attempting to send message")
		if err != nil {
			return nil, err
		}
	}

	if item.AwaitingDeletion == false {
		err := db.ContractRemoveItem(item, contract, user, database)
		if err != nil {
			return nil, err
		}
	}
	// log.Println("Price Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactDeleteItem(ctx context.Context, req *comms.ContractReactDelItem) (*comms.ContractEditResponse, error) {
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
	contract, _ = db.ContractUnsign(contract, database)

	user, err := db.UserQueryId(user_id, database)
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
	} else if user.AdminStatus {
		msg.AdminOverride = true
		msg.AdminStatus = req.Status
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if user.AdminStatus {
		msg.Body.Resolved = true
		item.AwaitingApproval = false
		item.AwaitingDeletion = false
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			err := db.ContractRemoveItem(item, contract, user, database)
			if err != nil {
				return nil, err
			}
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			err := db.ContractItemReplace(item, database)
			if err != nil {
				return nil, err
			}
		}

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		item.AwaitingApproval = false
		item.AwaitingDeletion = false
		err := db.ContractRemoveItem(item, contract, user, database)
		if err != nil {
			return nil, err
		}
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		item.AwaitingApproval = false
		item.AwaitingDeletion = false
		err := db.ContractItemReplace(item, database)
		if err != nil {
			return nil, err
		}
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
	if err = s.ChatAgent.SendRevMessage(revMsg, database); err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) SettleItem(ctx context.Context, req *comms.ContractSettleItemRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, deadline, item, err := pullUserContractDeadlineItem(req.UserId, req.ContractId, req.DeadlineId, req.ItemId, database)
	if err != nil {
		return nil, err
	}
	if contract.Stage != db.SETTLE {
		return nil, errors.New("Contract not in settling period")
	}
	if contract.Buyer.Id != user.Id {
		return nil, errors.New("User is not the buyer so cannot settle on item")
	}

	err = db.ContractItemChangeSettle(item, deadline, user, contract, req.NewState, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendItemSettleMessage(contract, deadline, user, item, database)
	if err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}
