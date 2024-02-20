package services

import (
	"errors"
	"log"
	"regexp"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/golang-jwt/jwt"
)

type UserService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

// Regular expression for validating an email address
var (
	emailRegex     = regexp.MustCompile(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
	englishOnlyReg = regexp.MustCompile(`^[A-Za-z0-9\s]+$`)
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
		return nil, errors.New("Failed to retrieve users")
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
			return nil, errors.New("Invalid phone number format")
		}
	}

	// Validate the email (if login with email)
	if req.Email != nil {
		if !emailRegex.MatchString(*req.Email) {
			return nil, errors.New("Invalid email format")
		}
	}

	// Validate the password length
	if len(req.Password) < 6 {
		return nil, errors.New("Password must be at least 6 characters long")
	}

	// Hash the password
	// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	// if err != nil {
	// 	return nil, err
	// }
	// req.Password = string(hashedPassword)

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
		return nil, errors.New("Email or phone number must be provided")
	}

	// Check if the user was found
	if err != nil {
		return nil, errors.New("Invalid login credentials")
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
		return nil, errors.New("Failed to generate token")
	}
	err = s.RepositoryGateway.UserRepository.UpdateUserToken(user.UserID, token)
	if err != nil {
		return nil, errors.New("Failed to update token")
	}

	res := &st.LoginUserResponse{
		UserId:      user.UserID,
		FirstName:   user.FirstName,
		Email:       *user.Email,
		PhoneNumber: *user.PhoneNumber,
		Token:       token,
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
		return nil, errors.New("Invalid login credentials")
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
		return nil, errors.New("Failed to generate token")
	}
	err = s.RepositoryGateway.UserRepository.UpdateUserToken(user.UserID, token)
	if err != nil {
		return nil, errors.New("Failed to update token")
	}

	res := &st.LoginUserEmailResponse{
		UserId:      user.UserID,
		FirstName:   user.FirstName,
		Email:       *user.Email,
		PhoneNumber: *user.PhoneNumber,
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
		return nil, errors.New("Invalid login credentials")
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
		return nil, errors.New("Failed to generate token")
	}
	err = s.RepositoryGateway.UserRepository.UpdateUserToken(user.UserID, token)
	if err != nil {
		return nil, errors.New("Failed to update token")
	}

	res := &st.LoginUserPhoneResponse{
		UserId:      user.UserID,
		FirstName:   user.FirstName,
		Email:       *user.Email,
		PhoneNumber: *user.PhoneNumber,
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
		return nil, errors.New("Failed to remove token")
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
		return nil, errors.New("Failed to delete user")
	}

	return user, nil
}

// GenerateJWTToken generates a new JWT token for authenticated users
func GenerateJWTToken(user *models.User) (string, error) {
	log.Println("[Service: GenerateJWTToken]: Called")
	var secretKey = []byte("secret-key")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  user.UserID,                           // Include the user's ID
		"username": user.Username,                         // Include the username
		"email":    user.Email,                            // Include the email
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expiration time
	})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
