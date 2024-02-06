package controllers

import (
	"net/http"
	"regexp"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

var userRepo *repository.UserRepository

// Regular expression for validating an email address
var emailRegex = regexp.MustCompile(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)

func RegisterUser(c *gin.Context) {
	var newUser models.User
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate the phone number
	if len(newUser.PhoneNumber) != 10 || newUser.PhoneNumber[0] != '0' {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid phone number format"})
		return
	}

	// Validate the email
	if !emailRegex.MatchString(newUser.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email format"})
		return
	}

	// Validate the password length
	if len(newUser.Password) < 6 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password must be at least 6 characters long"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash the password"})
		return
	}
	newUser.Password = string(hashedPassword)

	// Create the user using the UserRepository
	if err := userRepo.CreateUser(&newUser); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the user", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user_id": newUser.ID})
}

func LoginUser(c *gin.Context) {
	var loginDetails struct {
		Email       string `json:"email"`
		PhoneNumber string `json:"phone_number"`
		Password    string `json:"password"`
	}
	if err := c.ShouldBindJSON(&loginDetails); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login details"})
		return
	}

	var user *models.User
	var err error

	// Determine if we are logging in with email or phone number and get the user
	if loginDetails.Email != "" {
		user, err = userRepo.GetUserByEmail(loginDetails.Email)
	} else if loginDetails.PhoneNumber != "" {
		user, err = userRepo.GetUserByPhoneNumber(loginDetails.PhoneNumber)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email or phone number must be provided"})
		return
	}

	// Check if the user was found
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
		return
	}

	// Check the password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
		return
	}

	// Generate a JWT token (or any other form of token/session identifier)
	token, err := GenerateJWTToken(user) // Replace with actual JWT token generation logic
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token})
}

// GenerateJWTToken generates a new JWT token for authenticated users
func GenerateJWTToken(user *models.User) (string, error) {
	// Implement JWT token generation logic
	// This is a placeholder function and should be replaced with actual implementation
	return "some_generated_token", nil
}

// InitializeUserController should be called in main.go to set the userRepo
func InitializeUserController(repo *repository.UserRepository) {
	userRepo = repo
}
