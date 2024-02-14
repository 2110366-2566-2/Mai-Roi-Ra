package structure

type CreateUserRequest struct {
	Username    string  `json:"username" binding:"required"`
	PhoneNumber *string `json:"phone_number" `
	Email       *string `json:"email"`
	Password    string  `json:"password" binding:"required"`
	FirstName   string  `json:"first_name" binding:"required"`
	LastName    string  `json:"last_name" binding:"required"`
	Address     string  `json:"address" binding:"required"`
	District    string  `json:"district" binding:"required"`
	Province    string  `json:"province" binding:"required"`
	Role        string  `json:"role" binding:"required"`
	// You can add other fields here as necessary.
	// For example, if you want users to provide a birth date upon registration, uncomment the next line:
	// BirthDate                time.Time `json:"birth_date"`
}
type CreateUserResponse struct {
	UserID      string `json:"user_id" binding:"required"`
	OrganizerID string `json:"organizer_id"`
}

type UpdateUserInformationRequest struct {
	UserId    string  `json:"user_id" binding:"required"`
	FirstName string  `json:"first_name" binding:"required"`
	LastName  string  `json:"last_name" binding:"required"`
	Address   string  `json:"address" binding:"required"`
	District  string  `json:"district" binding:"required"`
	Province  string  `json:"province" binding:"required"`
	BirthDate string  `json:"birth_date" binding:"required"`
	UserImage *string `json:"user_image"`
}

type GetUserByUserIdRequest struct {
	UserId string `json:"user_id" binding:"required"`
}

type LoginUserRequest struct {
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}

type LoginUserResponse struct {
	Token string `json:"token"`
}
type LogoutUserRequest struct {
	UserID string `json:"user_id" binding:"required"`
	//Token  string

}
type LogoutUserResponse struct {
}
