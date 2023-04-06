package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"sort"
	"strings"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Document struct {
	Id primitive.ObjectID `bson:"_id,omitempty"`

	Users   []*UserNub           `bson:"users"`
	UserIds []primitive.ObjectID `bson:"user_ids"`

	Title        string    `bson:"title"`
	Summary      string    `bson:"summary"`
	CreationTime time.Time `bson:"creation_time"`

	Deadlines   []*Deadline          `bson:"-"`
	DeadlineIds []primitive.ObjectID `bson:"deadline_ids"`

	Items   []*ContractItem      `bson:"-"`
	ItemIds []primitive.ObjectID `bson:"item_ids"`

	RoomId primitive.ObjectID `bson:"room_id"`

	LinkShare bool `bson:"link_share"`

	FigmaLink      string `bson:"figma_link,omitempty"`
	FigmaConnected bool   `bson:"figma_connected,omitempty"`
}

func (doc *Document) GetFigmaKey() string {
	splits := strings.Split(doc.FigmaLink, "/file/")
	if len(splits) < 2 {
		return ""
	}
	key_seg := splits[1]
	slash_split := strings.Split(key_seg, "/")
	return slash_split[0]
}

func (doc *Document) Proto() *comms.DocumentEntity {
	if doc == nil {
		return &comms.DocumentEntity{}
	}

	items := make([]*comms.ItemEntity, len(doc.Items))

	for idx, item := range doc.Items {
		items[idx] = item.Proto()
	}
	proto := &comms.DocumentEntity{

		Summary: doc.Summary,
		Title:   doc.Title,

		LinkShare: doc.LinkShare,

		Items:          items,
		FigmaLink:      doc.FigmaLink,
		FigmaFileKey:   doc.GetFigmaKey(),
		FigmaConnected: doc.FigmaConnected,
	}
	if !doc.Id.IsZero() {
		proto.Id = doc.Id.Hex()
	}
	if !doc.RoomId.IsZero() {
		proto.RoomId = doc.RoomId.Hex()
	}

	userProtos := make([]*comms.UserNubEntity, len(doc.Users))
	for i, user := range doc.Users {
		userProtos[i] = user.Proto()
	}

	itemProtos := make([]*comms.ItemEntity, len(doc.Items))
	for i, item := range doc.Items {
		itemProtos[i] = item.Proto()
	}

	deadlineProtos := make([]*comms.DeadlineEntity, len(doc.Deadlines))
	for i, deadline := range doc.Deadlines {
		deadlineProtos[i] = deadline.Proto()
	}

	proto.Users = userProtos
	proto.Items = itemProtos
	proto.Deadlines = deadlineProtos
	return proto
}

func (doc *Document) String() string {
	if doc == nil {
		fmt.Sprintf("<nil document>")
	}
	return fmt.Sprintf("<Document id: %s>", doc.Id.Hex())
}

func (doc *Document) NubProto(user *User) (*comms.DocumentNub, error) {
	proto := &comms.DocumentNub{}
	if doc == nil {
		return proto, nil
	}

	if doc.Id.IsZero() {
		return nil, errors.New("Invalid contract id")
	}

	proto.Id = doc.Id.Hex()
	proto.Title = doc.Title
	proto.Summary = doc.Summary

	deadlines := make([]*comms.DeadlineNub, len(doc.Deadlines))
	for i, deadline := range doc.Deadlines {
		deadlines[i] = deadline.Nub()
	}
	proto.Deadlines = deadlines

	proto.FigmaLink = doc.FigmaLink
	proto.FigmaConnected = doc.FigmaConnected

	user_ids := make([]string, len(doc.Users))
	for i, user := range doc.Users {
		user_ids[i] = user.Id.Hex()
	}
	return proto, nil
}

func DocumentInsert(req *comms.DocumentCreateRequest, user *User, database *mongo.Database) (*Document, error) {
	doc := &Document{
		Title:        req.Title,
		Summary:      req.Summary,
		CreationTime: time.Now(),
		Users:        []*UserNub{user.Nub(true)},
		UserIds:      []primitive.ObjectID{user.Id},
	}

	docCollection := database.Collection(DOC_COL)
	res, err := docCollection.InsertOne(context.TODO(), doc)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Document for %s", user.Username)))
		return nil, err
	}
	log.Println("Inserted Document into Database")

	id := res.InsertedID.(primitive.ObjectID)
	doc.Id = id
	err = doc.SetItems(req.Items, database)
	if err != nil {
		return nil, err
	}

	err = doc.SetDeadlines(user, req.Deadlines, database)
	if err != nil {
		return nil, err
	}

	users := []*User{user}
	room, err := ChatRoomInsert(doc.Id, users, database)
	if err != nil {
		return nil, err
	}
	doc.RoomId = room.Id
	filter := bson.D{{"_id", doc.Id}}
	update := bson.D{{"$set", bson.D{
		{"room_id", room.Id},
	}}}
	_, err = database.Collection(DOC_COL).UpdateOne(context.TODO(), filter, update)

	return doc, nil
}

func (doc *Document) SetDeadlines(user *User, deadlines []*comms.DeadlineEntity, database *mongo.Database) error {
	if len(deadlines) > 0 {
		docDeadlines := make([]*Deadline, len(deadlines))
		deadline_ids := make([]primitive.ObjectID, len(deadlines))

		for idx, deadline := range deadlines {
			res, _ := DeadlineInsert(deadline, user.Id, doc.Id, doc.Items, database)
			if res == nil {
				return fmt.Errorf("Couldn't update deadline %s", deadline.Id)
			}
			docDeadlines[idx] = res
			deadline_ids[idx] = res.Id
		}
		doc.Deadlines = docDeadlines
		doc.DeadlineIds = deadline_ids
		filter := bson.D{{"_id", doc.Id}}
		update := bson.D{{
			"$set",
			bson.D{
				{"deadline_ids", deadline_ids},
			},
		}}
		_, err := database.Collection(DOC_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to update document with deadline ids")))
			return nil
		}
	}
	return nil
}

// gotta delete this
func (doc *Document) SetItems(items []*comms.ItemEntity, database *mongo.Database) error {
	if len(items) > 0 {
		itemsCollection := database.Collection(ITEM_COL)
		docItems := make([]*ContractItem, len(items))
		item_ids := make([]primitive.ObjectID, len(items))

		for idx, item := range items {
			res, err := ItemInsert(item, doc.Id, itemsCollection)
			if err != nil {
				return fmt.Errorf("Couldn't update item due to error %s", err)
			}
			docItems[idx] = res
			item_ids[idx] = res.Id
		}

		doc.Items = docItems
		doc.ItemIds = item_ids

		filter := bson.D{{"_id", doc.Id}}
		update := bson.D{{"$set", bson.D{{"item_ids", item_ids}}}}
		_, err := database.Collection(DOC_COL).UpdateOne(context.TODO(), filter, update)
		if err != nil {
			return err
		}
	}
	return nil
}

func DocumentsByUser(user_id primitive.ObjectID, database *mongo.Database) ([]*Document, error) {
	documents := make([]*Document, 0)

	user_filter := bson.D{{"user_ids", user_id}}
	cur, err := database.Collection(DOC_COL).Find(context.TODO(), user_filter)
	if err != nil {
		return nil, err
	}
	for cur.Next(context.Background()) {
		var doc *Document
		err := cur.Decode(&doc)
		if err != nil {
			return nil, err
		}

		documents = append(documents, doc)
	}
	cur.Close(context.Background())

	for _, doc := range documents {
		items := make([]*ContractItem, len(doc.ItemIds))
		for idx, id := range doc.ItemIds {
			item, err := ContractItemById(id, database.Collection(ITEM_COL))
			if err != nil {
				return nil, err
			}
			items[idx] = item
		}
		doc.Items = items

		deadlines := make([]*Deadline, len(doc.DeadlineIds))
		for idx, id := range doc.DeadlineIds {
			deadline, err := DeadlineById(id, database)
			if err != nil {
				return nil, err
			}
			deadlines[idx] = deadline
		}
		doc.Deadlines = deadlines
	}

	sort.Slice(documents, func(i, j int) bool {
		return documents[i].CreationTime.Before(documents[j].CreationTime)
	})
	return documents, nil
}

func DocumentById(document_id primitive.ObjectID, database *mongo.Database) (*Document, error) {
	filter := bson.D{{"_id", document_id}}
	var doc *Document
	var err error
	if err = database.Collection(DOC_COL).FindOne(context.TODO(), filter).Decode(&doc); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("document not found")
	}
	items := make([]*ContractItem, len(doc.ItemIds))
	for idx, id := range doc.ItemIds {
		item, err := ContractItemById(id, database.Collection(ITEM_COL))
		if err != nil {
			return nil, err
		}
		items[idx] = item
	}
	doc.Items = items

	deadlines := make([]*Deadline, len(doc.DeadlineIds))
	for idx, id := range doc.DeadlineIds {
		deadline, err := DeadlineById(id, database)
		if err != nil {
			return nil, err
		}
		deadlines[idx] = deadline
	}
	doc.Deadlines = deadlines

	return doc, nil
}

func (doc *Document) AddUser(user *User, contract *Contract, database *mongo.Database) error {
	for _, id := range doc.UserIds {
		if user.Id == id {
			return fmt.Errorf("User %s already in document %s", user.Id, doc.Id)
		}
	}
	doc.UserIds = append(doc.UserIds, user.Id)
	doc.Users = append(doc.Users, user.Nub(false))

	filter := bson.D{{"_id", doc.Id}}
	update := bson.D{
		{"$set", bson.D{{"users", doc.Users}}},
		{"$set", bson.D{{"user_ids", doc.UserIds}}},
	}
	_, err := database.Collection(DOC_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) ReplaceInDB(database *mongo.Database) error {
	filter := bson.D{{"_id", doc.Id}}
	_, err := database.Collection(DOC_COL).ReplaceOne(context.TODO(), filter, doc)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) UpdateField(update bson.D, database *mongo.Database) error {
	filter := bson.D{{"_id", doc.Id}}
	_, err := database.Collection(DOC_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) AddItem(item *ContractItem, database *mongo.Database) error {
	doc.ItemIds = append(doc.ItemIds, item.Id)
	doc.Items = append(doc.Items, item)
	update := bson.D{{"$set", bson.D{{"item_ids", doc.ItemIds}}}}
	err := doc.UpdateField(update, database)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) AddDeadline(deadline *Deadline, database *mongo.Database) error {
	doc.DeadlineIds = append(doc.DeadlineIds, deadline.Id)
	doc.Deadlines = append(doc.Deadlines, deadline)
	update := bson.D{{"$set", bson.D{{"deadline_ids", doc.DeadlineIds}}}}
	err := doc.UpdateField(update, database)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) RemoveItem(item *ContractItem, user *User, database *mongo.Database) error {
	for _, deadline := range doc.Deadlines {
		for _, id := range deadline.ItemIds {
			if id == item.Id {
				DeadlineRemoveItem(deadline, item, database)
			}
		}
	}

	newIds := make([]primitive.ObjectID, 0)
	newItems := make([]*ContractItem, 0)
	for idx, id := range doc.ItemIds {
		if id != item.Id {
			newIds = append(newIds, id)
			newItems = append(newItems, doc.Items[idx])
		}
	}
	doc.ItemIds = newIds
	doc.Items = newItems
	update := bson.D{{"$set", bson.D{{"item_ids", doc.ItemIds}}}}
	err := doc.UpdateField(update, database)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) RemoveDeadline(deadline *Deadline, database *mongo.Database) error {
	newIds := make([]primitive.ObjectID, 0)
	newDeadlines := make([]*Deadline, 0)
	for idx, id := range doc.DeadlineIds {
		if id != deadline.Id {
			newIds = append(newIds, id)
			newDeadlines = append(newDeadlines, doc.Deadlines[idx])
		}
	}
	doc.DeadlineIds = newIds
	doc.Deadlines = newDeadlines
	update := bson.D{{"$set", bson.D{{"deadline_ids", doc.DeadlineIds}}}}
	err := doc.UpdateField(update, database)
	if err != nil {
		return err
	}
	return nil
}

func (doc *Document) CheckUser(user_id primitive.ObjectID) bool {
	found := false
	for _, id := range doc.UserIds {
		if id == user_id {
			found = true
			break
		}
	}
	return found
}

func SortDocumnets(docs []*Document) []*Document {
	sort.Slice(docs[:], func(i, j int) bool {
		return docs[i].CreationTime.After(docs[j].CreationTime)
	})
	return docs
}
