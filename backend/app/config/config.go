package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	App     *App
	MongoDB *MongoDB
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
	}, nil
}
