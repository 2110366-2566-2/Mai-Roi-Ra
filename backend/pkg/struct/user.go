package structure

type CreateUserRequest struct {
	Username                 string `json:"username" binding:"required"`
	PhoneNumber              string `json:"phone_number" binding:"required"`
	BirthDate                string `json:"birth_date" binding:"required"`
	Email                    string `json:"email" binding:"required"`
	FirstName                string `json:"first_name" binding:"required"`
	LastName                 string `json:"last_name" binding:"required"`
	UserImage                *string `json:"user_image"`
}

type CreateUserResponse struct {
	UserId string `json:"user_id"`
}