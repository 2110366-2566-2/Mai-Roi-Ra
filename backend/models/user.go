package models

// we could use grom model I think it contain ID on it's own so we don't have to create uid or self but that just my research Idk if I'm wrong or not
import (
	"time"
)

// User model struct
type User struct {
	//gorm.Model                         // This includes fields ID, CreatedAt, UpdatedAt, DeletedAt
	//UserImage                *string   `gorm:"column:user_image" json:"user_image"`
	UserID                   string    `gorm:"column:user_id;not null;primaryKey" json:"user_id"`
	Username                 string    `gorm:"column:username;not null" json:"username"`
	PhoneNumber              *string   `gorm:"column:phone_number" json:"phone_number"` // Replace "phone_length_constraint" with actual SQL check expression if needed
	Email                    *string   `gorm:"column:email" json:"email"`
	FirstName                string    `gorm:"column:first_name;not null" json:"first_name"`
	LastName                 string    `gorm:"column:last_name;not null" json:"last_name"`
	Password                 string    `gorm:"column:password;not null" json:"-"` // Excluded from JSON responses
	PaymentGatewayCustomerID string    `gorm:"column:payment_gateway_customer_id" json:"payment_gateway_customer_id"`
	BirthDate                time.Time `gorm:"column:birth_date" json:"birth_date"`
	UserImage                string    `gorm:"column:user_image" json:"user_image"`
	Address                  string    `gorm:"column:address;not null" json:"address"`
	District                 string    `gorm:"column:district;not null" json:"district"`
	Province                 string    `gorm:"column:province;not null" json:"province"`
	BannerImage              string    `gorm:"column:banner_image" json:"banner_image"`
	CreatedAt                time.Time `gorm:"column:created_at;not null;autoCreateTime" json:"created_at"`
	UpdatedAt                time.Time `gorm:"column:updated_at" json:"updated_at"`
	Token                    string    `gorm:"type:varchar(1024) " json:"-"` // Excluded from JSON responses
}

func (User) TableName() string {
	return "users"
}

// CustomValidator struct to define custom validation rules
type CustomValidator struct{}
