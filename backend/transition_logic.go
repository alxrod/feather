package backend

import (
	"log"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/mongo"
)

func (s *BackServer) DeadlineSettled(deadline *db.Deadline) bool {
	if deadline.WorkerConfirmed && deadline.BuyerConfirmed {
		return true
	}
	if deadline.AdminSettled {
		return true
	}
	return false
}

func (s *BackServer) DeadlineTransitionLogic(user *db.User, contract *db.Contract, deadline *db.Deadline, database *mongo.Database) error {
	log.Printf("Begining Transition logic")
	if contract.Stage == db.SETTLE && s.DeadlineSettled(deadline) {
		log.Printf("It has been settled")
		all_approved := true
		for _, item := range deadline.Items {
			if item.WorkerSettled != db.ITEM_APPROVE || item.BuyerSettled != db.ITEM_APPROVE {
				all_approved = false
				log.Printf(
					"Item failed: %v because %v and %v",
					item.Name,
					item.WorkerSettled,
					item.BuyerSettled,
				)
				break
			}
		}
		if all_approved {
			log.Printf("Attempting charge")
			err := s.StripeAgent.ChargeContract(contract, deadline, database)
			if err != nil {
				return err
			}
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
