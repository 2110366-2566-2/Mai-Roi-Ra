package main

import (
	"github.com/gin-gonic/gin"
	"github.com/nnatchy/PUBPAB/constant"
	"github.com/nnatchy/PUBPAB/api"
)

func main() {
	r := gin.Default()

	r.GET("/", api.GetTest)

	r.Run(":" + constant.PORT)
}
