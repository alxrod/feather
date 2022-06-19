package database

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	ITEM_REJECT  = 0
	ITEM_APPROVE = 1
	ITEM_PENDING = 2
)

type ContractItem struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"`
	ContractId primitive.ObjectID `bson:"contract_id"`
	Name       string             `bson:"name"`
	Body       []*ItemChunk       `bson:"body"`
}

func (ci *ContractItem) Proto() *comms.ItemEntity {
	if ci == nil {
		return &comms.ItemEntity{}
	}
	chunks := make([]*comms.ItemChunk, len(ci.Body))
	for idx, chunk := range ci.Body {
		chunks[idx] = chunk.Proto()
	}
	proto := &comms.ItemEntity{
		Name: ci.Name,
		Body: chunks,
	}
	if !ci.Id.IsZero() {
		proto.Id = ci.Id.Hex()
	}
	if !ci.ContractId.IsZero() {
		proto.ContractId = ci.ContractId.Hex()
	}
	return proto
}

const (
	CHUNK_UNEDITED = 0
	CHUNK_ADDED    = 1
	CHUNK_REMOVED  = 2
)

type ItemChunk struct {
	Type          uint32             `bson:"type"`
	Author        primitive.ObjectID `bson:"author_id"`
	WorkerApprove bool               `bson:"worker_approve"`
	BuyerApprove  bool               `bson:"buyer_approve"`
	Text          string             `bson:"text"`
}

func (ic *ItemChunk) Proto() *comms.ItemChunk {
	proto := &comms.ItemChunk{}

	if ic == nil {
		return proto
	}
	proto.Type = ic.Type

	proto.WorkerApprove = ic.WorkerApprove
	proto.BuyerApprove = ic.BuyerApprove
	proto.Text = ic.Text

	if !ic.Author.IsZero() {
		proto.AuthorId = ic.Author.Hex()
	}
	return proto
}

func ItemInsert(item *comms.ItemEntity, contract_id primitive.ObjectID, collection *mongo.Collection) (*ContractItem, error) {
	body := make([]*ItemChunk, len(item.Body))
	for i, chunk := range item.Body {
		authorId, err := primitive.ObjectIDFromHex(chunk.AuthorId)
		if err != nil {
			return nil, errors.New("Invalid author id for item creation")
		}
		body[i] = &ItemChunk{
			Type:          chunk.Type,
			WorkerApprove: true,
			BuyerApprove:  true,
			Author:        authorId,
			Text:          chunk.Text,
		}
	}
	contract_item := &ContractItem{
		Name:       item.Name,
		ContractId: contract_id,
		Body:       body,
	}

	res, err := collection.InsertOne(context.TODO(), contract_item)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Item for contract %s for user %s", item.Body[0].AuthorId, contract_id.Hex())))
		return nil, err
	} else {
		id := res.InsertedID
		switch val := id.(type) {
		case primitive.ObjectID:
			contract_item.Id = val
		default:
			log.Println(color.Ize(color.Red, fmt.Sprintf("Generated item for contract %s did not have a valid generated id", contract_id.Hex())))
		}
		return contract_item, nil
	}
}
