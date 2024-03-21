package services

import (
	"errors"
	"fmt"
	"log"
	"regexp"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

// Regular expression for validating an email address
var (
	emailRegex = regexp.MustCompile(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
	// englishOnlyReg = regexp.MustCompile(`^[A-Za-z0-9\s]+$`)
)

type IUserService interface {
	CreateUser(user *st.CreateUserRequest) (*st.CreateUserResponse, error)
	UpdateUserInformation(req *st.UpdateUserInformationRequest) (*models.User, error)
	GetUserByUserId(req *st.GetUserByUserIdRequest) (*models.User, error)
	LoginUser(req *st.LoginUserRequest) (*st.LoginUserResponse, error)
	LogoutUser(req *st.LogoutUserRequest) (*st.LogoutUserResponse, error)
	ValidateToken(token string) (*models.User, error)
	LoginUserEmail(req *st.LoginUserEmailRequest) (*st.LoginUserEmailResponse, error)
	LoginUserPhone(req *st.LoginUserPhoneRequest) (*st.LoginUserPhoneResponse, error)
	GetAllUsers() (*st.GetAllUsersResponse, error)
	// AuthMe(token string) (*models.User, error)
	RegisterEvent(req *st.RegisterEventRequest) (*st.RegisterEventResponse, error)
	CancelRegisterEvent(req *st.CancelRegisterEventRequest) (*st.RegisterEventResponse, error)
	GetParticipatedEventLists(req *st.GetParticipatedEventListsRequest) (*st.GetParticipatedEventListsResponse, error)
	ToggleNotifications(req *st.GetUserByUserIdRequest) (*st.RegisterEventResponse, error)
	SearchEvent(req *st.SearchEventRequest) (*st.SearchEventResponse, error)
	GetSearchHistories(userId *string) (*st.GetSearchHistoriesResponse, error)
	SendOTPEmail(req *st.SendOTPEmailRequest) (*st.SendOTPEmailResponse, error) // New function to send OTP email
	VerifyOTP(req *st.VerifyOTPRequest) (*st.VerifyOTPResponse, error)
}

func NewUserService(repoGateway repository.RepositoryGateway) IUserService {
	return &UserService{
		RepositoryGateway: repoGateway,
	}
}

func (s *UserService) GetAllUsers() (*st.GetAllUsersResponse, error) {
	log.Println("[Service: GetAllUsersResponse]: Called")
	users, err := s.RepositoryGateway.UserRepository.GetAllUsers()
	if err != nil {
		return nil, errors.New("failed to retrieve users")
	}
	res := &st.GetAllUsersResponse{
		Users: users,
	}
	return res, nil
}

func (s *UserService) CreateUser(req *st.CreateUserRequest) (*st.CreateUserResponse, error) {
	log.Println("[Service: CreateUser]: Called")

	// Validate the phone number (if login with phonenumber)
	if req.PhoneNumber != nil {
		if len(*req.PhoneNumber) != 10 || (*req.PhoneNumber)[0] != '0' {
			return nil, errors.New("invalid phone number format")
		}
	}

	// Validate the email (if login with email)
	if req.Email != nil {
		if !emailRegex.MatchString(*req.Email) {
			return nil, errors.New("invalid email format")
		}
	}

	// Validate the password length
	if len(req.Password) < 6 {
		return nil, errors.New("password must be at least 6 characters long")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.MinCost)
	if err != nil {
		return nil, err
	}
	req.Password = string(hashedPassword)

	res, err := s.RepositoryGateway.UserRepository.CreateUser(req)
	if err != nil {
		log.Println("[Service: CreateUser]: Error creating user", err)
		return nil, err
	}

	resService := &st.CreateUserResponse{
		UserID:      *res,
		OrganizerID: "",
	}

	if req.Role == "Organizer" {
		orgId, err := s.RepositoryGateway.OrganizerRepository.CreateOrganizerWithUserId(*res)
		if err != nil {
			log.Println("[Service: Call Create Organizer error]:", err)
			return nil, err
		}
		resService.OrganizerID = *orgId
	}

	return resService, err
}

func (s *UserService) UpdateUserInformation(req *st.UpdateUserInformationRequest) (*models.User, error) {
	log.Println("[Service: UpdateUserInformation]: Called")
	res, err := s.RepositoryGateway.UserRepository.UpdateUserInformation(req)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return nil, err
	}
	return res, err
}

func (s *UserService) GetUserByUserId(req *st.GetUserByUserIdRequest) (*models.User, error) {
	log.Println("[Service: GetUserByUserId]: Called")
	res, err := s.RepositoryGateway.UserRepository.GetUserByID(req)
	if err != nil {
		return nil, err
	}
	return res, err
}

// func (s *UserService) AuthMe(token string) (*models.User, error) {
// 	log.Println("[Service: AuthMe]: Called")
// 	user, err := s.RepositoryGateway.UserRepository.GetUserByToken(token)
// 	if err != nil {
// 		return nil, errors.New("Failed to AuthMe")
// 	}

// 	return user, nil
// }

func (s *UserService) LoginUser(req *st.LoginUserRequest) (*st.LoginUserResponse, error) {
	log.Println("[Service: LoginUser]: Called")

	var user *models.User
	var err error

	// Determine if we are logging in with email or phone number and get the user
	if req.Email != "" {
		user, err = s.RepositoryGateway.UserRepository.GetUserByEmail(req.Email)
	} else if req.PhoneNumber != "" {
		user, err = s.RepositoryGateway.UserRepository.GetUserByPhoneNumber(req.PhoneNumber)
	} else {
		return nil, errors.New("email or phone number must be provided")
	}

	organizerId := ""

	if user.Role == "ORGANIZER" {
		var err error
		organizerId, err = s.RepositoryGateway.OrganizerRepository.GetOrganizerIdFromUserId(user.UserID)
		if err != nil {
			log.Println("[Service: LoginUser]: Error when querying organizer_id")
			return nil, err
		}
	}

	// Check if the user was found
	if err != nil {
		return nil, errors.New("invalid login credentials")
	}

	// Check the password
	byteHash := []byte(user.Password)
	bytepwd := []byte(req.Password)
	pwerr := bcrypt.CompareHashAndPassword(byteHash, bytepwd)
	if pwerr != nil {
		log.Println([]byte(byteHash))
		log.Println([]byte(bytepwd))
		log.Println(byteHash)
		log.Println(bytepwd)
		log.Println("Invalid login credentials [PASSWORD ERROR]:")
		log.Println(err)
		return nil, err
	}

	// if err := bcrypt.CompareHashAndPassword(byteHash, bytepwd); err != nil {
	// 	log.Println([]byte(byteHash))
	// 	log.Println([]byte(bytepwd))
	// 	log.Println(byteHash)
	// 	log.Println(bytepwd)
	// 	log.Println("Invalid login credentials [PASSWORD ERROR]:")
	// 	return nil, err
	// }

	// Generate a JWT token (or any other form of token/session identifier)
	token, err := GenerateJWTToken(user) // Replace with actual JWT token generation logic
	if err != nil {
		return nil, errors.New("failed to generate token")
	}
	err = s.RepositoryGateway.UserRepository.UpdateUserToken(user.UserID, token)
	if err != nil {
		return nil, errors.New("failed to update token")
	}

	var email = ""
	var phoneNumber = ""
	if user.Email != nil {
		email = *user.Email
	}
	if user.PhoneNumber != nil {
		phoneNumber = *user.PhoneNumber
	}

	res := &st.LoginUserResponse{
		UserId:      user.UserID,
		FirstName:   user.FirstName,
		Email:       email,
		PhoneNumber: phoneNumber,
		Token:       token,
		OrganizerId: organizerId,
		Role:        user.Role,
	}

	return res, nil
}

func (s *UserService) LoginUserEmail(req *st.LoginUserEmailRequest) (*st.LoginUserEmailResponse, error) {
	log.Println("[Service: LoginUserEmail]: Called")

	var user *models.User
	var err error

	// Determine if we are logging in with email or phone number and get the user
	user, err = s.RepositoryGateway.UserRepository.GetUserByEmail(req.Email)
	// Check if the user was found
	if err != nil {
		return nil, errors.New("invalid login credentials")
	}

	// // Check the password
	// if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
	// 	log.Println([]byte(user.Password))
	// 	log.Println([]byte(req.Password))
	// 	log.Println(user.Password)
	// 	log.Println(req.Password)
	// 	log.Println("Invalid login credentials [PASSWORD ERROR]:")
	// 	return nil, err
	// }

	// Generate a JWT token (or any other form of token/session identifier)
	token, err := GenerateJWTToken(user) // Replace with actual JWT token generation logic
	if err != nil {
		return nil, errors.New("failed to generate token")
	}
	err = s.RepositoryGateway.UserRepository.UpdateUserToken(user.UserID, token)
	if err != nil {
		return nil, errors.New("failed to update token")
	}

	var email = ""
	var phoneNumber = ""
	if user.Email != nil {
		email = *user.Email
	}
	if user.PhoneNumber != nil {
		phoneNumber = *user.PhoneNumber
	}

	res := &st.LoginUserEmailResponse{
		UserId:      user.UserID,
		FirstName:   user.FirstName,
		Email:       email,
		PhoneNumber: phoneNumber,
		Token:       token,
	}
	return res, nil
}

func (s *UserService) LoginUserPhone(req *st.LoginUserPhoneRequest) (*st.LoginUserPhoneResponse, error) {
	log.Println("[Service: LoginUserPhone]: Called")

	var user *models.User
	var err error

	// Determine if we are logging in with email or phone number and get the user
	user, err = s.RepositoryGateway.UserRepository.GetUserByPhoneNumber(req.PhoneNumber)

	// Check if the user was found
	if err != nil {
		return nil, errors.New("invalid login credentials")
	}

	// // Check the password
	// if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
	// 	log.Println([]byte(user.Password))
	// 	log.Println([]byte(req.Password))
	// 	log.Println(user.Password)
	// 	log.Println(req.Password)
	// 	log.Println("Invalid login credentials [PASSWORD ERROR]:")
	// 	return nil, err
	// }

	// Generate a JWT token (or any other form of token/session identifier)
	token, err := GenerateJWTToken(user) // Replace with actual JWT token generation logic
	if err != nil {
		return nil, errors.New("failed to generate token")
	}
	err = s.RepositoryGateway.UserRepository.UpdateUserToken(user.UserID, token)
	if err != nil {
		return nil, errors.New("failed to update token")
	}

	var email = ""
	var phoneNumber = ""
	if user.Email != nil {
		email = *user.Email
	}
	if user.PhoneNumber != nil {
		phoneNumber = *user.PhoneNumber
	}

	res := &st.LoginUserPhoneResponse{
		UserId:      user.UserID,
		FirstName:   user.FirstName,
		Email:       email,
		PhoneNumber: phoneNumber,
		Token:       token,
	}
	return res, nil
}

// LogoutUser implements IUserService.
func (s *UserService) LogoutUser(req *st.LogoutUserRequest) (*st.LogoutUserResponse, error) {
	log.Printf("[Service: LogoutUser]: Attempting to remove token for UserID: %s", req.UserID)
	err := s.RepositoryGateway.UserRepository.UpdateUserToken(req.UserID, "") // Attempt to remove token
	if err != nil {
		log.Printf("[Service: LogoutUser]: Failed to remove token for UserID: %s, Error: %v", req.UserID, err)
		return nil, errors.New("failed to remove token")
	}

	log.Printf("[Service: LogoutUser]: Token removed successfully for UserID: %s", req.UserID)
	res := &st.LogoutUserResponse{}
	return res, nil
}

// ValidateToken implements IUserService.
func (s *UserService) ValidateToken(token string) (*models.User, error) {
	log.Println("[Service: ValidateToken]: Called")
	user, err := s.RepositoryGateway.UserRepository.GetUserByToken(token)
	if err != nil {
		return nil, errors.New("failed to delete user")
	}

	return user, nil
}

// GenerateJWTToken generates a new JWT token for authenticated users
func GenerateJWTToken(user *models.User) (string, error) {
	log.Println("[Service: GenerateJWTToken]: Called")
	var secretKey = []byte("YourSecretKey")
	// token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
	// 	"user_id":  user.UserID,                           // Include the user's ID
	// 	"username": user.Username,                         // Include the username
	// 	"email":    user.Email,                            // Include the email
	// 	"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expiration time
	// })

	// tokenString, err := token.SignedString(secretKey)
	// if err != nil {
	// 	return "", err
	// }

	// return tokenString, nil
	claims := jwt.MapClaims{
		"user_id":  user.UserID,                           // Include the user's ID
		"username": user.Username,                         // Include the username
		"email":    user.Email,                            // Include the email
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expiration time
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

func validateToken(signedToken string) (string, error) {
	var secretKey = []byte("secret-key")
	parsedToken, err := jwt.Parse(signedToken, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		return "", err
	}
	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
		username := claims["username"].(string)
		return username, nil
	}
	return "", errors.New("invalid token")
}

func (s *UserService) RegisterEvent(req *st.RegisterEventRequest) (*st.RegisterEventResponse, error) {
	log.Println("[Service: RegisterEvent]: Called")
	res, err := s.RepositoryGateway.ParticipateRepository.RegisterEvent(req)
	if err != nil {
		log.Println("[Service: Call repo RegisterEvent]:", err)
		return nil, err
	}

	resevent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}
	announcementService := NewAnnouncementService(s.RepositoryGateway)
	reqregister := &st.SendRegisteredEmailRequest{
		UserId:      req.UserId,
		OrganizerId: resevent.OrganizerId,
		EventId:     req.EventId,
		EventName:   resevent.EventName,
	}

	if _, err := announcementService.SendRegisteredEmail(reqregister); err != nil {
		log.Println("[Service: Call SendRegisteredEmail]:", err)
		return nil, err
	}

	return res, nil
}

func (s *UserService) CancelRegisterEvent(req *st.CancelRegisterEventRequest) (*st.RegisterEventResponse, error) {
	log.Println("[Service: CancelRegisterEvent]: Called")
	res, err := s.RepositoryGateway.ParticipateRepository.CancelRegisterEvent(req)
	if err != nil {
		log.Println("[Service: Call repo CancelRegisterEvent error]:", err)
		return nil, err
	}
	return res, nil
}

func (s *UserService) GetParticipatedEventLists(req *st.GetParticipatedEventListsRequest) (*st.GetParticipatedEventListsResponse, error) {
	log.Println("[Service: GetParticipatedEventLists]: Called")
	eventList, err := s.RepositoryGateway.ParticipateRepository.GetParticipatedEventsForUser(req)
	if err != nil {
		log.Println("[Service: GetParticipatedEventLists] called repo participant error", err)
		return nil, err
	}

	resLists := &st.GetParticipatedEventListsResponse{
		EventsList: make([]st.ParticipatedEvent, 0),
	}

	for _, v := range eventList {
		res, err := s.RepositoryGateway.EventRepository.GetEventDataById(v.EventId)
		if err != nil {
			log.Println("[Service: GetParticipatedEventLists] called repo event error", err)
			return nil, err
		}

		locName, err := s.RepositoryGateway.LocationRepository.GetLocationById(res.LocationId)
		if err != nil {
			log.Println("[Service: GetParticipatedEventLists] called repo location error", err)
			return nil, err
		}

		eventData := st.ParticipatedEvent{
			EventId:      res.EventId,
			EventName:    res.EventName,
			StartDate:    res.StartDate.Format("2006/02/01"), // Format the date as "YYYY/DD/MM"
			EndDate:      res.EndDate.Format("2006/02/01"),   // Format the date as "YYYY/DD/MM"
			EventImage:   res.EventImage,
			LocationName: locName.LocationName,
			Description:  res.Description,
		}

		resLists.EventsList = append(resLists.EventsList, eventData)
	}
	return resLists, nil
}

// used the same struct as before, cause this function is so ez
func (s *UserService) ToggleNotifications(req *st.GetUserByUserIdRequest) (*st.RegisterEventResponse, error) {
	log.Println("[Service: ToggleNotifications]: Called")
	res, err := s.RepositoryGateway.UserRepository.ToggleNotifications(req)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return nil, err
	}
	return res, err
}

func (s *UserService) SearchEvent(req *st.SearchEventRequest) (*st.SearchEventResponse, error) {
	log.Println("[Service: SearchEvent]: Called")
	res, err := s.RepositoryGateway.SearchRepository.SaveSearchEvent(req)
	if err != nil {
		log.Println("[Service: Call repo SaveSearchEvent error]:", err)
	}

	return &st.SearchEventResponse{
		Message: *res,
	}, nil
}

func (s *UserService) GetSearchHistories(userId *string) (*st.GetSearchHistoriesResponse, error) {
	log.Println("[Service: GetSearchHistories]: Called")
	res, err := s.RepositoryGateway.SearchRepository.GetSearchHistories(userId)
	if err != nil {
		log.Println("[Service: Call repo GetSearchHistories error]:", err)
	}

	resLists := &st.GetSearchHistoriesResponse{
		SearchHistoryList: make([]st.SearchHistory, 0),
	}

	for _, v := range res {
		historyData := st.SearchHistory{
			SearchId:   v.SearchID,
			SearchName: v.SearchName,
		}
		resLists.SearchHistoryList = append(resLists.SearchHistoryList, historyData)
	}
	return resLists, nil
}

func (s *UserService) SendOTPEmail(req *st.SendOTPEmailRequest) (*st.SendOTPEmailResponse, error) {
	log.Println("[Service: SendOTPEmail]: Called")

	// Generate OTP
	otp := utils.GenerateOTP()

	// Configuration and email sender initialization
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)

	// Email content
	subject := "Your OTP for Mai-Roi-Ra"
	contentHTML := fmt.Sprintf(`
	<html>
	<body>
		<h3>Your OTP for Mai-Roi-Ra</h3>
		<p>Your OTP is: <strong>%s</strong></p>
		<p>Please use this OTP to complete your action in the Mai-Roi-Ra platform.</p>
	</body>
	</html>
	`, otp)

	// Sending email
	if err := sender.SendEmail(subject, "", contentHTML, []string{req.Email}, nil, nil, nil); err != nil {
		return nil, err
	}

	// Save the OTP to the database or cache for later verification
	// (You need to implement this part based on your application's requirements)

	return &st.SendOTPEmailResponse{
		Message: "OTP email sent successfully",
	}, nil
}

func (s *UserService) VerifyOTP(req *st.VerifyOTPRequest) (*st.VerifyOTPResponse, error) {
	log.Println("[Service: VerifyOTP]: Called")

	// Retrieve the expected OTP from the database or cache
	expectedOTP := "Your OTP from database/cache" // Replace this with the actual retrieval logic

	// Compare the provided OTP with the expected OTP
	isVerified := req.OTP == expectedOTP

	return &st.VerifyOTPResponse{
		Verified: isVerified,
		Message:  "OTP verification result",
	}, nil
}
