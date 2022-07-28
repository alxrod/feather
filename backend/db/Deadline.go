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
	Id               primitive.ObjectID `bson:"_id,omitempty"`
	ContractId       primitive.ObjectID `bson:"contract_id"`
	AwaitingApproval bool               `bson:"awaiting_approval"`
	ProposerId       primitive.ObjectID `bson:"proposer_id"`

	CurrentDetail string    `bson:"current_detail"`
	CurrentPayout float32   `bson:"current_payout"`
	CurrentDate   time.Time `bson:"current_date"`

	WorkerDetail string    `bson:"worker_detail"`
	WorkerPayout float32   `bson:"worker_payout"`
	WorkerDate   time.Time `bson:"worker_date"`

	BuyerDetail string    `bson:"buyer_detail"`
	BuyerPayout float32   `bson:"buyer_payout"`
	BuyerDate   time.Time `bson:"buyer_date"`
}

func (d *Deadline) Proto() *comms.DeadlineEntity {
	proto := &comms.DeadlineEntity{}
	if d == nil {
		return proto
	}
	proto.Id = d.Id.Hex()
	proto.ContractId = d.ContractId.Hex()
	proto.AwaitingApproval = d.AwaitingApproval
	proto.ProposerId = d.ProposerId.Hex()

	proto.CurrentDetail = d.CurrentDetail
	proto.WorkerDetail = d.WorkerDetail
	proto.BuyerDetail = d.BuyerDetail

	proto.CurrentPayout = d.CurrentPayout
	proto.WorkerPayout = d.WorkerPayout
	proto.BuyerPayout = d.BuyerPayout

	proto.CurrentDate = timestamppb.New(d.CurrentDate)
	proto.WorkerDate = timestamppb.New(d.WorkerDate)
	proto.BuyerDate = timestamppb.New(d.BuyerDate)

	return proto
}

func DeadlineInsert(proto *comms.DeadlineEntity, user_id, contract_id primitive.ObjectID, database *mongo.Database) (*Deadline, error) {
	deadline := &Deadline{
		ContractId:       contract_id,
		AwaitingApproval: proto.AwaitingApproval,
		ProposerId:       user_id,

		CurrentDetail: proto.CurrentDetail,
		WorkerDetail:  proto.WorkerDetail,
		BuyerDetail:   proto.BuyerDetail,

		CurrentPayout: proto.CurrentPayout,
		WorkerPayout:  proto.WorkerPayout,
		BuyerPayout:   proto.BuyerPayout,

		CurrentDate: proto.CurrentDate.AsTime(),
		WorkerDate:  proto.WorkerDate.AsTime(),
		BuyerDate:   proto.BuyerDate.AsTime(),
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
	return deadline, nil
}
