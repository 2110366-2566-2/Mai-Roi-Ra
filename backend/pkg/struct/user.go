package structure

type CreateUserRequest struct {
	Username                 string    `json:"username" binding:"required"`
	PhoneNumber              string    `json:"phone_number" binding:"required"`
	Email                    string    `json:"email" binding:"required"`
	FirstName                string    `json:"first_name" binding:"required"`
	LastName                 string    `json:"last_name" binding:"required"`
	Password                 string    `json:"password" binding:"required"`
	BirthDate                string    `json:"birth_date" binding:"required"`
	UserImage                string    `json:"user_image" binding:"required"`
	Address                  string    `json:"address" binding:"required"`
	District                 string    `json:"district" binding:"required"`
	Province                 string    `json:"province" binding:"required"`
}

type CreateUserResponse struct {
	UserId string `json:"event_id"`
}