package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
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
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	file, err := os.Open("tests/test_db_list.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	filenames := make([]string, 0)
	// optionally, resize scanner's capacity for lines over 64K, see next example
	for scanner.Scan() {
		filenames = append(filenames, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	for _, fname := range filenames {
		client.Database(fname).Drop(context.TODO())
	}

}
