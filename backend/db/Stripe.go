package database

import (
	comms "github.com/alxrod/feather/communication"
)

type StripeNub struct {
	FirstName       string      `bson:"first_name"`
	LastName        string      `bson:"last_name"`
	Phone           string      `bson:"phone"`
	Address         *AddressNub `bson:"address"`
	Dob             *DobNub     `bson:"dob"`
	LastFourAccount string      `bson:"last_four_account"`
	RoutingNumber   string      `bson:"routing_number"`
}

func (nub *StripeNub) Proto() *comms.StripeEntity {
	if nub == nil {
		return &comms.StripeEntity{}
	}
	return &comms.StripeEntity{
		FirstName:       nub.FirstName,
		LastName:        nub.LastName,
		Phone:           nub.Phone,
		Address:         nub.Address.Proto(),
		Dob:             nub.Dob.Proto(),
		LastFourAccount: nub.LastFourAccount,
		RoutingNumber:   nub.RoutingNumber,
	}
}

type AddressNub struct {
	City       string `bson:"city"`
	Country    string `bson:"country"`
	Line1      string `bson:"line_1"`
	Line2      string `bson:"line_2"`
	PostalCode string `bson:"postal_code"`
	State      string `bson:"state"`
}

func (nub *AddressNub) Proto() *comms.AddressEntity {
	if nub == nil {
		return &comms.AddressEntity{}
	}
	return &comms.AddressEntity{
		City:       nub.City,
		Country:    nub.Country,
		Line1:      nub.Line1,
		Line2:      nub.Line2,
		PostalCode: nub.PostalCode,
		State:      nub.State,
	}
}

type DobNub struct {
	Day   uint32 `bson:"day"`
	Month uint32 `bson:"month"`
	Year  uint32 `bson:"year"`
}

func (nub *DobNub) Proto() *comms.DobEntity {
	if nub == nil {
		return &comms.DobEntity{}
	}
	return &comms.DobEntity{
		Day:   nub.Day,
		Month: nub.Month,
		Year:  nub.Year,
	}
}
