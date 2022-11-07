package services

import (
	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/mongo"
)

type PaymentAgent struct {
	Database *mongo.Database
}

// Verifies users funds
func (agent *PaymentAgent) VerifyFund(user *db.User) (float64, error) {
	return 1000.0, nil
}

// Executes payout according to a deadline and a contract contract
func (agent *PaymentAgent) Payout(deadline *db.Deadline, contract *db.Contract) error {
	return nil
}
