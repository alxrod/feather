package database

type ChatRoom struct {
	Id         string       `bson:"_id,omitempty"`
	ContractId string       `bson:"contract_id"`
	Users      []ChatterNub `bson:"users"`
	Messages   []uint16     `bson:"message_ids"`
}

type ChatterNub struct {
	Username string `bson:"username"`
	Id       string `bson:"id"`
}
