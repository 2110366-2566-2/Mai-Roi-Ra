package db

import (
	"context"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func InitMongoDB() (*mongo.Client, error) {
	cfg, err := config.NewConfig(func() string {
		// if len(os.Args) > 1 {
		// 	return os.Args[1]
		// }
		// return "config.env"
		return ".env"
	}())

	if err != nil {
		log.Println("[Config]: Error initializing config.env")
		return nil, err
	}
	log.Println("Config path: ", cfg)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*30) // time out after 30 seconds
	defer cancel()

	clientOptions := options.Client().ApplyURI(cfg.MongoDB.Uri)

	// Connect to MongoDB
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
		return nil, err
	}

	if cfg.MongoDB.Username != "" && cfg.MongoDB.Password != "" {
		clientOptions.Auth = &options.Credential{
			Username: cfg.MongoDB.Username,
			Password: cfg.MongoDB.Password,
		}
	}

	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		return nil, err
	}

	log.Println("Connected to mongoDB:", cfg.MongoDB.Uri)

	return client, nil
}
