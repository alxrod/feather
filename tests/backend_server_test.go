package main_test

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"testing"

	BackEndLib "github.com/alxrod/feather/backend"
	comms "github.com/alxrod/feather/communication"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func TestBackend(t *testing.T) {
	testing_id := fmt.Sprintf("test_db_%s", uuid.New().String())

	// Write collection to text file so we can call the cleanup function to remove old test db's
	f, err := os.OpenFile("test_db_list.txt",
		os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := f.WriteString(fmt.Sprintf("%s\n", testing_id)); err != nil {
		log.Println(err)
	}
	f.Close()

	backend, err := BackEndLib.NewBackServer("../cert/server.crt", "../cert/server.key", "127.0.0.1:9990", testing_id)
	if err != nil {
		log.Fatal(err)
	}
	// Serve it in a seperate thread
	go func() {
		backend.Serve()
	}()

	for scenario, fn := range map[string]func(
		t *testing.T,
		conn *grpc.ClientConn,
	){
		"Testing a user register":                test_register_success,
		"Testing a user register email error":    test_register_email_fail,
		"Testing a user register username error": test_register_username_fail,
		"Testing a user login then logout":       test_login_logout,
		"Testing a user invalid password login":  test_invalid_password_login,
		"Testing a user invalid username login":  test_invalid_username_login,
		"Testing a user invalid logout":          test_invalid_logout,
	} {
		t.Run(scenario, func(t *testing.T) {

			ctx := context.Background()
			creds := credentials.NewTLS(loadTLSCfg())

			conn, err := grpc.DialContext(
				ctx,
				"localhost:9990",
				grpc.WithTransportCredentials(creds),
			)
			if err != nil {
				log.Fatal(err)
			}

			fn(t, conn)

			conn.Close()
		})
	}
	backend.Shutdown()
}

func test_register_success(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	req := &comms.UserRegisterRequest{
		Username: "alex",
		Password: "play",
		FullName: "Alex Rodriguez",
		UserType: 0,
		Email:    "alexbrodriguez@gmail.com",
	}
	resp, err := client.Register(context.TODO(), req)
	require.NoError(t, err)

	username, err := BackEndLib.DecodeJWT(resp.Token)
	require.NoError(t, err)
	require.EqualValues(t, username, "alex")
}

func test_register_email_fail(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	req := &comms.UserRegisterRequest{
		Username: "paul",
		Password: "play",
		FullName: "Alex Rodriguez",
		UserType: 0,
		Email:    "alexbrodriguez@gmail.com",
	}
	resp, err := client.Register(context.TODO(), req)
	require.NoError(t, err)
	require.Equal(t, resp.Success, false)
	require.Equal(t, resp.Error, "There is already an account for the email alexbrodriguez@gmail.com")
}

func test_register_username_fail(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	req := &comms.UserRegisterRequest{
		Username: "alex",
		Password: "play",
		FullName: "Alex Rodriguez",
		UserType: 0,
		Email:    "pcab@gmail.com",
	}
	resp, err := client.Register(context.TODO(), req)
	require.NoError(t, err)
	require.Equal(t, resp.Success, false)
	require.Equal(t, resp.Error, "User with username alex already exists in DB")
}

func test_login_logout(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	in_req := &comms.UserLoginRequest{
		Username: "alex",
		Password: "play",
	}
	resp, err := client.Login(context.TODO(), in_req)
	require.NoError(t, err)
	require.Equal(t, resp.Success, true)

	out_req := &comms.UserLogoutRequest{
		Username: "alex",
		Token:    resp.Token,
	}
	resp_out, err := client.Logout(context.TODO(), out_req)
	require.NoError(t, err)
	require.Equal(t, resp_out.Success, true)
}

func test_invalid_password_login(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	in_req := &comms.UserLoginRequest{
		Username: "alex",
		Password: "yalp",
	}
	resp, err := client.Login(context.TODO(), in_req)
	require.NoError(t, err)
	require.Equal(t, resp.Success, false)

}

func test_invalid_username_login(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	in_req := &comms.UserLoginRequest{
		Username: "andrew",
		Password: "play",
	}
	resp, err := client.Login(context.TODO(), in_req)
	require.NoError(t, err)
	require.Equal(t, resp.Success, false)
}

func test_invalid_logout(t *testing.T, conn *grpc.ClientConn) {
	client := comms.NewAuthClient(conn)
	out_req := &comms.UserLogoutRequest{
		Username: "alex",
		Token:    "NOT_A_TOKEN",
	}
	resp, err := client.Logout(context.TODO(), out_req)
	require.NoError(t, err)
	require.Equal(t, resp.Success, false)

}

func loadTLSCfg() *tls.Config {
	b, _ := ioutil.ReadFile("../cert/server.crt")
	cp := x509.NewCertPool()
	if !cp.AppendCertsFromPEM(b) {
		log.Fatal("credentials: failed to append certificates")
	}
	config := &tls.Config{
		InsecureSkipVerify: false,
		RootCAs:            cp,
	}
	return config
}
