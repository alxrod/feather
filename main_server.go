package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"errors"

	"github.com/TwiN/go-color"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
)

// These need to be updated by final secur verison

type MainServer struct {
	router  *http.ServeMux
	webhook *WebhookServer
}

func NewMainServer() (*MainServer, error) {

	srv := &MainServer{
		router:  http.NewServeMux(),
		webhook: NewWebHookServer(),
	}

	return srv, nil
}
func (srv *MainServer) HandleAssetRequest(w http.ResponseWriter, r *http.Request) {
	path := fmt.Sprintf("%v", r.URL)
	split_path := strings.Split(path, "/asset-cache/")
	if len(split_path) != 2 {
		log.Println(errors.New("invalid asset path"))
		errorHandler(w, r, 404)
	}
	filename := strings.Split(split_path[1], "?")[0]
	split_on_dot := strings.Split(filename, ".")
	filetype := strings.ToLower(split_on_dot[len(split_on_dot)-1])
	buf, err := ioutil.ReadFile(fmt.Sprintf("./asset_cache/" + filename))
	if err != nil {
		errorHandler(w, r, 404)
	}

	w.Header().Set("Content-Type", fmt.Sprintf("image/%s", filetype))
	w.Write(buf)
}

func (srv *MainServer) SetUpHandler(multiplex *grpcMultiplexer) error {
	srv.router.Handle("/", multiplex.Handler(srv.HandleAssetRequest, srv.webhook))
	return nil
}

func (srv *MainServer) Serve(addr string) {
	s := &http.Server{
		Handler:     srv.router,
		Addr:        addr,
		ReadTimeout: 15 * time.Second,
	}
	log.Println(color.Ize(color.Green, fmt.Sprintf("Serving Main Server on %s", addr)))
	log.Fatal(s.ListenAndServeTLS("cert/server.crt", "cert/server.key"))
}

type grpcMultiplexer struct {
	*grpcweb.WrappedGrpcServer
}

func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
	w.WriteHeader(status)
	if status == http.StatusNotFound {
		fmt.Fprint(w, "404 - Not Found")
	}
}

func (m *grpcMultiplexer) Handler(assetHandler func(w http.ResponseWriter, r *http.Request), webhook *WebhookServer) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		if m.IsGrpcWebRequest(r) || m.IsAcceptableGrpcCorsRequest(r) || r.Header.Get("Content-Type") == "application/grpc" || r.Header.Get("content-type") == "application/protobuf" {

			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "grpc-timeout, Accept, Content-Type, content-type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-User-Agent, X-Grpc-Web")

			if m.IsGrpcWebRequest(r) || r.Header.Get("Content-Type") == "application/grpc" {
				fmt.Printf(color.Ize(color.Cyan, fmt.Sprintf("Backend Request for : %s\n", r.URL)))
			}
			m.ServeHTTP(w, r)
			return

		}
		path := fmt.Sprintf("%v", r.URL)

		if strings.Contains(path, "/web-hook/") {
			fmt.Printf(color.Ize(color.Blue, fmt.Sprintf("Web Hook Request for : %s\n", r.URL)))
			webhook.router.ServeHTTP(w, r)
			return
		}

		if strings.Contains(path, "/asset-cache/") {
			fmt.Printf(color.Ize(color.Blue, fmt.Sprintf("Asset Request for : %s\n", r.URL)))
			assetHandler(w, r)
			return
		}

		fmt.Printf(color.Ize(color.Purple, fmt.Sprintf("Bad Request for : %s\n", r.URL)))

		errorHandler(w, r, 404)
	})
}
