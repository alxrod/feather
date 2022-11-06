package services

import (
	"log"
	"time"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// All Send Message Functions:
// ########################################################################################################################

func (agent *ChatAgent) SendPriceMessage(
	contract *db.Contract,
	user *db.User,
	newPrice float32,
	oldPrice float32,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		PriceNew:     newPrice,
		PriceOld:     oldPrice,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}

	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.PRICE,

		Body: body,
		Label: &db.LabelNub{
			Type: db.LABEL_PRICE,
			Name: "Price",
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendPayoutMessage(
	contract *db.Contract,
	user *db.User,
	deadline *db.Deadline,
	newPayout float32,
	oldPayout float32,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		PayoutNew:    newPayout,
		PayoutOld:    oldPayout,
		DeadlineId:   deadline.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Deadline"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.PAYOUT,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_DEADLINE,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDateMessage(
	contract *db.Contract,
	user *db.User,
	deadline *db.Deadline,
	newDate time.Time,
	oldDate time.Time,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		DateNew:      newDate,
		DateOld:      oldDate,
		DeadlineId:   deadline.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Deadline"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DATE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_DEADLINE,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendItemMessage(
	item *db.ContractItem,
	contract *db.Contract,
	user *db.User,
	newBody string,
	oldBody string,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		ItemBodyNew:  newBody,
		ItemBodyOld:  oldBody,
		ItemId:       item.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := item.Name
	if label_name == "" {
		label_name = "Item"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}
func (agent *ChatAgent) SendItemCreateMessage(
	item *db.ContractItem,
	contract *db.Contract,
	user *db.User,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		Item:         item,
		ItemId:       item.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := item.Name
	if label_name == "" {
		label_name = "Item"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM_CREATE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendItemDeleteMessage(
	item *db.ContractItem,
	contract *db.Contract,
	user *db.User,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		Item:         item,
		ItemId:       item.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}

	label_name := item.Name
	if label_name == "" {
		label_name = "Item"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM_DELETE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDeadlineCreateMessage(
	deadline *db.Deadline,
	contract *db.Contract,
	user *db.User,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		Deadline:     deadline,
		DeadlineId:   deadline.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Item"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DEADLINE_CREATE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDeadlineDeleteMessage(
	deadline *db.Deadline,
	contract *db.Contract,
	user *db.User,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		Deadline:     deadline,
		DeadlineId:   deadline.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Item"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DEADLINE_DELETE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}
	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDeadlineItemMessage(
	contract *db.Contract,
	user *db.User,
	deadline *db.Deadline,
	editType uint32,
	database *mongo.Database) error {
	new_item_ids := make([]primitive.ObjectID, len(deadline.Items))
	for i, item := range deadline.Items {
		new_item_ids[i] = item.Id
	}
	body := &db.MessageBody{
		Type:          editType,
		DeadlineId:    deadline.Id,
		Deadline:      deadline,
		NewItemStates: deadline.ItemStates,
		NewItems:      deadline.Items,
		NewItemIds:    new_item_ids,
		Resolved:      false,
		ResolStatus:   db.RESOL_UNDECIDED,
		WorkerStatus:  db.DECISION_UNDECIDED,
		BuyerStatus:   db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := deadline.Name
	if label_name == "" {
		label_name = "Deadline"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DEADLINE_ITEMS,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}
	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendContractSignMessage(
	contract *db.Contract,
	user *db.User,
	database *mongo.Database) error {
	body := &db.MessageBody{
		ContractStage: contract.Stage,
		ContractId:    contract.Id,
		SignerId:      user.Id,
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.CONTRACT_SIGN,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_UNLABELED,
			Name: "Contract Signed",
		},
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendContractSettleMessage(
	contract *db.Contract,
	deadline *db.Deadline,
	user *db.User,
	database *mongo.Database) error {
	body := &db.MessageBody{
		ContractStage: contract.Stage,
		ContractId:    contract.Id,
		DeadlineId:    deadline.Id,
		SignerId:      user.Id,
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.CONTRACT_SETTLE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_UNLABELED,
			Name: "Contract Settling",
		},
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendRequestAdminMessage(
	contract *db.Contract,
	user *db.User,
	database *mongo.Database) error {
	body := &db.MessageBody{}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.REQUEST_ADMIN,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_UNLABELED,
			Name: "Admin Request",
		},
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendResolveAdminMessage(
	contract *db.Contract,
	user *db.User,
	database *mongo.Database) error {
	body := &db.MessageBody{}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.RESOLVE_ADMIN,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_UNLABELED,
			Name: "Admin Resolved",
		},
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendItemSettleMessage(contract *db.Contract,
	deadline *db.Deadline,
	user *db.User,
	item *db.ContractItem,
	database *mongo.Database) error {

	label_name := item.Name
	if label_name == "" {
		label_name = "Item"
	}
	body := &db.MessageBody{
		ContractId:       contract.Id,
		DeadlineId:       deadline.Id,
		ItemId:           item.Id,
		ItemWorkerSettle: item.WorkerSettled,
		ItemBuyerSettle:  item.BuyerSettled,
		ItemAdminSettle:  item.AdminSettled,
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.CONTRACT_ITEM_SETTLE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_ITEM,
			Name: label_name,
		},
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}

	return nil
}

func (agent *ChatAgent) SendItemFinalizeMessage(
	contract *db.Contract,
	deadline *db.Deadline,
	user *db.User,
	confirmed bool,
	undo bool,
	database *mongo.Database) error {

	body := &db.MessageBody{
		ContractId:      contract.Id,
		ContractStage:   contract.Stage,
		Confirmed:       confirmed,
		Undo:            undo,
		DeadlineId:      deadline.Id,
		WorkerSettled:   deadline.WorkerSettled,
		BuyerSettled:    deadline.BuyerSettled,
		WorkerConfirmed: deadline.WorkerConfirmed,
		BuyerConfirmed:  deadline.BuyerConfirmed,
	}

	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.FINALIZE_SETTLE,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_UNLABELED,
			Name: "Finalize",
		},
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}

	return nil
}

func (agent *ChatAgent) SendRevMessage(msg *db.Message, database *mongo.Database) error {
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendToggleLockMessage(
	contract *db.Contract,
	user *db.User,
	lockState bool,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Type:         editType,
		ContractLock: lockState,
		ContractId:   contract.Id,
		Resolved:     false,
		ResolStatus:  db.RESOL_UNDECIDED,
		WorkerStatus: db.DECISION_UNDECIDED,
		BuyerStatus:  db.DECISION_UNDECIDED,
	}
	err := agent.AdjustMsgBody(user, contract, body)
	if err != nil {
		return err
	}
	label_name := "Contract Unlock"
	if lockState {
		label_name = "Contract Lock"
	}
	msg := &db.Message{
		RoomId:    contract.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.CONTRACT_LOCK,

		Body: body,

		Label: &db.LabelNub{
			Type: db.LABEL_UNLABELED,
			Name: label_name,
		},
	}

	err = agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

// Helper

func (agent *ChatAgent) AdjustMsgBody(user *db.User, contract *db.Contract, body *db.MessageBody) error {
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
