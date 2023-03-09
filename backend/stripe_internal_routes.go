package backend

import (
	"context"
	"errors"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
)

func (s *BackServer) TransferDeadlineFunds(ctx context.Context, charge_entity *comms.InternalChargeEntity) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)

	icharge := db.ReadChargeProto(charge_entity, database)
	if icharge == nil {
		return nil, errors.New("Invalid Internal Charge")
	}
	if icharge.Worker.WorkerModeEnabled {
		_, err := s.StripeAgent.CreateContractTransfer(
			icharge.Worker,
			icharge.Amount,
			icharge.ChargeId,
			icharge.TransferGroup,
		)
		if err != nil {
			return nil, err
		}
		icharge.UpdateState(database, db.CHARGE_STATE_CHARGE_SUCCEEDED)
	} else {
		icharge.ActivateRegistrationHold(database)
	}
	return &comms.NullResponse{}, nil
}

func (s *BackServer) QueryICharge(ctx context.Context, req *comms.InternalChargeCustomQuery) (*comms.InternalChargeEntity, error) {
	database := s.dbClient.Database(s.dbName)
	icharge, err := db.QueryIChargeByFilter(
		bson.D{{req.FilterKey, req.FilterValue}},
		database,
		true,
	)
	if err != nil {
		return nil, err
	}
	return icharge.Proto(), nil
}

func (s *BackServer) UpdateState(ctx context.Context, req *comms.InternalChargeUpdateStateRequest) (*comms.InternalChargeEntity, error) {
	database := s.dbClient.Database(s.dbName)
	icharge := db.ReadChargeProto(req.Charge, database)
	err := icharge.UpdateState(database, req.NewState)
	if err != nil {
		return nil, err
	}
	return icharge.Proto(), nil
}
