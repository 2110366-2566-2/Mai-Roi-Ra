package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	
)

func GetTest(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello Worlddd, Test GET by PubPab backend",
	})
}