package database

const (
	ITEM_REJECT  = 0
	ITEM_APPROVE = 1
	ITEM_PENDING = 2
)

type ContractItem struct {
	ContractId         string      `bson:"contract_id"`
	SponsorDecision    uint8       `bson:"sponsor_decision"`
	InfluencerDecision uint8       `bson:"influencer_decision"`
	Body               []ItemChunk `bson:"body"`
}

type ItemChunk struct {
	Type        string `bson:"type"`
	Author      string `bson:"author_id"`
	SponApprove bool   `bson:"spon_approve"`
	InflApprove bool   `bson:"infl_approve"`
}
