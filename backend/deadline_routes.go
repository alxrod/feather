package backend

import (
	"context"
	"errors"
	"fmt"
	"log"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) ChangeDate(ctx context.Context, req *comms.SuggestDateReq) (*comms.NullResponse, error) {

	// Query Objects
	database := s.dbClient.Database(s.dbName)
	user, deadline, document, err := UnpackUDD(req.UserId, req.DeadlineId, req.DocId, database)

	oldDate := deadline.CurrentDate
	newDate := req.NewDate.AsTime()

	// Assumign overwrite
	err = deadline.ChangeDate(newDate, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendDateMessage(document, user, deadline, newDate, oldDate, database)
	if err != nil {
		return nil, err
	}
	return &comms.NullResponse{}, nil
}

func (s *BackServer) AddDeadline(ctx context.Context, req *comms.SuggestAddDeadlineReq) (*comms.DeadlineEntity, error) {

	database := s.dbClient.Database(s.dbName)
	user, _, document, err := UnpackUDD(req.UserId, "IGNORE", req.DocId, database)

	items := make([]*db.Item, len(req.Deadline.Items))
	for idx, nub := range req.Deadline.Items {
		item_id, err := primitive.ObjectIDFromHex(nub.Id)
		if err != nil {
			return nil, err
		}
		item, err := db.ItemById(item_id, database.Collection(db.ITEM_COL))
		if err != nil {
			return nil, err
		}
		items[idx] = item
	}

	deadline, err := db.DeadlineInsert(req.Deadline, user.Id, document.Id, items, database)
	if err != nil {
		return nil, err
	}

	err = document.AddDeadline(deadline, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendDeadlineCreateMessage(deadline, document, user, db.SUGGEST, database)
	if err != nil {
		return nil, err
	}
	// log.Println("Price Message Broadcast")
	return deadline.Proto(), nil
}

func (s *BackServer) DeleteDeadline(ctx context.Context, req *comms.SuggestDelDeadlineReq) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, deadline, document, err := UnpackUDD(req.UserId, req.Deadline.Id, req.DocId, database)

	err = s.ChatAgent.SendDeadlineDeleteMessage(deadline, document, user, database)
	if err != nil {
		return nil, err
	}

	err = document.RemoveDeadline(deadline, database)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil
}

func (s *BackServer) ChangeDeadlineItems(ctx context.Context, req *comms.SuggestDeadlineItemsReq) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, deadline, document, err := UnpackUDD(req.UserId, req.DeadlineId, req.DocId, database)

	newIds := make([]primitive.ObjectID, len(req.ItemIds))
	for i, itemId := range req.ItemIds {
		item_id, err := primitive.ObjectIDFromHex(itemId)
		if err != nil {
			return nil, errors.New(fmt.Sprintf("Item Id %s is not a valid id", itemId))
		}
		newIds[i] = item_id
	}

	err = deadline.ChangeItems(newIds, document, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendDeadlineItemMessage(document, user, deadline, db.SUGGEST, database)
	if err != nil {
		return nil, err
	}

	log.Println("Date Message Broadcast")
	return &comms.NullResponse{}, nil
}
