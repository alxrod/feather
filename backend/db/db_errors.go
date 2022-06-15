package database

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Errors:
type ErrorUserNotFound struct {
	username string
	id       primitive.ObjectID
}

func (e *ErrorUserNotFound) Error() string {
	if e.username != "" {
		return fmt.Sprintf("User not found with username %s in DB", e.username)
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
	return fmt.Sprintf("User %s does not have the password %s in DB", e.username, e.password)
}

type ErrorUserWithEmailAlreadyExists struct {
	email string
}

func (e *ErrorUserWithEmailAlreadyExists) Error() string {
	return fmt.Sprintf("There is already an account for the email %s", e.email)
}
