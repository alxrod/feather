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

	// Message string    `bson:"message"`
	Method uint32       `bson:"method"`
	Body   *MessageBody `bson:"body"`

	Label *LabelNub `bson:"label"`

	UserId primitive.ObjectID `bson:"user_id"`

	IsAdmin bool `bson:"is_admin"`

	AdminOverride bool   `bson:"admin_override"`
	AdminStatus   uint32 `bson:"admin_status"`

	User *User `bson:"-"`

	Timestamp time.Time `bson:"timestamp"`
}

type MessageBody struct {
	Type    uint32 `bson:"type,omitempty"`
	Message string `bson:"message,omitempty"`

	// Used for all complex types
	Resolved     bool   `bson:"resolved,omitempty"`
	ResolStatus  uint32 `bson:"resol_status,omitempty"`
	WorkerStatus uint32 `bson:"worker_status,omitempty"`
	BuyerStatus  uint32 `bson:"buyer_status,omitempty"`
	AdminStatus  uint32 `bson:"admin_status,omitempty"`

	// Item messages
	ItemId      primitive.ObjectID `bson:"item_id,omitempty"`
	ItemBodyNew string             `bson:"item_new,omitempty"`
	ItemBodyOld string             `bson:"item_old,omitempty"`
	Item        *ContractItem      `bson:"-"`

	// Deadline messages
	DeadlineId primitive.ObjectID `bson:"deadline_id,omitempty"`
	Deadline   *Deadline          `bson:"-"`

	NewItemStates []uint32             `bson:"new_item_states"`
	NewItemIds    []primitive.ObjectID `bson:"new_item_ids"`
	NewItems      []*ContractItem      `bson:"-"`

	PayoutNew float32   `bson:"payout_new,omitempty"`
	PayoutOld float32   `bson:"payout_old,omitempty"`
	DateNew   time.Time `bson:"date_new,omitempty"`
	DateOld   time.Time `bson:"date_old,omitempty"`

	// Price messages
	PriceNew float32 `bson:"price_new,omitempty"`
	PriceOld float32 `bson:"price_old,omitempty"`

	// Revision messages
	MsgId primitive.ObjectID `bson:"msg_id,omitempty"`

	// Sign Message
	SignerId      primitive.ObjectID `bson:"signer_id,omitempty"`
	ContractStage uint32             `bson:"contract_stage,omitempty"`
	ContractId    primitive.ObjectID `bson:"contract_id,omitempty"`

	// Lock Message
	ContractLock bool `bson:"contract_lock,omitempty"`

	// For settlign items
	ItemWorkerSettle uint32 `bson:"item_worker_settle,omitempty"`
	ItemBuyerSettle  uint32 `bson:"item_buyer_settle,omitempty"`
}

func (b *MessageBody) CommentProto() *comms.ChatMessage_CommentBody {
	return &comms.ChatMessage_CommentBody{
		CommentBody: &comms.CommentMsgBody{
			Message: b.Message,
		},
	}
}

func (b *MessageBody) ContractSignProto() *comms.ChatMessage_ContractSignBody {
	return &comms.ChatMessage_ContractSignBody{
		ContractSignBody: &comms.ContractSignMsgBody{
			SignerId:      b.SignerId.Hex(),
			ContractStage: b.ContractStage,
			ContractId:    b.ContractId.Hex(),
		},
	}
}
func (b *MessageBody) ContractSettleProto() *comms.ChatMessage_ContractSettleBody {
	return &comms.ChatMessage_ContractSettleBody{
		ContractSettleBody: &comms.ContractSettleMsgBody{
			SignerId:      b.SignerId.Hex(),
			ContractStage: b.ContractStage,
			ContractId:    b.ContractId.Hex(),
			DeadlineId:    b.DeadlineId.Hex(),
		},
	}
}

func (b *MessageBody) ContractLockProto() *comms.ChatMessage_ContractLockBody {
	return &comms.ChatMessage_ContractLockBody{
		ContractLockBody: &comms.ContractLockMsgBody{
			ContractId:   b.ContractId.Hex(),
			ContractLock: b.ContractLock,
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}

func (b *MessageBody) DateProto() *comms.ChatMessage_DateBody {
	return &comms.ChatMessage_DateBody{
		DateBody: &comms.DateMsgBody{
			DeadlineId:   b.DeadlineId.Hex(),
			NewVersion:   timestamppb.New(b.DateNew),
			OldVersion:   timestamppb.New(b.DateOld),
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}

func (b *MessageBody) PayoutProto() *comms.ChatMessage_PayoutBody {
	return &comms.ChatMessage_PayoutBody{
		PayoutBody: &comms.PayoutMsgBody{
			DeadlineId:   b.DeadlineId.Hex(),
			NewVersion:   b.PayoutNew,
			OldVersion:   b.PayoutOld,
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}

func (b *MessageBody) PriceProto() *comms.ChatMessage_PriceBody {
	return &comms.ChatMessage_PriceBody{
		PriceBody: &comms.PriceMsgBody{
			NewVersion:   b.PriceNew,
			OldVersion:   b.PriceOld,
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,

			Type: b.Type,
		},
	}
}

func (b *MessageBody) ItemProto() *comms.ChatMessage_ItemBody {
	return &comms.ChatMessage_ItemBody{
		ItemBody: &comms.ItemMsgBody{
			ItemId:       b.ItemId.Hex(),
			NewVersion:   b.ItemBodyNew,
			OldVersion:   b.ItemBodyOld,
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}

func (b *MessageBody) ItemCreateProto() *comms.ChatMessage_ItemCreateBody {
	return &comms.ChatMessage_ItemCreateBody{
		ItemCreateBody: &comms.ItemCreateMsgBody{
			Item:         b.Item.Proto(),
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}
func (b *MessageBody) ItemDeleteProto() *comms.ChatMessage_ItemDeleteBody {
	return &comms.ChatMessage_ItemDeleteBody{
		ItemDeleteBody: &comms.ItemDeleteMsgBody{
			Item:         b.Item.Proto(),
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}

func (b *MessageBody) DeadlineCreateProto() *comms.ChatMessage_DeadlineCreateBody {
	return &comms.ChatMessage_DeadlineCreateBody{
		DeadlineCreateBody: &comms.DeadlineCreateMsgBody{
			Deadline:     b.Deadline.Proto(),
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
		},
	}
}

func (b *MessageBody) DeadlineDeleteProto() *comms.ChatMessage_DeadlineDeleteBody {
	return &comms.ChatMessage_DeadlineDeleteBody{
		DeadlineDeleteBody: &comms.DeadlineDeleteMsgBody{
			Deadline:     b.Deadline.Proto(),
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			Type:         b.Type,
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
			Resolved:      b.Resolved,
			ResolStatus:   b.ResolStatus,
			WorkerStatus:  b.WorkerStatus,
			BuyerStatus:   b.BuyerStatus,
			Type:          b.Type,
			DeadlineId:    b.DeadlineId.Hex(),
			Deadline:      b.Deadline.Proto(),
			NewItemStates: b.NewItemStates,
			NewItems:      new_items,
		},
	}
}

func (b *MessageBody) SettleItemProto() *comms.ChatMessage_SettleItemBody {
	return &comms.ChatMessage_SettleItemBody{
		SettleItemBody: &comms.ContractSettleItemMsgBody{
			ContractId:       b.ContractId.Hex(),
			DeadlineId:       b.DeadlineId.Hex(),
			ItemId:           b.ItemId.Hex(),
			ItemWorkerSettle: b.ItemWorkerSettle,
			ItemBuyerSettle:  b.ItemBuyerSettle,
		},
	}
}

func (b *MessageBody) RevProto() *comms.ChatMessage_RevBody {
	return &comms.ChatMessage_RevBody{
		RevBody: &comms.RevMsgBody{
			MsgId:        b.MsgId.Hex(),
			Resolved:     b.Resolved,
			ResolStatus:  b.ResolStatus,
			WorkerStatus: b.WorkerStatus,
			BuyerStatus:  b.BuyerStatus,
			AdminStatus:  b.AdminStatus,
		},
	}
}

func (m *Message) Proto() *comms.ChatMessage {
	proto := &comms.ChatMessage{}
	if m == nil {
		return proto
	}

	proto.Id = m.Id.Hex()
	proto.User = m.User.Handle().Proto()
	proto.Timestamp = timestamppb.New(m.Timestamp)
	proto.Method = m.Method
	proto.Label = m.Label.Proto()
	proto.IsAdmin = m.IsAdmin
	proto.AdminOverride = m.AdminOverride
	proto.AdminStatus = m.AdminStatus

	if m.Method == COMMENT {
		proto.Body = m.Body.CommentProto()
	} else if m.Method == ITEM {
		proto.Body = m.Body.ItemProto()
	} else if m.Method == PAYOUT {
		proto.Body = m.Body.PayoutProto()
	} else if m.Method == DATE {
		proto.Body = m.Body.DateProto()
	} else if m.Method == PRICE {
		proto.Body = m.Body.PriceProto()
	} else if m.Method == REVISION {
		proto.Body = m.Body.RevProto()
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
	} else if m.Method == CONTRACT_SIGN {
		proto.Body = m.Body.ContractSignProto()
	} else if m.Method == CONTRACT_LOCK {
		proto.Body = m.Body.ContractLockProto()
	} else if m.Method == CONTRACT_SETTLE {
		proto.Body = m.Body.ContractSettleProto()
	} else if m.Method == CONTRACT_ITEM_SETTLE {
		proto.Body = m.Body.SettleItemProto()
	}

	return proto
}

type LabelNub struct {
	Type   uint32             `bson:"type"`
	Name   string             `bson:"name"`
	ItemId primitive.ObjectID `bson:"item_id,omitempty"`
}

func (lb *LabelNub) Proto() *comms.ChatLabel {
	proto := &comms.ChatLabel{Name: "", Type: LABEL_UNLABELED}
	if lb == nil {
		return proto
	}
	proto.Type = lb.Type
	proto.Name = lb.Name
	if !lb.ItemId.IsZero() {
		proto.ItemId = lb.ItemId.Hex()
	}
	return proto
}

func NewLabel(req *comms.ChatLabel) (*LabelNub, error) {
	if req.Type != 0 && req.Name == "" {
		return nil, errors.New("You must provide a name if the label is not unlabeled.")
	}
	nub := &LabelNub{
		Type: req.Type,
		Name: req.Name,
	}
	id, err := primitive.ObjectIDFromHex(req.ItemId)
	if err == nil {
		nub.ItemId = id
	}

	return nub, nil
}

func MessageInsert(req *comms.SendRequest, room_id primitive.ObjectID, database *mongo.Database) (*Message, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("Invalid User Id")
	}

	userCollection := database.Collection(USERS_COL)
	user, err := UserQueryId(user_id, userCollection)
	if err != nil {
		return nil, err
	}
	if req.Label == nil {
		return nil, errors.New("Even if it is unlabeled, you must provide a label entity")
	}
	label, err := NewLabel(req.Label)
	if err != nil {
		return nil, err
	}

	message := &Message{
		RoomId:    room_id,
		User:      user,
		UserId:    user.Id,
		Timestamp: time.Now().Local(),
		Method:    req.Method,
		Body:      ParseBody(req),
		Label:     label,
		IsAdmin:   user.AdminStatus,
	}

	messageCollection := database.Collection(MSG_COL)
	res, err := messageCollection.InsertOne(context.TODO(), message)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert Message for room %s for user %s", room_id.Hex(), user_id.Hex())))
		return nil, err
	}

	id := res.InsertedID.(primitive.ObjectID)
	message.Id = id
	return message, nil
}

func MessageReplace(msg *Message, database *mongo.Database) error {
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
	user, err := UserQueryId(message.UserId, database.Collection(USERS_COL))
	if err != nil {
		return nil, err
	}
	message.User = user
	if (message.Method == ITEM_CREATE || message.Method == ITEM_DELETE) && !message.Body.ItemId.IsZero() {
		item, err := ContractItemById(message.Body.ItemId, database.Collection(ITEM_COL))
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
		new_items := make([]*ContractItem, len(message.Body.NewItemIds))
		for idx, id := range message.Body.NewItemIds {
			item, err := ContractItemById(id, database.Collection(ITEM_COL))
			if err != nil {
				return nil, err
			}
			new_items[idx] = item
		}
		message.Body.NewItems = new_items
	}

	return message, nil
}

func MessageInsertInternal(msg *Message, room_id primitive.ObjectID, database *mongo.Database) (primitive.ObjectID, error) {
	messageCollection := database.Collection(MSG_COL)
	if msg.User.AdminStatus {
		msg.IsAdmin = true
	}
	res, err := messageCollection.InsertOne(context.TODO(), msg)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Internally Insert Message for room %s", room_id.Hex())))
		return primitive.NewObjectID(), err
	}

	id := res.InsertedID.(primitive.ObjectID)
	return id, nil
}

func ParseBody(req *comms.SendRequest) *MessageBody {
	body := &MessageBody{}
	if req.Method == COMMENT {
		body.Message = req.GetCommentBody().Message
	} else if req.Method == ITEM {
		body.Type = req.GetItemBody().Type
		body.ItemBodyNew = req.GetItemBody().NewVersion
		body.ItemBodyOld = req.GetItemBody().OldVersion
	} else if req.Method == PAYOUT {
		body.Type = req.GetPayoutBody().Type
		body.DeadlineId, _ = primitive.ObjectIDFromHex(req.GetPayoutBody().DeadlineId)
		body.PayoutNew = req.GetPayoutBody().NewVersion
		body.PayoutOld = req.GetPayoutBody().OldVersion
	} else if req.Method == DATE {
		body.Type = req.GetPayoutBody().Type
		body.DeadlineId, _ = primitive.ObjectIDFromHex(req.GetPayoutBody().DeadlineId)
		body.DateNew = req.GetDateBody().NewVersion.AsTime()
		body.DateOld = req.GetDateBody().OldVersion.AsTime()
	} else if req.Method == PRICE {
		body.Type = req.GetPriceBody().Type
		body.PriceNew = req.GetPriceBody().NewVersion
		body.PriceOld = req.GetPriceBody().OldVersion
	}
	return body
}
