package backend

import (
	"context"
	"errors"

	// "log"
	"os"

	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FigmaAuthResp struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
}

func (s *BackServer) ConnectFigma(ctx context.Context, req *comms.FigmaConnectRequest) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)

	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, err
	}

	client := &http.Client{}
	base := os.Getenv("FRONTEND_URL")
	if os.Getenv("NEXT_PUBLIC_DEBUG") == "true" {
		base = "http://localhost:3000"
	}

	url := fmt.Sprintf(
		"https://www.figma.com/api/oauth/token?client_id=%s&client_secret=%s&redirect_uri=%s/figma/oauth-callback&code=%s&grant_type=authorization_code",
		os.Getenv("NEXT_PUBLIC_FIGMA_ID"),
		os.Getenv("NEXT_PUBLIC_FIGMA_SECRET"),
		base,
		req.FigmaCode)

	figma_req, err := http.NewRequest(
		"POST",
		url,
		nil,
	)
	figma_req.Header.Add("Accept", "application/json")
	figma_req.Header.Add("Content-Type", "application/json")

	resp, err := client.Do(figma_req)
	if err != nil {
		fmt.Print(err.Error())
	}

	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Print(err.Error())
	}

	var responseObject FigmaAuthResp
	json.Unmarshal(bodyBytes, &responseObject)

	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{
		{"figma_connected", true},
		{"figma_code", responseObject.AccessToken},
		{"figma_expire_in", responseObject.ExpiresIn},
		{"figma_refresh_code", responseObject.RefreshToken},
	}}}
	_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)
	return &comms.NullResponse{}, nil
}

func (s *BackServer) SetFigmaConnected(ctx context.Context, req *comms.FigmaFileConnectRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
	}
	if (contract.Worker != nil && contract.Worker.Id != user.Id) && (contract.Buyer != nil && contract.Buyer.Id != user.Id) {
		return nil, errors.New("User is not part of contract")
	}
	contract.FigmaConnected = true
	contract.FigmaLink = req.FigmaLink
	filter := bson.D{{"_id", contract.Id}}
	update := bson.D{{"$set", bson.D{
		{"figma_link", contract.FigmaLink},
	}}}

	_, err = database.Collection(db.CON_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return nil, err
	}

	err = s.ChatAgent.SendFigmaLinkMessage(db.CastContract(contract), user, database)
	if err != nil {
		return nil, err
	}

	return &comms.ContractEditResponse{}, nil
}

func (s *BackServer) SetItemFigmaNodes(ctx context.Context, req *comms.FigmaItemRequest) (*comms.ContractEditResponse, error) {
	database := s.dbClient.Database(s.dbName)

	item_id, err := primitive.ObjectIDFromHex(req.ItemId)
	if err != nil {
		return nil, errors.New("Invalid item id")
	}

	user, contract, err := pullUserContract(req.UserId, req.ContractId, database)
	if err != nil {
		return nil, err
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

	cur_item.FigmaComponentId = req.ComponentId
	if err = cur_item.Replace(database); err != nil {
		return nil, errors.New("Could not save item nodes")
	}

	if err = s.ChatAgent.SendFigmaItemNodesMessage(user, contract, cur_item, database); err != nil {
		return nil, errors.New("Couldn't broadcast Items Message")
	}

	return &comms.ContractEditResponse{}, nil
}
