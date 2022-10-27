package database

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

const (
	WORKER = uint32(0)
	BUYER  = uint32(1)
	ADMIN  = uint32(2)
)

const (
	ADMIN_ROLE  = 7 // 111
	STD_ROLE    = 3 // 011
	UNAUTH_ROLE = 1 //001
)

type User struct {
	Username  string             `bson:"username"`
	Id        primitive.ObjectID `bson:"_id,omitempty"`
	Type      uint32             `bson:"user_type"`
	Role      uint32             `bson:"role"`
	Password  string             `bson:"password"`
	Email     string             `bson:"email"`
	FullName  string             `bson:"full_name"`
	Instagram InstagramNub       `bson:"instagram"`
	Tiktok    TiktokNub          `bson:"tiktok"`
	Payment   PaymentNub         `bson:"payment"`

	Active_token string `bson:"-"`

	AdminStatus bool `bson:"admin_status"`
}

func (user *User) Handle() *UserHandle {
	userHandle := &UserHandle{}
	if user == nil {
		return userHandle
	}
	userHandle.Id = user.Id
	userHandle.Username = user.Username
	return userHandle
}

func (user *User) Nub(author_status bool) *UserNub {
	userNub := &UserNub{}
	if user == nil {
		return userNub
	}
	userNub.Id = user.Id
	userNub.Username = user.Username
	userNub.Author = author_status
	userNub.Type = user.Type

	return userNub
}

type PaymentNub struct {
	CardNumber string    `bson: card_number`
	CardHolder string    `bson: card_holder`
	Expiration time.Time `bson: expiration_date`
	CVV        string    `bson: CVV`
	Zip        string    `bson: zipcode`
}

type InstagramNub struct {
	Account   string `bson:"account"`
	Verified  bool   `bson:"verified"`
	Followers uint32 `bson:"followers"`
}

type TiktokNub struct {
	Account   string `bson:"account"`
	Verified  bool   `bson:"verified"`
	Followers uint32 `bson:"followers"`
}

// DB Functions, general style is operation params, collection -> error
func UserEmailCheck(username, email string, collection *mongo.Collection) error {
	var user *User
	filter := bson.M{"email": email}
	var err error
	if err = collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil
	}
	if user.Email == email {
		return &ErrorUserWithEmailAlreadyExists{email: email}
	}
	return nil
}

func UserQueryUsername(username, password string, collection *mongo.Collection) (*User, error) {
	var user *User
	filter := bson.D{{"username", username}}
	var err error
	if err = collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, &ErrorUserNotFound{username: username}
	}

	if password != "" {
		if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			return nil, &ErrorPasswordIncorrect{username: username, password: password}
		}
	}
	return user, nil
}

func UserQueryId(id primitive.ObjectID, collection *mongo.Collection) (*User, error) {
	var user *User
	filter := bson.D{{"_id", id}}
	if err := collection.FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, &ErrorUserNotFound{id: id}
	}
	return user, nil
}

func UserInsert(username, password, email, full_name string, user_type uint32, collection *mongo.Collection) (*User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 8)
	if err != nil {
		return nil, err
	}

	userD := &User{
		Username: username,
		Password: string(hashedPassword),
		Email:    email,
		FullName: full_name,
		Type:     user_type,
		Role:     STD_ROLE,
	}

	res, err := collection.InsertOne(context.TODO(), userD)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert User: \nusername: %s, \npassword: %s, \nemail: %s", username, password, email)))
		return nil, err
	} else {
		id := res.InsertedID
		switch val := id.(type) {
		case primitive.ObjectID:
			userD.Id = val
		default:
			log.Println(color.Ize(color.Red, fmt.Sprintf("Generated User %s did not have a valid generated id", userD.Username)))
		}
		return userD, nil
	}
}

func UserAddInstagram(id primitive.ObjectID, insta_name string, followers uint32, verifed bool, collection *mongo.Collection) error {
	filter := bson.D{{"_id", id}}
	instaNub := InstagramNub{
		Account:   insta_name,
		Followers: followers,
		Verified:  verifed,
	}
	update := bson.D{{"$set", bson.D{{"instagram", instaNub}}}}
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}
func UserAddTiktok(id primitive.ObjectID, tiktok_name string, followers uint32, verifed bool, collection *mongo.Collection) error {
	filter := bson.D{{"_id", id}}
	tiktokNub := TiktokNub{
		Account:   tiktok_name,
		Followers: followers,
		Verified:  verifed,
	}
	update := bson.D{{"$set", bson.D{{"tiktok", tiktokNub}}}}
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}
func UserVerifyInstagram(id primitive.ObjectID, verified bool, collection *mongo.Collection) (string, uint32, error) {
	user, err := UserQueryId(id, collection)
	if err != nil {
		return "", 0, err
	}

	if user.Instagram.Account == "" {
		return "", 0, GenErrorInvalidSocialVerify("Instagram", user.Username)
	}

	instagramNub := user.Instagram
	instagramNub.Verified = verified

	filter := bson.M{"_id": id}
	update := bson.D{{"$set", bson.D{{"instagram", instagramNub}}}}
	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return "", 0, err
	}
	return user.Instagram.Account, user.Instagram.Followers, nil
}
func UserVerifyTiktok(id primitive.ObjectID, verified bool, collection *mongo.Collection) (string, uint32, error) {
	user, err := UserQueryId(id, collection)
	if err != nil {
		return "", 0, err
	}

	if user.Tiktok.Account == "" {
		return "", 0, GenErrorInvalidSocialVerify("Tiktok", user.Username)
	}

	tiktokNub := user.Tiktok
	tiktokNub.Verified = verified

	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"tiktok", tiktokNub}}}}
	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return "", 0, err
	}
	return user.Tiktok.Account, user.Tiktok.Followers, nil
}

func UserAddPayment(
	id primitive.ObjectID,
	card_number string,
	card_holder string,
	exp_date time.Time,
	zip string,
	cvv string,
	collection *mongo.Collection) error {

	filter := bson.D{{"_id", id}}
	paymentNub := PaymentNub{
		CardNumber: card_number,
		CardHolder: card_holder,
		Expiration: exp_date,
		Zip:        zip,
		CVV:        cvv,
	}
	update := bson.D{{"$set", bson.D{{"payment", paymentNub}}}}
	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}
	return nil
}
