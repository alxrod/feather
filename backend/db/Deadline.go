package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/protobuf/types/known/timestamppb"
)

const (
	ITEM_ADDED    = 1
	ITEM_RESOLVED = 2
	ITEM_REMOVED  = 3
)

type Deadline struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"`
	ContractId primitive.ObjectID `bson:"contract_id"`
	Name       string             `bson:"name"`

	WorkerSettled   bool `bson:"worker_settled"`
	BuyerSettled    bool `bson:"buyer_settled"`
	WorkerConfirmed bool `bson:"worker_confirmed"`
	BuyerConfirmed  bool `bson:"buyer_confirmed"`

	AdminSettled bool `bson:"admin_settled"`

	Complete bool `bson:"complete"`
	Expired  bool `bson:"expired"`

	DeadlineProposerId primitive.ObjectID `bson:"deadline_proposer_id`
	AwaitingCreation   bool               `bson:"awaiting_creation"`
	AwaitingDeletion   bool               `bson:"awaiting_deletion"`

	CurrentPayout          int64              `bson:"current_payout"`
	WorkerPayout           int64              `bson:"worker_payout"`
	BuyerPayout            int64              `bson:"buyer_payout"`
	PayoutProposerId       primitive.ObjectID `bson:"payout_proposer_id"`
	PayoutAwaitingApproval bool               `bson:"payout_awaiting_approval"`
	DraftRequired          bool               `bson:"draft_required"`
	DraftPath              string             `bson:"draft_path"`

	CurrentDate          time.Time          `bson:"current_date"`
	WorkerDate           time.Time          `bson:"worker_date"`
	BuyerDate            time.Time          `bson:"buyer_date"`
	DateProposerId       primitive.ObjectID `bson:"date_proposer_id"`
	DateAwaitingApproval bool               `bson:"date_awaiting_approval"`

	Items                 []*ContractItem      `bson:"-"`
	ItemIds               []primitive.ObjectID `bson:"item_ids"`
	ItemsProposerId       primitive.ObjectID   `bson:"item_proposer_id"`
	ItemStates            []uint32             `bson:"item_states"`
	ItemsAwaitingApproval bool                 `bson:"items_awaiting_approval"`
}

func (d *Deadline) Proto() *comms.DeadlineEntity {
	proto := &comms.DeadlineEntity{}
	if d == nil {
		return proto
	}
	proto.Id = d.Id.Hex()
	proto.ContractId = d.ContractId.Hex()
	proto.Name = d.Name

	if !d.PayoutProposerId.IsZero() {
		proto.PayoutProposerId = d.PayoutProposerId.Hex()
	}
	if !d.DateProposerId.IsZero() {
		proto.DateProposerId = d.DateProposerId.Hex()
	}
	if !d.DeadlineProposerId.IsZero() {
		proto.DeadlineProposerId = d.DeadlineProposerId.Hex()
	}

	proto.Complete = d.Complete
	proto.Expired = d.Expired

	proto.WorkerSettled = d.WorkerSettled
	proto.BuyerSettled = d.BuyerSettled
	proto.WorkerConfirmed = d.WorkerConfirmed
	proto.BuyerConfirmed = d.BuyerConfirmed
	proto.AdminSettled = d.AdminSettled

	proto.AwaitingCreation = d.AwaitingCreation
	proto.AwaitingDeletion = d.AwaitingDeletion

	proto.CurrentPayout = d.CurrentPayout
	proto.WorkerPayout = d.WorkerPayout
	proto.BuyerPayout = d.BuyerPayout
	proto.PayoutAwaitingApproval = d.PayoutAwaitingApproval

	proto.CurrentDate = timestamppb.New(d.CurrentDate)
	proto.WorkerDate = timestamppb.New(d.WorkerDate)
	proto.BuyerDate = timestamppb.New(d.BuyerDate)
	proto.DateAwaitingApproval = d.DateAwaitingApproval

	item_nubs := make([]*comms.ItemNub, len(d.ItemIds))
	for idx, item := range d.Items {
		item_nubs[idx] = item.NubProto()
	}
	proto.Items = item_nubs
	proto.ItemsProposerId = d.ItemsProposerId.Hex()
	proto.ItemStates = d.ItemStates
	proto.ItemsAwaitingApproval = d.ItemsAwaitingApproval

	return proto
}

func (d *Deadline) Nub() *comms.DeadlineNub {
	if d == nil {
		return &comms.DeadlineNub{}
	}
	return &comms.DeadlineNub{
		Id:         d.Id.Hex(),
		ContractId: d.ContractId.Hex(),

		Complete: d.Complete,
		Expired:  d.Expired,

		CurrentPayout: d.CurrentPayout,
		CurrentDate:   timestamppb.New(d.CurrentDate),
	}
}

func (deadline *Deadline) String() string {
	if deadline == nil {
		fmt.Sprintf("<no item>")
	}
	return fmt.Sprintf("<Deadline id: %s>", deadline.Id.Hex())
}

func (deadline *Deadline) Delete(database *mongo.Database) error {
	filter := bson.D{{"_id", deadline.Id}}
	_, err := database.Collection(DEADLINE_COL).DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}
	return nil
}

func (deadline *Deadline) ReplaceFromReq(req *comms.DeadlineEntity, database *mongo.Database) (*Deadline, error) {
	filter := bson.D{{"_id", deadline.Id}}
	_, err := database.Collection(DEADLINE_COL).ReplaceOne(context.TODO(), filter, deadline)
	if err != nil {
		return nil, err
	}

	new_deadline := &Deadline{
		ContractId: deadline.ContractId,
		Name:       req.Name,
		Id:         deadline.Id,

		DateProposerId:     deadline.DateProposerId,
		PayoutProposerId:   deadline.PayoutProposerId,
		DeadlineProposerId: deadline.DeadlineProposerId,
		Complete:           false,

		DraftRequired: req.DraftRequired,

		AwaitingCreation: req.AwaitingCreation,
		AwaitingDeletion: req.AwaitingDeletion,

		CurrentPayout:          req.CurrentPayout,
		WorkerPayout:           req.WorkerPayout,
		BuyerPayout:            req.BuyerPayout,
		PayoutAwaitingApproval: false,

		CurrentDate:          req.CurrentDate.AsTime(),
		WorkerDate:           req.WorkerDate.AsTime(),
		BuyerDate:            req.BuyerDate.AsTime(),
		DateAwaitingApproval: false,

		ItemsAwaitingApproval: false,
	}

	new_deadline.ItemIds = make([]primitive.ObjectID, len(req.Items))
	new_deadline.Items = make([]*ContractItem, len(req.Items))
	new_deadline.ItemsProposerId = deadline.ItemsProposerId
	new_deadline.ItemStates = make([]uint32, len(req.Items))
	for idx, nub := range req.Items {
		item_id, err := primitive.ObjectIDFromHex(nub.Id)
		var item *ContractItem

		item, err = ContractItemById(item_id, database.Collection(ITEM_COL))
		if err != nil {
			return nil, err
		}
		new_deadline.Items[idx] = item
		new_deadline.ItemIds[idx] = item.Id
		new_deadline.ItemStates[idx] = ITEM_RESOLVED
	}
	filter = bson.D{{"_id", deadline.Id}}
	_, err = database.Collection(DEADLINE_COL).ReplaceOne(context.TODO(), filter, new_deadline)
	if err != nil {
		return nil, err
	}
	return new_deadline, nil
}

func DeadlineInsert(proto *comms.DeadlineEntity, user_id, contract_id primitive.ObjectID, contract_items []*ContractItem, database *mongo.Database) (*Deadline, error) {
	deadline := &Deadline{
		ContractId: contract_id,
		Name:       proto.Name,

		DateProposerId:     user_id,
		PayoutProposerId:   user_id,
		DeadlineProposerId: user_id,
		Complete:           false,

		DraftRequired: proto.DraftRequired,

		AwaitingCreation: proto.AwaitingCreation,
		AwaitingDeletion: proto.AwaitingDeletion,

		CurrentPayout:          proto.CurrentPayout,
		WorkerPayout:           proto.WorkerPayout,
		BuyerPayout:            proto.BuyerPayout,
		PayoutAwaitingApproval: false,

		CurrentDate:          proto.CurrentDate.AsTime(),
		WorkerDate:           proto.WorkerDate.AsTime(),
		BuyerDate:            proto.BuyerDate.AsTime(),
		DateAwaitingApproval: false,

		ItemsAwaitingApproval: false,
	}

	deadline.ItemIds = make([]primitive.ObjectID, len(proto.Items))
	deadline.Items = make([]*ContractItem, len(proto.Items))
	deadline.ItemsProposerId = user_id
	deadline.ItemStates = make([]uint32, len(proto.Items))
	for idx, nub := range proto.Items {
		item_id, err := primitive.ObjectIDFromHex(nub.Id)
		var item *ContractItem
		if err != nil {
			log.Printf("Proto Item Name: %s", nub.Name)
			found := false
			for _, it := range contract_items {
				log.Printf("Item Name: %s", it.Name)
				if it.Name == nub.Name {
					item = it
					found = true
					break
				}
			}
			if !found {
				log.Println(color.Ize(color.Red, fmt.Sprintf("Invalid item id for deadline creation")))
				return nil, err
			}

		} else {
			item, err = ContractItemById(item_id, database.Collection(ITEM_COL))
			if err != nil {
				return nil, err
			}
		}

		deadline.Items[idx] = item
		deadline.ItemIds[idx] = item.Id
		deadline.ItemStates[idx] = ITEM_RESOLVED
	}

	res, err := database.Collection(DEADLINE_COL).InsertOne(context.TODO(), deadline)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Deadline for contract %s for user %s", contract_id.Hex(), user_id.Hex())))
		return nil, err
	} else {
		id := res.InsertedID
		switch val := id.(type) {
		case primitive.ObjectID:
			deadline.Id = val
		default:
			log.Println(color.Ize(color.Red, fmt.Sprintf("Generated item for contract %s did not have a valid generated id", contract_id.Hex())))
		}
		return deadline, nil
	}
}

func DeadlineById(deadline_id primitive.ObjectID, database *mongo.Database) (*Deadline, error) {
	filter := bson.D{{"_id", deadline_id}}
	var deadline *Deadline
	var err error
	if err = database.Collection(DEADLINE_COL).FindOne(context.TODO(), filter).Decode(&deadline); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("Deadline Not Found")
	}
	deadline.Items = make([]*ContractItem, len(deadline.ItemIds))
	for idx, id := range deadline.ItemIds {
		item, err := ContractItemById(id, database.Collection(ITEM_COL))
		if err != nil {
			return nil, err
		}
		deadline.Items[idx] = item
	}
	return deadline, nil
}

func DeadlineReplace(deadline *Deadline, database *mongo.Database) error {
	filter := bson.D{{"_id", deadline.Id}}
	_, err := database.Collection(DEADLINE_COL).ReplaceOne(context.TODO(), filter, deadline)
	if err != nil {
		return err
	}
	return nil
}

func DeadlineSuggestPayout(contract *Contract, deadline *Deadline, user *User, userRole uint32, newPayout int64, database *mongo.Database) error {
	if deadline.PayoutAwaitingApproval == true {
		return errors.New(fmt.Sprintf("The deadline %s is already awaiting approval of a different payout change", deadline.Id.Hex()))
	}

	deadline.PayoutProposerId = user.Id
	if userRole == WORKER {
		deadline.WorkerPayout = newPayout
	} else if userRole == BUYER {
		deadline.BuyerPayout = newPayout
	}
	if user.AdminStatus || (deadline.AwaitingCreation && deadline.DeadlineProposerId == user.Id) {
		deadline.PayoutAwaitingApproval = false
		deadline.BuyerPayout = newPayout
		deadline.WorkerPayout = newPayout
		deadline.CurrentPayout = newPayout
	} else if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer == nil {
			deadline.BuyerPayout = newPayout
			deadline.WorkerPayout = newPayout
			deadline.CurrentPayout = newPayout
		} else {
			deadline.WorkerPayout = newPayout
			deadline.PayoutAwaitingApproval = true
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker == nil {
			deadline.BuyerPayout = newPayout
			deadline.WorkerPayout = newPayout
			deadline.CurrentPayout = newPayout
		} else {
			deadline.BuyerPayout = newPayout
			deadline.PayoutAwaitingApproval = true
		}
	} else {
		return errors.New("Invalid proposing user")
	}

	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}

func DeadlineSuggestDate(contract *Contract, deadline *Deadline, user *User, userRole uint32, newDate time.Time, database *mongo.Database) error {
	if deadline.DateAwaitingApproval == true {
		return errors.New(fmt.Sprintf("The deadline %s is already awaiting approval of a different payout change", deadline.Id.Hex()))
	}

	deadline.DateProposerId = user.Id
	if user.AdminStatus || (deadline.AwaitingCreation && deadline.DeadlineProposerId == user.Id) {
		deadline.DateAwaitingApproval = false
		deadline.BuyerDate = newDate
		deadline.WorkerDate = newDate
		deadline.CurrentDate = newDate
	} else if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer == nil {
			deadline.BuyerDate = newDate
			deadline.WorkerDate = newDate
			deadline.CurrentDate = newDate
		} else {
			deadline.WorkerDate = newDate
			deadline.DateAwaitingApproval = true
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker == nil {
			deadline.BuyerDate = newDate
			deadline.WorkerDate = newDate
			deadline.CurrentDate = newDate
		} else {
			deadline.BuyerDate = newDate
			deadline.DateAwaitingApproval = true
		}
	} else {
		return errors.New("Invalid proposing user")
	}

	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}

func DeadlineSuggestItems(deadline *Deadline, contract *Contract, user *User, newIds []primitive.ObjectID, database *mongo.Database) error {
	if deadline.ItemsAwaitingApproval {
		return fmt.Errorf("the deadline %s is already awaiting approval of a different items change", deadline.Id.Hex())
	}

	overwrite := false
	if user.AdminStatus || (deadline.AwaitingCreation && deadline.DeadlineProposerId == user.Id) {
		overwrite = true
	}
	if contract.Buyer == nil || contract.Worker == nil {
		overwrite = true
	}
	if deadline.AwaitingCreation == true && deadline.DeadlineProposerId == user.Id {
		overwrite = true
	}
	newItems := make([]*ContractItem, 0)
	newItemIds := make([]primitive.ObjectID, 0)
	newItemStates := make([]uint32, 0)

	for _, item := range deadline.Items {
		existsInNew := false
		for _, new_id := range newIds {
			if item.Id == new_id {
				newItems = append(newItems, item)
				newItemIds = append(newItemIds, item.Id)
				newItemStates = append(newItemStates, ITEM_RESOLVED)
				existsInNew = true
				break
			}
		}
		if !existsInNew {
			if !overwrite {
				newItems = append(newItems, item)
				newItemIds = append(newItemIds, item.Id)
				newItemStates = append(newItemStates, ITEM_REMOVED)
			}
		}
	}

	for _, new_id := range newIds {
		included := false
		for _, new_item := range newItems {
			if new_item.Id == new_id {
				included = true
			}
		}
		if !included {
			var appendItem *ContractItem
			found := false
			for _, existingItem := range contract.Items {
				if existingItem.Id == new_id {
					found = true
					appendItem = existingItem
					break
				}
			}
			if !found {
				return fmt.Errorf("the contract item %s added is not in this contract", new_id)
			}
			newItems = append(newItems, appendItem)
			newItemIds = append(newItemIds, appendItem.Id)
			if overwrite {
				newItemStates = append(newItemStates, ITEM_RESOLVED)
			} else {
				newItemStates = append(newItemStates, ITEM_ADDED)
			}

		}
	}

	deadline.Items = newItems
	deadline.ItemIds = newItemIds
	deadline.ItemStates = newItemStates
	deadline.ItemsProposerId = user.Id
	if overwrite {
		deadline.ItemsAwaitingApproval = false
	} else {
		deadline.ItemsAwaitingApproval = true
	}

	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}

func DeadlineReactItems(deadline *Deadline, contract *Contract, user *User, decision uint32, database *mongo.Database) error {
	if !deadline.ItemsAwaitingApproval {
		return fmt.Errorf("the deadline %s has no item changes to approve", deadline.Id.Hex())
	}

	newItems := make([]*ContractItem, 0)
	newItemIds := make([]primitive.ObjectID, 0)
	newItemStates := make([]uint32, 0)

	for idx, item := range deadline.Items {
		if deadline.ItemStates[idx] == ITEM_RESOLVED {
			newItems = append(newItems, item)
			newItemIds = append(newItemIds, item.Id)
			newItemStates = append(newItemStates, ITEM_RESOLVED)
		} else if deadline.ItemStates[idx] == ITEM_ADDED && decision == DECISION_YES {
			newItems = append(newItems, item)
			newItemIds = append(newItemIds, item.Id)
			newItemStates = append(newItemStates, ITEM_RESOLVED)
		} else if deadline.ItemStates[idx] == ITEM_REMOVED && decision == DECISION_NO {
			newItems = append(newItems, item)
			newItemIds = append(newItemIds, item.Id)
			newItemStates = append(newItemStates, ITEM_RESOLVED)
		}
	}

	deadline.Items = newItems
	deadline.ItemIds = newItemIds
	deadline.ItemStates = newItemStates
	deadline.ItemsProposerId = user.Id
	deadline.ItemsAwaitingApproval = false
	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}

func DeadlineRemoveItem(deadline *Deadline, contract *Contract, user *User, remove_item *ContractItem, database *mongo.Database) error {
	newItems := make([]*ContractItem, 0)
	newItemIds := make([]primitive.ObjectID, 0)
	newItemStates := make([]uint32, 0)

	for idx, item := range deadline.Items {
		if remove_item.Id != item.Id {
			newItems = append(newItems, item)
			newItemIds = append(newItemIds, item.Id)
			newItemStates = append(newItemStates, deadline.ItemStates[idx])
		}
	}

	deadline.Items = newItems
	deadline.ItemIds = newItemIds
	deadline.ItemStates = newItemStates

	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}
