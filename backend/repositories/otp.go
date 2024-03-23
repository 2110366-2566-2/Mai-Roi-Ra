package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"gorm.io/gorm"
)

type OtpRepository struct {
	db *gorm.DB
}

type IOtpRepository interface {
	GetUserOTP(userId *string) (*string, *time.Time, error)
	UpdateUserOTP(userId string, otp string, expired time.Time) error
	CreateOTP(userId *string) error
}

func NewOtpRepository(
	db *gorm.DB,
) IOtpRepository {
	return &OtpRepository{
		db: db,
	}
}

func (r *OtpRepository) GetUserOTP(userId *string) (*string, *time.Time, error) {
	log.Println("[Repo: GetUserOTP] Called")

	var modelOtp models.OTP
	if err := r.db.Where("user_id = ?", userId).First(&modelOtp).Error; err != nil {
		log.Println("[Repo: GetUserOTP] Error finding user:", err)
		return nil, nil, err
	}

	return &modelOtp.OTP, &modelOtp.OTPExpiresAt, nil
}

func (r *OtpRepository) UpdateUserOTP(userId string, otp string, expired time.Time) error {
	log.Println("[Repo: UpdateUserOTP] Called")

	var modelOtp models.OTP
	if err := r.db.Where(`user_id=?`, userId).Find(&modelOtp).Error; err != nil {
		log.Print("[Repo: UpdateUserOTP] user_id not found")
		return err
	}

	modelOtp.OTP = otp
	modelOtp.OTPExpiresAt = expired

	// Save the updated version
	if err := r.db.Save(&modelOtp).Error; err != nil {
		log.Println("[Repo: UpdateUserInformation] Error updating in the database:", err)
		return err
	}
	return nil
}

func (r *OtpRepository) CreateOTP(userId *string) error {
	log.Println("[Repo: CreateOTP]: Called")

	modelOtp := models.OTP{
		UserID:       *userId,
		OTP:          "",
		OTPExpiresAt: time.Time{},
	}

	trans := r.db.Begin().Debug()
	if err := trans.Create(&modelOtp).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateOTP]: Insert data in Users table error:", err)
		return err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateOTP]: Call orm DB Commit error:", err)
		return err
	}

	return nil
}
