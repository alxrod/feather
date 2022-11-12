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

func (s *BackServer) SuggestPayout(ctx context.Context, req *comms.ContractSuggestPayout) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting a payout %d for %s", req.NewPayout, req.DeadlineId))

	// Collect Ids:
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
	if err != nil {
		return nil, err
	}

	// Query Objects
	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)

	var userRole uint32
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		userRole = db.WORKER
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		userRole = db.BUYER
	} else if user.AdminStatus {
		userRole = db.ADMIN
	} else {
		return nil, errors.New("User is not a member of the contract for which they are suggesting new payout.")
	}

	oldPayout := deadline.CurrentPayout
	newPayout := req.NewPayout

	err = db.DeadlineSuggestPayout(contract, deadline, user, userRole, newPayout, database)
	if err != nil {
		return nil, err
	}
	log.Println("Payout Updated in DB, attempting to send message")

	err = s.ChatAgent.SendPayoutMessage(contract, user, deadline, newPayout, oldPayout, db.SUGGEST, database)
	log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	log.Println("Payout Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactPayout(ctx context.Context, req *comms.ContractReactPayout) (*comms.ContractEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
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
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
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
	// 1)
	if user.AdminStatus {
		msg.Body.Resolved = true
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			deadline.CurrentPayout = msg.Body.PayoutNew
			deadline.WorkerPayout = msg.Body.PayoutNew
			deadline.BuyerPayout = msg.Body.PayoutNew
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			deadline.CurrentPayout = msg.Body.PayoutOld
			deadline.WorkerPayout = msg.Body.PayoutOld
			deadline.BuyerPayout = msg.Body.PayoutOld
		}
		deadline.PayoutAwaitingApproval = false

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		deadline.CurrentPayout = msg.Body.PayoutNew
		deadline.WorkerPayout = msg.Body.PayoutNew
		deadline.BuyerPayout = msg.Body.PayoutNew
		deadline.PayoutAwaitingApproval = false
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		deadline.CurrentPayout = msg.Body.PayoutOld
		deadline.WorkerPayout = msg.Body.PayoutOld
		deadline.BuyerPayout = msg.Body.PayoutOld
		deadline.PayoutAwaitingApproval = false
	}
	err = db.DeadlineReplace(deadline, database)
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
		AdminStatus:  msg.Body.AdminStatus,
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

func (s *BackServer) SuggestDate(ctx context.Context, req *comms.ContractSuggestDate) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting a date %d for %s", req.NewDate, req.DeadlineId))

	// Collect Ids:
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
	if err != nil {
		return nil, err
	}

	// Query Objects
	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)

	var userRole uint32
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		userRole = db.WORKER
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		userRole = db.BUYER
	} else if contract.Worker != nil && user.AdminStatus {
		userRole = db.ADMIN
	} else {
		return nil, errors.New("User is not a member of the contract for which they are suggesting new payout.")
	}

	oldDate := deadline.CurrentDate
	newDate := req.NewDate.AsTime()

	err = db.DeadlineSuggestDate(contract, deadline, user, userRole, newDate, database)
	if err != nil {
		return nil, err
	}
	log.Println("Payout Updated in DB, attempting to send message")

	err = s.ChatAgent.SendDateMessage(contract, user, deadline, newDate, oldDate, db.SUGGEST, database)
	log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	log.Println("Date Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactDate(ctx context.Context, req *comms.ContractReactDate) (*comms.ContractEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
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
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
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
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED
			deadline.CurrentDate = msg.Body.DateNew
			deadline.WorkerDate = msg.Body.DateNew
			deadline.BuyerDate = msg.Body.DateNew
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			deadline.CurrentDate = msg.Body.DateOld
			deadline.WorkerDate = msg.Body.DateOld
			deadline.BuyerDate = msg.Body.DateOld
		}
		deadline.DateAwaitingApproval = false

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		deadline.CurrentDate = msg.Body.DateNew
		deadline.WorkerDate = msg.Body.DateNew
		deadline.BuyerDate = msg.Body.DateNew
		deadline.DateAwaitingApproval = false
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		deadline.CurrentDate = msg.Body.DateOld
		deadline.WorkerDate = msg.Body.DateOld
		deadline.BuyerDate = msg.Body.DateOld
		deadline.DateAwaitingApproval = false
	}
	err = db.DeadlineReplace(deadline, database)
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

func (s *BackServer) SuggestAddDeadline(ctx context.Context, req *comms.ContractSuggestAddDeadline) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting creating a deadline %d", req.Deadline.Name))
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
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	items := make([]*db.ContractItem, len(req.Deadline.Items))
	for idx, nub := range req.Deadline.Items {
		item_id, err := primitive.ObjectIDFromHex(nub.Id)
		if err != nil {
			return nil, err
		}
		item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
		if err != nil {
			return nil, err
		}
		items[idx] = item
	}

	if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer != nil {
			req.Deadline.AwaitingCreation = true
		} else {
			req.Deadline.AwaitingCreation = false
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker != nil {
			req.Deadline.AwaitingCreation = true
		} else {
			req.Deadline.AwaitingCreation = false
		}
	} else if user.AdminStatus {
		req.Deadline.AwaitingCreation = false
	} else {
		return nil, errors.New("Invalid proposing user")
	}

	deadline, err := db.DeadlineInsert(req.Deadline, user_id, contract_id, items, database)
	if err != nil {
		return nil, err
	}

	err = db.ContractSuggestDeadlineAdd(deadline, contract, user, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendDeadlineCreateMessage(deadline, contract, user, db.SUGGEST, database)
	// log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	// log.Println("Price Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactAddDeadline(ctx context.Context, req *comms.ContractReactAddDeadline) (*comms.ContractEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
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
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	deadline, err := db.DeadlineById(deadline_id, database)
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
		deadline.AwaitingCreation = false
		msg.Body.Resolved = true
		if req.Status == db.DECISION_YES {
			msg.Body.Resolved = true
			msg.Body.ResolStatus = db.RESOL_APPROVED
			err := db.DeadlineReplace(deadline, database)
			if err != nil {
				return nil, err
			}
		} else {
			msg.Body.Resolved = true
			msg.Body.ResolStatus = db.RESOL_REJECTED

			err := db.DeadlineReplace(deadline, database)
			if err != nil {
				return nil, err
			}

			err = db.ContractRemoveDeadline(deadline, contract, database)
			if err != nil {
				return nil, err
			}
		}

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		deadline.AwaitingCreation = false
		err := db.DeadlineReplace(deadline, database)
		if err != nil {
			return nil, err
		}
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		deadline.AwaitingCreation = false

		err := db.DeadlineReplace(deadline, database)
		if err != nil {
			return nil, err
		}

		err = db.ContractRemoveDeadline(deadline, contract, database)
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

func (s *BackServer) SuggestDeleteDeadline(ctx context.Context, req *comms.ContractSuggestDelDeadline) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting deleting a deadline %s", req.Deadline.Name))
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}

	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	log.Printf("Deadline Id: %s", req.Deadline.Id)
	deadline_id, err := primitive.ObjectIDFromHex(req.Deadline.Id)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, err
	}

	if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer != nil {
			deadline.AwaitingDeletion = true
		} else {
			deadline.AwaitingDeletion = false
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker != nil {
			deadline.AwaitingDeletion = true
		} else {
			deadline.AwaitingDeletion = false
		}
	} else if user.AdminStatus {
		deadline.AwaitingDeletion = false
	} else {
		return nil, errors.New("Invalid proposing user")
	}

	deadline.DeadlineProposerId = user.Id
	err = db.DeadlineReplace(deadline, database)
	if err != nil {
		return nil, err
	}
	log.Println("Deadline suggested to delete, attempting to send message")

	err = s.ChatAgent.SendDeadlineDeleteMessage(deadline, contract, user, db.SUGGEST, database)
	// log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}

	if deadline.AwaitingDeletion == false {
		err = db.ContractRemoveDeadline(deadline, contract, database)
		if err != nil {
			return nil, err
		}
	}

	// log.Println("Price Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactDeleteDeadline(ctx context.Context, req *comms.ContractReactDelDeadline) (*comms.ContractEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
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
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
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
		deadline.AwaitingDeletion = false
		if req.Status == db.DECISION_YES {
			msg.Body.ResolStatus = db.RESOL_APPROVED

			err := db.ContractRemoveDeadline(deadline, contract, database)
			if err != nil {
				return nil, err
			}
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			err := db.DeadlineReplace(deadline, database)
			if err != nil {
				return nil, err
			}
		}

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		deadline.AwaitingDeletion = false
		err := db.ContractRemoveDeadline(deadline, contract, database)
		if err != nil {
			return nil, err
		}
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		deadline.AwaitingDeletion = false
		err := db.DeadlineReplace(deadline, database)
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

func (s *BackServer) SuggestDeadlineItems(ctx context.Context, req *comms.ContractSuggestDeadlineItems) (*comms.ContractEditResponse, error) {
	log.Println(fmt.Sprintf("Suggesting a items for %s", req.DeadlineId))

	// Collect Ids:
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
	if err != nil {
		return nil, err
	}

	// Query Objects
	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, err
	}
	newIds := make([]primitive.ObjectID, len(req.ItemIds))
	for i, itemId := range req.ItemIds {
		item_id, err := primitive.ObjectIDFromHex(itemId)
		if err != nil {
			return nil, errors.New(fmt.Sprintf("Item Id %s is not a valid id", itemId))
		}
		newIds[i] = item_id
	}

	incorrect_user := true
	if user.AdminStatus {
		incorrect_user = false
	}
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		incorrect_user = false
	}
	if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		incorrect_user = false
	}
	if incorrect_user {
		return nil, errors.New("this user is not correct for the contract")
	}
	err = db.DeadlineSuggestItems(deadline, contract, user, newIds, database)
	if err != nil {
		return nil, err
	}
	log.Println("Deadline Items Updated in DB, attempting to send message")

	err = s.ChatAgent.SendDeadlineItemMessage(contract, user, deadline, db.SUGGEST, database)
	log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	log.Println("Date Message Broadcast")
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) ReactDeadlineItems(ctx context.Context, req *comms.ContractReactDeadlineItems) (*comms.ContractEditResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req.DeadlineId)
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
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
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
		if req.Status == db.DECISION_YES {

			msg.Body.ResolStatus = db.RESOL_APPROVED
			err := db.DeadlineReactItems(deadline, contract, user, db.DECISION_YES, database)
			if err != nil {
				return nil, err
			}
		} else {
			msg.Body.ResolStatus = db.RESOL_REJECTED
			err := db.DeadlineReactItems(deadline, contract, user, db.DECISION_NO, database)
			if err != nil {
				return nil, err
			}
		}

	} else if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_APPROVED
		err := db.DeadlineReactItems(deadline, contract, user, db.DECISION_YES, database)
		if err != nil {
			return nil, err
		}
	} else if msg.Body.WorkerStatus == db.DECISION_NO || msg.Body.BuyerStatus == db.DECISION_NO {
		msg.Body.Resolved = true
		msg.Body.ResolStatus = db.RESOL_REJECTED
		err := db.DeadlineReactItems(deadline, contract, user, db.DECISION_NO, database)
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

func (s *BackServer) FinishDeadline(ctx context.Context, req *comms.FinishDeadlineRequest) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, deadline, err := pullUserContractDeadline(req.UserId, req.ContractId, req.DeadlineId, database)
	if err != nil {
		return nil, err
	}
	if deadline.Id != contract.CurrentDeadlineId {
		return nil, errors.New("The requested deadline is not the current deadline for the contract")
	}

	if user.Id == contract.Worker.Id {
		deadline.WorkerSettled = true
	} else if user.Id == contract.Buyer.Id {
		deadline.BuyerSettled = true
	} else if user.AdminStatus {
		deadline.AdminSettled = true
	}

	if err = s.DeadlineTransitionLogic(user, contract, deadline, database); err != nil {
		return nil, err
	}

	if err = s.ChatAgent.SendItemFinalizeMessage(contract, deadline, user, false, false, database); err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil

}

func (s *BackServer) ConfirmDeadline(ctx context.Context, req *comms.ConfirmDeadlineRequest) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, deadline, err := pullUserContractDeadline(req.UserId, req.ContractId, req.DeadlineId, database)
	if err != nil {
		return nil, err
	}
	if deadline.Id != contract.CurrentDeadlineId {
		return nil, errors.New("The requested deadline is not the current deadline for the contract")
	}

	if user.Id == contract.Worker.Id {
		deadline.WorkerConfirmed = true
	} else if user.Id == contract.Buyer.Id {
		deadline.BuyerConfirmed = true
	} else if user.AdminStatus {
		return nil, errors.New("Admin should not need to confirm")
	}

	if err = s.DeadlineTransitionLogic(user, contract, deadline, database); err != nil {
		return nil, err
	}

	if err = s.ChatAgent.SendItemFinalizeMessage(contract, deadline, user, true, false, database); err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) UndoDeadline(ctx context.Context, req *comms.UndoDeadlineRequest) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, deadline, err := pullUserContractDeadline(req.UserId, req.ContractId, req.DeadlineId, database)
	if err != nil {
		return nil, err
	}
	if deadline.Id != contract.CurrentDeadlineId {
		return nil, errors.New("The requested deadline is not the current deadline for the contract")
	}

	deadline.WorkerConfirmed = false
	deadline.BuyerConfirmed = false
	if user.Id == contract.Worker.Id {
		deadline.WorkerSettled = false
	} else if user.Id == contract.Buyer.Id {
		deadline.BuyerSettled = false
	} else if user.AdminStatus {
		deadline.AdminSettled = false
	}

	if err = s.DeadlineTransitionLogic(user, contract, deadline, database); err != nil {
		return nil, err
	}

	if err = s.ChatAgent.SendItemFinalizeMessage(contract, deadline, user, false, true, database); err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}
