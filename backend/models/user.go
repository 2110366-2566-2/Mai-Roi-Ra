package models

import (
	"time"
)

// User model struct
type User struct {
	UserID                   string    `gorm:"column:user_id;not null;primaryKey" json:"user_id"`
	PaymentGatewayCustomerID string    `gorm:"column:payment_gateway_customer_id;not null" json:"payment_gateway_customer_id"`
	PhoneNumber              string    `gorm:"column:phone_number;not null;check:phone_length" json:"phone_number"`
	BirthDate                time.Time `gorm:"column:birth_date" json:"birth_date"`
	Email                    string    `gorm:"column:email;not null" json:"email"`
	FirstName                string    `gorm:"column:first_name;not null" json:"first_name"`
	LastName                 string    `gorm:"column:last_name;not null" json:"last_name"`
	UserImage                string    `gorm:"column:user_image" json:"user_image"`
	CreatedAt                time.Time `gorm:"column:created_at;not null" json:"created_at"`
}

func (User) TableName() string {
	return "users"
}