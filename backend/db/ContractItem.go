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

type ContractItem struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"`
	ContractId primitive.ObjectID `bson:"contract_id"`
	Name       string             `bson:"name"`

	CurrentBody      string `bson:"current_body"`
	WorkerBody       string `bson:"worker_body"`
	BuyerBody        string `bson:"buyer_body"`
	AwaitingApproval bool   `bson:"awaiting_approval"`

	Proposer         primitive.ObjectID `bson:"proposer_id"`
	AwaitingCreation bool               `bson:"awaiting_creation"`
	AwaitingDeletion bool               `bson:"awaiting_deletion"`

	BuyerSettled  uint32 `bson:"buyer_settled"`

	FigmaComponentId string `bson:"figma_component_id"`
}

func (ci *ContractItem) Proto() *comms.ItemEntity {
	if ci == nil {
		return &comms.ItemEntity{}
	}
	proto := &comms.ItemEntity{
		Name: ci.Name,

		AwaitingApproval: ci.AwaitingApproval,
		AwaitingCreation: ci.AwaitingCreation,
		AwaitingDeletion: ci.AwaitingDeletion,

		BuyerSettled:     ci.BuyerSettled,

		CurrentBody:  ci.CurrentBody,
		WorkerBody:   ci.WorkerBody,
		BuyerBody:    ci.BuyerBody,
		FigmaComponentId: ci.FigmaComponentId,
	}
	if !ci.Id.IsZero() {
		proto.Id = ci.Id.Hex()
	}
	if !ci.ContractId.IsZero() {
		proto.ContractId = ci.ContractId.Hex()
	}
	return proto
}

func (ci *ContractItem) NubProto() *comms.ItemNub {
	proto := &comms.ItemNub{}
	if ci == nil {
		return proto
	}
	proto.Id = ci.Id.Hex()
	proto.Name = ci.Name
	return proto
}

func (item *ContractItem) String() string {
	if item == nil {
		fmt.Sprintf("<no item>")
	}
	return fmt.Sprintf("<Item name: %s, id: %s>", item.Name, item.Id.Hex())
}

func (item *ContractItem) Replace(database *mongo.Database) error {
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).ReplaceOne(context.TODO(), filter, item)
	if err != nil {
		return err
	}
	return nil
}

func (item *ContractItem) ReplaceFromReq(req *comms.ItemEntity, database *mongo.Database) (*ContractItem, error) {
	new_item := &ContractItem{
		Id:         item.Id,
		Name:       req.Name,
		ContractId: item.ContractId,

		AwaitingApproval: req.AwaitingApproval,
		AwaitingCreation: req.AwaitingCreation,
		AwaitingDeletion: req.AwaitingDeletion,
		CurrentBody:      req.CurrentBody,
		WorkerBody:       req.WorkerBody,
		BuyerBody:        req.BuyerBody,
	}
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).ReplaceOne(context.TODO(), filter, new_item)
	if err != nil {
		return nil, err
	}
	return new_item, nil
}

func (item *ContractItem) Delete(database *mongo.Database) error {
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}
	return nil
}

func ItemInsert(item *comms.ItemEntity, contract_id primitive.ObjectID, collection *mongo.Collection) (*ContractItem, error) {
	contract_item := &ContractItem{
		Name:       item.Name,
		ContractId: contract_id,

		AwaitingApproval: item.AwaitingApproval,
		AwaitingCreation: item.AwaitingCreation,
		AwaitingDeletion: item.AwaitingDeletion,
		CurrentBody:      item.CurrentBody,
		WorkerBody:       item.WorkerBody,
		BuyerBody:        item.BuyerBody,
	}

	res, err := collection.InsertOne(context.TODO(), contract_item)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Item for contract %s", contract_id.Hex())))
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

func ContractItemById(item_id primitive.ObjectID, collection *mongo.Collection) (*ContractItem, error) {
	filter := bson.D{{"_id", item_id}}
	var contractItem *ContractItem
	var err error
	if err = collection.FindOne(context.TODO(), filter).Decode(&contractItem); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("Contract Item Not Found")
	}
	return contractItem, nil
}

func ContractItemReplace(item *ContractItem, database *mongo.Database) error {
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).ReplaceOne(context.TODO(), filter, item)
	if err != nil {
		return err
	}
	return nil
}

func ContractItemDelete(item *ContractItem, database *mongo.Database) error {
	filter := bson.D{{"_id", item.Id}}
	_, err := database.Collection(ITEM_COL).DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}
	return nil
}

func ContractItemSuggestBody(item *ContractItem, contract *Contract, user *User, newBody string, database *mongo.Database) error {
	if item.AwaitingApproval == true {
		return errors.New(fmt.Sprintf("The contract item %s is already awaiting approval of a different body change", item.Id.Hex()))
	}

	if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer == nil {
			item.BuyerBody = newBody
			item.WorkerBody = newBody
			item.CurrentBody = newBody
		} else {
			item.WorkerBody = newBody
			item.AwaitingApproval = true
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker == nil {
			item.BuyerBody = newBody
			item.WorkerBody = newBody
			item.CurrentBody = newBody
		} else {
			item.BuyerBody = newBody
			item.AwaitingApproval = true
		}
	} else if user.AdminStatus {
		item.BuyerBody = newBody
		item.WorkerBody = newBody
		item.CurrentBody = newBody
	} else {
		return errors.New("Invalid proposing user")
	}

	item.Proposer = user.Id

	err := ContractItemReplace(item, database)
	if err != nil {
		return err
	}
	return nil
}

func ContractItemChangeSettle(
	item *ContractItem,
	deadline *Deadline,
	user *User,
	contract *Contract,
	newState uint32,
	database *mongo.Database,
) error {
	itemInDeadline := false
	for _, id := range deadline.ItemIds {
		if id == item.Id {
			itemInDeadline = true
		}
	}
	if !itemInDeadline {
		return errors.New("contract item not required for current deadline")
	}

	item.BuyerSettled = newState
	
	if newState == ITEM_REJECT {
		contract.Disputed = true
	} 
	
	err := ContractItemReplace(item, database)
	if err != nil {
		return err
	}

	err = ContractSaveDisputed(contract, database)
	if err != nil {
		return err
	}
	return err
}
