package backend

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"net"
	"os"
	"time"

	"github.com/TwiN/go-color"

	interceptors "github.com/alxrod/feather/backend/interceptors"
	services "github.com/alxrod/feather/backend/services"
	comms "github.com/alxrod/feather/communication"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const debug = false

// Update this to use .env value
const (
	secretKey     = "my_secret_key"
	tokenDuration = 15 * time.Minute
)

// All the public
func accessibleRoles() []string {

	return []string{
		"/communication.Auth/Register",
		"/communication.Auth/Login",
		"/communication.Contract/InviteQuery",
		"/communication.Auth/ForgotPassword",
		"/communication.Auth/ConfirmResetId",
		"/communication.Auth/ChangePassword",
	}
}

type BackServer struct {
	comms.UnimplementedAuthServer

	comms.UnimplementedContractServer
	comms.UnimplementedDocumentServer
	comms.UnimplementedDeadlineServer
	comms.UnimplementedItemServer

	comms.UnimplementedChatServer

	comms.UnimplementedFileServiceServer
	comms.UnimplementedStripeServiceServer

	JwtManager    *services.JWTManager
	ChatAgent     *services.ChatAgent
	DeadlineAgent *services.DeadlineAgent

	StripeAgent *services.StripeAgent
	AWSAgent    *services.AWSAgent
	EmailAgent  *services.EmailAgent

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

	dbIP := os.Getenv("DB_IP")
	dbUsername := os.Getenv("DB_USERNAME")
	dbPassword := os.Getenv("DB_PASSWORD")

	credential := options.Credential{
		Username: dbUsername,
		Password: dbPassword,
	}

	opts := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:27017", dbIP))

	if os.Getenv("DB_DEBUG") == "false" {
		opts.SetAuth(credential)
	}
	client, err := mongo.NewClient(opts)

	if err != nil {
		return nil, err
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	s_dbName := ""
	if len(dbName) == 1 {
		s_dbName = dbName[0]
	} else {
		s_dbName = "testing"
	}
	s := &BackServer{
		lis:        lis,
		GrpcSrv:    grpcServer,
		JwtManager: jwtManager,
		ChatAgent: &services.ChatAgent{
			ActiveRooms: map[primitive.ObjectID]*services.CacheEntry{},
		},
		DeadlineAgent: &services.DeadlineAgent{
			Database:      client.Database(s_dbName),
			INTERVAL_TIME: 5,
		},
		AWSAgent:    &services.AWSAgent{},
		EmailAgent:  &services.EmailAgent{},
		StripeAgent: &services.StripeAgent{},

		dbName:   s_dbName,
		dbClient: client,
		dbCtx:    ctx,
	}

	s.StripeAgent.Initialize()
	s.AWSAgent.Initialize()
	// needs to be fixed for actual prod to be valid TLS configs
	s.EmailAgent.Initialize(&tls.Config{
		InsecureSkipVerify: true,
	}, client.Database(s_dbName))

	// Have to add this for every service
	comms.RegisterAuthServer(grpcServer, s)
	comms.RegisterContractServer(grpcServer, s)
	comms.RegisterItemServer(grpcServer, s)
	comms.RegisterDeadlineServer(grpcServer, s)
	comms.RegisterChatServer(grpcServer, s)
	comms.RegisterFileServiceServer(grpcServer, s)
	comms.RegisterStripeServiceServer(grpcServer, s)

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
	s.DeadlineAgent.StartDeadlineLoop(s.ChatAgent.SendDeadlineExpireMessage)
	log.Fatal(s.GrpcSrv.Serve(s.lis))
}

func (s *BackServer) Shutdown() {
	s.dbClient.Disconnect(s.dbCtx)
}
