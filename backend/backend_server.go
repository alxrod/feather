package backend

import (
	"context"
	"crypto/tls"
	"log"
	"net"
	"time"

	"github.com/TwiN/go-color"

	db "github.com/alxrod/feather/backend/db"
	interceptors "github.com/alxrod/feather/backend/interceptors"
	services "github.com/alxrod/feather/backend/services"
	comms "github.com/alxrod/feather/communication"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const debug = false

// Update this to use .env value
const (
	secretKey     = "my_secret_key"
	tokenDuration = 15 * time.Minute
)

func accessibleRoles() map[string]uint32 {

	return map[string]uint32{
		"/main.Auth/Pull":              db.STD_ROLE,
		"/main.Social/AddInstagram":    db.STD_ROLE,
		"/main.Social/AddTiktok":       db.STD_ROLE,
		"/main.Social/VerifyInstagram": db.STD_ROLE,
		"/main.Social/VerifyTiktok":    db.STD_ROLE,
		"/main.Payment/SetupPayment":   db.STD_ROLE,
	}
}

type BackServer struct {
	comms.UnimplementedSocialServer
	comms.UnimplementedPaymentServer
	comms.UnimplementedAuthServer
	comms.UnimplementedContractServer
	comms.UnimplementedChatServer

	JwtManager *services.JWTManager
	ChatAgent  *services.ChatAgent

	GrpcSrv  *grpc.Server
	lis      net.Listener
	dbClient *mongo.Client
	dbName   string
	dbCtx    context.Context
}

func NewBackServer(server_cert, server_key, addr string, dbName ...string) (*BackServer, error) {
	jwtManager := services.NewJWTManager(secretKey, tokenDuration)

	grpcServer, err := NewGrpcServer(server_cert, server_key, jwtManager)
	if err != nil {
		return nil, err
	}

	lis, err := net.Listen("tcp", addr)
	if err != nil {
		return nil, err
	}

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://127.0.0.1:27017"))
	if err != nil {
		return nil, err
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	s := &BackServer{
		lis:        lis,
		GrpcSrv:    grpcServer,
		JwtManager: jwtManager,
		dbClient:   client,
		dbCtx:      ctx,
	}
	if len(dbName) == 1 {
		s.dbName = dbName[0]
	} else {
		s.dbName = "testing"
	}
	// Have to add this for every service
	comms.RegisterSocialServer(grpcServer, s)
	comms.RegisterAuthServer(grpcServer, s)
	comms.RegisterPaymentServer(grpcServer, s)
	comms.RegisterContractServer(grpcServer, s)
	comms.RegisterChatServer(grpcServer, s)

	return s, nil
}

func NewGrpcServer(pemPath, keyPath string, jwtManager *services.JWTManager) (*grpc.Server, error) {
	var cred credentials.TransportCredentials
	var err error
	if debug {
		log.Println(color.Ize(color.Yellow, "Running without TLS"))
		cred = credentials.NewTLS(&tls.Config{
			InsecureSkipVerify: true,
		})
	} else {
		cred, err = credentials.NewServerTLSFromFile(pemPath, keyPath)
		if err != nil {
			return nil, err
		}
	}

	authIntercept := interceptors.NewAuthInterceptor(jwtManager, accessibleRoles())

	s := grpc.NewServer(
		grpc.Creds(cred),
		grpc.UnaryInterceptor(authIntercept.Unary()),
		grpc.StreamInterceptor(authIntercept.Stream()),
	)

	return s, nil
}

func (s *BackServer) Serve() {
	log.Println(color.Ize(color.Green, "Serving Backend on 127.0.0.1:9990"))
	log.Fatal(s.GrpcSrv.Serve(s.lis))
}

func (s *BackServer) Shutdown() {
	s.dbClient.Disconnect(s.dbCtx)
}
