package backend

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func (s *BackServer) Register(ctx context.Context, req *comms.UserRegisterRequest) (*comms.UserSigninResponse, error) {
	database := s.dbClient.Database(s.dbName)
	if err := db.UserEmailCheck(req.Username, req.Email, database); err != nil {
		return nil, err
	}

	_, err := db.UserQueryUsername(req.Username, req.Password, database)
	switch err.(type) {
	case *db.ErrorUserNotFound:
		user, err := db.UserInsert(req, database)

		if err != nil {
			return nil, err
		}
		tkn, tkn_timeout, err := s.JwtManager.Generate(user)
		if err != nil {
			return nil, err
		}

		if user.WorkerModeRequested {
			log.Printf("Making it worker")
			user, err = s.StripeAgent.CreateConnectedAccount(user, database)
		}
		if user.BuyerModeRequested {
			log.Printf("Making it buyer")
			user, err = s.StripeAgent.CreateCustomer(user, database)
		}
		if err != nil {
			return nil, err
		}

		s.EmailAgent.SendNotificationEmail(
			"user registered",
			fmt.Sprintf("A new user with the email %s and username %s has been registered",
				user.Email,
				user.Username),
		)

		return &comms.UserSigninResponse{
			Token:        tkn,
			TokenTimeout: timestamppb.New(tkn_timeout),
			User:         user.Proto(),
		}, nil

	// Handles nil case, meaning user query was successful, user already exists
	default:
		return nil, errors.New("user already exists")
	}
}

func (s *BackServer) Login(ctx context.Context, req *comms.UserLoginRequest) (*comms.UserSigninResponse, error) {
	database := s.dbClient.Database(s.dbName)
	user, err := db.UserQueryUsername(req.UsernameOrEmail, req.Password, database)
	if err != nil {
		switch err.(type) {
		default:
			return nil, err
		case *db.ErrorUserNotFound:
			user, err = db.UserQueryEmail(req.UsernameOrEmail, req.Password, database)
			if err != nil {
				log.Println(color.Ize(color.Yellow, fmt.Sprintf("Returning error: %s", err.Error())))
				return nil, err
			}
		}
	}
	tkn, tkn_timeout, err := s.JwtManager.Generate(user)
	if err != nil {
		return nil, err
	}
	log.Println(color.Ize(color.Yellow, fmt.Sprintf("Username %s is status %b", user.Username, user.AdminStatus)))

	return &comms.UserSigninResponse{
		Token:        tkn,
		TokenTimeout: timestamppb.New(tkn_timeout),
		User:         user.Proto(),
	}, nil

}
func (s *BackServer) Logout(ctx context.Context, req *comms.UserLogoutRequest) (*comms.UserLogoutResponse, error) {
	return &comms.UserLogoutResponse{}, nil
}

func (s *BackServer) Pull(ctx context.Context, req *comms.UserPullRequest) (*comms.UserEntity, error) {
	database := s.dbClient.Database(s.dbName)
	id, err := primitive.ObjectIDFromHex(req.UserId)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}
	user, err := db.UserQueryId(id, database)
	if err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, err
	}

	if !user.WorkerModeEnabled && user.WorkerModeRequested {
		enabled, err := s.StripeAgent.VerifyConnectedAccountCapabilities(user.StripeConnectedAccountId)
		if err == nil && enabled {
			log.Printf("Stripe Account %s has been approved %b", user.StripeConnectedAccountId, enabled)
			// Note this currently only gets the worker, saves queries by not pulling buyer
			outstanding_charges, err := db.GetUserHoldCharges(user, database)
			if err != nil {
				return nil, err
			}
			for _, icharge := range outstanding_charges {
				_, err := s.StripeAgent.CreateContractTransfer(
					icharge.Worker,
					icharge.Amount,
					icharge.ChargeId,
					icharge.TransferGroup,
				)
				if err != nil {
					log.Println("ERROR: ", err)
					continue
				}
				s.EmailAgent.SendNotificationEmail(
					"outstanding charge transfered",
					fmt.Sprintf("the outstanding charge %s is being transfered to %s's account for a total of %d",
						icharge.Id.Hex(),
						icharge.Worker.Username,
						icharge.Amount,
					),
				)
				icharge.UpdateState(database, db.CHARGE_STATE_TRANSFER_CREATED)
				user.OutstandingBalance -= icharge.Amount
			}

			user.WorkerModeEnabled = enabled
			filter := bson.D{{"_id", id}}
			update := bson.D{{"$set", bson.D{
				{"worker_mode_enabled", user.WorkerModeEnabled},
				{"outstanding_balance", user.OutstandingBalance},
			}}}

			_, err = database.Collection(db.USERS_COL).UpdateOne(context.TODO(), filter, update)

		}
	}
	proto := user.Proto()
	if err != nil {
		return nil, err
	}
	return proto, nil
}

func (s *BackServer) ForgotPassword(ctx context.Context, req *comms.ForgotRequest) (*comms.NullResponse, error) {
	database := s.dbClient.Database(s.dbName)
	filter := bson.D{{"email", req.Email}}

	var err error
	var user *db.User

	if err = database.Collection(db.USERS_COL).FindOne(context.TODO(), filter).Decode(&user); err != nil {
		log.Println(color.Ize(color.Red, err.Error()))
		return nil, errors.New("we do not have that email in our system")
	}

	_, err = s.EmailAgent.CreateResetLink(user)
	if err != nil {
		return nil, err
	}

	return &comms.NullResponse{}, nil

}

func (s *BackServer) ConfirmResetId(ctx context.Context, req *comms.ResetConfirmRequest) (*comms.ResetConfirmResponse, error) {
	id, err := uuid.Parse(req.ResetId)
	if err != nil {
		return &comms.ResetConfirmResponse{
			ValidId: false,
		}, nil
	}
	exists := s.EmailAgent.CheckResetId(id)
	return &comms.ResetConfirmResponse{
		ValidId: exists,
	}, nil
}

func (s *BackServer) ChangePassword(ctx context.Context, req *comms.ChangePasswordRequest) (*comms.UserSigninResponse, error) {
	id, err := uuid.Parse(req.ResetId)
	if err != nil {
		return nil, errors.New("invalid reset id")
	}
	user_id, err := s.EmailAgent.GetUserId(id)
	if err != nil {
		return nil, err
	}

	database := s.dbClient.Database(s.dbName)
	user, err := db.UserChangePassword(user_id, req.NewPassword, database)

	tkn, tkn_timeout, err := s.JwtManager.Generate(user)
	if err != nil {
		return nil, err
	}

	return &comms.UserSigninResponse{
		Token:        tkn,
		TokenTimeout: timestamppb.New(tkn_timeout),
		User:         user.Proto(),
	}, nil

}
