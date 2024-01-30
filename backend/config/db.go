package config

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	Client   *mongo.Client
	Database *mongo.Database
}

func InitMongoDB() (*Database, error) {
	if err := godotenv.Load("config/config.env"); err != nil {
		log.Fatal(".env file couldn't be load: ", err)
	}

	uri := os.Getenv("MONGODB_URI")
	database := os.Getenv("MONGODB_DATABASE")
	username := os.Getenv("MONGODB_USERNAME")
	password := os.Getenv("MONGODB_PASSWORD")

	clientOptions := options.Client().ApplyURI(uri)
	if username != "" && password != "" {
		clientOptions.Auth = &options.Credential{
			Username: username,
			Password: password,
		}
	}

	// Connect to MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		fmt.Println("Failed to connect to MongoDB:", err)
		return nil, err
	}

	if err = client.Ping(context.Background(), nil); err != nil {
		return nil, err
	}

	db := client.Database(database)

	log.Println("Connected to mongoDB with path: ", uri)

	return &Database{
		Client:   client,
		Database: db,
	}, nil
}
