package services

import (
	"errors"
	"regexp"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IUserService interface {
	CreateUser(user *st.CreateUserRequest) (*st.CreateUserResponse, error)
	UpdateUserInformation(req *st.UpdateUserInformationRequest) (*models.User, error)
	GetUserByUserId(req *st.GetUserByUserIdRequest) (*models.User, error)
}

func NewUserService(
	repoGateway repository.RepositoryGateway,
) IUserService {
	return &UserService{
		RepositoryGateway: repoGateway,
	}
}

func (s *UserService) CreateUser(req *st.CreateUserRequest) (*st.CreateUserResponse, error) {
	log.Println("[Service: CreateUser]: Called")
	res, err := s.RepositoryGateway.UserRepository.CreateUser(req)
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
		UserImage:                nil,
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
