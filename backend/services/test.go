package services

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	_ "github.com/2110366-2566-2/Mai-Roi-Ra/backend/swagger/docs" // Import the auto-generated docs file
	"github.com/gin-gonic/gin"
	test "github.com/2110366-2566-2/Mai-Roi-Ra/backend/controllers/struct"
)

type TestService struct {
	logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type ITestService interface {
	GetInformationByUserId(c *gin.Context, userId string) (models.User, error)
}

func GetTest() (*test.TestResponse, error) {
	log.Println("[Service: GetTest] Called")

	res, err := repository.GetTest()
	if err != nil {
		return nil, err
	}
	response := test.TestResponse{
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
