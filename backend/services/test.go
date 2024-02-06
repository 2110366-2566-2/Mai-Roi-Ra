package services

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	_ "github.com/2110366-2566-2/Mai-Roi-Ra/backend/swagger/docs" // Import the auto-generated docs file
	"github.com/gin-gonic/gin"
)

type TestService struct {
	logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type ITestService interface {
	GetInformationByUserId(c *gin.Context, userId string) (models.User, error)
}

func GetTest() (*st.TestResponse, error) {
	log.Println("[Service: GetTest] Called")

	res, err := repository.GetTest()
	if err != nil {
		return nil, err
	}
	response := st.TestResponse{
		Message: res,
	}

	return &response, nil
}

func (s *TestService) GetInformationByUserId(c *gin.Context, userId string) (models.User, error) {
	log.Println("[Repository:GetInformationByUserId] Called")
	result, err := s.RepositoryGateway.TestRepository.GetInformationByUserId(c, userId)
	if err != nil {
		log.Println(c, "[Repository:GetInformationByUserId]: Call Repo GetInformationByUserId error", err)
		return models.User{}, err
	}
	return result, nil
}
