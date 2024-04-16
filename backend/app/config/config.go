package config

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/secretsmanager"
	"github.com/joho/godotenv"
)

type Config struct {
	App        *App
	PgDB       *PgDB
	Email      *Email
	GoogleAuth *GoogleAuth
	S3         *S3
	Stripe     *Stripe
}

type App struct {
	Url         string
	FrontendURL string
	AppName     string
}

type PgDB struct {
	Host     string
	Username string
	Password string
	DbName   string
}

type Email struct {
	Name     string
	Address  string
	Password string
}

type GoogleAuth struct {
	ClientId     string
	ClientSecret string
	CallbackURL  string
}

type S3 struct {
	AwsRegion            string
	AwsAccessKeyID       string
	AwsSecretKey         string
	AwsBucketProfileName string
	AwsBucketEventName   string
}

type Stripe struct {
	PublicKey string
	SecretKey string
}

func NewConfig(path string) (*Config, error) {
	if err := godotenv.Load(path); err != nil {
		log.Println("Error loading .env file: ", err)
		return nil, err
	}

	// Retrieve the secret values from AWS Secrets Manager
	secretName := "Mairoira"
	region := "ap-southeast-2"

	// Load AWS configuration
	cfg, err := config.LoadDefaultConfig(context.Background(), config.WithRegion(region))
	if err != nil {
		log.Println("Error loading AWS config: ", err)
		return nil, err
	}

	// Create a Secrets Manager client
	client := secretsmanager.NewFromConfig(cfg)

	input := &secretsmanager.GetSecretValueInput{
		SecretId:     aws.String(secretName),
		VersionStage: aws.String("AWSCURRENT"),
	}
	result, err := client.GetSecretValue(context.Background(), input)
	if err != nil {
		log.Println("Error retrieving secret from AWS Secrets Manager: ", err)
		return nil, err
	}
	// Parse the secret value
	var secretData map[string]string
	if err := json.Unmarshal([]byte(*result.SecretString), &secretData); err != nil {
		log.Println("Error parsing secret data: ", err)
		return nil, err
	}

	// Now, replace the hard-coded values with the secret values
	return &Config{
		App: &App{
			Url:         secretData["SERVER_HOST"],
			FrontendURL: secretData["FRONTEND_URL"],
			AppName:     secretData["APP_NAME"],
		},
		PgDB: &PgDB{
			Host:     secretData["PG_HOST"],
			Username: secretData["PG_USER"],
			Password: secretData["PG_PASSWORD"],
			DbName:   secretData["PG_DB"],
		},
		Email: &Email{
			Name:     secretData["EMAIL_SENDER_NAME"],
			Address:  secretData["EMAIL_SENDER_ADDRESS"],
			Password: secretData["EMAIL_SENDER_PASSWORD"],
		},

		GoogleAuth: &GoogleAuth{
			ClientId:     secretData["GOOGLE_CLIENT_ID"],
			ClientSecret: secretData["GOOGLE_CLIENT_SECRET"],
			CallbackURL:  secretData["GOOGLE_CALLBACK_URL"],
		},
		S3: &S3{
			AwsRegion:            secretData["AWS_REGION"],
			AwsAccessKeyID:       secretData["AWS_ACCESS_KEY_ID"],
			AwsSecretKey:         secretData["AWS_SECRET_ACCESS_KEY"],
			AwsBucketProfileName: secretData["AWS_BUCKET_PROFILE_NAME"],
			AwsBucketEventName:   secretData["AWS_BUCKET_EVENT_NAME"],
		},
		Stripe: &Stripe{
			PublicKey: secretData["STRIPE_PUBLIC_KEY"],
			SecretKey: secretData["STRIPE_SECRET_KEY"],
		},
	}, nil
}
