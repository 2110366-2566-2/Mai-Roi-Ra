package models

import "time"

type OTP struct {
	UserID       string    `gorm:"column:user_id;not null;primaryKey" json:"user_id"`
	OTP          string    `gorm:"column:otp" json:"-"`
	OTPExpiresAt time.Time `gorm:"column:otp_expires_at" json:"-"`
}

func (OTP) TableName() string {
	return "otp"
}
