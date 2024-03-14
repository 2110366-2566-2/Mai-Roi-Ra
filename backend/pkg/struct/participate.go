package structure

type IsRegisteredRequest struct {
	UserId  string `json:"user_id" binding:"required"`
	EventId string `json:"event_id" binding:"required"`
}

type IsRegisteredResponse struct {
	IsRegistered bool `json:"is_registered" binding:"required"`
}
