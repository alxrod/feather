package backend

import (
	"errors"

	db "github.com/alxrod/feather/backend/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func UnpackUDD(u_id, de_id, do_id string, database *mongo.Database) (*db.User, *db.Deadline, *db.Document, error) {
	var user *db.User
	var deadline *db.Deadline
	var document *db.Document

	user_id, err := primitive.ObjectIDFromHex(u_id)
	if err != nil && u_id != "IGNORE" {
		return nil, nil, nil, err
	} else if u_id != "IGNORE" {
		user, err = db.UserQueryId(user_id, database)
		if err != nil {
			return nil, nil, nil, errors.New("Couldn't find user in DB")
		}
	}

	deadline_id, err := primitive.ObjectIDFromHex(de_id)
	if err != nil && de_id != "IGNORE" {
		return nil, nil, nil, err
	} else if de_id != "IGNORE" {
		deadline, err = db.DeadlineById(deadline_id, database)
		if err != nil {
			return nil, nil, nil, errors.New("Couldn't find deadline in DB")
		}
	}

	doc_id, err := primitive.ObjectIDFromHex(do_id)
	if err != nil && do_id != "IGNORE" {
		return nil, nil, nil, err
	} else if do_id != "IGNORE" {
		document, err = db.DocumentById(doc_id, database)
		if err != nil {
			return nil, nil, nil, errors.New("Couldn't find document in DB")
		}
	}

	return user, deadline, document, nil

}

func UnpackUID(u_id, i_id, do_id string, database *mongo.Database) (*db.User, *db.Item, *db.Document, error) {
	var user *db.User
	var item *db.Item
	var document *db.Document

	user_id, err := primitive.ObjectIDFromHex(u_id)
	if err != nil && u_id != "IGNORE" {
		return nil, nil, nil, err
	} else if u_id != "IGNORE" {
		user, err = db.UserQueryId(user_id, database)
		if err != nil {
			return nil, nil, nil, errors.New("Couldn't find user in DB")
		}
	}

	item_id, err := primitive.ObjectIDFromHex(i_id)
	if err != nil && i_id != "IGNORE" {
		return nil, nil, nil, err
	} else if i_id != "IGNORE" {
		item, err = db.ItemById(item_id, database.Collection(db.ITEM_COL))
		if err != nil {
			return nil, nil, nil, errors.New("Couldn't find item in DB")
		}
	}

	doc_id, err := primitive.ObjectIDFromHex(do_id)
	if err != nil && do_id != "IGNORE" {
		return nil, nil, nil, err
	} else if do_id != "IGNORE" {
		document, err = db.DocumentById(doc_id, database)
		if err != nil {
			return nil, nil, nil, errors.New("Couldn't find document in DB")
		}
	}

	return user, item, document, nil

}

func UnpackUserDoc(u_id, do_id string, database *mongo.Database) (*db.User, *db.Document, error) {
	var user *db.User
	var document *db.Document

	user_id, err := primitive.ObjectIDFromHex(u_id)
	if err != nil && u_id != "IGNORE" {
		return nil, nil, err
	} else if u_id != "IGNORE" {
		user, err = db.UserQueryId(user_id, database)
		if err != nil {
			return nil, nil, errors.New("Couldn't find user in DB")
		}
	}

	doc_id, err := primitive.ObjectIDFromHex(do_id)
	if err != nil && do_id != "IGNORE" {
		return nil, nil, err
	} else if do_id != "IGNORE" {
		document, err = db.DocumentById(doc_id, database)
		if err != nil {
			return nil, nil, errors.New("Couldn't find document in DB")
		}
	}

	return user, document, nil

}
