package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	
)

func GetTest(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello World, Test GET by PubPab backend",
	})
}