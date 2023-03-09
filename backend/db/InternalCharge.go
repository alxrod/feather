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
	CHARGE_STATE_ON_REGISTRATION_HOLD     = 10
)

type InternalCharge struct {
	Id            primitive.ObjectID `bson:"_id,omitempty"`
	ContractTitle string             `bson:"contract_title"`
	ContractId    primitive.ObjectID `bson:"contract_id"`

	Worker   *User              `bson:"-"`
	Buyer    *User              `bson:"-"`
	WorkerId primitive.ObjectID `bson:"worker_id"`
	BuyerId  primitive.ObjectID `bson:"buyer_id"`

	PaymentIntentId string `bson:"payment_intent_id"`
	ChargeId        string `bson:"charge_id"`
	TransferId      string `bson:"transfer_id"`
	PaymentId       string `bson:"payment_id"`
	PayoutId        string `bson:"payout_id"`
	TransferGroup   string `bson:"transfer_group"`

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

		Worker: charge.Worker.Nub(false).Proto(),
		Buyer:  charge.Buyer.Nub(false).Proto(),

		PaymentIntentId: charge.PaymentIntentId,
		ChargeId:        charge.ChargeId,
		TransferId:      charge.TransferId,
		PaymentId:       charge.PaymentId,
		PayoutId:        charge.PayoutId,
		TransferGroup:   charge.TransferGroup,

		State:        charge.State,
		StateMessage: charge.GenerateStateMessage(),
		Amount:       charge.Amount,
	}
}

func ReadChargeProto(proto *comms.InternalChargeEntity, database *mongo.Database) *InternalCharge {
	if proto == nil {
		return nil
	}
	charge_id, err := primitive.ObjectIDFromHex(proto.Id)
	if err != nil {
		return nil
	}
	icharge := &InternalCharge{
		Id:            charge_id,
		ContractTitle: proto.ContractTitle,

		PaymentIntentId: proto.PaymentIntentId,
		ChargeId:        proto.ChargeId,
		TransferId:      proto.TransferId,
		PaymentId:       proto.PaymentId,
		PayoutId:        proto.PayoutId,
		TransferGroup:   proto.TransferGroup,

		State:  proto.State,
		Amount: proto.Amount,
	}

	contract_id, err := primitive.ObjectIDFromHex(proto.ContractId)
	if err != nil {
		return nil
	}
	icharge.ContractId = contract_id

	worker_id, err := primitive.ObjectIDFromHex(proto.Worker.Id)
	buyer_id, err := primitive.ObjectIDFromHex(proto.Buyer.Id)
	if err != nil {
		return nil
	}

	worker, err := UserQueryId(worker_id, database)
	buyer, err := UserQueryId(buyer_id, database)

	icharge.Worker = worker
	icharge.WorkerId = worker_id
	icharge.Buyer = buyer
	icharge.BuyerId = buyer_id

	return icharge
}

func QueryIChargeByFilter(queryFilter bson.D, database *mongo.Database, w_users ...bool) (*InternalCharge, error) {
	query_users := false
	if len(w_users) > 0 {
		query_users = w_users[0]
	}
	var icharge *InternalCharge
	if err := database.Collection(CHARGE_COL).FindOne(context.TODO(), queryFilter).Decode(&icharge); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New(fmt.Sprintf("Error couldn't find PI in internal charges: %v\n", err))
	}
	if query_users {
		worker, err := UserQueryId(icharge.WorkerId, database)
		buyer, err2 := UserQueryId(icharge.BuyerId, database)
		if err != nil || err2 != nil {
			return nil, err
		}
		icharge.Worker = worker
		icharge.Buyer = buyer
	}

	return icharge, nil
}
func (icharge *InternalCharge) ActivateRegistrationHold(database *mongo.Database) error {
	icharge.State = CHARGE_STATE_ON_REGISTRATION_HOLD
	filter := bson.D{{"_id", icharge.Id}}
	update := bson.D{{"$set", bson.D{{"state", icharge.State}}}}
	_, err := database.Collection(CHARGE_COL).UpdateOne(context.TODO(), filter, update)

	if icharge.Worker != nil {
		icharge.Worker.OutstandingBalance += icharge.Amount
		filter := bson.D{{"_id", icharge.Worker.Id}}
		update := bson.D{{"$set", bson.D{{"outstanding_balance", icharge.Worker.OutstandingBalance}}}}
		_, err := database.Collection(USERS_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return err
		}
	}
	return err
}

func (icharge *InternalCharge) UpdateState(database *mongo.Database, newState uint32) error {
	icharge.State = newState
	filter := bson.D{{"_id", icharge.Id}}
	update := bson.D{{"$set", bson.D{{"state", icharge.State}}}}
	_, err := database.Collection(CHARGE_COL).UpdateOne(context.TODO(), filter, update)
	return err
}

func InitializeInternalCharge(
	contract *Contract,
	worker *User,
	buyer *User,
	payment_intent_id string,
	charge_id string,
	transfer_id string,
	transfer_group string,
	amount int64,
	database *mongo.Database) (*InternalCharge, error) {

	charge := &InternalCharge{
		ContractId:    contract.Id,
		ContractTitle: contract.Title,

		PaymentIntentId: payment_intent_id,
		ChargeId:        charge_id,
		TransferId:      transfer_id,
		TransferGroup:   transfer_group,
		Worker:          worker,
		Buyer:           buyer,
		WorkerId:        worker.Id,
		BuyerId:         buyer.Id,
		Amount:          amount,

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

func GetInternalChargesByUser(user *User, database *mongo.Database) ([]*InternalCharge, error) {
	charges := make([]*InternalCharge, 0)

	worker_filter := bson.D{{"worker_id", user.Id}}
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
		charge.Worker = user
		buyer, err := UserQueryId(charge.BuyerId, database)
		if err == nil {
			charge.Buyer = buyer
		}
		charges = append(charges, charge)
	}
	cur.Close(context.Background())

	buyer_filter := bson.D{{"buyer_id", user.Id}}
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
		charge.Buyer = user
		worker, err := UserQueryId(charge.WorkerId, database)
		if err == nil {
			charge.Worker = worker
		}
		charges = append(charges, charge)
	}
	cur.Close(context.TODO())

	return charges, nil
}

func GetUserHoldCharges(user *User, database *mongo.Database) ([]*InternalCharge, error) {
	charges := make([]*InternalCharge, 0)
	worker_filter := bson.D{
		{"worker_id", user.Id},
		{"state", CHARGE_STATE_ON_REGISTRATION_HOLD},
	}
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
		charge.Worker = user

		charges = append(charges, charge)
	}
	cur.Close(context.Background())

	return charges, nil
}

func (charge *InternalCharge) GenerateStateMessage() string {
	if charge.Worker == nil || charge.Buyer == nil {
		log.Println("Worker ", charge.Worker, " Buyer ", charge.Buyer)
		return ""
	}
	if charge.State == CHARGE_STATE_CREATED_INTERNAL {
		return "The payment has been submitted to stripe"
	} else if charge.State == CHARGE_STATE_INTENT_PROCESSING {
		return fmt.Sprintf("Stripe is creating the charge for %s", charge.Buyer.Username)
	} else if charge.State == CHARGE_STATE_INTENT_CREATED {
		return fmt.Sprintf("Stripe is about to charge %s", charge.Buyer.Username)
	} else if charge.State == CHARGE_STATE_BALANCE_AVAILABLE {
		return fmt.Sprintf("We have received the payment from %s", charge.Buyer.Username)
	} else if charge.State == CHARGE_STATE_PAYMENT_CREATED {
		return fmt.Sprintf("We have received the payment, Stripe is begining to send it to %s now", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_TRANSFER_CREATED {
		return fmt.Sprintf("The payment has been transfered to %s", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_CHARGE_UPDATED {
		return fmt.Sprintf("The payment has been transfered to %s", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_PAYMENT_INTENT_SUCCEEDED {
		return fmt.Sprintf("The payment has been transfered to %s", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_CHARGE_SUCCEEDED {
		return fmt.Sprintf("The payment has been transfered to %s", charge.Worker.Username)
	} else if charge.State == CHARGE_STATE_ON_REGISTRATION_HOLD {
		return fmt.Sprintf("We have received the payment but %s needs to connect their payout message to receive funds", charge.Worker.Username)
	} else {
		return "invalid state"
	}
}
