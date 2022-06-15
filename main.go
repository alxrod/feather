package main

import (
	"embed"
	"log"

	BackEndLib "github.com/alxrod/feather/backend"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
)

//go:embed ui/featherapp/build
var content embed.FS

func main() {

	// Create backend server
	backend, err := BackEndLib.NewBackServer("cert/server.crt", "cert/server.key", "127.0.0.1:9990")
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
	frontend.Serve("localhost:8080")

}
