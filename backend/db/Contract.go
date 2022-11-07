package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"sort"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/protobuf/types/known/timestamppb"
)

const (
	CREATE    = uint32(0)
	INVITE    = uint32(1)
	NEGOTIATE = uint32(10)
	SIGNED    = uint32(20)
	ACTIVE    = uint32(30)
	SETTLE    = uint32(40)
	COMPLETE  = uint32(50)
)

type Contract struct {
	Id           primitive.ObjectID `bson:"_id,omitempty"`
	Password     string             `bson:"password"`
	Worker       *UserNub           `bson:"worker"`
	Buyer        *UserNub           `bson:"buyer"`
	Price        *PriceNub          `bson:"price"`
	Title        string             `bson: title`
	Summary      string             `bson:"summary"`
	CreationTime time.Time          `bson:"creation_time"`

	Deadlines   []*Deadline          `bson:"-"`
	DeadlineIds []primitive.ObjectID `bson:"deadline_ids"`

	CurrentDeadlineId primitive.ObjectID `bson:"current_deadline_id"`
	CurrentDeadline   *Deadline          `bson:"-"`

	Items   []*ContractItem      `bson:"-"`
	ItemIds []primitive.ObjectID `bson:"item_ids"`

	RoomId primitive.ObjectID `bson:"room_id"`
	Stage  uint32             `bson:"stage"`

	WorkerApproved bool `bson:"worker_approved"`
	BuyerApproved  bool `bson:"buyer_approved"`

	UniversalLock bool `bson:"universal_lock"`

	// Query Flags
	Disputed       bool `bson:"disputed"`
	AdminRequested bool `bson:"admin_requested"`
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
		Worker:         contract.Worker.Proto(),
		Buyer:          contract.Buyer.Proto(),
		Price:          contract.Price.Proto(),
		UniversalLock:  contract.UniversalLock,
		Disputed:       contract.Disputed,
		AdminRequested: contract.AdminRequested,
		Summary:        contract.Summary,
		Title:          contract.Title,
		Password:       contract.Password,
		Items:          items,
		Stage:          contract.Stage,
		WorkerApproved: contract.WorkerApproved,
		BuyerApproved:  contract.BuyerApproved,
	}
	if !contract.Id.IsZero() {
		proto.Id = contract.Id.Hex()
	}
	if !contract.RoomId.IsZero() {
		proto.RoomId = contract.RoomId.Hex()
	}
	if !contract.CurrentDeadlineId.IsZero() {
		proto.CurrentDeadlineId = contract.CurrentDeadlineId.Hex()
	}

	itemProtos := make([]*comms.ItemEntity, len(contract.Items))
	for i, item := range contract.Items {
		itemProtos[i] = item.Proto()
	}

	deadlineProtos := make([]*comms.DeadlineEntity, len(contract.Deadlines))
	for i, deadline := range contract.Deadlines {
		deadlineProtos[i] = deadline.Proto()
	}

	proto.Items = itemProtos
	proto.Deadlines = deadlineProtos
	return proto
}

func (contract *Contract) NubProto(user *User) (*comms.ContractNub, error) {
	proto := &comms.ContractNub{}
	if contract == nil {
		return proto, nil
	}

	if contract.Id.IsZero() {
		return nil, errors.New("Invalid contract id")
	}

	proto.Id = contract.Id.Hex()
	proto.Title = contract.Title

	nextDeadline, err := contract.NextDeadline()
	if err != nil {
		return nil, err
	}
	if nextDeadline == nil {
		nextDeadline = contract.Deadlines[len(contract.Deadlines)-1]
	}
	proto.Deadline = timestamppb.New(nextDeadline.CurrentDate)

	proto.Price = contract.Price.Current
	proto.Stage = contract.Stage
	proto.Disputed = contract.Disputed
	proto.AdminRequested = contract.AdminRequested

	if contract.Worker != nil && contract.Worker.Id == user.Id {
		proto.UserType = WORKER
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		proto.UserType = BUYER
	} else if user.AdminStatus {
		proto.UserType = ADMIN
	} else {
		return nil, errors.New("This user_id is not on this contract")
	}
	return proto, nil
}

func (contract *Contract) InviteProto() (*comms.InviteNub, error) {
	proto := &comms.InviteNub{}
	if contract == nil {
		return proto, nil
	}
	if contract.Id.IsZero() {
		return nil, errors.New("Invalid contract id")
	}
	if contract.Stage != INVITE {
		return nil, errors.New("This contract is not in the invite stage")
	}
	proto.Id = contract.Id.Hex()
	proto.Title = contract.Title
	proto.Password = contract.Password
	nextDeadline, err := contract.NextDeadline()
	if err != nil {
		return nil, err
	}
	if nextDeadline == nil {
		nextDeadline = contract.Deadlines[len(contract.Deadlines)-1]
	}
	nextDate := nextDeadline.CurrentDate

	proto.Deadline = timestamppb.New(nextDate)
	proto.Price = contract.Price.Current
	proto.Summary = contract.Summary
	proto.Worker = contract.Worker.Proto()
	proto.Buyer = contract.Buyer.Proto()

	return proto, nil

}

func (contract *Contract) NextDeadline() (*Deadline, error) {
	if contract == nil {
		return nil, errors.New("This contract is nil")
	}
	var earliest *time.Time
	var earliestDeadline *Deadline
	for _, deadline := range contract.Deadlines {
		if (earliest == nil || deadline.CurrentDate.Before(*earliest)) && !deadline.Complete {
			earliest = &deadline.CurrentDate
			earliestDeadline = deadline
		}
	}
	return earliestDeadline, nil
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

type PriceNub struct {
	Current          float32            `bson:"current"`
	Worker           float32            `bson:"worker"`
	Buyer            float32            `bson:"buyer"`
	AwaitingApproval bool               `bson:"awaiting_approval"`
	Proposer         primitive.ObjectID `bson:"proposer_id"`
}

func (pn *PriceNub) Proto() *comms.PriceEntity {
	proto := &comms.PriceEntity{}
	if pn == nil {
		return proto
	}
	proto.Current = pn.Current
	proto.Worker = pn.Worker
	proto.Buyer = pn.Buyer
	proto.AwaitingApproval = pn.AwaitingApproval
	if pn.AwaitingApproval == true && !pn.Proposer.IsZero() {
		proto.ProposerId = pn.Proposer.Hex()
	}

	return proto
}

func ContractInsert(req *comms.ContractCreateRequest, user *User, database *mongo.Database) (*Contract, error) {
	var price *PriceNub
	if req.Role == WORKER {
		price = &PriceNub{
			Current:          req.Price.Worker,
			Worker:           req.Price.Worker,
			Buyer:            req.Price.Worker,
			AwaitingApproval: false,
			Proposer:         user.Id,
		}
	} else {
		price = &PriceNub{
			Current:          req.Price.Buyer,
			Worker:           req.Price.Buyer,
			Buyer:            req.Price.Buyer,
			AwaitingApproval: false,
			Proposer:         user.Id,
		}
	}
	stage := INVITE

	contract := &Contract{
		Price:          price,
		Title:          req.Title,
		Summary:        req.Summary,
		Password:       req.Password,
		CreationTime:   time.Now(),
		Stage:          stage,
		WorkerApproved: false,
		BuyerApproved:  false,
		UniversalLock:  true,
	}
	if req.Role == WORKER {
		contract.Worker = user.Nub(true)
	} else {
		contract.Buyer = user.Nub(true)
	}

	contractCollection := database.Collection(CON_COL)
	res, err := contractCollection.InsertOne(context.TODO(), contract)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Contract for %s", user.Username)))
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

		contract.Items = contractItems
		contract.ItemIds = item_ids

		filter := bson.D{{"_id", contract.Id}}
		update := bson.D{{"$set", bson.D{{"item_ids", item_ids}}}}
		_, err := contractCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to update contract with item ids %s", user.Username)))
			return nil, err
		}
	}

	if len(req.Deadlines) < 2 {
		return nil, errors.New("Your contract must have at least a start and end deadline")
	}

	contractDeadlines := make([]*Deadline, len(req.Deadlines))
	deadline_ids := make([]primitive.ObjectID, len(req.Deadlines))
	for idx, deadline := range req.Deadlines {
		res, err := DeadlineInsert(deadline, user.Id, contract.Id, contract.Items, database)
		if err != nil {
			return nil, err
		}
		contractDeadlines[idx] = res
		deadline_ids[idx] = res.Id
	}
	contract.Deadlines = contractDeadlines
	contract.DeadlineIds = deadline_ids

	nextDeadline, err := contract.NextDeadline()
	if err != nil {
		return nil, err
	}
	if nextDeadline == nil {
		nextDeadline = contract.Deadlines[len(contract.Deadlines)-1]
	}
	contract.CurrentDeadline = nextDeadline
	contract.CurrentDeadlineId = nextDeadline.Id

	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{
		"$set",
		bson.D{
			{"deadline_ids", deadline_ids},
			{"current_deadline_id", contract.CurrentDeadlineId},
		},
	}}
	_, err = contractCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to update contract with deadline ids")))
		return nil, err
	}

	users := []*User{user}
	room, err := ChatRoomInsert(contract.Id, users, database)
	if err != nil {
		return nil, err
	}
	contract.RoomId = room.Id
	filter = bson.D{{"_id", contract.Id}}
	update = bson.D{{"$set", bson.D{{"room_id", room.Id}}}}
	_, err = contractCollection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return contract, nil
}

func ContractsByUser(user_id primitive.ObjectID, database *mongo.Database) ([]*Contract, error) {
	contracts := make([]*Contract, 0)

	worker_filter := bson.D{{"worker.id", user_id}}
	cur, err := database.Collection(CON_COL).Find(context.TODO(), worker_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.Background()) {
		var con *Contract
		err := cur.Decode(&con)
		if err != nil {
			return nil, err
		}

		contracts = append(contracts, con)
	}
	cur.Close(context.Background())

	buyer_filter := bson.D{{"buyer.id", user_id}}
	cur, err = database.Collection(CON_COL).Find(context.TODO(), buyer_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.TODO()) {
		var con *Contract
		err := cur.Decode(&con)
		if err != nil {
			return nil, err
		}
		contracts = append(contracts, con)
	}
	cur.Close(context.TODO())

	for _, con := range contracts {
		items := make([]*ContractItem, len(con.ItemIds))
		for idx, id := range con.ItemIds {
			item, err := ContractItemById(id, database.Collection(ITEM_COL))
			if err != nil {
				return nil, err
			}
			items[idx] = item
		}
		con.Items = items

		deadlines := make([]*Deadline, len(con.DeadlineIds))
		for idx, id := range con.DeadlineIds {
			deadline, err := DeadlineById(id, database)
			if err != nil {
				return nil, err
			}
			deadlines[idx] = deadline
		}
		con.Deadlines = deadlines
	}

	sort.Slice(contracts, func(i, j int) bool {
		return contracts[i].CreationTime.Before(contracts[j].CreationTime)
	})
	return contracts, nil
}

func ContractsByAdmin(user_id primitive.ObjectID, database *mongo.Database) ([]*Contract, error) {
	contracts := make([]*Contract, 0)

	user, err := UserQueryId(user_id, database.Collection(USERS_COL))
	if err != nil {
		return nil, err
	}
	if !user.AdminStatus {
		return nil, errors.New(fmt.Sprintf("%s is not an admin, cannot query contracts", user.Username))
	}

	all_filter := bson.D{{}}
	cur, err := database.Collection(CON_COL).Find(context.TODO(), all_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.TODO()) {
		var con *Contract
		err := cur.Decode(&con)
		if err != nil {
			return nil, err
		}
		contracts = append(contracts, con)
	}
	cur.Close(context.TODO())

	for _, con := range contracts {
		items := make([]*ContractItem, len(con.ItemIds))
		for idx, id := range con.ItemIds {
			item, err := ContractItemById(id, database.Collection(ITEM_COL))
			if err != nil {
				return nil, err
			}
			items[idx] = item
		}
		con.Items = items

		deadlines := make([]*Deadline, len(con.DeadlineIds))
		for idx, id := range con.DeadlineIds {
			deadline, err := DeadlineById(id, database)
			if err != nil {
				return nil, err
			}
			deadlines[idx] = deadline
		}
		con.Deadlines = deadlines
	}

	sort.Slice(contracts, func(i, j int) bool {
		return contracts[i].CreationTime.Before(contracts[j].CreationTime)
	})
	return contracts, nil
}

func ContractById(contract_id primitive.ObjectID, database *mongo.Database) (*Contract, error) {
	filter := bson.D{{"_id", contract_id}}
	var contract *Contract
	var err error
	if err = database.Collection(CON_COL).FindOne(context.TODO(), filter).Decode(&contract); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("Contract Not Found")
	}
	items := make([]*ContractItem, len(contract.ItemIds))
	for idx, id := range contract.ItemIds {
		item, err := ContractItemById(id, database.Collection(ITEM_COL))
		if err != nil {
			return nil, err
		}
		items[idx] = item
	}
	contract.Items = items

	deadlines := make([]*Deadline, len(contract.DeadlineIds))
	for idx, id := range contract.DeadlineIds {
		deadline, err := DeadlineById(id, database)
		if id == contract.CurrentDeadlineId {
			contract.CurrentDeadline = deadline
		}
		if err != nil {
			return nil, err
		}
		deadlines[idx] = deadline
	}

	contract.Deadlines = deadlines

	return contract, nil
}

func ContractSuggestPrice(contract *Contract, user *User, newPrice float32, database *mongo.Database) error {
	if contract.Price.AwaitingApproval == true {
		return errors.New(fmt.Sprintf("The contract %s is already awaiting approval of a different price change", contract.Id.Hex()))
	}

	priceNub := contract.Price
	if contract.Worker != nil && user.Id == contract.Worker.Id {
		if contract.Buyer == nil {
			priceNub.Buyer = newPrice
			priceNub.Worker = newPrice
			priceNub.Current = newPrice
		} else {
			priceNub.Worker = newPrice
			priceNub.AwaitingApproval = true
		}
	} else if contract.Buyer != nil && user.Id == contract.Buyer.Id {
		if contract.Worker == nil {
			priceNub.Buyer = newPrice
			priceNub.Worker = newPrice
			priceNub.Current = newPrice
		} else {
			priceNub.Buyer = newPrice
			priceNub.AwaitingApproval = true
		}
	} else if user.AdminStatus {
		priceNub.Buyer = newPrice
		priceNub.Worker = newPrice
		priceNub.Current = newPrice
	} else {
		return errors.New("Invalid proposing user")
	}
	priceNub.Proposer = user.Id

	contract.Price = priceNub

	err := ContractSavePrice(contract, database)
	if err != nil {
		return err
	}
	return nil
}

func ContractClaim(user *User, contract *Contract, database *mongo.Database) error {
	nub := &UserNub{
		Id:       user.Id,
		Username: user.Username,
		Author:   false,
	}
	if contract.Worker == nil {
		nub.Type = WORKER
		contract.Worker = nub
	} else if contract.Buyer == nil {
		nub.Type = BUYER
		contract.Buyer = nub
	} else {
		return errors.New("This contract has already been claimed")
	}

	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"worker", contract.Worker}}}, {"$set", bson.D{{"stage", NEGOTIATE}}}}
	if nub.Type == BUYER {
		update = bson.D{{"$set", bson.D{{"buyer", contract.Buyer}}}, {"$set", bson.D{{"stage", NEGOTIATE}}}}
	}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSign(user *User, contract *Contract, database *mongo.Database) error {
	if contract.Worker.Id == user.Id {
		contract.WorkerApproved = true
	} else if contract.Buyer.Id == user.Id {
		contract.BuyerApproved = true
	} else if user.AdminStatus {
		contract.WorkerApproved = true
		contract.BuyerApproved = true
	} else {
		return errors.New("User is trying to sign a contract they do not own")
	}
	if contract.WorkerApproved && contract.BuyerApproved && contract.Stage == NEGOTIATE {
		contract.WorkerApproved = false
		contract.BuyerApproved = false
		contract.Stage = ACTIVE
	}
	nextDeadline, err := contract.NextDeadline()
	if err != nil {
		return err
	}
	if nextDeadline == nil {
		nextDeadline = contract.Deadlines[len(contract.Deadlines)-1]
	}
	contract.CurrentDeadline = nextDeadline
	contract.CurrentDeadlineId = nextDeadline.Id

	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{
		{"$set", bson.D{{"worker_approved", contract.WorkerApproved}}},
		{"$set", bson.D{{"buyer_approved", contract.BuyerApproved}}},
		{"$set", bson.D{{"stage", contract.Stage}}},
		{"$set", bson.D{{"current_deadline_id", contract.CurrentDeadlineId}}},
	}
	_, err = database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}
func ContractSettle(user *User, contract *Contract, database *mongo.Database) error {
	if contract.Worker.Id == user.Id {
		contract.WorkerApproved = true
	} else if contract.Buyer.Id == user.Id {
		contract.BuyerApproved = true
	} else if user.AdminStatus {
		contract.WorkerApproved = true
		contract.BuyerApproved = true
	} else {
		return errors.New("User is trying to sign a contract they do not own")
	}
	if contract.WorkerApproved && contract.BuyerApproved && contract.Stage == ACTIVE {
		contract.WorkerApproved = false
		contract.BuyerApproved = false
		contract.Stage = SETTLE
	}
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{
		{"$set", bson.D{{"worker_approved", contract.WorkerApproved}}},
		{"$set", bson.D{{"buyer_approved", contract.BuyerApproved}}},
		{"$set", bson.D{{"universal_lock", true}}},
		{"$set", bson.D{{"stage", contract.Stage}}},
	}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	return nil
}

func ContractReplace(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	_, err := database.Collection(CON_COL).ReplaceOne(context.TODO(), filter, contract)
	if err != nil {
		return err
	}
	return nil
}

func ContractSavePrice(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"price", contract.Price}}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSaveSettleStage(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set",
		bson.D{
			{"stage", contract.Stage},
			{"current_deadline_id", contract.CurrentDeadline.Id},
		}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSaveDisputed(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"disputed", contract.Disputed}}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSaveAdminRequested(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"admin_requested", contract.AdminRequested}}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractToggleLock(contract *Contract, newState bool, database *mongo.Database) error {
	contract.UniversalLock = newState
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"universal_lock", contract.UniversalLock}}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSaveItems(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"item_ids", contract.ItemIds}}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSaveDeadlines(contract *Contract, database *mongo.Database) error {
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"deadline_ids", contract.DeadlineIds}}}}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func ContractSuggestItemAdd(item *ContractItem, contract *Contract, user *User, database *mongo.Database) error {
	contract.ItemIds = append(contract.ItemIds, item.Id)
	contract.Items = append(contract.Items, item)
	err := ContractSaveItems(contract, database)
	if err != nil {
		return err
	}

	return nil
}

func ContractSuggestDeadlineAdd(deadline *Deadline, contract *Contract, user *User, database *mongo.Database) error {
	contract.DeadlineIds = append(contract.DeadlineIds, deadline.Id)
	contract.Deadlines = append(contract.Deadlines, deadline)
	err := ContractSaveDeadlines(contract, database)
	if err != nil {
		return err
	}
	return nil
}

func ContractRemoveItem(item *ContractItem, contract *Contract, database *mongo.Database) error {
	newIds := make([]primitive.ObjectID, 0)
	newItems := make([]*ContractItem, 0)
	for idx, id := range contract.ItemIds {
		if id != item.Id {
			newIds = append(newIds, id)
			newItems = append(newItems, contract.Items[idx])
		}
	}
	contract.ItemIds = newIds
	contract.Items = newItems
	err := ContractSaveItems(contract, database)
	if err != nil {
		return err
	}
	return nil
}

func ContractRemoveDeadline(deadline *Deadline, contract *Contract, database *mongo.Database) error {
	newIds := make([]primitive.ObjectID, 0)
	newDeadlines := make([]*Deadline, 0)
	for idx, id := range contract.DeadlineIds {
		if id != deadline.Id {
			newIds = append(newIds, id)
			newDeadlines = append(newDeadlines, contract.Deadlines[idx])
		}
	}
	contract.DeadlineIds = newIds
	contract.Deadlines = newDeadlines
	err := ContractSaveDeadlines(contract, database)
	if err != nil {
		return err
	}
	return nil
}

func ContractAddDeadline(deadline *Deadline, contract *Contract, database *mongo.Database) error {
	contract.DeadlineIds = append(contract.DeadlineIds, deadline.Id)
	contract.Deadlines = append(contract.Deadlines, deadline)
	err := ContractSaveDeadlines(contract, database)
	if err != nil {
		return err
	}
	return nil
}
