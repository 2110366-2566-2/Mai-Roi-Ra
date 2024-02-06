package controllers

import (
	"net/http"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var userRepo *repository.UserRepository

func RegisterUser(c *gin.Context) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check that either PhoneNumber or Email is provided
	if newUser.PhoneNumber == "" && newUser.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Either phone number or email must be provided"})
		return
	}

	// Hashing the password before saving it to the database
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	newUser.Password = string(hashedPassword)

	// Use UserRepository to create the new user
	if err := userRepo.CreateUser(&newUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user_id": newUser.UserID})
}

func LoginUser(c *gin.Context) {
	// Your login logic here
}

func InitializeUserController(repo *repository.UserRepository) {
	userRepo = repo
}
