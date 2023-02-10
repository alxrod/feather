package main

import (
	"embed"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"errors"
	"regexp"

	"github.com/TwiN/go-color"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
)

// These need to be updated by final secur verison
var routes []string = []string{
	"^/contracts$",

	"^/login$",
	"^/profile$",
	"^/register$",
	"^/setup-payment$",
	"^/logout$",
	"^/forgot-password$",

	"^/invite/[^/]*$",
	"^/contract/[^/]*$",
	"^/create/[^/]*$",
	"^/negotiate/[^/]*$",
	"^/view/[^/]*$",
	"^/settle/[^/]*$",
}

type FrontServer struct {
	router  *http.ServeMux
	webapp  http.Handler
	webhook *WebhookServer
}

func NewFrontServer(react_fs embed.FS) (*FrontServer, error) {
	fsys := fs.FS(react_fs)
	contentStatic, err := fs.Sub(fsys, "ui/featherapp/build")
	if err != nil {
		fmt.Printf(color.Ize(color.Red, fmt.Sprintf("Static Resource Issue: %s\n", err.Error())))
		return nil, err
	}
	// http.Handle("/static/", http.StripPrefix("/static", fs))

	srv := &FrontServer{
		router:  http.NewServeMux(),
		webapp:  http.FileServer(http.FS(contentStatic)),
		webhook: NewWebHookServer(),
	}
	return srv, nil
}

func (srv *FrontServer) HandleAssetRequest(w http.ResponseWriter, r *http.Request) {
	path := fmt.Sprintf("%v", r.URL)
	split_path := strings.Split(path, "/asset-cache/")
	if len(split_path) != 2 {
		log.Fatal(errors.New("invalid asset path"))
	}
	filename := strings.Split(split_path[1], "?")[0]
	split_on_dot := strings.Split(filename, ".")
	filetype := strings.ToLower(split_on_dot[len(split_on_dot)-1])
	buf, err := ioutil.ReadFile(fmt.Sprintf("./asset_cache/" + filename))
	if err != nil {
		errorHandler(w, r, 404)
	}

	w.Header().Set("Content-Type", fmt.Sprintf("image/%s", filetype))
	// w.Header().Set("Content-Disposition", fmt.Sprintf("attachment;filename=%s", filename))

	w.Write(buf)
}

func (srv *FrontServer) SetUpHandler(multiplex *grpcMultiplexer) error {
	srv.router.Handle("/", multiplex.Handler(srv.webapp, srv.HandleAssetRequest, srv.webhook))
	return nil
}

func (srv *FrontServer) Serve(addr string) {
	s := &http.Server{
		Handler:     srv.router,
		Addr:        addr,
		ReadTimeout: 15 * time.Second,
	}
	log.Println(color.Ize(color.Green, fmt.Sprintf("Serving Frontend on %s", addr)))
	log.Fatal(s.ListenAndServeTLS("cert/server.crt", "cert/server.key"))
}

type grpcMultiplexer struct {
	*grpcweb.WrappedGrpcServer
}

func errorHandler(w http.ResponseWriter, r *http.Request, status int) {
	w.WriteHeader(status)
	if status == http.StatusNotFound {
		fmt.Fprint(w, "custom 404")
	}
}

func (m *grpcMultiplexer) Handler(next http.Handler, assetHandler func(w http.ResponseWriter, r *http.Request), webhook *WebhookServer) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if m.IsGrpcWebRequest(r) || m.IsAcceptableGrpcCorsRequest(r) || r.Header.Get("Content-Type") == "application/grpc" {

			// log.Println("Request is GRPC")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "grpc-timeout, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, X-User-Agent, X-Grpc-Web")
			// w.Header().Set("grpc-status", "")
			// w.Header().Set("grpc-message", "")

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

		fmt.Printf(color.Ize(color.Purple, fmt.Sprintf("Frontend Request for : %s\n", r.URL)))

		if strings.Contains(path, "/asset-cache/") {
			assetHandler(w, r)
			return
		}

		for _, route := range routes {
			r_exp := regexp.MustCompile(route)
			if r_exp.MatchString(path) || path == "/" {
				log.Printf(path)
				fmt.Printf(color.Ize(color.Purple, fmt.Sprintf("Page Load: %s\n", r.URL)))
				http.StripPrefix(path, next).ServeHTTP(w, r)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}

func formatRequest(r *http.Request) string {
	// Create return string
	var request []string
	// Add the request string
	url := fmt.Sprintf("%v %v %v", r.Method, r.URL, r.Proto)
	request = append(request, url)
	// Add the host
	request = append(request, fmt.Sprintf("Host: %v", r.Host))
	// Loop through headers
	for name, headers := range r.Header {
		name = strings.ToLower(name)
		for _, h := range headers {
			request = append(request, fmt.Sprintf("%v: %v", name, h))
		}
	}

	// If this is a POST, add post data
	if r.Method == "POST" {
		r.ParseForm()
		request = append(request, "\n")
		request = append(request, r.Form.Encode())
	}
	// Return the request as a string
	return strings.Join(request, "\n")
}
