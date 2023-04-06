package services

import (
	"time"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// All Send Message Functions:
// ########################################################################################################################

func (agent *ChatAgent) SendDateMessage(
	document *db.Document,
	user *db.User,
	deadline *db.Deadline,
	newDate time.Time,
	oldDate time.Time,
	database *mongo.Database) error {

	silent := false
	body := &db.MessageBody{
		DateNew:    newDate,
		DateOld:    oldDate,
		DeadlineId: deadline.Id,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DATE,
		Silent:    silent,

		Body: body,

		Label: "Deadline",
	}

	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendItemBodyMessage(
	item *db.Item,
	document *db.Document,
	user *db.User,
	newBody string,
	oldBody string,
	database *mongo.Database) error {

	body := &db.MessageBody{
		ItemBodyNew: newBody,
		ItemBodyOld: oldBody,
		ItemId:      item.Id,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM,

		Body: body,

		Label: "Item",
	}

	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendItemCreateMessage(
	item *db.Item,
	document *db.Document,
	user *db.User,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Item:   item,
		ItemId: item.Id,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM_CREATE,

		Body: body,

		Label: "New Item",
	}

	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendItemDeleteMessage(
	item *db.Item,
	document *db.Document,
	user *db.User,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Item:   item,
		ItemId: item.Id,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.ITEM_DELETE,

		Body: body,

		Label: "Delete Item",
	}

	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDeadlineCreateMessage(
	deadline *db.Deadline,
	document *db.Document,
	user *db.User,
	editType uint32,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Deadline:   deadline,
		DeadlineId: deadline.Id,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DEADLINE_CREATE,

		Body: body,

		Label: "New Deadline",
	}

	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDeadlineDeleteMessage(
	deadline *db.Deadline,
	document *db.Document,
	user *db.User,
	database *mongo.Database) error {

	body := &db.MessageBody{
		Deadline:   deadline,
		DeadlineId: deadline.Id,
	}

	msg := &db.Message{
		RoomId:    document.Id,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DEADLINE_DELETE,

		Body: body,

		Label: "Delete Deadline",
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendDeadlineItemMessage(
	document *db.Document,
	user *db.User,
	deadline *db.Deadline,
	editType uint32,
	database *mongo.Database) error {
	new_item_ids := make([]primitive.ObjectID, len(deadline.Items))
	for i, item := range deadline.Items {
		new_item_ids[i] = item.Id
	}
	silent := false
	body := &db.MessageBody{
		DeadlineId: deadline.Id,
		Deadline:   deadline,
		NewItems:   deadline.Items,
		NewItemIds: new_item_ids,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.DEADLINE_ITEMS,
		Silent:    silent,
		Body:      body,

		Label: "Deadline Items",
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}
	return nil
}

func (agent *ChatAgent) SendFigmaLinkMessage(
	document *db.Document,
	user *db.User,
	database *mongo.Database) error {

	body := &db.MessageBody{
		FigmaLink: document.FigmaLink,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.CONTRACT_FIGMA_SET,

		Body:  body,
		Label: "Figma Link",
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}

	return nil
}

func (agent *ChatAgent) SendFigmaItemNodesMessage(
	user *db.User,
	document *db.Document,
	item *db.Item,
	database *mongo.Database) error {

	body := &db.MessageBody{
		ItemId:      item.Id,
		ComponentId: item.FigmaComponentId,
	}

	msg := &db.Message{
		RoomId:    document.RoomId,
		DocId:     document.Id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    db.FIGMA_ITEM_NODES,

		Body: body,

		Label: "Figma Component",
	}
	err := agent.SendMessageInternal(msg, database)
	if err != nil {
		return err
	}

	return nil
}
