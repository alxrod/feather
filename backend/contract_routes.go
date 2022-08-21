package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s *BackServer) Create(ctx context.Context, req *comms.ContractCreateRequest) (*comms.ContractResponse, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	if req.Title == "" ||
		req.Summary == "" ||
		req.IntroMessage == "" ||
		req.Price == nil {
		return nil, errors.New("Title, summary, intro, and price are all required to create a contract.")
	}

	if len(req.Deadlines) < 2 {
		return nil, errors.New("You must specify at least a start and end deadline for the contract")
	}

	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)
	user, err := db.UserQueryId(userId, userCollection)
	if err != nil {
		return nil, err
	}

	contract, err := db.ContractInsert(req, user, s.dbClient.Database(s.dbName))
	if err != nil {
		return nil, err
	}
	contractProto := contract.Proto()
	return &comms.ContractResponse{
		Contract: contractProto,
		Role:     req.Role,
	}, nil

}

func (s *BackServer) QueryById(ctx context.Context, req *comms.QueryByIdRequest) (*comms.ContractResponse, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("Invalid contract id")
	}
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("Invalid user id")
	}

	database := s.dbClient.Database(s.dbName)

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	if (contract.Worker != nil && contract.Worker.Id != user_id) && (contract.Buyer != nil && contract.Buyer.Id != user_id) {
		return nil, errors.New("The queried contract does not belong to this user")
	}

	role := db.BUYER
	if contract.Worker != nil && contract.Worker.Id == user_id {
		role = db.WORKER
	}

	proto := contract.Proto()
	return &comms.ContractResponse{
		Contract: proto,
		Role:     role,
	}, nil
}

func (s *BackServer) InviteQuery(ctx context.Context, req *comms.InviteDataRequest) (*comms.InviteNub, error) {
	contract_id, err := primitive.ObjectIDFromHex(req.Id)
	if err != nil {
		return nil, errors.New("Invalid contract id")
	}
	database := s.dbClient.Database(s.dbName)
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	proto, err := contract.InviteProto()
	if err != nil {
		return nil, err
	}
	return proto, nil
}

func (s *BackServer) Claim(ctx context.Context, req *comms.ClaimContractRequest) (*comms.ContractResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if req.Password != contract.Password {
		return nil, errors.New("Incorrect password to claim contract")
	}
	err = db.ContractClaim(user, contract, database)
	if err != nil {
		return nil, err
	}
	role := db.BUYER
	if contract.Worker != nil && contract.Worker.Id == user.Id {
		role = db.WORKER
	}
	return &comms.ContractResponse{
		Contract: contract.Proto(),
		Role:     role,
	}, nil
}

func (s *BackServer) QueryByUser(ctx context.Context, req *comms.QueryByUserRequest) (*comms.ContractNubSet, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Invalid user id for contract query")))
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	contracts, err := db.ContractsByUser(user_id, database)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Error querying contracts: %s", err.Error())))
		return nil, err
	}

	log.Println("Contracts queried successfully")

	contractNubs := make([]*comms.ContractNub, len(contracts))
	for idx, contract := range contracts {
		conNub, err := contract.NubProto(user_id)
		if err != nil {
			return nil, err
		}
		contractNubs[idx] = conNub
	}
	log.Println("Contracts nubbed successfully")
	return &comms.ContractNubSet{
		UserId:       user_id.Hex(),
		ContractNubs: contractNubs,
	}, nil
}

func (s *BackServer) SuggestPrice(ctx context.Context, req *comms.ContractSuggestPrice) (*comms.ContactEditResponse, error) {
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
	oldPrice := contract.Price.Current
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	err = db.ContractSuggestPrice(contract, user, req.NewPrice, database)
	if err != nil {
		return nil, err
	}
	log.Println("Price Updated, attempting to send message")

	err = s.SendPriceMessage(contract, user, req.NewPrice, oldPrice, db.SUGGEST)
	log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}
	log.Println("Price Message Broadcast")
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) ReactPrice(ctx context.Context, req *comms.ContractReactPrice) (*comms.ContactEditResponse, error) {
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
	} else {
		return nil, errors.New(fmt.Sprintf("The user %s that sent the change is not a member of this contract", user.Id))
	}

	// What needs to be implemented:
	// 1) If the user reacts with accept
	// If the other user is accepted, mark the change as resolved and then update the price.
	// 2) If the user reacts with reject
	// Resolve the contract, make it cancelled no matter the other users reaction

	// Implementation:

	saveContract := false
	// 1)
	if msg.Body.WorkerStatus == db.DECISION_YES && msg.Body.BuyerStatus == db.DECISION_YES {
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
func (s *BackServer) SuggestPayout(ctx context.Context, req *comms.ContractSuggestPayout) (*comms.ContactEditResponse, error) {
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
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) ReactPayout(ctx context.Context, req *comms.ContractReactPayout) (*comms.ContactEditResponse, error) {
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
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) SuggestDate(ctx context.Context, req *comms.ContractSuggestDate) (*comms.ContactEditResponse, error) {
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
	return &comms.ContactEditResponse{}, nil
}

func (s *BackServer) ReactDate(ctx context.Context, req *comms.ContractReactDate) (*comms.ContactEditResponse, error) {
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
	return &comms.ContactEditResponse{}, nil

}

func pullUserContract(req_user_id, req_contract_id string, database *mongo.Database) (*db.User, *db.Contract, error) {
	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, errors.New("Invalid contract id")
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, errors.New("Invalid user id")
	}
	user, err := db.UserQueryId(user_id, database.Collection(db.USERS_COL))
	if err != nil {
		return nil, nil, err
	}
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, err
	}
	return user, contract, nil

}
