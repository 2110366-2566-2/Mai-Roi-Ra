package services

import (
	"log"

	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	_ "github.com/2110366-2566-2/Mai-Roi-Ra/backend/swagger/docs" // Import the auto-generated docs file
)

func GetTest() (*TestResponse, error) {
	log.Println("[Service: GetTest] Called")

	res, err := repository.GetTest()
	if err != nil {
		return nil, err
	}
	response := TestResponse{
		Message: res,
	}

	return &response, nil
}
