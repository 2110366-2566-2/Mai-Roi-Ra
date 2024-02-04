package db

import (
	"fmt"
	"log"
	"os"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbInstance struct {
	Db *gorm.DB
}

var (
	DB DbInstance
)

func InitPgDB() error {
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return err
	}
	log.Println("Config path from PG:", cfg)

	dsn := fmt.Sprintf(
		"host=pg_db user=%s password=%s dbname=%s port=5432 sslmode=disable TimeZone=Asia/Bangkok",
		os.Getenv("PG_USER"),
		os.Getenv("PG_PASSWORD"),
		os.Getenv("PG_DB"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
		return nil
	}

	log.Println("Connected to PG !")
	db.Logger = logger.Default.LogMode(logger.Info)

	// log.Println("Running Migrations")
	// db.AutoMigrate(&models.User{})

	DB = DbInstance{
		Db: db,
	}

	return nil
}
