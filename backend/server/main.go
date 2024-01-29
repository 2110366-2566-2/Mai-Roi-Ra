package main

import (
	constant "github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	services "github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", services.GetTest)

	r.Run(":" + constant.PORT)
}
