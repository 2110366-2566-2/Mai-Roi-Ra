package structure

import "github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"

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
	UserId      string `json:"user_id"`
	FirstName   string `json:"first_name" binding:"required"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Token       string `json:"token"`
	OrganizerId string `json:"organizer_id"`
	Role        string `json:"role"`
}
type LogoutUserRequest struct {
	UserID string `json:"user_id" binding:"required"`
	//Token  string

}
type LogoutUserResponse struct {
}

// email login
type LoginUserEmailRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginUserEmailResponse struct {
	UserId      string `json:"user_id"`
	FirstName   string `json:"first_name" binding:"required"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Token       string `json:"token"`
}

// phone login
type LoginUserPhoneRequest struct {
	PhoneNumber string `json:"phone_number"`
	Password    string `json:"password"`
}

type LoginUserPhoneResponse struct {
	UserId      string `json:"user_id"`
	FirstName   string `json:"first_name" binding:"required"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Token       string `json:"token"`
}

// getAllusers
type GetAllUsersResponse struct {
	Users []models.User `json:"users"` //FIXME should not use struct from models
}

// type AuthMeRequest struct {
// 	Token string `json:"token"`
// }

// type AuthMeResponse struct {
// 	Users []models.User `json:"users"`
// }

type RegisterEventRequest struct {
	UserId         string `json:"user_id" binding:"required"`
	EventId        string `json:"event_id" binding:"required"`
	NumParticipant int    `json:"num_participant" binding:"required"`
}

type CancelRegisterEventRequest struct {
	UserId  string `json:"user_id" binding:"required"`
	EventId string `json:"event_id" binding:"required"`
}

type RegisterEventResponse struct {
	Message string `json:"message"`
}

type ParticipatedEvent struct {
	EventId      string  `json:"event_id"`
	EventName    string  `json:"event_name" binding:"required"`
	StartDate    string  `json:"start_date" binding:"required"`
	EndDate      string  `json:"end_date" binding:"required"`
	EventImage   *string `json:"event_image"`
	LocationName string  `json:"location_name" binding:"required"`
	Description  string  `json:"description" binding:"required"`
}

type GetParticipatedEventListsRequest struct {
	UserId string `json:"user_id" binding:"required"`
	Offset int    `json:"offset"`
	Limit  int    `json:"limit"`
}

type GetParticipatedEventListsResponse struct {
	EventsList []ParticipatedEvent `json:"event_list"`
}

type SearchEventRequest struct {
	UserId string `json:"user_id" binding:"required"`
	Search string `json:"search"`
	Offset int    `json:"offset"`
	Limit  int    `json:"limit"`
}

type SearchEventResponse struct {
	EventsList []ParticipatedEvent `json:"event_list"`
}

type SearchHistory struct {
	SearchId   string `json:"user_id" binding:"required"`
	SearchName string `json:"search_name" binding:"required"`
}

type GetSearchHistoriesResponse struct {
	SearchHistoryList []SearchHistory `json:"search_history"`
}

type SignInGoogleRequest struct {
}

type SignInGoogleResponse struct {
    Provider          string `json:"provider"`
    Email             string `json:"email"`
    Name              string `json:"name"`
    FirstName         string `json:"first_name"`
    LastName          string `json:"last_name"`
    NickName          string `json:"nickname"`
    Description       string `json:"description"`
    UserID            string `json:"user_id"`
    AvatarURL         string `json:"avatar_url"`
    Location          string `json:"location"`
    AccessToken       string `json:"access_token"`
    AccessTokenSecret string `json:"access_token_secret"`
    RefreshToken      string `json:"refresh_token"`
    IDToken           string `json:"id_token"`
}

