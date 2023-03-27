package backend

import (
	"fmt"
	"log"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s *BackServer) DeadlineTransitionLogic(user *db.User, contract *db.Contract, deadline *db.Deadline, database *mongo.Database) error {
	log.Printf("Begining Transition logic")
	if contract.Stage == db.SETTLE {
		all_approved := true
		for _, item := range deadline.Items {
			if item.BuyerSettled != db.ITEM_APPROVE {
				all_approved = false
				log.Printf(
					"Item failed: %v because %v and %v",
					item.Name,
					item.BuyerSettled,
				)
				break
			}
		}
		if all_approved {
			log.Printf("Attempting charge account")
			err := s.StripeAgent.ChargeContract(contract, deadline, database)
			if err != nil {
				return err
			}
			amount := deadline.CurrentPayout
			amount_w_fee := amount + ((amount * s.StripeAgent.ServiceFee) / 100)
			s.EmailAgent.SendNotificationEmail(
				"charge created",
				fmt.Sprintf("%s has been charged %d (%d with fee) for contract %s which was free: %b",
					contract.Buyer.Username,
					amount,
					amount_w_fee,
					contract.Id.Hex(),
					contract.FreeStatus),
			)
		}

		deadline.Complete = true
		for idx, dline := range contract.Deadlines {
			if dline.Id == deadline.Id {
				contract.Deadlines[idx] = deadline
			}
		}

		nextDeadline, err := contract.NextDeadline()
		if err != nil {
			return err
		}

		if nextDeadline == nil {
			contract.Stage = db.COMPLETE
		} else {
			log.Println("Finished deadline advancing to next")
			contract.Stage = db.ACTIVE
			contract.CurrentDeadline = nextDeadline
			contract.CurrentDeadlineId = nextDeadline.Id
		}

		if err := db.ContractSaveSettleStage(contract, database); err != nil {
			return err
		}
		if err := s.ChatAgent.SendDeadlineSettledMessage(contract, deadline, database, contract.Stage); err != nil {
			return err
		}
	}
	if err := db.DeadlineReplace(deadline, database); err != nil {
		return err
	}

	return nil
}
