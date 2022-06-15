package database

type Message struct {
	Id     string    `bson:"_id,omitempty"`
	RoomId string    `bson:"room_id"`
	Type   string    `bson:"type"`
	Body   []BodyNub `bson:"body"`
}

type BodyNub struct {
	Detail string `bson:"detail"`
}
