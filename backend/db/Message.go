package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// Methods
const (
	COMMENT              = 0
	ITEM                 = 1
	DATE                 = 2
	PAYOUT               = 5
	ITEM_CREATE          = 6
	ITEM_DELETE          = 7
	DEADLINE_CREATE      = 8
	DEADLINE_DELETE      = 9
	DEADLINE_ITEMS       = 10
	PRICE                = 3
	REVISION             = 4
	CONTRACT_SIGN        = 11
	CONTRACT_LOCK        = 12
	CONTRACT_SETTLE      = 13
	CONTRACT_ITEM_SETTLE = 14
	REQUEST_ADMIN        = 15
	RESOLVE_ADMIN        = 16
	FINALIZE_SETTLE      = 17
	DEADLINE_EXPIRED     = 18
	DEADLINE_SETTLED     = 19
	CONTRACT_FIGMA_SET   = 20
	FIGMA_ITEM_NODES     = 21
)

// Editing Typs
const (
	UNDEFINED = 0
	SUGGEST   = 1
	APPROVE   = 2
	REJECT    = 3
)

// Labels
const (
	LABEL_UNLABELED = 0
	LABEL_PRICE     = 1
	LABEL_ITEM      = 2
	LABEL_DEADLINE  = 3
)

const (
	DECISION_YES       = 2
	DECISION_NO        = 1
	DECISION_UNDECIDED = 0
)

const (
	RESOL_UNDECIDED = 0
	RESOL_APPROVED  = 1
	RESOL_REJECTED  = 2
	RESOL_CANCELED  = 3
)

type Message struct {
	Id     primitive.ObjectID `bson:"_id,omitempty"`
	RoomId primitive.ObjectID `bson:"room_id"`
	DocId  primitive.ObjectID `bson:"document_id"`

	// Message string    `bson:"message"`
	Method uint32       `bson:"method"`
	Body   *MessageBody `bson:"body"`

	Label string `bson:"label"`

	UserId        primitive.ObjectID `bson:"user_id,omitempty"`
	SystemMessage bool               `bson:"system_message"`

	User *User `bson:"-"`

	Timestamp    time.Time      `bson:"timestamp"`
	ReadReceipts []*ReadReceipt `bson:"read_receipts"`
	Silent       bool           `bson:"silent"`
}

type ReadReceipt struct {
	UserId primitive.ObjectID `bson:"user_id"`
	Read   bool               `bson:"read"`
}

func (r *ReadReceipt) Proto() *comms.ReadReceiptEntity {
	if r == nil {
		return &comms.ReadReceiptEntity{}
	}
	return &comms.ReadReceiptEntity{
		UserId: r.UserId.Hex(),
		Read:   r.Read,
	}
}

type MessageBody struct {
	Message string `bson:"message,omitempty"`
	// Item messages
	ItemId      primitive.ObjectID `bson:"item_id,omitempty"`
	Item        *Item              `bson:"-"`
	ItemBodyNew string             `bson:"item_new,omitempty"`
	ItemBodyOld string             `bson:"item_old,omitempty"`

	// Deadline messages
	DeadlineId primitive.ObjectID `bson:"deadline_id,omitempty"`
	Deadline   *Deadline          `bson:"-"`

	NewItemIds []primitive.ObjectID `bson:"new_item_ids"`
	NewItems   []*Item              `bson:"-"`

	DateNew time.Time `bson:"date_new,omitempty"`
	DateOld time.Time `bson:"date_old,omitempty"`

	FigmaLink   string `bson:"figma_link,omitempty"`
	ComponentId string `bson:"figma_node_ids,omitempty"`
}

func (b *MessageBody) CommentProto() *comms.ChatMessage_CommentBody {
	return &comms.ChatMessage_CommentBody{
		CommentBody: &comms.CommentMsgBody{
			Message: b.Message,
		},
	}
}

func (b *MessageBody) FigmaLinkProto() *comms.ChatMessage_FigmaLinkBody {
	return &comms.ChatMessage_FigmaLinkBody{
		FigmaLinkBody: &comms.FigmaLinkMsgBody{
			FigmaLink: b.FigmaLink,
		},
	}
}

func (b *MessageBody) FigmaItemNodesProto() *comms.ChatMessage_FigmaItemNodesBody {
	return &comms.ChatMessage_FigmaItemNodesBody{
		FigmaItemNodesBody: &comms.FigmaItemNodesMsgBody{
			ItemId:      b.ItemId.Hex(),
			ComponentId: b.ComponentId,
		},
	}
}

func (b *MessageBody) DateProto() *comms.ChatMessage_DateBody {
	return &comms.ChatMessage_DateBody{
		DateBody: &comms.DateMsgBody{
			DeadlineId: b.DeadlineId.Hex(),
			NewVersion: timestamppb.New(b.DateNew),
			OldVersion: timestamppb.New(b.DateOld),
		},
	}
}

func (b *MessageBody) ItemProto() *comms.ChatMessage_ItemBody {
	return &comms.ChatMessage_ItemBody{
		ItemBody: &comms.ItemMsgBody{
			ItemId:     b.ItemId.Hex(),
			NewVersion: b.ItemBodyNew,
			OldVersion: b.ItemBodyOld,
		},
	}
}

func (b *MessageBody) ItemCreateProto() *comms.ChatMessage_ItemCreateBody {
	return &comms.ChatMessage_ItemCreateBody{
		ItemCreateBody: &comms.ItemCreateMsgBody{
			Item: b.Item.Proto(),
		},
	}
}
func (b *MessageBody) ItemDeleteProto() *comms.ChatMessage_ItemDeleteBody {
	return &comms.ChatMessage_ItemDeleteBody{
		ItemDeleteBody: &comms.ItemDeleteMsgBody{
			Item: b.Item.Proto(),
		},
	}
}

func (b *MessageBody) DeadlineCreateProto() *comms.ChatMessage_DeadlineCreateBody {
	return &comms.ChatMessage_DeadlineCreateBody{
		DeadlineCreateBody: &comms.DeadlineCreateMsgBody{
			Deadline: b.Deadline.Proto(),
		},
	}
}

func (b *MessageBody) DeadlineDeleteProto() *comms.ChatMessage_DeadlineDeleteBody {
	return &comms.ChatMessage_DeadlineDeleteBody{
		DeadlineDeleteBody: &comms.DeadlineDeleteMsgBody{
			Deadline: b.Deadline.Proto(),
		},
	}
}

func (b *MessageBody) DeadlineItemsProto() *comms.ChatMessage_DeadlineItemBody {
	new_items := make([]*comms.ItemNub, len(b.NewItems))

	for idx, item := range b.NewItems {
		new_items[idx] = item.NubProto()
	}

	return &comms.ChatMessage_DeadlineItemBody{
		DeadlineItemBody: &comms.DeadlineItemMsgBody{
			Deadline: b.Deadline.Proto(),
			NewItems: new_items,
		},
	}
}

func (m *Message) Proto() *comms.ChatMessage {
	proto := &comms.ChatMessage{}
	if m == nil {
		return proto
	}

	proto.Id = m.Id.Hex()
	proto.DocId = m.DocId.Hex()
	proto.SystemMessage = m.SystemMessage
	if !m.SystemMessage {
		proto.User = m.User.Handle().Proto()
	}

	proto.Timestamp = timestamppb.New(m.Timestamp)
	proto.Method = m.Method
	proto.Label = m.Label
	proto.Silent = m.Silent

	if m.Method == COMMENT {
		proto.Body = m.Body.CommentProto()
	} else if m.Method == ITEM {
		proto.Body = m.Body.ItemProto()
	} else if m.Method == DATE {
		proto.Body = m.Body.DateProto()
	} else if m.Method == ITEM_CREATE {
		proto.Body = m.Body.ItemCreateProto()
	} else if m.Method == ITEM_DELETE {
		proto.Body = m.Body.ItemDeleteProto()
	} else if m.Method == DEADLINE_CREATE {
		proto.Body = m.Body.DeadlineCreateProto()
	} else if m.Method == DEADLINE_DELETE {
		proto.Body = m.Body.DeadlineDeleteProto()
	} else if m.Method == DEADLINE_ITEMS {
		proto.Body = m.Body.DeadlineItemsProto()
	} else if m.Method == CONTRACT_FIGMA_SET {
		proto.Body = m.Body.FigmaLinkProto()
	} else if m.Method == FIGMA_ITEM_NODES {
		proto.Body = m.Body.FigmaItemNodesProto()
	}

	receipts := make([]*comms.ReadReceiptEntity, len(m.ReadReceipts))
	for i, r := range m.ReadReceipts {
		receipts[i] = r.Proto()
	}
	proto.ReadReceipts = receipts

	return proto
}

func (msg *Message) configureReadReceipts(user *User, room *ChatRoom) {
	receipts := make([]*ReadReceipt, len(room.UserHandles))
	for i, handle := range room.UserHandles {
		read := false
		if user != nil && handle.Id == user.Id {
			read = true
		}
		receipts[i] = &ReadReceipt{
			UserId: handle.Id,
			Read:   read,
		}
	}
	msg.ReadReceipts = receipts
}

func (msg *Message) UpdateReadReceipts(user_id primitive.ObjectID, database *mongo.Database) {
	update := false
	for _, receipt := range msg.ReadReceipts {
		if receipt.UserId == user_id {
			if !receipt.Read {
				update = true
			}
			receipt.Read = true
		}
	}
	if update {
		filter := bson.D{{"_id", msg.Id}}
		update := bson.D{
			{"$set", bson.D{{"read_receipts", msg.ReadReceipts}}},
		}
		database.Collection(MSG_COL).UpdateOne(context.TODO(), filter, update)
	}
}

func (msg *Message) UndoUpdateReadReceipts(user_id primitive.ObjectID, database *mongo.Database) {
	update := false
	for _, receipt := range msg.ReadReceipts {
		if receipt.UserId == user_id {
			if receipt.Read {
				update = true
			}
			receipt.Read = false
		}
	}
	if update {
		filter := bson.D{{"_id", msg.Id}}
		update := bson.D{
			{"$set", bson.D{{"read_receipts", msg.ReadReceipts}}},
		}
		database.Collection(MSG_COL).UpdateOne(context.TODO(), filter, update)
	}
}

func MessageInsert(req *comms.SendRequest, room *ChatRoom, database *mongo.Database) (*Message, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("Invalid User Id")
	}

	user, err := UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	message := &Message{
		RoomId:        room.Id,
		User:          user,
		UserId:        user.Id,
		SystemMessage: false,
		Timestamp:     time.Now().Local(),
		Method:        COMMENT,
		Body: &MessageBody{
			Message: req.Body.Message,
		},
		Label: "",
	}

	message.configureReadReceipts(user, room)

	messageCollection := database.Collection(MSG_COL)
	res, err := messageCollection.InsertOne(context.TODO(), message)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Message for room %s for user %s", room.Id.Hex(), user_id.Hex())))
		return nil, err
	}

	id := res.InsertedID.(primitive.ObjectID)
	message.Id = id
	return message, nil
}

func (msg *Message) Replace(database *mongo.Database) error {
	filter := bson.D{{"_id", msg.Id}}
	_, err := database.Collection(MSG_COL).ReplaceOne(context.TODO(), filter, msg)
	if err != nil {
		return err
	}
	return nil
}

func MessageById(message_id primitive.ObjectID, database *mongo.Database) (*Message, error) {
	filter := bson.D{{"_id", message_id}}
	var message *Message
	var err error
	if err = database.Collection(MSG_COL).FindOne(context.TODO(), filter).Decode(&message); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("Contract Not Found")
	}
	if !message.SystemMessage {
		user, err := UserQueryId(message.UserId, database)
		if err != nil {
			return nil, err
		}

		message.User = user
	}

	if (message.Method == ITEM_CREATE || message.Method == ITEM_DELETE) && !message.Body.ItemId.IsZero() {
		item, err := ItemById(message.Body.ItemId, database.Collection(ITEM_COL))
		if err != nil {
			return nil, err
		}
		message.Body.Item = item
	}

	if (message.Method == DEADLINE_CREATE || message.Method == DEADLINE_DELETE || message.Method == DEADLINE_ITEMS) && !message.Body.DeadlineId.IsZero() {
		deadline, err := DeadlineById(message.Body.DeadlineId, database)
		if err != nil {
			return nil, err
		}
		message.Body.Deadline = deadline
	}

	if message.Method == DEADLINE_ITEMS {
		new_items := make([]*Item, len(message.Body.NewItemIds))
		for idx, id := range message.Body.NewItemIds {
			item, err := ItemById(id, database.Collection(ITEM_COL))
			if err != nil {
				return nil, err
			}
			new_items[idx] = item
		}
		message.Body.NewItems = new_items
	}

	return message, nil
}

func (msg *Message) InsertInternal(room *ChatRoom, database *mongo.Database) (primitive.ObjectID, error) {
	messageCollection := database.Collection(MSG_COL)

	msg.configureReadReceipts(nil, room)
	res, err := messageCollection.InsertOne(context.TODO(), msg)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Internally Insert Message for room %s", room.Id.Hex())))
		return primitive.NewObjectID(), err
	}

	id := res.InsertedID.(primitive.ObjectID)
	return id, nil
}
