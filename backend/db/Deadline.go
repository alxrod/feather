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
	Id    primitive.ObjectID `bson:"_id,omitempty"`
	DocId primitive.ObjectID `bson:"doc_id"`
	Name  string             `bson:"name"`

	Complete bool `bson:"complete"`
	Expired  bool `bson:"expired"`

	CurrentDate time.Time            `bson:"current_date"`
	Items       []*Item              `bson:"-"`
	ItemIds     []primitive.ObjectID `bson:"item_ids"`
}

func (d *Deadline) Proto() *comms.DeadlineEntity {
	proto := &comms.DeadlineEntity{}
	if d == nil {
		return proto
	}
	proto.Id = d.Id.Hex()
	proto.DocId = d.DocId.Hex()
	proto.Name = d.Name

	proto.Complete = d.Complete
	proto.Expired = d.Expired

	proto.CurrentDate = timestamppb.New(d.CurrentDate)

	item_nubs := make([]*comms.ItemNub, len(d.ItemIds))
	for idx, item := range d.Items {
		item_nubs[idx] = item.NubProto()
	}
	proto.Items = item_nubs

	return proto
}

func (d *Deadline) Nub() *comms.DeadlineNub {
	if d == nil {
		return &comms.DeadlineNub{}
	}
	return &comms.DeadlineNub{
		Id:    d.Id.Hex(),
		DocId: d.DocId.Hex(),

		Complete: d.Complete,
		Expired:  d.Expired,

		CurrentDate: timestamppb.New(d.CurrentDate),
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
		DocId: deadline.DocId,
		Name:  req.Name,
		Id:    deadline.Id,

		Complete:    false,
		CurrentDate: req.CurrentDate.AsTime(),
	}

	new_deadline.ItemIds = make([]primitive.ObjectID, len(req.Items))
	new_deadline.Items = make([]*Item, len(req.Items))

	filter = bson.D{{"_id", deadline.Id}}
	_, err = database.Collection(DEADLINE_COL).ReplaceOne(context.TODO(), filter, new_deadline)
	if err != nil {
		return nil, err
	}
	return new_deadline, nil
}

func DeadlineInsert(proto *comms.DeadlineEntity, user_id, doc_id primitive.ObjectID, contract_items []*Item, database *mongo.Database) (*Deadline, error) {
	deadline := &Deadline{
		DocId:    doc_id,
		Name:     proto.Name,
		Complete: false,

		CurrentDate: proto.CurrentDate.AsTime(),
	}
	draft_dates := make(map[primitive.ObjectID]time.Time)
	draft_dates[user_id] = deadline.CurrentDate

	deadline.ItemIds = make([]primitive.ObjectID, len(proto.Items))
	deadline.Items = make([]*Item, len(proto.Items))

	res, err := database.Collection(DEADLINE_COL).InsertOne(context.TODO(), deadline)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Deadline for target %s for user %s", doc_id.Hex(), user_id.Hex())))
		return nil, err
	} else {
		id := res.InsertedID
		switch val := id.(type) {
		case primitive.ObjectID:
			deadline.Id = val
		default:
			log.Println(color.Ize(color.Red, fmt.Sprintf("Generated item for contract %s did not have a valid generated id", doc_id.Hex())))
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
	deadline.Items = make([]*Item, len(deadline.ItemIds))
	for idx, id := range deadline.ItemIds {
		item, err := ItemById(id, database.Collection(ITEM_COL))
		if err != nil {
			return nil, err
		}
		deadline.Items[idx] = item
	}
	return deadline, nil
}

func (deadline *Deadline) Replace(database *mongo.Database) error {
	filter := bson.D{{"_id", deadline.Id}}
	_, err := database.Collection(DEADLINE_COL).ReplaceOne(context.TODO(), filter, deadline)
	if err != nil {
		return err
	}
	return nil
}

func (deadline *Deadline) ChangeDate(newDate time.Time, database *mongo.Database) error {

	deadline.CurrentDate = newDate
	err := deadline.Replace(database)
	if err != nil {
		return err
	}
	return nil
}

func (deadline *Deadline) ChangeItems(newIds []primitive.ObjectID, document *Document, database *mongo.Database) error {

	newItems := make([]*Item, 0)
	newItemIds := make([]primitive.ObjectID, 0)

	for _, new_id := range newIds {
		for _, item := range document.Items {
			if item.Id == new_id {
				newItems = append(newItems, item)
				newItemIds = append(newItemIds, item.Id)
				break
			}
		}
	}

	deadline.Items = newItems
	deadline.ItemIds = newItemIds

	err := deadline.Replace(database)
	if err != nil {
		return err
	}
	return nil
}

func (deadline *Deadline) RemoveItem(remove_item *Item, database *mongo.Database) error {
	newItems := make([]*Item, 0)
	newItemIds := make([]primitive.ObjectID, 0)

	for _, item := range deadline.Items {
		if remove_item.Id != item.Id {
			newItems = append(newItems, item)
			newItemIds = append(newItemIds, item.Id)
		}
	}

	deadline.Items = newItems
	deadline.ItemIds = newItemIds

	err := deadline.Replace(database)
	if err != nil {
		return err
	}
	return nil
}
