package repository

import (
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

type IUserRepository interface {
	// GetUserByEmail(email string) (*models.User, error)
	CreateUser(user *st.CreateUserRequest) (*st.CreateUserResponse, error)
	UpdateUserInformation(req *st.UpdateUserInformationRequest) (*models.User, error)
	GetUserByID(req *st.GetUserByUserIdRequest) (*models.User, error)
}

// NewUserRepository creates a new instance of the UserRepository.
// oldone-func NewUserRepository(c *gin.Context, db *gorm.DB) *UserRepository {
func NewUserRepository(
	db *gorm.DB,
) IUserRepository {
	return &UserRepository{
		db: db,
	}
}

// // GetUserByEmail retrieves a user by their email address.
// func (repo *UserRepository) GetUserByEmail(email string) (*models.User, error) {
// 	var user models.User
// 	if err := repo.DB.Where("email = ?", email).First(&user).Error; err != nil {
// 		return nil, err
// 	}
// 	return &user, nil
// }

// // GetUserByPhoneNumber retrieves a user by their phone number.
// func (repo *UserRepository) GetUserByPhoneNumber(phoneNumber string) (*models.User, error) {
// 	var user models.User
// 	if err := repo.DB.Where("phone_number = ?", phoneNumber).First(&user).Error; err != nil {
// 		return nil, err
// 	}
// 	return &user, nil
// }

// CreateUser adds a new user to the database.
func (repo *UserRepository) CreateUser(user *models.User) error {
	result := repo.db.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// UpdateUser updates an existing user in the database.
func (repo *UserRepository) UpdateUser(user *models.User) error {
	result := repo.db.Save(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// DeleteUser deletes a user from the database.
func (repo *UserRepository) DeleteUser(userID string) error {
	result := repo.db.Delete(&models.User{}, "user_id = ?", userID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// UpdateUserInformation update information for user
func (r *UserRepository) UpdateUserInformation(req *st.UpdateUserInformationRequest) (*models.User, error) {
	log.Println("[Repo: UpdateUserInformation] Called")

	// find the user by user_id
	var modelUser models.User
	if err := r.DB.Where(`user_id=?`, req.UserId).Find(&modelUser).Error; err != nil {
		log.Print("[Repo: UpdateUserInformation] user_id not found")
		return nil, err
	}

	birthDate, err := utils.StringToTime(req.BirthDate)
	if err != nil {
		log.Println("[Repo: UpdateUserInformation] Error parsing BirthDate to time.Time format:", err)
		return nil, err
	}

	// updating the fields
	modelUser.BirthDate = birthDate

	if req.FirstName != "" {
		modelUser.FirstName = req.FirstName
	}

	if req.LastName != "" {
		modelUser.LastName = req.LastName
	}

	if req.Address != "" {
		modelUser.Address = req.Address
	}

	if req.District != "" {
		modelUser.District = req.District
	}

	if req.Province != "" {
		modelUser.Province = req.Province
	}

	if req.PhoneNumber != "" {
		modelUser.PhoneNumber = req.PhoneNumber
	}

	if req.UserImage != nil {
		modelUser.UserImage = req.UserImage
	}

	// Save the updated version
	if err := r.DB.Save(&modelUser).Error; err != nil {
		log.Println("[Repo: UpdateUserInformation] Error updating in the database:", err)
		return nil, err
	}

	return &modelUser, nil
}

// GetUserByID retrieves a user by their ID.
func (r *UserRepository) GetUserByID(req *st.GetUserByUserIdRequest) (*models.User, error) {
	log.Println("[REPO: GetUserByID]: Called")
	var user models.User
	if err := r.DB.Where("user_id = ?", req.UserId).Find(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
