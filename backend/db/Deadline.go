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

type Deadline struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"`
	ContractId primitive.ObjectID `bson:"contract_id"`
	Name       string             `bson:"name"`

	CurrentPayout          float32            `bson:"current_payout"`
	WorkerPayout           float32            `bson:"worker_payout"`
	BuyerPayout            float32            `bson:"buyer_payout"`
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
	proto.ItemsAwaitingApproval = d.ItemsAwaitingApproval

	return proto
}

func DeadlineInsert(proto *comms.DeadlineEntity, user_id, contract_id primitive.ObjectID, contract_items []*ContractItem, database *mongo.Database) (*Deadline, error) {
	deadline := &Deadline{
		ContractId: contract_id,
		Name:       proto.Name,

		DateProposerId:   user_id,
		PayoutProposerId: user_id,

		DraftRequired: proto.DraftRequired,

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

func DeadlineSuggestPayout(deadline *Deadline, user *User, userRole uint32, newPayout float32, database *mongo.Database) error {
	if deadline.PayoutAwaitingApproval == true {
		return errors.New(fmt.Sprintf("The deadline %s is already awaiting approval of a different payout change", deadline.Id.Hex()))
	}

	deadline.PayoutProposerId = user.Id
	deadline.PayoutAwaitingApproval = true
	if userRole == WORKER {
		deadline.WorkerPayout = newPayout
	} else if userRole == BUYER {
		deadline.BuyerPayout = newPayout
	}

	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}

func DeadlineSuggestDate(deadline *Deadline, user *User, userRole uint32, newDate time.Time, database *mongo.Database) error {
	if deadline.PayoutAwaitingApproval == true {
		return errors.New(fmt.Sprintf("The deadline %s is already awaiting approval of a different payout change", deadline.Id.Hex()))
	}

	deadline.DateProposerId = user.Id
	deadline.DateAwaitingApproval = true
	if userRole == WORKER {
		deadline.WorkerDate = newDate
	} else if userRole == BUYER {
		deadline.BuyerDate = newDate
	}

	err := DeadlineReplace(deadline, database)
	if err != nil {
		return err
	}
	return nil
}
