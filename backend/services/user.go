package services

import (
	"errors"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"golang.org/x/crypto/bcrypt"
	"regexp"
	"time"
)

type UserService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IUserService interface {
	RegisterUser(req *st.RegisterUserRequest) (*st.RegisterUserResponse, error)
	LoginUser(req *st.LoginUserRequest) (*st.LoginUserResponse, error)
	GetAllUsers() (*st.GetAllUsersResponse, error)
	GetUser(req *st.GetUserRequest) (*st.GetUserResponse, error)
	UpdateUser(req *st.UpdateUserRequest) (*st.UpdateUserResponse, error)
	DeleteUser(req *st.DeleteUserRequest) (*st.DeleteUserResponse, error)
}

func NewUserService(
	repoGateway repository.RepositoryGateway,
) IUserService {
	return &UserService{
		RepositoryGateway: repoGateway,
	}
}

// Regular expression for validating an email address
var (
	emailRegex     = regexp.MustCompile(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
	englishOnlyReg = regexp.MustCompile(`^[A-Za-z0-9\s]+$`)
)

func (s *UserService) RegisterUser(req *st.RegisterUserRequest) (*st.RegisterUserResponse, error) {
	// Validate the phone number
	if len(req.PhoneNumber) != 10 || req.PhoneNumber[0] != '0' {
		return nil, errors.New("Invalid phone number format")
	}

	// Validate the email
	if !emailRegex.MatchString(req.Email) {
		return nil, errors.New("Invalid email format")
	}

	// Validate the password length
	if len(req.Password) < 6 {
		return nil, errors.New("Password must be at least 6 characters long")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	req.Password = string(hashedPassword)

	// Create the user using the UserRepository
	user := models.User{
		Username:                 "",
		PhoneNumber:              req.PhoneNumber,
		Email:                    req.Email,
		FirstName:                "",
		LastName:                 "",
		Password:                 req.Password,
		PaymentGatewayCustomerID: "",
		BirthDate:                time.Time{},
		UserImage:                "",
		Address:                  "",
		District:                 "",
		Province:                 "",
		BannerImage:              "",
		CreatedAt:                time.Time{},
	}
	if err := s.RepositoryGateway.UserRepository.CreateUser(&user); err != nil {
		return nil, err
	}
	res := &st.RegisterUserResponse{
		UserID: user.UserID,
	}
	return res, nil
}

func (s *UserService) LoginUser(req *st.LoginUserRequest) (*st.LoginUserResponse, error) {
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

	// Check the password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("Invalid login credentials")
	}

	// Generate a JWT token (or any other form of token/session identifier)
	token, err := GenerateJWTToken(user) // Replace with actual JWT token generation logic
	if err != nil {
		return nil, errors.New("Failed to generate token")
	}
	res := &st.LoginUserResponse{
		Token: token,
	}
	return res, nil
}

func (s *UserService) GetAllUsers() (*st.GetAllUsersResponse, error) {
	users, err := s.RepositoryGateway.UserRepository.GetAllUsers()
	if err != nil {
		return nil, errors.New("Failed to retrieve users")
	}
	res := &st.GetAllUsersResponse{
		Users: users,
	}
	return res, nil
}

func (s *UserService) GetUser(req *st.GetUserRequest) (*st.GetUserResponse, error) {
	user, err := s.RepositoryGateway.UserRepository.GetUserByID(req.ID)
	if err != nil {
		return nil, errors.New("User not found")
	}
	res := &st.GetUserResponse{
		User: *user,
	}
	return res, nil
}

func (s *UserService) UpdateUser(req *st.UpdateUserRequest) (*st.UpdateUserResponse, error) {

	// Assuming updateData has the ID field populated with userID
	if err := s.RepositoryGateway.UserRepository.UpdateUser(&req.User); err != nil {
		return nil, err
	}

	res := &st.UpdateUserResponse{}
	return res, nil
}
func (s *UserService) DeleteUser(req *st.DeleteUserRequest) (*st.DeleteUserResponse, error) {

	if err := s.RepositoryGateway.UserRepository.DeleteUser(req.ID); err != nil {
		return nil, errors.New("Failed to delete user")
	}

	res := &st.DeleteUserResponse{}
	return res, nil
}

// GenerateJWTToken generates a new JWT token for authenticated users
func GenerateJWTToken(user *models.User) (string, error) {
	// Implement JWT token generation logic
	// This is a placeholder function and should be replaced with actual implementation
	return "some_generated_token", nil
}
