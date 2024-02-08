package models

// we could use grom model I think it contain ID on it's own so we don't have to create uid or self but that just my research Idk if I'm wrong or not
import (
	"time"

	"gorm.io/gorm"
)

// User model struct
type User struct {
	gorm.Model                         // This includes fields ID, CreatedAt, UpdatedAt, DeletedAt
	Username                 string    `gorm:"type:varchar(255);unique;not null" json:"username"`
	PhoneNumber              string    `gorm:"type:char(10);unique;not null" json:"phone_number"`
	Email                    string    `gorm:"type:varchar(64);unique;not null" json:"email"`
	FirstName                string    `gorm:"type:varchar(64);not null" json:"first_name"`
	LastName                 string    `gorm:"type:varchar(64);not null" json:"last_name"`
	Password                 string    `gorm:"type:varchar(255);not null" json:"-"` // Excluded from JSON responses
	PaymentGatewayCustomerID string    `gorm:"type:char(10);not null" json:"payment_gateway_customer_id"`
	BirthDate                time.Time `gorm:"type:date;not null" json:"birth_date"`
	UserImage                string    `gorm:"type:varchar(1024);not null" json:"user_image"`
	Address                  string    `gorm:"type:varchar(255);not null"`
	District                 string    `gorm:"type:varchar(64);not null"`
	Province                 string    `gorm:"type:varchar(64);not null"`
	BannerImage              string    `gorm:"type:varchar(1024);not null"`
}

// TableName specifies the table name for the User model
func (User) TableName() string {
	return "Users"
}

// CustomValidator struct to define custom validation rules
type CustomValidator struct{}
