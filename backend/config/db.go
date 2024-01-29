package config

import (
	"context"
	"log"

	constant "github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	Client   *mongo.Client
	Database *mongo.Database
}

func InitMongoDB() (*Database, error) {
	clientOptions := options.Client().ApplyURI(constant.MONGO_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}

	if err = client.Ping(context.Background(), nil); err != nil {
		return nil, err
	}

	db := client.Database("Mai-Roi-Ra")

	log.Println("Connected to mongoDB!")

	return &Database{
		Client:   client,
		Database: db,
	}, nil
}
