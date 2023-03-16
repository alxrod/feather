package backend

import (
	"context"
	"errors"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) SetFigmaLink(ctx context.Context, req *comms.FigmaLinkRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if contract.Worker.Id != user.Id && contract.Buyer.Id != user.Id {
		return nil, errors.New("User is not part of contract")
	}
	contract.FigmaLink = req.FigmaLink
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{
		{"figma_link", req.FigmaLink},
	}}}
	_, err = database.Collection(db.CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}
	err = s.ChatAgent.SendFigmaLinkMessage(contract, user, database)
	if err != nil {
		return nil, err
	}
	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) SetItemFigmaNodes(ctx context.Context, req *comms.FigmaItemRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)
	contract_id, err := primitive.ObjectIDFromHex(req.ContractId)
	if err != nil {
		return nil, errors.New("Invalid contract id")
	}
	item_id, err := primitive.ObjectIDFromHex(req.ItemId)
	if err != nil {
		return nil, errors.New("Invalid user id")
	}
	contract, err := db.ContractById(contract_id, database)
	if err != nil {
		return nil, err
	}
	if contract.InvitePassword != req.ContractSecret {
		return nil, errors.New("The provided contract secret is invalid")
	}

	var cur_item *db.ContractItem
	for _, item := range contract.Items {
		if item.Id == item_id {
			cur_item = item
			break
		}
	}
	if cur_item == nil {
		return nil, errors.New("This contract item not a member of the requested contract")
	}

	cur_item.FigmaNodeIds = req.NodeIds
	if err = cur_item.Replace(database); err != nil {
		return nil, errors.New("Could not save item nodes")
	}

	if err = s.ChatAgent.SendFigmaItemNodesMessage(contract, cur_item, database); err != nil {
		return nil, errors.New("Couldn't broadcast Items Message")
	}

	return &comms.ContractEditResponse{}, nil
}
