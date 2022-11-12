package backend

import (
	"errors"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func pullUserContract(req_user_id, req_contract_id string, database *mongo.Database) (*db.User, *db.Contract, error) {
	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, errors.New("Invalid contract id")
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, errors.New("Invalid user id")
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, nil, err
	}
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, err
	}
	return user, contract, nil
}
func pullUserContractMessage(
	req_user_id,
	req_contract_id,
	req_msg_id string,
	database *mongo.Database) (*db.User, *db.Contract, *db.Message, error) {

	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, nil, err
	}
	message_id, err := primitive.ObjectIDFromHex(req_msg_id)
	if err != nil {
		return nil, nil, nil, err
	}

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	msg, err := db.MessageById(message_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	return user, contract, msg, nil
}
func pullUserContractDeadline(
	req_user_id,
	req_contract_id,
	req_deadline_id string,
	database *mongo.Database) (*db.User, *db.Contract, *db.Deadline, error) {

	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req_deadline_id)
	if err != nil {
		return nil, nil, nil, err
	}

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, nil, nil, err
	}
	return user, contract, deadline, nil
}

func pullUserContractDeadlineItem(
	req_user_id,
	req_contract_id,
	req_deadline_id,
	req_item_id string,
	database *mongo.Database) (*db.User, *db.Contract, *db.Deadline, *db.ContractItem, error) {

	contract_id, err := primitive.ObjectIDFromHex(req_contract_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	user_id, err := primitive.ObjectIDFromHex(req_user_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	deadline_id, err := primitive.ObjectIDFromHex(req_deadline_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	item_id, err := primitive.ObjectIDFromHex(req_item_id)
	if err != nil {
		return nil, nil, nil, nil, err
	}

	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	deadline, err := db.DeadlineById(deadline_id, database)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	item, err := db.ContractItemById(item_id, database.Collection(db.ITEM_COL))
	if err != nil {
		return nil, nil, nil, nil, err
	}
	return user, contract, deadline, item, nil
}
