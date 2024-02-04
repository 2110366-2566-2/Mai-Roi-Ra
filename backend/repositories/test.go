package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TestRepository struct {
	db *gorm.DB
}

type ITestRepository interface {
	GetInformationByUserId(c *gin.Context, userId string) (models.User, error)
}

func GetTest() (string, error) {
	return "Hello World, Test GET by PubPab backend", nil
}

func (r *TestRepository) GetInformationByUserId(c *gin.Context, userId string) (models.User, error) {
	log.Println("[CTRL: GetInformationByUserId]: Called")
	var res models.User

	// Execute the query and scan the result directly
	if err := r.db.Model(&models.User{}).Where("user_id = ?", userId).First(&res).Error; err != nil {
		return models.User{}, err
	}

	return res, nil
}
