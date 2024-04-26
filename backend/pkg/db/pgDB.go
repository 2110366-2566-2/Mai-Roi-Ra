package db

import (
	"fmt"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func InitPgDB() *gorm.DB {
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		// return nil
	}
	log.Println("Config path from PG:", cfg)

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=5432 sslmode=require TimeZone=Asia/Bangkok",
		cfg.PgDB.Host,
		cfg.PgDB.Username,
		cfg.PgDB.Password,
		cfg.PgDB.DbName,
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

	return db
}
