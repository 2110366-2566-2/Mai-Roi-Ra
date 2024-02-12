package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
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

// RegisterUser creates a new user.
// @Summary Create new user
// @Description Create a new user with the provided details.
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.RegisterUserRequest true "Create User Request" example:{"organizer_id": "org123", "admin_id": "admin456", "location_id": "loc789", "start_date": "2024-01-15", "end_date": "2024-01-20", "status": "planned", "participant_fee": 50.0, "description": "Annual tech conference focusing on the future of technology.", "user_name": "TechFuture 2024", "deadline": "2023-12-31", "activities": "Keynotes, Workshops, Panels", "user_image": "http://example.com/image.jpg"}
// @Success 200 {object} structure.RegisterUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users [post]
func (c *UserController) RegisterUser(ctx *gin.Context, req *st.RegisterUserRequest) {
	log.Println("[CTRL: RegisterUser] Input:", req)

	res, err := c.ServiceGateway.UserService.RegisterUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}) //TODO http status code handling
		return
	}
	log.Println("[CTRL: RegisterUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// LoginUser creates a new user.
// @Summary Create new user
// @Description Create a new user with the provided details.
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.LoginUserRequest true "Create User Request" example:{"organizer_id": "org123", "admin_id": "admin456", "location_id": "loc789", "start_date": "2024-01-15", "end_date": "2024-01-20", "status": "planned", "participant_fee": 50.0, "description": "Annual tech conference focusing on the future of technology.", "user_name": "TechFuture 2024", "deadline": "2023-12-31", "activities": "Keynotes, Workshops, Panels", "user_image": "http://example.com/image.jpg"}
// @Success 200 {object} structure.LoginUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users [post]
func (c *UserController) LoginUser(ctx *gin.Context, req *st.LoginUserRequest) {
	log.Println("[CTRL: LoginUser] Input:", req)

	res, err := c.ServiceGateway.UserService.LoginUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: LoginUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// GetAllUsers
// @Summary GetAllUsers
// @Description Get list of users
// @Tags users
// @Accept json
// @Produce json
// @Param filter query string false "Filter query"
// @Param sort query string false "Sort order"
// @Param page query int false "Page number"
// @Param limit query int false "Items per page"
// @Success 200 {object} structure.GetAllUsersResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users [get]
func (c *UserController) GetAllUsers(ctx *gin.Context) {
	log.Println("[CTRL: GetAllUsers] Input:")
	res, err := c.ServiceGateway.UserService.GetAllUsers()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetAllUsers] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary GetUser
// @Description Get a test message
// @Tags users
// @Accept json
// @Produce json
// @Param user_id path string true "User ID"
// @Success 200 {object} structure.GetUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [get]
func (c *UserController) GetUser(ctx *gin.Context, req *st.GetUserRequest) {
	log.Println("[CTRL: GetUser] Input:", req)
	res, err := c.ServiceGateway.UserService.GetUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary UpdateUser
// @Description Get a test message
// @Tags users
// @Accept json
// @Produce json
// @Param user_id path string true "User ID"
// @Success 200 {object} structure.UpdateUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [get]
func (c *UserController) UpdateUser(ctx *gin.Context, req *st.UpdateUserRequest) {
	log.Println("[CTRL: UpdateUser] Input:", req)
	res, err := c.ServiceGateway.UserService.UpdateUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: UpdateUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary DeleteUser
// @Description Get a test message
// @Tags users
// @Accept json
// @Produce json
// @Param user_id path string true "User ID"
// @Success 200 {object} structure.DeleteUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [get]
func (c *UserController) DeleteUser(ctx *gin.Context, req *st.DeleteUserRequest) {
	log.Println("[CTRL: DeleteUser] Input:", req)
	res, err := c.ServiceGateway.UserService.DeleteUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: DeleteUser] Output:", res)
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
