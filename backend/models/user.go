package models

// we could use grom model I think it contain ID on it's own so we don't have to create uid or self but that just my research Idk if I'm wrong or not
import (
	"time"
	//"gorm.io/gorm" // grom
)

// User model struct
type User struct {
	//gorm.Model // grom
	UserID                   string `gorm:"type:char(10);not null;primaryKey" json:"user_id"`
	PaymentGatewayCustomerID string `gorm:"type:char(10);not null" json:"payment_gateway_customer_id"`
	PhoneNumber              string `gorm:"type:char(10);not null;check:phone_length" json:"phone_number"`
	// could do this???
	//	PhoneNumber 			 string    `gorm:"type:char(10);check:phone_number_length,phone_number_length > 9"`
	BirthDate time.Time `gorm:"type:date" json:"birth_date"`
	Email     string    `gorm:"type:varchar(64);not null" json:"email"`
	FirstName string    `gorm:"type:varchar(64);not null" json:"first_name"`
	LastName  string    `gorm:"type:varchar(64);not null" json:"last_name"`
	UserImage string    `gorm:"type:varchar(1024)" json:"user_image"`
	CreatedAt time.Time `gorm:"type:timestamp without time zone;not null" json:"created_at"`
	Username  string    `gorm:"type:varchar(255);unique" json:"username"`
	Password  string    `gorm:"type:varchar(255)" json:"-"` // Password should not be returned in JSON responses

}

// TableName specifies the table name for the User model
func (User) TableName() string {
	return "Users"
}

// CustomValidator struct to define custom validation rules
type CustomValidator struct{}

// ValidatePhoneLength is a custom validator function for phone length
func (CustomValidator) ValidatePhoneLength(field interface{}) bool {
	if phone, ok := field.(string); ok {
		return len(phone) == 10
	}
	return false
}
