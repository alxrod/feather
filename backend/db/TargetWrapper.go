package database

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const WRAPPER_CONTRACT = false
const WRAPPER_DOCUMENT = true

type TargetWrapper struct {
	ContentType bool
	Contract    *Contract
	Document    *Document
}

func WrapperById(id string, mode bool, database *mongo.Database) (*TargetWrapper, error) {
	if mode == WRAPPER_DOCUMENT {
		doc_id, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}
		doc, err := DocumentById(doc_id, database)
		if err != nil {
			return nil, err
		}
		return &TargetWrapper{
			ContentType: WRAPPER_DOCUMENT,
			Document:    doc,
		}, nil
	} else {
		con_id, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return nil, err
		}
		contract, err := ContractById(con_id, database)
		if err != nil {
			return nil, err
		}
		return &TargetWrapper{
			ContentType: WRAPPER_CONTRACT,
			Contract:    contract,
		}, nil
	}
}

func CastContract(contract *Contract) *TargetWrapper {
	return &TargetWrapper{
		ContentType: WRAPPER_CONTRACT,
		Contract:    contract,
	}
}

func CastDocument(document *Document) *TargetWrapper {
	return &TargetWrapper{
		ContentType: WRAPPER_DOCUMENT,
		Document:    document,
	}
}

func (target *TargetWrapper) GetItems() []*ContractItem {
	if target.ContentType == WRAPPER_DOCUMENT {
		return target.Document.Items
	} else {
		return target.Contract.Items
	}
}

func (target *TargetWrapper) GetRoomId() primitive.ObjectID {
	if target.ContentType == WRAPPER_DOCUMENT {
		return target.Document.RoomId
	} else {
		return target.Contract.RoomId
	}
}

func (target *TargetWrapper) GetFigmaLink() string {
	if target.ContentType == WRAPPER_DOCUMENT {
		return target.Document.FigmaLink
	} else {
		return target.Contract.FigmaLink
	}
}

func (target *TargetWrapper) GetId() primitive.ObjectID {
	if target.ContentType == WRAPPER_DOCUMENT {
		return target.Document.Id
	} else {
		return target.Contract.Id
	}
}
