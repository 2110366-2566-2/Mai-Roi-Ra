package models

import "time"

type OTP struct {
	UserID       string    `gorm:"column:user_id;not null;primaryKey"`
	OTP          string    `gorm:"column:otp"`
	OTPExpiresAt time.Time `gorm:"column:otp_expires_at"`
}

func (OTP) TableName() string {
	return "otp"
}