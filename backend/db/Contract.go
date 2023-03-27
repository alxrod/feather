package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"sort"
	"strings"
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
	Id primitive.ObjectID `bson:"_id,omitempty"`

	Worker       *UserNub  `bson:"worker"`
	Buyer        *UserNub  `bson:"buyer"`
	Price        *PriceNub `bson:"price"`
	Title        string    `bson: title`
	Summary      string    `bson:"summary"`
	CreationTime time.Time `bson:"creation_time"`

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

	SetupIntentId string `bson:"setup_intent_id"`

	InvitedEmail   string `bson:"invited_email"`
	InvitePassword string `bson:"invite_password"`
	LinkShare      bool   `bson:"link_share"`

	FigmaLink      string `bson:"figma_link,omitempty"`
	FigmaConnected bool   `bson:"figma_connected,omitempty"`

	FreeStatus bool `bson:"free_status"`
}

func (contract *Contract) GetFigmaKey() string {
	splits := strings.Split(contract.FigmaLink, "/file/")
	if len(splits) < 2 {
		return ""
	}
	key_seg := splits[1]
	slash_split := strings.Split(key_seg, "/")
	return slash_split[0]
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
		InvitedEmail:   contract.InvitedEmail,
		InvitePassword: contract.InvitePassword,
		LinkShare:      contract.LinkShare,

		Items:          items,
		Stage:          contract.Stage,
		WorkerApproved: contract.WorkerApproved,
		BuyerApproved:  contract.BuyerApproved,
		FigmaLink:      contract.FigmaLink,
		FigmaFileKey:   contract.GetFigmaKey(),
		FigmaConnected: contract.FigmaConnected,
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

func (contract *Contract) String() string {
	if contract == nil {
		fmt.Sprintf("<nil contract>")
	}
	return fmt.Sprintf("<Contract id: %s>", contract.Id.Hex())
}

func (contract *Contract) ChangeInviteEmail(new_email string, database *mongo.Database) error {
	if contract == nil {
		return errors.New("called change invite email on nil contract")
	}
	contract.InvitedEmail = new_email

	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{
		{"invited_email", new_email},
		{"invite_password", ""},
	}}}

	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	return err
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
	proto.Summary = contract.Summary

	nextDeadline, err := contract.NextDeadline()
	if err != nil {
		return nil, err
	}
	if nextDeadline == nil {
		nextDeadline = contract.Deadlines[len(contract.Deadlines)-1]
	}
	proto.Deadline = timestamppb.New(nextDeadline.CurrentDate)

	deadlines := make([]*comms.DeadlineNub, len(contract.Deadlines))
	for i, deadline := range contract.Deadlines {
		deadlines[i] = deadline.Nub()
	}
	proto.Deadlines = deadlines

	proto.Price = contract.Price.Current
	proto.Stage = contract.Stage
	proto.Disputed = contract.Disputed
	proto.AdminRequested = contract.AdminRequested
	proto.FigmaLink = contract.FigmaLink
	proto.FigmaConnected = contract.FigmaConnected

	if contract.Worker != nil && contract.Worker.Id == user.Id {
		proto.UserType = WORKER
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		proto.UserType = BUYER
	} else if user.AdminStatus {
		proto.UserType = ADMIN
	} else {
		return nil, errors.New("This user_id is not on this contract")
	}

	if contract.Worker != nil {
		proto.WorkerId = contract.Worker.Id.Hex()
	}
	if contract.Buyer != nil {
		proto.BuyerId = contract.Buyer.Id.Hex()
	}
	return proto, nil
}

func (contract *Contract) InviteProto() *comms.ContractInviteNub {
	if contract == nil {
		return &comms.ContractInviteNub{}
	}

	items := make([]*comms.ItemEntity, len(contract.Items))

	for idx, item := range contract.Items {
		items[idx] = item.Proto()
	}
	proto := &comms.ContractInviteNub{
		Worker:       contract.Worker.Proto(),
		Buyer:        contract.Buyer.Proto(),
		Price:        contract.Price.Proto(),
		Summary:      contract.Summary,
		Title:        contract.Title,
		InvitedEmail: contract.InvitedEmail,
		LinkShare:    contract.LinkShare,
		Items:        items,
	}
	if !contract.Id.IsZero() {
		proto.Id = contract.Id.Hex()
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
	HasPhoto bool               `bson:"has_photo"`
	PhotoUrl string             `bson:"photo_url"`

	WorkerModeEnabled bool `bson:"worker_mode"`
	BuyerModeEnabled  bool `bson:"buyer_mode"`
}

func (un *UserNub) Proto() *comms.UserNubEntity {
	proto := &comms.UserNubEntity{}
	if un == nil {
		return proto
	}
	if un.Username != "" {
		proto.Username = un.Username
		proto.HasPhoto = un.HasPhoto
		proto.PhotoUrl = un.PhotoUrl
		if !un.Id.IsZero() {
			proto.Id = un.Id.Hex()
		}
	}
	return proto
}

type PriceNub struct {
	Current          int64              `bson:"current"`
	Worker           int64              `bson:"worker"`
	Buyer            int64              `bson:"buyer"`
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

	stage := CREATE

	contract := &Contract{
		Price:          price,
		Title:          req.Title,
		Summary:        req.Summary,
		InvitedEmail:   req.InvitedEmail,
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
	contract, err = UpdateContractItems(contract, req.Items, database)
	if err != nil {
		return nil, err
	}

	// if len(req.Deadlines) < 2 {
	// 	return nil, errors.New("Your contract must have at least a start and end deadline")
	// }
	contract, err = UpdateContractDeadlines(contract, user, req.Deadlines, database)
	if err != nil {
		return nil, err
	}

	return contract, nil
}

func (contract *Contract) DeleteDraft(user *User, database *mongo.Database) error {
	if (contract.Buyer != nil && user.Id != contract.Buyer.Id) || (contract.Worker != nil && user.Id != contract.Worker.Id) {
		return errors.New("User is not owner of contract draft")
	}
	if contract.Stage != CREATE {
		return errors.New("Contract is not in create stage")
	}
	filter := bson.D{{"_id", contract.Id}}
	_, err := database.Collection(CON_COL).DeleteOne(context.TODO(), filter)
	return err
}

func (contract *Contract) UpdateDraft(req *comms.ContractUpdateRequest, user *User, database *mongo.Database) (*Contract, error) {
	var price *PriceNub

	if req.Role == WORKER {
		log.Printf("Request wants to be worker")
		price = &PriceNub{
			Current:          req.Price.Worker,
			Worker:           req.Price.Worker,
			Buyer:            req.Price.Worker,
			AwaitingApproval: false,
			Proposer:         user.Id,
		}
	} else if req.Role == BUYER {
		log.Printf("Request wants to be buyer")
		price = &PriceNub{
			Current:          req.Price.Buyer,
			Worker:           req.Price.Buyer,
			Buyer:            req.Price.Buyer,
			AwaitingApproval: false,
			Proposer:         user.Id,
		}
	}

	stage := CREATE

	contract.Price = price
	contract.Title = req.Title
	contract.Summary = req.Summary
	contract.InvitedEmail = req.InvitedEmail
	contract.LinkShare = req.LinkShare
	contract.CreationTime = time.Now()
	contract.Stage = stage
	contract.WorkerApproved = false
	contract.BuyerApproved = false
	contract.UniversalLock = true

	if req.Role == WORKER {
		contract.Worker = user.Nub(true)
		contract.Buyer = nil
	} else {
		contract.Buyer = user.Nub(true)
		contract.Worker = nil
	}

	filter := bson.D{{"_id", contract.Id}}

	_, err := database.Collection(CON_COL).ReplaceOne(context.TODO(), filter, contract)
	if err != nil {
		return nil, err
	}

	contract, err = UpdateContractItems(contract, req.Items, database)
	if err != nil {
		return nil, err
	}

	// if len(req.Deadlines) < 2 {
	// 	return nil, errors.New("Your contract must have at least a start and end deadline")
	// }
	contract, err = UpdateContractDeadlines(contract, user, req.Deadlines, database)
	if err != nil {
		return nil, err
	}

	return contract, nil
}

func (contract *Contract) FinishCreation(user *User, database *mongo.Database) (*Contract, error) {
	if contract.InvitedEmail == "" && !contract.LinkShare {
		return nil, errors.New("Contract must invite a partner's real email or enable link sharing")
	} else if contract.Price.Current < 1 {
		return nil, errors.New("Contract price must be greater than $1")
	} else if contract.Summary == "" {
		return nil, errors.New("Contract must have a summary")
	} else if contract.Title == "" {
		return nil, errors.New("Contract must have a title")
	} else if len(contract.Deadlines) < 2 {
		return nil, errors.New("Contract must have at least a start and end deadline")
	}

	users := []*User{user}
	room, err := ChatRoomInsert(contract.Id, users, database)
	if err != nil {
		return nil, err
	}

	if user.FreeContracts > 0 {
		log.Println("Applying ", user.Username, "'s free contract")
		user.FreeContracts -= 1
		contract.FreeStatus = true
		filter := bson.D{{"_id", user.Id}}
		update := bson.D{{"$set", bson.D{
			{"free_contracts", user.FreeContracts},
		}}}
		database.Collection(USERS_COL).UpdateOne(context.TODO(), filter, update)
	} else {
		contract.FreeStatus = false
	}

	contract.RoomId = room.Id
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{
		{"room_id", room.Id},
		{"stage", INVITE},
		{"free_status", contract.FreeStatus},
	}}}
	_, err = database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	return contract, nil
}

func UpdateContractDeadlines(contract *Contract, user *User, deadlines []*comms.DeadlineEntity, database *mongo.Database) (*Contract, error) {
	if len(deadlines) > 0 {
		contractDeadlines := make([]*Deadline, len(deadlines))
		deadline_ids := make([]primitive.ObjectID, len(deadlines))
		keepDeadlines := make([]bool, len(contract.Deadlines))

		for idx, deadline := range deadlines {
			var res *Deadline
			if len(deadline.Id) > 0 {

				for idx, existing_deadline := range contract.Deadlines {
					if existing_deadline.Id.Hex() == deadline.Id {
						res, _ = existing_deadline.ReplaceFromReq(deadline, database)
						keepDeadlines[idx] = true
					}
				}
			} else {
				res, _ = DeadlineInsert(deadline, user.Id, contract.Id, contract.Items, database)
			}
			if res == nil {
				return contract, fmt.Errorf("Couldn't update deadline %s", deadline.Id)
			}
			contractDeadlines[idx] = res
			deadline_ids[idx] = res.Id
		}

		for idx, status := range keepDeadlines {
			if !status {
				contract.Deadlines[idx].Delete(database)
			}
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
		_, err = database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to update contract with deadline ids")))
			return nil, err
		}
	}
	return contract, nil
}

// gotta delete this
func UpdateContractItems(contract *Contract, items []*comms.ItemEntity, database *mongo.Database) (*Contract, error) {
	if len(items) > 0 {
		itemsCollection := database.Collection(ITEM_COL)
		contractItems := make([]*ContractItem, len(items))
		item_ids := make([]primitive.ObjectID, len(items))
		keepItems := make([]bool, len(contract.Items))

		for idx, item := range items {
			var res *ContractItem
			if len(item.Id) > 0 {
				for idx, existing_item := range contract.Items {
					if existing_item.Id.Hex() == item.Id {

						res, _ = existing_item.ReplaceFromReq(item, database)
						keepItems[idx] = true
					}
				}
			} else {
				res, _ = ItemInsert(item, contract.Id, itemsCollection)
			}
			if res == nil {
				return contract, fmt.Errorf("Couldn't update item %s", item.String())
			}
			contractItems[idx] = res
			item_ids[idx] = res.Id
		}
		for idx, status := range keepItems {
			if !status {
				contract.Items[idx].Delete(database)
			}
		}

		contract.Items = contractItems
		contract.ItemIds = item_ids

		filter := bson.D{{"_id", contract.Id}}
		update := bson.D{{"$set", bson.D{{"item_ids", item_ids}}}}
		_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return nil, err
		}
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

	user, err := UserQueryId(user_id, database)
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
		return nil, errors.New("contract not found")
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

func ContractSuggestPrice(contract *Contract, user *User, newPrice int64, database *mongo.Database) error {
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
	if contract.Worker == nil {
		contract.Worker = user.Nub(false)
	} else if contract.Buyer == nil && user.BuyerModeEnabled {
		contract.Buyer = user.Nub(false)
	} else {
		return errors.New("You do not have the right permissions to claim this contract")
	}

	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{{"worker", contract.Worker}}}, {"$set", bson.D{{"stage", NEGOTIATE}}}}
	if user.Id == contract.Buyer.Id {
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

func ContractUnsign(contract *Contract, database *mongo.Database) (*Contract, error) {
	if contract.Worker == nil || contract.Buyer == nil || contract.Stage < NEGOTIATE {
		return contract, nil
	}
	if contract.WorkerApproved && !contract.BuyerApproved {
		contract.WorkerApproved = false
	} else if contract.BuyerApproved && !contract.WorkerApproved {
		contract.BuyerApproved = false
	}
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{
		{"$set", bson.D{{"worker_approved", contract.WorkerApproved}}},
		{"$set", bson.D{{"buyer_approved", contract.BuyerApproved}}},
		{"$set", bson.D{{"stage", contract.Stage}}},
		{"$set", bson.D{{"current_deadline_id", contract.CurrentDeadlineId}}},
	}
	_, err := database.Collection(CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}
	return contract, nil
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

func ContractRemoveItem(item *ContractItem, contract *Contract, user *User, database *mongo.Database) error {
	for _, deadline := range contract.Deadlines {
		for _, id := range deadline.ItemIds {
			if id == item.Id {
				DeadlineRemoveItem(deadline, contract, user, item, database)
			}
		}
	}

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

func SortContracts(contracts []*Contract) []*Contract {
	sort.Slice(contracts[:], func(i, j int) bool {
		return contracts[i].CreationTime.After(contracts[j].CreationTime)
	})
	return contracts
}
