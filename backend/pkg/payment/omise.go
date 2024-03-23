package payment

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/omise/omise-go"
)

func NewOmiseService() (*omise.Client, error) {
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	log.Println("Config path from PG:", cfg)

	omiseClient, err := omise.NewClient(cfg.Omise.PublicKey, cfg.Omise.PublicKey)
	if err != nil {
		log.Println("[Pkg: NewOmiseService]: Initializing client error:", err)
		return nil, err
	}

	return omiseClient, nil
}
