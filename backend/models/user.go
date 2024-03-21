package models

import (
	"time"
)

// User model struct
type User struct {
	UserID                   string    `gorm:"column:user_id;not null;primaryKey" json:"user_id"`
	Username                 string    `gorm:"column:username;not null" json:"username"`
	PhoneNumber              *string   `gorm:"column:phone_number" json:"phone_number"`
	Email                    *string   `gorm:"column:email" json:"email"`
	FirstName                string    `gorm:"column:first_name;not null" json:"first_name"`
	LastName                 string    `gorm:"column:last_name;not null" json:"last_name"`
	Password                 string    `gorm:"column:password;not null" json:"-"`
	IsEnableNotification     bool      `gorm:"column:is_enable_notification;not null" json:"is_enable_notification"`
	PaymentGatewayCustomerID string    `gorm:"column:payment_gateway_customer_id" json:"payment_gateway_customer_id"`
	BirthDate                time.Time `gorm:"column:birth_date" json:"birth_date"`
	UserImage                string    `gorm:"column:user_image" json:"user_image"`
	Address                  string    `gorm:"column:address;not null" json:"address"`
	District                 string    `gorm:"column:district;not null" json:"district"`
	Province                 string    `gorm:"column:province;not null" json:"province"`
	BannerImage              string    `gorm:"column:banner_image" json:"banner_image"`
	Role                     string    `gorm:"column:role;not null" json:"role"`
	RegisterType             string    `gorm:"column:register_type;not null" json:"register_type"`
	IsVerified               bool      `gorm:"column:is_verified;not null" json:"is_verified"`
	CreatedAt                time.Time `gorm:"column:created_at;not null;autoCreateTime" json:"created_at"`
	UpdatedAt                time.Time `gorm:"column:updated_at" json:"updated_at"`
	Token                    string    `gorm:"column:token" json:"-"`
	OTP                      string    `gorm:"column:otp" json:"-"`
	OTPExpiresAt             time.Time `gorm:"column:otp_expires_at" json:"-"`
}

func (User) TableName() string {
	return "users"
}

// CustomValidator struct to define custom validation rules
type CustomValidator struct{}
