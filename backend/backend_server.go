package backend

import (
	"context"
	"crypto/tls"
	"log"
	"net"
	"time"

	"github.com/TwiN/go-color"
	comms "github.com/alxrod/feather/communication"
	"github.com/alxrod/feather/interceptors"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const debug = false

// Update this to use .env value
var JwtKey = []byte("my_secret_key")

const timeout_minutes = 5

type BackServer struct {
	comms.UnimplementedSocialServer
	comms.UnimplementedPaymentServer
	comms.UnimplementedAuthServer

	GrpcSrv  *grpc.Server
	lis      net.Listener
	dbClient *mongo.Client
	dbName   string
	dbCtx    context.Context
}

func NewBackServer(server_cert, server_key, addr string, dbName ...string) (*BackServer, error) {
	grpcServer, err := NewGrpcServer(server_cert, server_key)
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
		lis:      lis,
		GrpcSrv:  grpcServer,
		dbClient: client,
		dbCtx:    ctx,
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

	return s, nil
}

func NewGrpcServer(pemPath, keyPath string) (*grpc.Server, error) {
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

	pc := interceptors.PingCounter{}
	s := grpc.NewServer(
		grpc.Creds(cred),

		grpc.ChainUnaryInterceptor(
			pc.ServerCount,
			interceptors.LogRequest,
		),
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
