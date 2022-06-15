package database

import "time"

type Draft struct {
	Id         string    `bson:"_id,omitempty"`
	ContractId string    `bson:"contract_id"`
	Date       time.Time `bson: upload_date"`
	Link       string    `bson:"link"`
	Detail     string    `bson:"detail"`
	Feedback   string    `bson:"feedback"`
}
