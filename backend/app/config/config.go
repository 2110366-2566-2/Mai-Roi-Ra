package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	App        *App
	MongoDB    *MongoDB
	PgDB       *PgDB
	Email      *Email
	GoogleAuth *GoogleAuth
	S3         *S3
	Omise      *Omise
	Stripe     *Stripe
}

type App struct {
	Url     string
	AppName string
}

type MongoDB struct {
	Uri      string
	Username string
	Password string
}

type PgDB struct {
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

type Omise struct {
	PublicKey string
	SecretKey string
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
	return &Config{
		App: &App{
			Url:     os.Getenv("SERVER_HOST"),
			AppName: os.Getenv("APP_NAME"),
		},
		MongoDB: &MongoDB{
			Uri:      os.Getenv("MONGODB_URI"),
			Username: os.Getenv("MONGODB_USERNAME"),
			Password: os.Getenv("MONGODB_PASSWORD"),
		},
		PgDB: &PgDB{
			Username: os.Getenv("PG_USER"),
			Password: os.Getenv("PG_PASSWORD"),
			DbName:   os.Getenv("PG_DB"),
		},
		Email: &Email{
			Name:     os.Getenv("EMAIL_SENDER_NAME"),
			Address:  os.Getenv("EMAIL_SENDER_ADDRESS"),
			Password: os.Getenv("EMAIL_SENDER_PASSWORD"),
		},

		GoogleAuth: &GoogleAuth{
			ClientId:     os.Getenv("GOOGLE_CLIENT_ID"),
			ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
			CallbackURL:  os.Getenv("GOOGLE_CALLBACK_URL"),
		},
		S3: &S3{
			AwsRegion:            os.Getenv("AWS_REGION"),
			AwsAccessKeyID:       os.Getenv("AWS_ACCESS_KEY_ID"),
			AwsSecretKey:         os.Getenv("AWS_SECRET_ACCESS_KEY"),
			AwsBucketProfileName: os.Getenv("AWS_BUCKET_PROFILE_NAME"),
			AwsBucketEventName:   os.Getenv("AWS_BUCKET_EVENT_NAME"),
		},
		Omise: &Omise{
			PublicKey: os.Getenv("OMISE_PUBLIC_KEY"),
			SecretKey: os.Getenv("OMISE_SECRET_KEY"),
		},
		Stripe: &Stripe{
			PublicKey: os.Getenv("STRIPE_PUBLIC_KEY"),
			SecretKey: os.Getenv("STRIPE_SECRET_KEY"),
		},
	}, nil
}
