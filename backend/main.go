package main

import (
	"log"

	db "github.com/2110366-2566-2/Mai-Roi-Ra/backend/config"
	constant "github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	services "github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	_, err := db.InitMongoDB()
	if err != nil {
		log.Fatal("Error initializing MongoDB:", err)
	}

	r.GET("/", services.GetTest)

	r.Run(":" + constant.PORT)
}
