package backend

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) SetupPayment(ctx context.Context, req *comms.PaymentSetupRequest) (*comms.PaymentSetupResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection(db.USERS_COL)

	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}

	location, err := time.LoadLocation("EST")
	if err != nil {
		fmt.Println(err)
	}
	date := time.Date(int(req.Year), time.Month(req.Month), 1, 0, 0, 0, 0, location)

	err = db.UserAddPayment(id, req.CardNumber, req.CardHolder, date, req.Zip, req.CVV, userCollection)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Mongo Error: %s", err.Error())))
		return nil, err
	}
	return &comms.PaymentSetupResponse{
		Valid: true,
	}, nil
}
