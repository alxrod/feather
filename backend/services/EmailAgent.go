package services

import (
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"crypto/tls"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	db "github.com/alxrod/feather/backend/db"
	"github.com/google/uuid"

	gomail "gopkg.in/mail.v2"
)

type Email struct {
	Recipient string
	Subject   string
	BodyType  string
	Body      string
}

type TempLink struct {
	id         uuid.UUID
	link       string
	expiration time.Time
	user_id    primitive.ObjectID
	user_email string
}

type EmailAgent struct {
	Database *mongo.Database
	Config   *tls.Config

	SenderEmail string
	Password    string
	RootURL     string

	ResetLinks []*TempLink

	INTERVAL_TIME uint32
}

func (agent *EmailAgent) Initialize(config *tls.Config, db *mongo.Database) error {
	agent.Database = db
	agent.Config = config

	agent.SenderEmail = os.Getenv("EMAIL")
	agent.Password = os.Getenv("EMAIL_PWORD")
	agent.RootURL = os.Getenv("ROOT_URL")
	log.Printf("ROOT URL IS %s", agent.RootURL)

	// Intervals
	agent.INTERVAL_TIME = 1

	return nil
}

func (agent *EmailAgent) StartExpirationChecker() {
	go agent.CheckExpirations()
}

func (agent *EmailAgent) CheckExpirations() {
	for {
		remaining_links := make([]*TempLink, 0)
		for _, link := range agent.ResetLinks {
			if link.expiration.Before(time.Now()) {
				remaining_links = append(remaining_links, link)
			}
		}
		time.Sleep(time.Minute * time.Duration(agent.INTERVAL_TIME))
	}
}

func (agent *EmailAgent) CheckResetId(reset_id uuid.UUID) bool {
	exists := false
	for _, link := range agent.ResetLinks {
		if link.id == reset_id {
			exists = true
		}
	}
	return exists
}

func (agent *EmailAgent) GetUserId(reset_id uuid.UUID) (primitive.ObjectID, error) {
	for _, link := range agent.ResetLinks {
		if link.id == reset_id {
			return link.user_id, nil
		}
	}
	return primitive.ObjectID{}, errors.New("invalid reset id")
}

func (agent *EmailAgent) SendEmail(email *Email) error {
	m := gomail.NewMessage()

	log.Printf("Sending email to %s", email.Recipient)

	m.SetHeader("From", agent.SenderEmail)
	m.SetHeader("To", email.Recipient)
	m.SetHeader("Subject", email.Subject)
	m.SetBody(email.BodyType, email.Body)

	d := gomail.NewDialer("smtp.gmail.com", 587, agent.SenderEmail, agent.Password)
	d.TLSConfig = agent.Config

	if err := d.DialAndSend(m); err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (agent *EmailAgent) CreateResetLink(user *db.User) (string, error) {
	new_id := uuid.New()
	new_link := &TempLink{
		id:         new_id,
		link:       fmt.Sprintf("/reset-password/%s", new_id.String()),
		user_id:    user.Id,
		user_email: user.Email,
		expiration: time.Now().Add(time.Minute * 5),
	}

	if err := agent.SendResetEmail(new_link); err != nil {
		return "", err
	}

	exists := false
	for idx, link := range agent.ResetLinks {
		if link.user_id == user.Id {
			agent.ResetLinks[idx] = new_link
			exists = true
		}
	}
	if !exists {
		agent.ResetLinks = append(agent.ResetLinks, new_link)
	}
	return new_link.link, nil
}

func (agent *EmailAgent) SendResetEmail(link *TempLink) error {
	email := &Email{
		Recipient: link.user_email,
		Subject:   "Feather Password Reset",
		BodyType:  "text/plain",
		Body: fmt.Sprintf(
			"Click this link to reset your password: \n %s%s",
			agent.RootURL,
			link.link,
		),
	}
	if err := agent.SendEmail(email); err != nil {
		return err
	}
	return nil
}
