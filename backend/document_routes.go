package backend

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *BackServer) CreateDoc(ctx context.Context, req *comms.DocumentCreateRequest) (*comms.DocumentEntity, error) {
	userId, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		return nil, errors.New("You must provide a valid User Id")
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryId(userId, database)
	if err != nil {
		return nil, err
	}

	doc, err := db.DocumentInsert(req, user, s.dbClient.Database(s.dbName))
	if err != nil {
		return nil, err
	}
	return doc.Proto(), nil

}

func (s *BackServer) QueryDocById(ctx context.Context, req *comms.QueryByIdRequest) (*comms.DocumentEntity, error) {
	doc_id, err := primitive.ObjectIDFromHex(req.Id)
	if err != nil {
		return nil, errors.New("invalid contract id")
	}
	// user_id, err := primitive.ObjectIDFromHex(req.UserId)
	// if err != nil {
	// 	return nil, errors.New("invalid user id")
	// }

	database := s.dbClient.Database(s.dbName)

	doc, err := db.DocumentById(doc_id, database)
	if err != nil {
		return nil, err
	}

	// found := false
	// for _, id := doc.UserIds {
	// 	if id == user_id {
	// 		found = true
	// 		break
	// 	}
	// }
	// if !found {

	// }
	return doc.Proto(), nil
}

func (s *BackServer) QueryDocsByUser(ctx context.Context, req *comms.QueryByUserRequest) (*comms.DocumentNubSet, error) {
	user_id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Invalid user id for contract query")))
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	docs, err := db.DocumentsByUser(user_id, database)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Error querying contracts: %s", err.Error())))
		return nil, err
	}
	user, err := db.UserQueryId(user_id, database)
	if err != nil {
		return nil, err
	}
	log.Printf("%d documents queried successfully", len(docs))

	if !req.Unsorted {
		docs = db.SortDocumnets(docs)
	}

	docNubs := make([]*comms.DocumentNub, len(docs))
	for idx, doc := range docs {
		docNub, err := doc.NubProto(user)
		if err != nil {
			return nil, err
		}
		docNubs[idx] = docNub
	}
	log.Println("Contracts nubbed successfully")
	return &comms.DocumentNubSet{
		DocumentNubs: docNubs,
	}, nil
}
