package services

import (
	"context"
	"fmt"
	"log"
	"sort"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type DeadlineAgent struct {
	Database *mongo.Database
}

func (agent *DeadlineAgent) QueryContracts() ([]*db.Contract, error) {
	contracts := make([]*db.Contract, 0)
	all_filter := bson.D{{}}
	cur, err := agent.Database.Collection(db.CON_COL).Find(context.TODO(), all_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.TODO()) {
		var con *db.Contract
		err := cur.Decode(&con)
		if err != nil {
			return nil, err
		}
		contracts = append(contracts, con)
	}
	cur.Close(context.TODO())

	for _, con := range contracts {
		items := make([]*db.ContractItem, len(con.ItemIds))
		for idx, id := range con.ItemIds {
			item, err := db.ContractItemById(id, agent.Database.Collection(db.ITEM_COL))
			if err != nil {
				return nil, err
			}
			items[idx] = item
		}
		con.Items = items

		deadlines := make([]*db.Deadline, len(con.DeadlineIds))
		for idx, id := range con.DeadlineIds {
			deadline, err := db.DeadlineById(id, agent.Database)
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

func (agent *DeadlineAgent) RevertContractSuggestions(contract *db.Contract) error {
	// Revert:
	// 1) Price
	resetPriceNub := &db.PriceNub{
		Current:          contract.Price.Current,
		Worker:           contract.Price.Current,
		Buyer:            contract.Price.Current,
		AwaitingApproval: false,
	}
	contract.Price = resetPriceNub

	// 2) Date
	// 3) Payout
	// 4) Deadline Create
	// 5) Deadline Delete
	// 9) Deadline Items
	final_deadlines := make([]*db.Deadline, 0)
	final_deadline_ids := make([]primitive.ObjectID, 0)

	for _, deadline := range contract.Deadlines {
		deadline.WorkerPayout = deadline.CurrentPayout
		deadline.BuyerPayout = deadline.CurrentPayout
		deadline.WorkerDate = deadline.CurrentDate
		deadline.BuyerDate = deadline.CurrentDate
		deadline.DateAwaitingApproval = false
		deadline.PayoutAwaitingApproval = false

		finalItems := make([]*db.ContractItem, 0)
		finalItemIds := make([]primitive.ObjectID, 0)
		finalItemStates := make([]uint32, 0)

		for idx, item := range finalItems {
			if deadline.ItemStates[idx] == db.ITEM_RESOLVED || deadline.ItemStates[idx] == db.ITEM_REMOVED {
				finalItems = append(finalItems, item)
				finalItemIds = append(finalItemIds, item.Id)
				finalItemStates = append(finalItemStates, db.ITEM_RESOLVED)
			}
		}

		deadline.Items = finalItems
		deadline.ItemIds = finalItemIds
		deadline.ItemStates = finalItemStates
		deadline.ItemsAwaitingApproval = false

		if deadline.AwaitingDeletion {
			deadline.AwaitingDeletion = false
			final_deadlines = append(final_deadlines, deadline)
			final_deadline_ids = append(final_deadline_ids, deadline.Id)
		} else if !deadline.AwaitingCreation {
			final_deadlines = append(final_deadlines, deadline)
			final_deadline_ids = append(final_deadline_ids, deadline.Id)
		}
		if err := db.DeadlineReplace(deadline, agent.Database); err != nil {
			return err
		}
	}

	contract.Deadlines = final_deadlines
	contract.DeadlineIds = final_deadline_ids

	finalItems := make([]*db.ContractItem, 0)
	finalItemIds := make([]primitive.ObjectID, 0)
	for _, item := range contract.Items {
		item.WorkerBody = item.CurrentBody
		item.BuyerBody = item.CurrentBody
		item.AwaitingApproval = false
		if item.AwaitingDeletion {
			item.AwaitingDeletion = false
			finalItems = append(finalItems, item)
			finalItemIds = append(finalItemIds, item.Id)
		} else if !item.AwaitingCreation {
			finalItems = append(finalItems, item)
			finalItemIds = append(finalItemIds, item.Id)
		}
		if err := db.ContractItemReplace(item, agent.Database); err != nil {
			return err
		}
	}

	contract.Items = finalItems
	contract.ItemIds = finalItemIds

	contract.UniversalLock = true
	return nil
}

func (agent *DeadlineAgent) DeadlinePassed(deadline *db.Deadline) bool {
	now := time.Now()
	return deadline.CurrentDate.Before(now)
}

func (agent *DeadlineAgent) DeadlineLoop() {
	for {
		contracts, err := agent.QueryContracts()
		if err != nil {
			log.Println(color.Colorize("red", "Contract Query all failed in Deadline Agent"))
		}
		for _, contract := range contracts {
			curDeadline := contract.CurrentDeadline
			if agent.DeadlinePassed(curDeadline) && contract.Stage == db.ACTIVE {
				contract.Stage = db.SETTLE
				curDeadline.Expired = true
				err := agent.RevertContractSuggestions(contract)
				if err != nil {
					log.Println(color.Colorize("red", fmt.Sprintf("DEADLINE AGENT ERROR: ", err.Error())))
				}
			}
		}
	}
}
