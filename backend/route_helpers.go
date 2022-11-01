package backend

import (
	"log"

	db "github.com/alxrod/feather/backend/db"
)

func (s *BackServer) AdjustMsgBody(user *db.User, contract *db.Contract, body *db.MessageBody) error {
	if contract.Worker == nil {
		body.WorkerStatus = db.DECISION_YES
	}
	if contract.Buyer == nil {
		body.BuyerStatus = db.DECISION_YES
	}

	if contract.Worker != nil && contract.Worker.Id == user.Id {
		log.Println("Sender is worker")
		body.WorkerStatus = db.DECISION_YES
	} else if contract.Buyer != nil && contract.Buyer.Id == user.Id {
		log.Println("Sender is buyer")
		body.BuyerStatus = db.DECISION_YES
	} else if user.AdminStatus {
		body.BuyerStatus = db.DECISION_YES
		body.WorkerStatus = db.DECISION_YES
	}

	if body.BuyerStatus == db.DECISION_YES && body.WorkerStatus == db.DECISION_YES {
		body.ResolStatus = db.RESOL_APPROVED
		body.Resolved = true
	}
	return nil
}
