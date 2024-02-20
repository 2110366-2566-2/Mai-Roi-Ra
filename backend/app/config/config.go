package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	App     *App
	MongoDB *MongoDB
	PgDB	*PgDB
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
	Username	string
	Password	string
	DbName		string
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
			DbName: os.Getenv("PG_DB"),
		},
	}, nil
}
