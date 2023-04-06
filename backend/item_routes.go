package backend

import (
	"context"

	// "errors"
	// "fmt"
	// "log"
	// "time"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
)

func (s *BackServer) ChangeBody(ctx context.Context, req *comms.SuggestItemReq) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)

	user, item, document, err := UnpackUID(req.UserId, req.ItemId, req.DocId, database)
	if err != nil {
		return nil, err
	}
	oldBody := item.CurrentBody

	err = item.ChangeBody(req.NewBody, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendItemBodyMessage(item, document, user, req.NewBody, oldBody, database)
	if err != nil {
		return nil, err
	}
	return &comms.NullResponse{}, nil
}

func (s *BackServer) AddItem(ctx context.Context, req *comms.SuggestAddItemReq) (*comms.ItemEntity, error) {
	database := s.dbClient.Database(s.dbName)
	user, _, document, err := UnpackUID(req.UserId, "IGNORE", req.DocId, database)
	if err != nil {
		return nil, err
	}

	item, err := db.ItemInsert(req.Item, document.Id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, err
	}

	err = document.AddItem(item, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendItemCreateMessage(item, document, user, database)
	// log.Println("Finished attempting to send message")
	if err != nil {
		return nil, err
	}

	itemProtos := make([]*comms.ItemEntity, len(document.Items))
	for i, item := range document.Items {
		itemProtos[i] = item.Proto()
	}

	return item.Proto(), nil
}

func (s *BackServer) DeleteItem(ctx context.Context, req *comms.SuggestDelItemReq) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, item, document, err := UnpackUID(req.UserId, req.Item.Id, req.DocId, database)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendItemDeleteMessage(item, document, user, database)
	if err != nil {
		return nil, err
	}

	document.RemoveItem(item, user, database)
	if err != nil {
		return nil, err
	}
	// log.Println("Price Message Broadcast")
	return &comms.NullResponse{}, nil
}
