package repository

import (
	"errors"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// UserRepository represents the repository for the User model.
type UserRepository struct {
	DB *gorm.DB
}

type IUserRepository interface {
	GetUserByEmail(email string) (*models.User, error)
	GetUserByPhoneNumber(phoneNumber string) (*models.User, error)
	CreateUser(*st.CreateUserRequest) (*string, error)
	UpdateUserInformation(req *st.UpdateUserInformationRequest) (*models.User, error)
	GetUserByToken(token string) (*models.User, error)
	GetUserByID(req *st.GetUserByUserIdRequest) (*models.User, error)
	UpdateUserToken(userID string, token string) error
	GetAllUsers() ([]models.User, error)
	GetUserDataForEvents(userList []*models.Participate) (*st.GetParticipantListsResponse, error)
	ToggleNotifications(req *st.GetUserByUserIdRequest) (*st.RegisterEventResponse, error)
	IsEnableNotification(userId string) (*bool, *string, error)
	GetRandomAdmin() (*models.User, error)
	GetAllAdmins() ([]*models.User, error)
	// SendOTPEmail(req *st.SendOTPEmailRequest) error            
	// VerifyOTP(req *st.VerifyOTPRequest) (bool, error) 
}

// NewUserRepository creates a new instance of the UserRepository.
// oldone-func NewUserRepository(c *gin.Context, db *gorm.DB) *UserRepository {
func NewUserRepository(
	DB *gorm.DB,
) IUserRepository {
	return &UserRepository{
		DB: DB,
	}
}

// GetAllUsers retrieves all users from the database.
func (repo *UserRepository) GetAllUsers() ([]models.User, error) {
	log.Println("[Repo: GetAllUsers]: Called")
	var users []models.User
	result := repo.DB.Find(&users)
	if result.Error != nil {
		return nil, result.Error
	}
	return users, nil
}

// GetUserByEmail retrieves a user by their email address.
func (repo *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	log.Println("[Repo: GetUserByEmail]: Called")
	var user models.User
	if err := repo.DB.Where("email = ?", email).First(&user).Error; err != nil {
		log.Println("[Repo: GetUserByEmail]: can't find user")
		return nil, err
	}
	return &user, nil
}

// GetUserByPhoneNumber retrieves a user by their phone number.
func (repo *UserRepository) GetUserByPhoneNumber(phoneNumber string) (*models.User, error) {
	log.Println("[Repo: GetUserByPhoneNumber]: Called")
	var user models.User
	if err := repo.DB.Where("phone_number = ?", phoneNumber).First(&user).Error; err != nil {
		log.Println("[Repo: GetUserByPhoneNumber]: can't find user")
		return nil, err
	}
	return &user, nil
}

// CreateUser adds a new user to the database.
func (r *UserRepository) CreateUser(req *st.CreateUserRequest) (*string, error) {
	log.Println("[Repo: CreateUser]: Called")

	role := constant.USER
	if req.Role == "Organizer" {
		role = constant.ORGANIZER
	} else if req.Role == "Admin" {
		role = constant.ADMIN
	}
	userModel := models.User{
		UserID:                   utils.GenerateUUID(),
		Username:                 req.Username,
		PhoneNumber:              req.PhoneNumber,
		Email:                    req.Email,
		FirstName:                req.FirstName,
		LastName:                 req.LastName,
		Password:                 req.Password,
		IsEnableNotification:     false,
		PaymentGatewayCustomerID: "", // NullString for other string fields
		UserImage:                "",
		Address:                  req.Address,
		District:                 req.District,
		Province:                 req.Province,
		BannerImage:              "",
		Role:                     role,
		RegisterType:             constant.NORMAL, // will change later
		CreatedAt:                time.Time{},
	}

	trans := r.DB.Begin().Debug()
	if err := trans.Create(&userModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateUser]: Insert data in Users table error:", err)
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateUser]: Call orm DB Commit error:", err)
		return nil, err
	}

	return &userModel.UserID, nil
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

	if req.UserImage != nil {
		modelUser.UserImage = *req.UserImage
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

// GetUserByToken retrieves a user by their token.
func (repo *UserRepository) GetUserByToken(token string) (*models.User, error) {
	log.Println("[REPO: GetUserByToken]: Called")
	var user models.User
	if err := repo.DB.Where("token = ?", token).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, err
	}
	return &user, nil
}

// UpdateUserToken updates a token to existing user in the database.
func (repo *UserRepository) UpdateUserToken(userID string, token string) error {
	log.Println("[REPO: UpdateUserToken]: Called")
	err := repo.DB.Model(&models.User{}).Where("user_id = ?", userID).Update("token", token).Error
	if err != nil {
		return err
	}
	return nil
}

func (r *UserRepository) GetUserDataForEvents(userList []*models.Participate) (*st.GetParticipantListsResponse, error) {
	log.Println("[Repo: GetUserDataForEvents]: Called")

	resLists := &st.GetParticipantListsResponse{
		ParticipantList: make([]st.Participant, 0),
	}

	for _, v := range userList {
		var tmpUser models.User
		if err := r.DB.Where("user_id = ?", v.UserId).Find(&tmpUser).Error; err != nil {
			log.Println("[Repo: GetUserDataForEvents] error query user_id for ", v.UserId)
			return nil, err
		}

		particiapant := st.Participant{
			UserId:         tmpUser.UserID,
			Username:       tmpUser.Username,
			FirstName:      tmpUser.FirstName,
			LastName:       tmpUser.LastName,
			UserImage:      tmpUser.UserImage,
			NumParticipant: v.NumParticipant,
			PhoneNumber:    tmpUser.PhoneNumber,
			Email:          tmpUser.Email,
			BirthDate:      tmpUser.BirthDate.Format("2006/02/01"),
			Address:        tmpUser.Address,
			District:       tmpUser.District,
			Province:       tmpUser.Province,
		}

		resLists.ParticipantList = append(resLists.ParticipantList, particiapant)
	}
	return resLists, nil
}

func (r *UserRepository) ToggleNotifications(req *st.GetUserByUserIdRequest) (*st.RegisterEventResponse, error) {
	log.Println("[Repo: ToggleNotifications] Called")

	// find the user by user_id
	var modelUser models.User
	if err := r.DB.Where(`user_id=?`, req.UserId).Find(&modelUser).Error; err != nil {
		log.Print("[Repo: ToggleNotifications] user_id not found")
		return nil, err
	}

	modelUser.IsEnableNotification = !modelUser.IsEnableNotification

	// Save the updated version
	if err := r.DB.Save(&modelUser).Error; err != nil {
		log.Println("[Repo: ToggleNotifications] Error updating in the database:", err)
		return nil, err
	}

	return &st.RegisterEventResponse{
		Message: "Toggle Successful",
	}, nil
}

func (r *UserRepository) GetRandomAdmin() (*models.User, error) {
	log.Println("[Repo: GetRandomAdmin]: Called")
	var admin models.User
	if err := r.DB.Where(`role = ?`, constant.ADMIN).Order("RANDOM()").First(&admin).Error; err != nil {
		log.Println("[Repo: GetRandomAdmin]: Error randomized the admin")
		return nil, err
	}
	return &admin, nil
}

func (r *UserRepository) IsEnableNotification(userId string) (*bool, *string, error) {
	log.Println("[Repo: IsEnableNotification] Called")
	var userModel models.User
	if err := r.DB.Where(`user_id = ?`, userId).Find(&userModel).Error; err != nil {
		log.Print("[Repo: IsEnableNotification] user_id not found")
		return nil, nil, err
	}
	return &userModel.IsEnableNotification, userModel.Email, nil
}

func (r *UserRepository) GetAllAdmins() ([]*models.User, error) {
	log.Println("[Repo: GetAllAdminsEmail] Called")
	var userModels []*models.User
	if err := r.DB.Where(`role = ?`, constant.ADMIN).Find(&userModels).Error; err != nil {
		log.Println("[Repo: GetAllAdminsEmail]: cannot retrieve data from DB:", err)
		return nil, err
	}
	return userModels, nil
}

// // SendOTPEmail sends an OTP email to the user's email address.
// func (r *UserRepository) SendOTPEmail(req *st.SendOTPEmailRequest) error {
// 	log.Println("[Repo: SendOTPEmail]: Called")

// 	// Logic to send the OTP email goes here.
// 	// For example, you might use an email service to send the email.

// 	return nil
// }

// // VerifyOTP verifies the OTP entered by the user.
// func (r *UserRepository) VerifyOTP(req *st.VerifyOTPRequest) (bool, error) {
// 	log.Println("[Repo: VerifyOTP]: Called")

// 	// Logic to verify the OTP goes here.
// 	// For example, you might check the OTP against a stored value in the database.

// 	return true, nil
// }
