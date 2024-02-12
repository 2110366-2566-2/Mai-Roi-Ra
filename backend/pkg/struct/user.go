package structure

import "github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"

type RegisterUserRequest struct {
	PhoneNumber string `gorm:"type:char(10);unique;not null" json:"phone_number"`
	Email       string `gorm:"type:varchar(64);unique;not null" json:"email"`
	Password    string `gorm:"type:varchar(255);not null" json:"-"` // Excluded from JSON responses

}

type RegisterUserResponse struct {
	UserID string `json:"user_id"`
}

type LoginUserRequest struct {
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}

type LoginUserResponse struct {
	Token string `json:"token"`
}

type GetAllUsersResponse struct {
	Users []models.User `json:"users"` //FIXME should not use struct from models
}

type GetUserRequest struct {
	ID string `from:"id"`
}

type GetUserResponse struct {
	User models.User `json:"user"`
}

type UpdateUserRequest struct {
	models.User
}

type UpdateUserResponse struct {
}

type DeleteUserRequest struct {
	ID string `from:"id"`
}

type DeleteUserResponse struct {
}

// Hello world
