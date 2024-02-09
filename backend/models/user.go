package models

// we could use grom model I think it contain ID on it's own so we don't have to create uid or self but that just my research Idk if I'm wrong or not
import (
	"time"
)

// User model struct
type User struct {
	UserID                   string    `gorm:"column:user_id;not null;primaryKey" json:"user_id"`
	Username                 string    `gorm:"column:username;not null" json:"username"`
	PhoneNumber              string    `gorm:"column:phone_number;not null;check:phone_length" json:"phone_number"`
	Email                    string    `gorm:"column:email;not null" json:"email"`
	FirstName                string    `gorm:"column:first_name;not null" json:"first_name"`
	LastName                 string    `gorm:"column:last_name;not null" json:"last_name"`
	Password                 string    `gorm:"column:password;not null" json:"-"` // Excluded from JSON responses
	PaymentGatewayCustomerID string    `gorm:"column:payment_gateway_customer_id;not null" json:"payment_gateway_customer_id"`
	BirthDate                time.Time `gorm:"column:birth_date" json:"birth_date"`
	UserImage                *string   `gorm:"column:user_image" json:"user_image"`
	Address                  string    `gorm:"column:address;not null"`
	District                 string    `gorm:"column:district;not null"`
	Province                 string    `gorm:"column:province;not null"`
	BannerImage              string    `gorm:"column:banner_image;not null"`
	CreatedAt                time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
}

func (User) TableName() string {
	return "users"
}
