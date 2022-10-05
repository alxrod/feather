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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)

	var userRole uint32
	if contract.Worker.Id == user.Id {
		userRole = db.WORKER
	} else if contract.Buyer.Id == user.Id {
		userRole = db.BUYER
	} else {
		return nil, errors.New("User is not a member of the contract for which they are suggesting new payout.")
	}

	oldPayout := deadline.CurrentPayout
	newPayout := req.NewPayout
	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return nil, errors.New("You must provide both user and contract with 2 users to change price with")
	}
	err = db.DeadlineSuggestPayout(deadline, user, userRole, newPayout, database)
	if err != nil {
		return nil, err
	}
	log.Println("Payout Updated in DB, attempting to send message")

	err = s.SendPayoutMessage(contract, user, deadline, newPayout, oldPayout, db.SUGGEST)
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)

	var userRole uint32
	if contract.Worker.Id == user.Id {
		userRole = db.WORKER
	} else if contract.Buyer.Id == user.Id {
		userRole = db.BUYER
	} else {
		return nil, errors.New("User is not a member of the contract for which they are suggesting new payout.")
	}

	oldDate := deadline.CurrentDate
	newDate := req.NewDate.AsTime()
	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return nil, errors.New("You must provide both user and contract with 2 users to change price with")
	}
	err = db.DeadlineSuggestDate(deadline, user, userRole, newDate, database)
	if err != nil {
		return nil, err
	}
	log.Println("Payout Updated in DB, attempting to send message")

	err = s.SendDateMessage(contract, user, deadline, newDate, oldDate, db.SUGGEST)
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
	if err = s.SendRevMessage(revMsg); err != nil {
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	req.Deadline.AwaitingCreation = true

	deadline, err := db.DeadlineInsert(req.Deadline, user_id, contract_id, items, database)
	if err != nil {
		return nil, err
	}

	err = db.ContractSuggestDeadlineAdd(deadline, contract, user, database)
	if err != nil {
		return nil, err
	}

	err = s.SendDeadlineCreateMessage(deadline, contract, user, db.SUGGEST)
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
	if err = s.SendRevMessage(revMsg); err != nil {
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, err
	}

	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, err
	}

	deadline.AwaitingDeletion = true
	deadline.DeadlineProposerId = user.Id
	err = db.DeadlineReplace(deadline, database)
	if err != nil {
		return nil, err
	}
	log.Println("Deadline suggested to delete, attempting to send message")

	err = s.SendDeadlineDeleteMessage(deadline, contract, user, db.SUGGEST)
	// log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
	if err = s.SendRevMessage(revMsg); err != nil {
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	if user == nil || contract == nil || contract.Worker == nil || contract.Buyer == nil {
		return nil, errors.New("You must provide both user and contract with 2 users to change deadline items with")
	}
	err = db.DeadlineSuggestItems(deadline, contract, user, newIds, database)
	if err != nil {
		return nil, err
	}
	log.Println("Deadline Items Updated in DB, attempting to send message")

	err = s.SendDeadlineItemMessage(contract, user, deadline, db.SUGGEST)
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
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
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
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
	if err = s.SendRevMessage(revMsg); err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}
