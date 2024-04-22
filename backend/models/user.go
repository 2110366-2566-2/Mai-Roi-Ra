package models

import (
	"time"
)

// User model struct
type User struct {
	UserID                   string    `gorm:"column:user_id;not null;primaryKey"`
	Username                 string    `gorm:"column:username;not null"`
	PhoneNumber              *string   `gorm:"column:phone_number"`
	Email                    *string   `gorm:"column:email"`
	FirstName                string    `gorm:"column:first_name;not null"`
	LastName                 string    `gorm:"column:last_name;not null"`
	Password                 string    `gorm:"column:password;not null"`
	IsEnableNotification     bool      `gorm:"column:is_enable_notification;not null"`
	PaymentGatewayCustomerID string    `gorm:"column:payment_gateway_customer_id"`
	BirthDate                time.Time `gorm:"column:birth_date"`
	UserImage                string    `gorm:"column:user_image"`
	Address                  string    `gorm:"column:address;not null"`
	District                 string    `gorm:"column:district;not null"`
	Province                 string    `gorm:"column:province;not null"`
	BannerImage              string    `gorm:"column:banner_image"`
	Role                     string    `gorm:"column:role;not null"`
	RegisterType             string    `gorm:"column:register_type;not null"`
	IsVerified               bool      `gorm:"column:is_verified;not null"`
	CreatedAt                time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt                time.Time `gorm:"column:updated_at"`
}

func (User) TableName() string {
	return "users"
}
