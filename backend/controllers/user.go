package controllers

import (
	"net/http"
	"regexp"

	models "github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"log"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
)

type UserController struct {
	ServiceGateway services.ServiceGateway
}

func NewUserController(
	sg services.ServiceGateway,
) *UserController {
	return &UserController{
		ServiceGateway: sg,
	}
}

// Regular expression for validating an email address
var (
	emailRegex     = regexp.MustCompile(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
	englishOnlyReg = regexp.MustCompile(`^[A-Za-z0-9\s]+$`)
)

func (c *UserController) RegisterUser(ctx *gin.Context) {
	var newUser models.User
	if err := ctx.ShouldBindJSON(&newUser); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate the phone number
	if len(newUser.PhoneNumber) != 10 || newUser.PhoneNumber[0] != '0' {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid phone number format"})
		return
	}

	// Validate the email
	if !emailRegex.MatchString(newUser.Email) {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email format"})
		return
	}

	// Validate the password length
	if len(newUser.Password) < 6 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Password must be at least 6 characters long"})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash the password"})
		return
	}
	newUser.Password = string(hashedPassword)

	// Create the user using the UserRepository
	// Go fix

	// if err := userRepo.CreateUser(&newUser); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the user", "details": err.Error()})
	// 	return
	// }

	// ctx.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user_id": newUser.ID})
}

// func (c* UserController) LoginUser(ctx *gin.Context) {
// 	var loginDetails struct {
// 		Email       string `json:"email"`
// 		PhoneNumber string `json:"phone_number"`
// 		Password    string `json:"password"`
// 	}
// 	if err := ctx.ShouldBindJSON(&loginDetails); err != nil {
// 		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid login details"})
// 		return
// 	}

// 	var user *models.User
// 	var err error

// 	// Determine if we are logging in with email or phone number and get the user
// 	if loginDetails.Email != "" {
// 		user, err = userRepo.GetUserByEmail(loginDetails.Email)
// 	} else if loginDetails.PhoneNumber != "" {
// 		user, err = userRepo.GetUserByPhoneNumber(loginDetails.PhoneNumber)
// 	} else {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Email or phone number must be provided"})
// 		return
// 	}

// 	// Check if the user was found
// 	if err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
// 		return
// 	}

// 	// Check the password
// 	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password)); err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
// 		return
// 	}

// 	// Generate a JWT token (or any other form of token/session identifier)
// 	token, err := GenerateJWTToken(user) // Replace with actual JWT token generation logic
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "token": token})
// }

// // GenerateJWTToken generates a new JWT token for authenticated users
// func GenerateJWTToken(user *models.User) (string, error) {
// 	// Implement JWT token generation logic
// 	// This is a placeholder function and should be replaced with actual implementation
// 	return "some_generated_token", nil
// }

func (c *UserController) CreateUser(ctx *gin.Context, req *st.CreateUserRequest) {
	log.Println("[CTRL: CreateUser] Input:", req)

	res, err := c.ServiceGateway.UserService.CreateUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary UpdateUserInformation
// @Description Update User information with the desired input
// @Tags user
// @Accept json
// @Produce json
// @Param request body structure.UpdateUserInformationRequest true "Update User Request"
// @Success 200 {object} models.User
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [put]
func (c *UserController) UpdateUserInformation(ctx *gin.Context, req *st.UpdateUserInformationRequest) {
	log.Println("[CTRL: UpdateUserInformation] Input:", req)

	res, err := c.ServiceGateway.UserService.UpdateUserInformation(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: UpdateUserInformation] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary GetUserByUserId
// @Description Get User from given field (user_id)
// @Tags user
// @Accept json
// @Produce json
// @Param user_id path string true "User ID"
// @Success 200 {object} models.User
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [get]
func (c *UserController) GetUserByUserId(ctx *gin.Context, req *st.GetUserByUserIdRequest) {
	log.Println("[CTRL: GetUser] Input:", req)
	res, err := c.ServiceGateway.UserService.GetUserByUserId(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
