package structure

type UserIdRequest struct {
	UserId string `json:"user_id" binding:"required"`
}

type EventIdRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type MessageResponse struct {
	Message string `json:"message"`
}
