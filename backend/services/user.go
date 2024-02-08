package services

import (
	"log"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type UserService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IUserService interface {
	CreateUser(user *st.CreateUserRequest) (*st.CreateUserResponse,error);
}

func NewUserService(repoGateway repository.RepositoryGateway) IUserService {
	return &UserService{
		RepositoryGateway: repoGateway,
	}
}

func (s *UserService) CreateUser(req *st.CreateUserRequest) (*st.CreateUserResponse,error) {
	log.Println("[Service: CreateUser]: Called")
	res, err := s.RepositoryGateway.UserRepository.CreateUser(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}