package database

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
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

	ProfilePhotoUploaded bool               `bson:"profile_photo_uploaded"`
	ProfilePhotoId       primitive.ObjectID `bson:"profile_photo_id,omitempty"`
	ProfilePhoto         *ProfileImage      `bson:"-"`
}

func (user *User) Proto() *comms.UserEntity {
	if user.Id.IsZero() {
		return &comms.UserEntity{}
	}
	resp := &comms.UserEntity{
		Id:             user.Id.Hex(),
		Username:       user.Username,
		Email:          user.Email,
		UserType:       user.Type,
		Role:           user.Role,
		FullName:       user.FullName,
		InstaAccount:   user.Instagram.Account,
		InstaFollowers: user.Instagram.Followers,
		InstaVerified:  user.Instagram.Verified,

		TiktokAccount:   user.Tiktok.Account,
		TiktokFollowers: user.Tiktok.Followers,
		TiktokVerified:  user.Tiktok.Verified,

		AdminStatus:          user.AdminStatus,
		ProfilePhotoUploaded: user.ProfilePhotoUploaded,
	}

	if user.ProfilePhotoUploaded && !user.ProfilePhotoId.IsZero() {
		resp.ProfilePhotoId = user.ProfilePhotoId.Hex()
		resp.ProfilePhoto = user.ProfilePhoto.Proto()
	}

	if user.Payment.CardHolder != "" {
		resp.PaymentSetup = true
	} else {
		resp.PaymentSetup = false
	}
	return resp
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
	if user.ProfilePhoto != nil && user.ProfilePhoto.InCache {
		userNub.PhotoUrl = user.ProfilePhoto.CacheUrl
		userNub.HasPhoto = true
	}

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
func UserEmailCheck(username, email string, database *mongo.Database) error {
	var user *User
	filter := bson.M{"email": email}
	var err error
	if err = database.Collection(USERS_COL).FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil
	}
	if user.Email == email {
		return &ErrorUserWithEmailAlreadyExists{email: email}
	}
	return nil
}

func UserQueryUsername(username, password string, database *mongo.Database) (*User, error) {
	var user *User
	filter := bson.D{{"username", username}}
	var err error
	if err = database.Collection(USERS_COL).FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, &ErrorUserNotFound{username: username}
	}

	if password != "" {
		if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			return nil, &ErrorPasswordIncorrect{username: username, password: password}
		}
	}

	user, err = PullProfilePhotoFromDb(user, database)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func UserQueryId(id primitive.ObjectID, database *mongo.Database) (*User, error) {
	var user *User
	filter := bson.D{{"_id", id}}
	if err := database.Collection(USERS_COL).FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, &ErrorUserNotFound{id: id}
	}

	user, err := PullProfilePhotoFromDb(user, database)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func PullProfilePhotoFromDb(user *User, database *mongo.Database) (*User, error) {
	if !user.ProfilePhotoId.IsZero() {
		filter := bson.D{{"_id", user.ProfilePhotoId}}
		var profilePhoto *ProfileImage
		if err := database.Collection(PROF_IMAGE_COL).FindOne(context.TODO(), filter).Decode(&profilePhoto); err != nil {
			log.Println(color.Ize(color.Red, err.Error()))
			return nil, errors.New("profile image for user not found")
		}
		user.ProfilePhoto = profilePhoto
	}
	return user, nil
}

func UserInsert(username, password, email, full_name string, user_type uint32, database *mongo.Database) (*User, error) {
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

	res, err := database.Collection(USERS_COL).InsertOne(context.TODO(), userD)
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
func UserVerifyInstagram(id primitive.ObjectID, verified bool, database *mongo.Database) (string, uint32, error) {
	user, err := UserQueryId(id, database)
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
	_, err = database.Collection(USERS_COL).UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return "", 0, err
	}
	return user.Instagram.Account, user.Instagram.Followers, nil
}
func UserVerifyTiktok(id primitive.ObjectID, verified bool, database *mongo.Database) (string, uint32, error) {
	user, err := UserQueryId(id, database)
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
	_, err = database.Collection(USERS_COL).UpdateOne(context.TODO(), filter, update)
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
