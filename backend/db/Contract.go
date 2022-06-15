package database

import "time"

type Contract struct {
	Id         string      `bson:"_id,omitempty"`
	Influencer UserNub     `bson:"influencer"`
	Sponsor    UserNub     `bson:"sponsor"`
	Price      PriceNub    `bson:"price"`
	Deadline   DeadlineNub `bson:"deadline"`
	Summary    string      `bson:"summary"`

	ChatRoom string     `bson:"chat_room_id"`
	Items    []ItemNub  `bson:"items"`
	Drafts   []DraftNub `bson:"drafts"`
	Stage    StageNub   `bson:"stages"`
}

type UserNub struct {
	Id       string `bson:"id"`
	Username string `bson:"username"`
	Author   bool   `bson:"is_author"`
}

type StageNub struct {
	Type   uint8  `bson:"type"`
	Detail string `bson:"detail"`
}

type PriceNub struct {
	Current          float32 `bson:"current"`
	Influencer       float32 `bson:"influencer"`
	Sponsor          float32 `bson:"sponsor"`
	AwaitingApproval bool    `bson:"awaiting_approval`
	Proposer         string  `bson:"proposer_id"`
}

type DeadlineNub struct {
	Current          time.Time `bson:"current`
	Influencer       time.Time `bson:"influencer`
	Sponsor          time.Time `bson:"sponsor`
	AwaitingApproval bool      `bson:"awaiting_approval`
	Proposer         string    `bson:"proposer_id"`
}

type ItemNub struct {
	Id   string `bson:"id"`
	Name string `bson:"name"`
}

type DraftNub struct {
	Id string `bson:"id"`
}
