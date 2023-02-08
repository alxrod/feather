package main

import (
	"embed"
	"fmt"
	"log"
	"os"

	BackEndLib "github.com/alxrod/feather/backend"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/stripe/stripe-go/v74"
)

//go:embed ui/featherapp/build
var content embed.FS

func main() {

	key_name := "REACT_APP_STRIPE_PRIVATE_KEY"
	_, found := os.LookupEnv(key_name)
	if !found {
		log.Fatalln("You need to have a private stripe key in your environment first")
	}
	stripe.Key = os.Getenv(key_name)

	// Create backend server
	addr := fmt.Sprintf("%s:9990", os.Getenv("SITE_IP"))
	backend, err := BackEndLib.NewBackServer("cert/server.crt", "cert/server.key", addr)
	defer backend.Shutdown()
	if err != nil {
		log.Fatal(err)
	}
	// Serve it in a seperate thread
	go func() {
		backend.Serve()
	}()

	// Set up a multiplexer to also serve the frontend
	grpcWebServer := grpcweb.WrapServer(backend.GrpcSrv)
	multiplex := &grpcMultiplexer{
		grpcWebServer,
	}

	// Create a front end server
	frontend, err := NewFrontServer(content)
	if err != nil {
		log.Fatal(err)
	}

	// Set up the routes and serve it
	frontend.SetUpHandler(multiplex)
	addr = fmt.Sprintf("%s:8080", os.Getenv("SITE_IP"))
	frontend.Serve(addr)

}
