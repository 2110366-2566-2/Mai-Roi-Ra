package controllers

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/cloud"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/middleware"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
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
func (c *UserController) CreateUser(ctx *gin.Context) {
	var req *st.CreateUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.UpdateUserInformationRequest true "Update User Request"
// @Success 200 {object} models.User
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [put]
func (c *UserController) UpdateUserInformation(ctx *gin.Context) {
	var req *st.UpdateUserInformationRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: UpdateUserInformation] Input:", req)

	res, err := c.ServiceGateway.UserService.UpdateUserInformation(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: UpdateUserInformation] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Update existing user's image
// @Description updates an user's profile image
// @Tags users
// @Accept multipart/form-data
// @Produce json
// @Param user_id path string True "User Id"
// @Param is_profiled formData string True "Is user already have a picture?"Enum ("Yes", "No")
// @Param user_image formData file True "Profile image"
// @Success 200 {object} structure.MessageResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/upload/{user_id} [put]
func (c *UserController) UpdateUserProfileImage(ctx *gin.Context) {
	err := ctx.Request.ParseMultipartForm(10 << 20) // 10 MB max file size
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := ctx.Param("id")
	isProfiled := ctx.Request.FormValue("is_profiled")

	// S3
	fileHeader, err := ctx.FormFile("user_image")
	if err != nil {
		log.Println("[CTRL: UpdateUserProfileImage] Called and read header failed: ", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	if utils.IsNilHeader(fileHeader) {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "FileHeader Is nil"})
	}

	Cloud := cloud.NewAWSCloudService(constant.PROFILE) // or try changing to constant.PROFILE
	log.Println("FILEHEADER: ", fileHeader.Header)

	if isProfiled == "Yes" {
		// delete the existing image in the bucket
		deleteErr := Cloud.DeleteFile(ctx, userId)
		if deleteErr != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": deleteErr})
			return
		}
	}

	url, uploadErr := Cloud.SaveFile(ctx, fileHeader, userId)
	if uploadErr != nil {
		log.Println("[CTRL: UpdateUserProfileImage] Called SaveFile to S3 Error: ", uploadErr)
		return
	}

	res, err := c.ServiceGateway.UserService.UpdateUserProfileImage(userId, url)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: UpdateUserProfileImage] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary GetUserByUserId
// @Description Get User from given field (user_id)
// @Tags users
// @Accept json
// @Produce json
// @Param user_id path string true "User ID"
// @Success 200 {object} models.User
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id} [get]
func (c *UserController) GetUserByUserId(ctx *gin.Context) {
	req := &st.UserIdRequest{
		UserId: ctx.Param("id"),
	}
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
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.LoginUserRequest true "Log in a user" example:{"email":"user1@example.com","phone_number":"1234567890","password":""}
// @Success 200 {object} structure.LoginUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /login [post]
func (c *UserController) LoginUser(ctx *gin.Context) {
	var req *st.LoginUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.LoginUserEmailRequest true "Log in a user with Email" example:{"email":"user1@example.com","password":""}
// @Success 200 {object} models.User
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /loginemail [post]
func (c *UserController) LoginUserEmail(ctx *gin.Context) {
	var req *st.LoginUserEmailRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.LoginUserPhoneRequest true "Log in a user with Phone" example:{"phone_number":"1234567890","password":""}
// @Success 200 {object} models.User
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /loginphone [post]
func (c *UserController) LoginUserPhone(ctx *gin.Context) {
	var req *st.LoginUserPhoneRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {object} st.MessageResponse "Confirms the user has been logged out."
// @Failure 400 {object} map[string]string "Returns an error if logout fails."
// @Router /logout [post]
func (c *UserController) LogoutUser(ctx *gin.Context) {
	userId := ctx.GetString(middleware.KeyUserID)
	req := &st.UserIdRequest{
		UserId: userId,
	}
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
// @Tags users
// @Accept json
// @Produce json
// @Param token header string true "Authentication Token"
// @Success 200 {object} models.User "Returns user details on successful token validation."
// @Failure 400 {object} map[string]string "Returns an error if the token is invalid or expired."
// @Router /validate-token [get]
func (c *UserController) ValidateToken(token string) (*models.User, error) {
	log.Println("[CTRL: ValidateToken] Input:", token)
	return c.ServiceGateway.UserService.ValidateToken(token)
}

// @Summary Register an event
// @Description Register an event based on user_id and event_id
// @Tags users
// @Accept json
// @Produce json
// @Param request body structure.RegisterEventRequest true "Create User Request"
// @Success 200 {object} structure.MessageResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/participate [post]
func (c *UserController) RegisterEvent(ctx *gin.Context) {
	var req *st.RegisterEventRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: RegisterEvent] Input:", req)
	res, err := c.ServiceGateway.UserService.RegisterEvent(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: RegisterEvent] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Cancel Register an event
// @Description Cancel Register an event based on user_id and event_id
// @Tags users
// @Accept json
// @Produce json
// @Param user_id query string true "user_id"
// @Param event_id path string true "event_id"
// @Success 200 {object} structure.MessageResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{event_id} [delete]
func (c *UserController) CancelRegisterEvent(ctx *gin.Context) {
	eventID := ctx.Param("event_id")
	userID := ctx.Query("user_id")

	req := &st.CancelRegisterEventRequest{
		EventId: eventID,
		UserId:  userID,
	}
	log.Println("[CTRL: CancelRegisterEvent] Input:", req)

	res, err := c.ServiceGateway.UserService.CancelRegisterEvent(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CancelRegisterEvent] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary GetParticipatedEventLists
// @Description Get list of all participated events of the user
// @Tags users
// @Accept json
// @Produce json
// @Param user_id query string true "user_id"
// @Param offset query int false "offset i.e. 0"
// @Param limit query int false "Items per page i.e. 10"
// @Success 200 {object} structure.GetParticipatedEventListsResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/events [get]
func (c *UserController) GetParticipatedEventLists(ctx *gin.Context) {
	offset, err := strconv.Atoi(ctx.DefaultQuery("offset", "0"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid offset value"})
		return
	}

	limit, err := strconv.Atoi(ctx.DefaultQuery("limit", "0"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit value"})
		return
	}

	req := &st.GetParticipatedEventListsRequest{
		UserId: ctx.Query("user_id"),
		Offset: offset,
		Limit:  limit,
	}

	log.Println("[CTRL: GetParticipatedEventLists] Input:", req)
	res, err := c.ServiceGateway.UserService.GetParticipatedEventLists(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetParticipatedEventLists] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary ToggleNotifications
// @Description Toggle the enabling notification for user
// @Tags users
// @Accept json
// @Produce json
// @Param user_id query string true "user_id"
// @Success 200 {object} structure.MessageResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/notification [put]
func (c *UserController) ToggleNotifications(ctx *gin.Context) {
	req := &st.UserIdRequest{
		UserId: ctx.Query("user_id"),
	}
	log.Println("[CTRL: ToggleNotifications] Input:", req)
	res, err := c.ServiceGateway.UserService.ToggleNotifications(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: ToggleNotifications] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary SearchEvent
// @Description Search the Event
// @Tags users
// @Accept json
// @Produce json
// @Param user_id path string true "user_id"
// @Param search query string true "search"
// @Success 200 {object} structure.MessageResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id}/searchevent [post]
func (c *UserController) SearchEvent(ctx *gin.Context) {
	req := &st.SearchEventRequest{
		UserId: ctx.Param("id"),
		Search: ctx.Query("search"),
	}
	log.Println("[CTRL: SearchEvent] Input:", req)
	res, err := c.ServiceGateway.UserService.SearchEvent(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SearchEvent] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary GetSearchHistories
// @Description Get Search History for the User
// @Tags users
// @Accept json
// @Produce json
// @Param user_id path string true "user_id"
// @Success 200 {object} structure.GetSearchHistoriesResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/{user_id}/searchhistory [get]
func (c *UserController) GetSearchHistories(ctx *gin.Context) {
	req := ctx.Param("id")
	log.Println("[CTRL: GetSearchHistories] Input:", req)
	res, err := c.ServiceGateway.UserService.GetSearchHistories(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetSearchHistories] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary LoginGoogle
// @Description Get list of all participated events of the user
// @Tags user
// @Accept json
// @Produce json
// @Param provider path string true "provider"
// @Success 200 {object} structure.CreateUserResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /auth/{provider}/login [get]
func (c *UserController) LoginGoogle(ctx *gin.Context) {
	log.Println("[CTRL: LoginGoogle] Called: ")
	_, err := c.ServiceGateway.UserService.LoginGoogle(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

// @Summary CallbackGoogle
// @Description Get info of user from Gmail
// @Tags user
// @Accept json
// @Produce json
// @Param provider path string true "provider"
// @Success 200 {object} object "OK"
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/auth/{provider}/callback [get]
func (c *UserController) CallbackGoogle(ctx *gin.Context) {
	log.Println("[CTRL: CallbackGoogle] Called: ")
	token, err := c.ServiceGateway.UserService.CallbackGoogle(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
	redirectURL := fmt.Sprintf("%s/auth/handle-login", cfg.App.FrontendURL)
	log.Println("User token at the end:", *token)

	ctx.SetCookie("token", *token, middleware.MaxAge, "/", "localhost", false, true)
	location := url.URL{Path: redirectURL}
	ctx.Redirect(http.StatusTemporaryRedirect, location.RequestURI())
}

// @Summary Send OTP Email
// @Description Sends an OTP email to the specified recipients.
// @Tags users
// @Accept json
// @Produce json
// @Param request body st.SendOTPEmailRequest true "Send OTP Email Request"
// @Success 200 {object} st.MessageResponse "OTP email successfully sent"
// @Failure 400 {object} object "Bad request - error in sending the OTP email"
// @Router /users/send_otp_email [put]
func (c *UserController) SendOTPEmail(ctx *gin.Context) {
	var req *st.SendOTPEmailRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendOTPEmail]: Input:", req)
	res, err := c.ServiceGateway.UserService.SendOTPEmail(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendOTPEmail]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Verify OTP
// @Description Verifies the OTP entered by the user.
// @Tags users
// @Accept json
// @Produce json
// @Param request body st.VerifyOTPRequest true "Verify OTP Request"
// @Success 200 {object} st.VerifyOTPResponse "OTP successfully verified"
// @Failure 400 {object} object "Bad request - error in verifying the OTP"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/verify_otp [put]
func (c *UserController) VerifyOTP(ctx *gin.Context) {
	var req *st.VerifyOTPRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: VerifyOTP] Input:", req)
	res, err := c.ServiceGateway.UserService.VerifyOTP(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: VerifyOTP] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Update User Role
// @Description Updates the role of a user based on the provided request.
// @Tags users
// @Accept json
// @Produce json
// @Param request body st.UpdateUserRoleRequest true "Update User Role Request"
// @Success 200 {object} st.MessageResponse "User successfully updated"
// @Failure 400 {object} object "Bad request - error in updating user role"
// @Router /users/update_user_role [put]
func (c *UserController) UpdateUserRole(ctx *gin.Context) {
	var req *st.UpdateUserRoleRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: UpdateUserRole]: Input:", req)
	res, err := c.ServiceGateway.UserService.UpdateUserRole(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: UpdateUserRole]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Get User Verification Status
// @Description Get the verification status of a user by their email.
// @Tags users
// @Accept json
// @Produce json
// @Param email query string true "User Email"
// @Success 200 {boolean} bool "Returns the verification status of the user."
// @Failure 400 {object} object "Bad Request"
// @Failure 404 {object} object "User Not Found"
// @Failure 500 {object} object "Internal Server Error"
// @Router /users/verification_status [get]
func (c *UserController) GetUserVerificationStatus(ctx *gin.Context) {
	email := ctx.Query("email")
	if email == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Email is required"})
		return
	}

	log.Println("[CTRL: GetUserVerificationStatus] Input:", email)
	user, err := c.ServiceGateway.UserService.GetUserByEmail(email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: GetUserVerificationStatus] Output:", user.IsVerified)
	ctx.JSON(http.StatusOK, user.IsVerified)
}
