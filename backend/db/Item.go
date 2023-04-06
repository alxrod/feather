package database

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	ITEM_REJECT  = 2
	ITEM_APPROVE = 1
	ITEM_PENDING = 0
)

type Item struct {
	Id    primitive.ObjectID `bson:"_id,omitempty"`
	DocId primitive.ObjectID `bson:"doc_id"`
	Name  string             `bson:"name"`

	CurrentBody      string `bson:"current_body"`
	FigmaComponentId string `bson:"figma_component_id"`
}

func (ci *Item) Proto() *comms.ItemEntity {
	if ci == nil {
		return &comms.ItemEntity{}
	}
	proto := &comms.ItemEntity{
		Name: ci.Name,

		CurrentBody:      ci.CurrentBody,
		FigmaComponentId: ci.FigmaComponentId,
	}

	if !ci.Id.IsZero() {
		proto.Id = ci.Id.Hex()
	}
	if !ci.DocId.IsZero() {
		proto.DocId = ci.DocId.Hex()
	}
	return proto
}

func (ci *Item) NubProto() *comms.ItemNub {
	proto := &comms.ItemNub{}
	if ci == nil {
		return proto
	}
	proto.Id = ci.Id.Hex()
	proto.Name = ci.Name
	return proto
}

func (item *Item) String() string {
	if item == nil {
		fmt.Sprintf("<no item>")
	}
	return fmt.Sprintf("<Item name: %s, id: %s>", item.Name, item.Id.Hex())
}

func (item *Item) Replace(database *mongo.Database) error {
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).ReplaceOne(context.TODO(), filter, item)
	if err != nil {
		return err
	}
	return nil
}

func (item *Item) ReplaceFromReq(req *comms.ItemEntity, database *mongo.Database) (*Item, error) {
	new_item := &Item{
		Id:    item.Id,
		Name:  req.Name,
		DocId: item.DocId,

		CurrentBody: req.CurrentBody,
	}

	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).ReplaceOne(context.TODO(), filter, new_item)
	if err != nil {
		return nil, err
	}
	return new_item, nil
}

func (item *Item) Delete(database *mongo.Database) error {
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}
	return nil
}

func ItemInsert(item *comms.ItemEntity, doc_id primitive.ObjectID, collection *mongo.Collection) (*Item, error) {
	contract_item := &Item{
		Name:  item.Name,
		DocId: doc_id,

		CurrentBody: item.CurrentBody,
	}

	res, err := collection.InsertOne(context.TODO(), contract_item)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Item for contract %s", doc_id.Hex())))
		return nil, err
	} else {
		id := res.InsertedID
		switch val := id.(type) {
		case primitive.ObjectID:
			contract_item.Id = val
		default:
			log.Println(color.Ize(color.Red, fmt.Sprintf("Generated item for contract %s did not have a valid generated id", doc_id.Hex())))
		}
		return contract_item, nil
	}
}

func ItemById(item_id primitive.ObjectID, collection *mongo.Collection) (*Item, error) {
	filter := bson.D{{"_id", item_id}}
	var contractItem *Item
	var err error
	if err = collection.FindOne(context.TODO(), filter).Decode(&contractItem); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("Contract Item Not Found")
	}
	return contractItem, nil
}

func (item *Item) ChangeBody(newBody string, database *mongo.Database) error {
	item.CurrentBody = newBody
	err := item.Replace(database)
	if err != nil {
		return err
	}
	return nil
}
