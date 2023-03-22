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

	key_name := "NEXT_PUBLIC_STRIPE_PRIVATE_KEY"
	_, found := os.LookupEnv(key_name)
	if !found {
		log.Fatalln("You need to have a private stripe key in your environment first")
	}
	stripe.Key = os.Getenv(key_name)

	// Create backend server
	addr := fmt.Sprintf("%s:%s", os.Getenv("GRPC_IP"), os.Getenv("GRPC_PORT"))
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
	grpcWebServer := grpcweb.WrapServer(backend.GrpcSrv, grpcweb.WithAllowedRequestHeaders([]string{"*"}))
	multiplex := &grpcMultiplexer{
		grpcWebServer,
	}

	// Create a front end server
	main, err := NewMainServer(content)
	if err != nil {
		log.Fatal(err)
	}

	// Set up the routes and serve it
	main.SetUpHandler(multiplex)
	addr = fmt.Sprintf("%s:%s", os.Getenv("API_IP"), os.Getenv("API_PORT"))
	main.Serve(addr)

}
