package database

import (
	"context"
	"fmt"
	"log"

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
	BOTH   = uint32(3)
	ADMIN  = uint32(2)
)

const (
	ADMIN_ROLE  = 7 // 111
	STD_ROLE    = 3 // 011
	UNAUTH_ROLE = 1 //001
)

type User struct {
	Username string             `bson:"username"`
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	Role     uint32             `bson:"role"`
	Password string             `bson:"password"`
	Email    string             `bson:"email"`

	FirstName   string  `bson:"first_name"`
	LastName    string  `bson:"last_name"`
	PhoneNumber string  `bson:"phone"`
	DOB         *DOBNub `bson:"DOB"`

	Active_token string `bson:"-"`
	AdminStatus  bool   `bson:"admin_status"`

	ProfilePhotoUploaded bool               `bson:"profile_photo_uploaded"`
	ProfilePhotoId       primitive.ObjectID `bson:"profile_photo_id,omitempty"`
	ProfilePhoto         *ProfileImage      `bson:"-"`

	BuyerModeRequested  bool `bson:"buyer_mode_requested"`
	WorkerModeRequested bool `bson:"worker_mode_requested"`
	BuyerModeEnabled    bool `bson:"buyer_mode_enabled"`
	WorkerModeEnabled   bool `bson:"worker_mode_enabled"`

	// ================================= STRIPE INFO =================================
	StripeCustomerId         string `bson:"stripe_customer_id,omitempty"`
	StripeConnectedAccountId string `bson:"stripe_account_id,omitempty"`

	StripeDefaultFCA string   `bson:"default_fca,omitempty"`
	StripeFCAlist    []string `bson:"fca_ids,omitempty"`
	// ================================================================================
}

func (user *User) Proto() *comms.UserEntity {
	if user.Id.IsZero() {
		return &comms.UserEntity{}
	}
	resp := &comms.UserEntity{
		Id:       user.Id.Hex(),
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,

		FirstName:   user.FirstName,
		LastName:    user.LastName,
		PhoneNumber: user.PhoneNumber,
		Dob:         user.DOB.Proto(),

		AdminStatus:          user.AdminStatus,
		ProfilePhotoUploaded: user.ProfilePhotoUploaded,

		WorkerModeRequested: user.WorkerModeRequested,
		BuyerModeRequested:  user.BuyerModeRequested,
		WorkerModeEnabled:   user.WorkerModeEnabled,
		BuyerModeEnabled:    user.BuyerModeEnabled,
	}

	if user.ProfilePhotoUploaded && !user.ProfilePhotoId.IsZero() {
		resp.ProfilePhotoId = user.ProfilePhotoId.Hex()
		resp.ProfilePhoto = user.ProfilePhoto.Proto()
	}

	if user.BuyerModeRequested {
		resp.DefaultFca = user.StripeDefaultFCA
	}

	resp.PaymentSetup = false
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
	if user.ProfilePhoto != nil && user.ProfilePhoto.InCache {
		userNub.PhotoUrl = user.ProfilePhoto.CacheUrl
		userNub.HasPhoto = true
	}

	return userNub
}

type DOBNub struct {
	Day   uint32 `bson: "day"`
	Month uint32 `bson:"month"`
	Year  uint32 `bson:"year"`
}

func (nub *DOBNub) Proto() *comms.DOBEntity {
	if nub == nil {
		return &comms.DOBEntity{}
	}
	return &comms.DOBEntity{
		Day:   nub.Day,
		Month: nub.Month,
		Year:  nub.Year,
	}
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

func UserChangePassword(id primitive.ObjectID, password string, database *mongo.Database) (*User, error) {
	user, err := UserQueryId(id, database)
	if err != nil {
		return nil, err
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 8)
	if err != nil {
		return nil, err
	}
	user.Password = string(hashedPassword)

	filter := bson.D{{"_id", id}}
	update := bson.D{{"$set", bson.D{{"password", user.Password}}}}
	_, err = database.Collection(USERS_COL).UpdateOne(context.TODO(), filter, update)

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
		} else {
			user.ProfilePhoto = profilePhoto
		}
	}
	return user, nil
}

func UserInsert(req *comms.UserRegisterRequest, database *mongo.Database) (*User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 8)
	if err != nil {
		return nil, err
	}

	userD := &User{
		Username:    req.Username,
		Password:    string(hashedPassword),
		Email:       req.Email,
		FirstName:   req.FirstName,
		LastName:    req.LastName,
		PhoneNumber: req.PhoneNumber,

		DOB: &DOBNub{
			Day:   req.Dob.Day,
			Month: req.Dob.Month,
			Year:  req.Dob.Year,
		},
	}

	res, err := database.Collection(USERS_COL).InsertOne(context.TODO(), userD)
	if err != nil {
		log.Println(color.Ize(color.Red, fmt.Sprintf("Failed to Insert User: \nusername: %s", req.Username)))
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
