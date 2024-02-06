package controllers

import (
	"net/http"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	//"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/db"
	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Perform your validation for the phone or email here
	// For example, using the custom validator you've defined
	// ...

	// note idk wtf I should do here and I'm confused af
	// Save the user to the database
	// result := db.DB.Create(&newUser) // Assuming you have a DB instance from GORM
	// if result.Error != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	// 	return
	// }

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}
func LoginUser(c *gin.Context) {
	// Your login logic here
}
