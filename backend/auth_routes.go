package backend

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/TwiN/go-color"
	db "github.com/alxrod/feather/backend/db"
	comms "github.com/alxrod/feather/communication"

	"github.com/dgrijalva/jwt-go"
)

func (s *BackServer) Register(ctx context.Context, req *comms.UserRegisterRequest) (*comms.UserRegisterResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection("users")
	if err := db.UserEmailCheck(req.Username, req.Email, userCollection); err != nil {
		return &comms.UserRegisterResponse{
			Success:  false,
			Error:    err.Error(),
			Token:    "",
			Username: "",
		}, nil
	}

	_, err := db.UserQueryUsername(req.Username, req.Password, userCollection)
	switch err.(type) {
	case *db.ErrorUserNotFound:
		user, err := db.UserInsert(req.Username, req.Password, req.Email, req.FullName, req.UserType, userCollection)
		if err != nil {
			return &comms.UserRegisterResponse{
				Success:  false,
				Error:    err.Error(),
				Token:    "",
				Username: "",
			}, nil
		}
		tkn, err := GenJWTToken(user.Username)
		if err != nil {
			return nil, err
		}

		return &comms.UserRegisterResponse{
			Success:  true,
			Error:    "",
			Token:    tkn,
			Username: user.Username,
		}, nil

	// Handles nil case, meaning user query was successful, user already exists
	default:
		return &comms.UserRegisterResponse{
			Success:  false,
			Error:    db.GenErrorUserAlreadyExists(req.Username).Error(),
			Token:    "",
			Username: "",
		}, nil
	}
}

func (s *BackServer) Login(ctx context.Context, req *comms.UserLoginRequest) (*comms.UserLoginResponse, error) {
	userCollection := s.dbClient.Database(s.dbName).Collection("users")
	user, err := db.UserQueryUsername(req.Username, req.Password, userCollection)
	if err != nil {
		log.Println(color.Ize(color.Yellow, fmt.Sprintf("Returning error: %s", err.Error())))
		return &comms.UserLoginResponse{
			Success:  false,
			Error:    err.Error(),
			Token:    "",
			Username: "",
		}, nil
	}
	tkn, err := GenJWTToken(user.Username)
	if err != nil {
		return &comms.UserLoginResponse{
			Success:  false,
			Error:    err.Error(),
			Token:    "",
			Username: "",
		}, nil
	}
	return &comms.UserLoginResponse{
		Success:  true,
		Error:    "",
		Token:    tkn,
		Username: user.Username,
	}, nil

}
func (s *BackServer) Logout(ctx context.Context, req *comms.UserLogoutRequest) (*comms.UserLogoutResponse, error) {
	username, err := DecodeJWT(req.Token)
	if err != nil || username != req.Username {
		return &comms.UserLogoutResponse{
			Success: false,
			Error:   "Invalid Token",
		}, nil
	}
	return &comms.UserLogoutResponse{
		Success: true,
		Error:   "",
	}, nil
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func GenJWTToken(username string) (string, error) {
	expirationTime := time.Now().Add(timeout_minutes * time.Minute)
	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the algorithm used for signing, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func DecodeJWT(tknStr string) (string, error) {
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return JwtKey, nil
	})
	if err != nil {
		return "", err
	}
	if !tkn.Valid {
		return "", errors.New("Invalid toke!")
	}

	return claims.Username, nil
}
