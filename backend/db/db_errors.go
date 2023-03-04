package database

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	USERS_COL    = "users"
	ITEM_COL     = "contract_items"
	DEADLINE_COL = "contract_deadlines"
	CON_COL      = "contracts"

	ROOM_COL       = "chat_rooms"
	MSG_COL        = "chat_messages"
	PROF_IMAGE_COL = "prof_images"

	CHARGE_COL = "internal_charge_col"
)

// Errors:
type ErrorUserNotFound struct {
	username string
	email    string
	id       primitive.ObjectID
}

func (e *ErrorUserNotFound) Error() string {
	if e.username != "" {
		return fmt.Sprintf("There is no registered user with email or username '%s'", e.username)
	} else if e.email != "" {
		return fmt.Sprintf("There is no registered user with username or email '%s'", e.email)
	} else {
		return fmt.Sprintf("User not found with id %s in DB", e.id)
	}

}

type ErrorInvalidSocialVerify struct {
	social   string
	username string
}

func GenErrorInvalidSocialVerify(social, username string) error {
	return &ErrorInvalidSocialVerify{social: social}
}

func (e *ErrorInvalidSocialVerify) Error() string {
	return fmt.Sprintf("You can't verify %s for %s without registering it first", e.social, e.username)
}

type ErrorUserAlreadyExists struct {
	username string
}

func GenErrorUserAlreadyExists(username string) error {
	return &ErrorUserAlreadyExists{username: username}
}

func (e *ErrorUserAlreadyExists) Error() string {
	return fmt.Sprintf("User with username %s already exists in DB", e.username)
}

type ErrorPasswordIncorrect struct {
	username string
	password string
}

func (e *ErrorPasswordIncorrect) Error() string {
	return "That's the wrong password!"
}

type ErrorUserWithEmailAlreadyExists struct {
	email string
}

func (e *ErrorUserWithEmailAlreadyExists) Error() string {
	return fmt.Sprintf("There is already an account for the email %s", e.email)
}
