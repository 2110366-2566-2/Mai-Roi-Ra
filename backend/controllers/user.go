package controllers

import (
	"net/http"

	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
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

// @Summary Create new user
// @Description Create a new user with the provided details.
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.CreateUserRequest true "Create User Request" example:{"organizer_id": "org123", "admin_id": "admin456", "location_id": "loc789", "start_date": "2024-01-15", "end_date": "2024-01-20", "status": "planned", "participant_fee": 50.0, "description": "Annual tech conference focusing on the future of technology.", "user_name": "TechFuture 2024", "deadline": "2023-12-31", "activities": "Keynotes, Workshops, Panels", "user_image": "http://example.com/image.jpg"}
// @Success 200 {object} structure.CreateUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users [post]
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
// @Router /auth/users [get]
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

// @Summary UpdateUserInformation
// @Description Update User information with the desired input
// @Tags user
// @Accept json
// @Produce json
// @Param request body structure.UpdateUserInformationRequest true "Create Event Request"
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

// @Summary Log in a user
// @Description Logs in a user by their email, phone number, and password.
// @Tags user
// @Accept json
// @Produce json
// @Param request body structure.LoginUserRequest true "Log in a user" example:{"email":"user1@example.com","phone_number":"1234567890","password":""}
// @Success 200 {object} map[string]interface{} "Returns the login token."
// @Failure 400 {object} map[string]string "Returns an error if login fails."
// @Router /login [post]
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

// @Summary Log in a user with email
// @Description Logs in a user by their email and password.
// @Tags user
// @Accept json
// @Produce json
// @Param request body structure.LoginUserEmailRequest true "Log in a user with Email" example:{"email":"user1@example.com","password":""}
// @Success 200 {object} map[string]interface{} "Returns the login token."
// @Failure 400 {object} map[string]string "Returns an error if login fails."
// @Router /loginemail [post]
func (c *UserController) LoginUserEmail(ctx *gin.Context, req *st.LoginUserEmailRequest) {
	log.Println("[CTRL: LoginUserEmail] Input:", req)

	res, err := c.ServiceGateway.UserService.LoginUserEmail(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: LoginUserEmail] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Log in a user with phone
// @Description Logs in a user by their phone number and password.
// @Tags user
// @Accept json
// @Produce json
// @Param request body structure.LoginUserPhoneRequest true "Log in a user with Phone" example:{"phone_number":"1234567890","password":""}
// @Success 200 {object} map[string]interface{} "Returns the login token."
// @Failure 400 {object} map[string]string "Returns an error if login fails."
// @Router /loginphone [post]
func (c *UserController) LoginUserPhone(ctx *gin.Context, req *st.LoginUserPhoneRequest) {
	log.Println("[CTRL: LoginUserPhone] Input:", req)

	res, err := c.ServiceGateway.UserService.LoginUserPhone(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: LoginUserPhone] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Log out a user
// @Description Logs out a user by invalidating the session token associated with the uid.
// @Tags user
// @Accept json
// @Produce json
// @Param user_id path string true "User ID"
// @Success 200 {object} map[string]interface{} "Confirms the user has been logged out."
// @Failure 400 {object} map[string]string "Returns an error if logout fails."
// @Router /logout [post]
func (c *UserController) LogoutUser(ctx *gin.Context, req *st.LogoutUserRequest) {
	log.Println("[CTRL: LogoutUser] Input:", req)

	res, err := c.ServiceGateway.UserService.LogoutUser(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: LogoutUser] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Validate user token
// @Description Validates a user's authentication token and returns the associated user details if valid.
// @Tags user
// @Accept json
// @Produce json
// @Param token header string true "Authentication Token"
// @Success 200 {object} models.User "Returns user details on successful token validation."
// @Failure 400 {object} map[string]string "Returns an error if the token is invalid or expired."
// @Router /validate-token [get]
func (c *UserController) ValidateToken(token string) (*models.User, error) {
	return c.ServiceGateway.UserService.ValidateToken(token)
}
