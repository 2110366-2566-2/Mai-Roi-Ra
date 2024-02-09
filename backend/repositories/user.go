package repository

import (
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"gorm.io/gorm"
)

// UserRepository represents the repository for the User model.
type UserRepository struct {
	DB *gorm.DB
}

// NewUserRepository creates a new instance of the UserRepository.
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

// GetAllUsers retrieves all users from the database.
func (repo *UserRepository) GetAllUsers() ([]models.User, error) {
	var users []models.User
	result := repo.DB.Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

// GetUserByID retrieves a user by their ID.
func (repo *UserRepository) GetUserByID(userID string) (*models.User, error) {
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
	result := repo.DB.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// UpdateUser updates an existing user in the database.
func (repo *UserRepository) UpdateUser(user *models.User) error {
	result := repo.DB.Save(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// DeleteUser deletes a user from the database.
func (repo *UserRepository) DeleteUser(userID string) error {
	result := repo.DB.Delete(&models.User{}, "user_id = ?", userID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
