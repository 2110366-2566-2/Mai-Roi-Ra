package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// UserRepository represents the repository for the User model.
type UserRepository struct {
	DB *gorm.DB
}

// NewUserRepository creates a new instance of the UserRepository.
// oldone-func NewUserRepository(c *gin.Context, db *gorm.DB) *UserRepository {
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

// GetUserByID retrieves a user by their ID.
func (repo *UserRepository) GetUserByID(c *gin.Context, userID string) (*models.User, error) {
	log.Println("[REPO: GetUserByID]: Called")
	var user models.User
	result := repo.DB.Where("user_id = ?", userID).First(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// GetUserByEmail retrieves a user by their email address.
func (repo *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := repo.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserByPhoneNumber retrieves a user by their phone number.
func (repo *UserRepository) GetUserByPhoneNumber(phoneNumber string) (*models.User, error) {
	var user models.User
	if err := repo.DB.Where("phone_number = ?", phoneNumber).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// CreateUser adds a new user to the database.
func (repo *UserRepository) CreateUser(user *models.User) error {
	log.Println("[REPO: CreateUser]: Called")
	result := repo.DB.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// UpdateUser updates an existing user in the database.
func (repo *UserRepository) UpdateUser(c *gin.Context, user *models.User) error {
	log.Println("[REPO: UpdateUser]: Called")
	result := repo.DB.Save(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// DeleteUser deletes a user from the database.
func (repo *UserRepository) DeleteUser(c *gin.Context, userID string) error {
	log.Println("[REPO: DeleteUser]: Called")
	result := repo.DB.Delete(&models.User{}, "user_id = ?", userID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
