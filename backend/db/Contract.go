package database

import (
	"context"
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

type Contract struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	Worker   *UserNub           `bson:"worker"`
	Buyer    *UserNub           `bson:"buyer"`
	Price    *PriceNub          `bson:"price"`
	Deadline *DeadlineNub       `bson:"deadline"`
	Title    string             `bson: title`
	Summary  string             `bson:"summary"`

	// ChatRoom string     `bson:"chat_room_id"`
	Items   []*ContractItem      `bson:"-"`
	ItemIds []primitive.ObjectID `bson:"item_ids"`
	// Drafts   []DraftNub `bson:"drafts"`
	Stage uint32 `bson:"stage"`
}

func (contract *Contract) Proto() *comms.ContractEntity {
	if contract == nil {
		return &comms.ContractEntity{}
	}

	items := make([]*comms.ItemEntity, len(contract.Items))

	for idx, item := range contract.Items {
		items[idx] = item.Proto()
	}
	proto := &comms.ContractEntity{
		Worker:   contract.Worker.Proto(),
		Buyer:    contract.Buyer.Proto(),
		Price:    contract.Price.Proto(),
		Deadline: contract.Deadline.Proto(),
		Summary:  contract.Summary,
		Title:    contract.Title,
		Items:    items,
		Stage:    contract.Stage,
	}
	if !contract.Id.IsZero() {
		proto.Id = contract.Id.Hex()
	}
	return proto
}

type UserNub struct {
	Id       primitive.ObjectID `bson:"id"`
	Username string             `bson:"username"`
	Author   bool               `bson:"is_author"`
	Type     uint32             `bson:"user_type`
}

func (un *UserNub) Proto() *comms.UserNubEntity {
	proto := &comms.UserNubEntity{}
	if un == nil {
		return proto
	}
	if un.Username != "" {
		proto.Username = un.Username
		proto.Type = un.Type
		if !un.Id.IsZero() {
			proto.Id = un.Id.Hex()
		}
	}
	return proto
}

const (
	INVITE    = uint32(0)
	NEGOTIATE = uint32(10)
	SIGNED    = uint32(20)
	ACTIVE    = uint32(30)
	SETTLING  = uint32(40)
	COMPLETE  = uint32(50)
)

type PriceNub struct {
	Current          float32 `bson:"current"`
	Worker           float32 `bson:"worker"`
	Buyer            float32 `bson:"buyer"`
	AwaitingApproval bool    `bson:"awaiting_approval"`
	Proposer         string  `bson:"proposer_id"`
}

func (pn *PriceNub) Proto() *comms.PriceEntity {
	proto := &comms.PriceEntity{}
	if pn == nil {
		return proto
	}
	proto.Current = pn.Current
	proto.Worker = pn.Worker
	proto.Buyer = pn.Buyer

	return proto
}

type DeadlineNub struct {
	Current          time.Time `bson:"current"`
	Worker           time.Time `bson:"worker_id"`
	Buyer            time.Time `bson:"buyer_id"`
	AwaitingApproval bool      `bson:"awaiting_approval"`
	Proposer         string    `bson:"proposer_id"`
}

func (dn *DeadlineNub) Proto() *comms.DeadlineEntity {
	proto := &comms.DeadlineEntity{}
	if dn == nil {
		return proto
	}
	proto.Current = timestamppb.New(dn.Current)
	proto.Buyer = timestamppb.New(dn.Worker)
	proto.Worker = timestamppb.New(dn.Buyer)
	return proto
}

func ContractInsert(req *comms.ContractCreateRequest, userNub *UserNub, database *mongo.Database) (*Contract, error) {
	var price *PriceNub
	var deadline *DeadlineNub
	if userNub.Type == WORKER {
		price = &PriceNub{
			Current:          req.Price.Worker,
			Worker:           req.Price.Worker,
			Buyer:            req.Price.Worker,
			AwaitingApproval: false,
			Proposer:         req.UserId,
		}
		deadline = &DeadlineNub{
			Current:          req.Deadline.Worker.AsTime(),
			Worker:           req.Deadline.Worker.AsTime(),
			Buyer:            req.Deadline.Worker.AsTime(),
			AwaitingApproval: false,
			Proposer:         req.UserId,
		}
	} else {
		price = &PriceNub{
			Current:          req.Price.Buyer,
			Worker:           req.Price.Buyer,
			Buyer:            req.Price.Buyer,
			AwaitingApproval: false,
			Proposer:         req.UserId,
		}
		deadline = &DeadlineNub{
			Current:          req.Deadline.Buyer.AsTime(),
			Worker:           req.Deadline.Buyer.AsTime(),
			Buyer:            req.Deadline.Buyer.AsTime(),
			AwaitingApproval: false,
			Proposer:         req.UserId,
		}
	}
	stage := INVITE

	contract := &Contract{
		Price:    price,
		Deadline: deadline,
		Title:    req.Title,
		Summary:  req.Summary,
		Stage:    stage,
	}
	if userNub.Type == WORKER {
		contract.Worker = userNub
	} else {
		contract.Buyer = userNub
	}

	contractCollection := database.Collection(CON_COL)
	res, err := contractCollection.InsertOne(context.TODO(), contract)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Contract for %s", userNub.Username)))
		return nil, err
	}

	id := res.InsertedID.(primitive.ObjectID)
	contract.Id = id

	if len(req.Items) > 0 {
		itemsCollection := database.Collection(ITEM_COL)
		contractItems := make([]*ContractItem, len(req.Items))
		item_ids := make([]primitive.ObjectID, len(req.Items))
		for idx, item := range req.Items {

			res, err := ItemInsert(item, contract.Id, itemsCollection)
			if err != nil {
				return nil, err
			}
			contractItems[idx] = res
			item_ids[idx] = res.Id
		}

		filter := bson.D{{"_id", contract.Id}}
		update := bson.D{{"$set", bson.D{{"item_ids", item_ids}}}}
		_, err := contractCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to update contract with item ids %s", userNub.Username)))
			return nil, err
		}
	}
	return contract, nil
}
