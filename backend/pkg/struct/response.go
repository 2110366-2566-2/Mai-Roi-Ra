package structure

type CreateResponseRequest struct {
	OrganizerId string    `json:"organizer_id" binding:"required"`
	PostId      string    `json:"post_id" binding:"required"`
	Detail      string    `json:"detail"`
}

type CreateResponseResponse struct {
	Message string `json:"message"`
}