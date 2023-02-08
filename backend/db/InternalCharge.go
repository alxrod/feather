package database

import (
	"context"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const (
	CHARGE_STATE_CREATED_INTERNAL         = 0
	CHARGE_STATE_INTENT_PROCESSING        = 1
	CHARGE_STATE_INTENT_CREATED           = 2
	CHARGE_STATE_CHARGE_PENDING           = 3
	CHARGE_STATE_BALANCE_AVAILABLE        = 4
	CHARGE_STATE_PAYMENT_CREATED          = 5
	CHARGE_STATE_TRANSFER_CREATED         = 6
	CHARGE_STATE_CHARGE_UPDATED           = 7
	CHARGE_STATE_PAYMENT_INTENT_SUCCEEDED = 8
	CHARGE_STATE_CHARGE_SUCCEEDED         = 9
)

type InternalCharge struct {
	Id            primitive.ObjectID `bson:"_id,omitempty"`
	ContractTitle string             `bson:"contract_title"`
	ContractId    primitive.ObjectID `bson:"contract_id"`

	Worker *UserNub `bson:"worker"`
	Buyer  *UserNub `bson:"buyer"`

	PaymentIntentId string `bson:"payment_intent_id"`
	ChargeId        string `bson:"charge_id"`
	TransferId      string `bson:"transfer_id"`
	PaymentId       string `bson:"payment_id"`
	PayoutId        string `bson:"payout_id"`

	State  uint32 `bson:"state"`
	Amount int64  `bson:"amount"`
}

func (charge *InternalCharge) Proto() *comms.InternalChargeEntity {
	if charge == nil {
		return &comms.InternalChargeEntity{}
	}
	return &comms.InternalChargeEntity{
		Id:            charge.Id.Hex(),
		ContractTitle: charge.ContractTitle,
		ContractId:    charge.ContractId.Hex(),

		Worker: charge.Worker.Proto(),
		Buyer:  charge.Buyer.Proto(),

		State:  charge.GenerateStateMessage(),
		Amount: charge.Amount,
	}
}

func InitializeInternalCharge(
	contract *Contract,
	worker *UserNub,
	buyer *UserNub,
	payment_intent_id string,
	database *mongo.Database) (*InternalCharge, error) {

	charge := &InternalCharge{
		ContractId:    contract.Id,
		ContractTitle: contract.Title,

		PaymentIntentId: payment_intent_id,

		Worker: worker,
		Buyer:  buyer,

		State: CHARGE_STATE_CREATED_INTERNAL,
	}
	res, err := database.Collection(CHARGE_COL).InsertOne(context.TODO(), charge)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Charge for intent %s", payment_intent_id)))
		return nil, err
	} else {
		id := res.InsertedID
		switch val := id.(type) {
		case primitive.ObjectID:
			charge.Id = val
		default:
			log.Println(color.Ize(color.Red, fmt.Sprintf("Generated Internal Chrage %s did not have a valid generated id", payment_intent_id)))
		}
		return charge, nil
	}
}

func GetInternalChargesByUser(user_id primitive.ObjectID, database *mongo.Database) ([]*InternalCharge, error) {
	charges := make([]*InternalCharge, 0)

	worker_filter := bson.D{{"worker.id", user_id}}
	cur, err := database.Collection(CHARGE_COL).Find(context.TODO(), worker_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.Background()) {
		var charge *InternalCharge
		err := cur.Decode(&charge)
		if err != nil {
			return nil, err
		}

		charges = append(charges, charge)
	}
	cur.Close(context.Background())

	buyer_filter := bson.D{{"buyer.id", user_id}}
	cur, err = database.Collection(CHARGE_COL).Find(context.TODO(), buyer_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.TODO()) {
		var charge *InternalCharge
		err := cur.Decode(&charge)
		if err != nil {
			return nil, err
		}
		charges = append(charges, charge)
	}
	cur.Close(context.TODO())

	return charges, nil
}

func (charge *InternalCharge) GenerateStateMessage() string {
	if charge.State == CHARGE_STATE_CREATED_INTERNAL {
		return "The payment has been submitted to stripe"
	} else if charge.State == CHARGE_STATE_INTENT_PROCESSING {
		return "Stripe is begining to process the payment"
	} else if charge.State == CHARGE_STATE_INTENT_CREATED {
		return "Stripe has started the payment process"
	} else if charge.State == CHARGE_STATE_BALANCE_AVAILABLE {
		return fmt.Sprintf("We have received the payment from %s", charge.Buyer.Username)
	} else if charge.State == CHARGE_STATE_PAYMENT_CREATED {
		return fmt.Sprintf("We have received the payment, Stripe is begining to send it to %s now", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_TRANSFER_CREATED {
		return fmt.Sprintf("The payment has been transfered to %s", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_CHARGE_UPDATED {
		return fmt.Sprintf("The payment has been transfered to %s", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_PAYMENT_INTENT_SUCCEEDED {
		return fmt.Sprintf("The payment has successfully been transfered to %s's account", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_CHARGE_SUCCEEDED {
		return fmt.Sprintf("The payment has been transfered, payout to %s's bank account will happen in the next 24 hours", charge.Worker.Username)
	} else {
		return "invalid state"
	}
}
