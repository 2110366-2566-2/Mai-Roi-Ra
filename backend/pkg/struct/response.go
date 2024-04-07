package structure

type GetResponseByPostIdRequest struct {
	PostId string `json:"post_id" binding:"required"`
}

type GetResponseByPostIdResponse struct {
	OrganizerId string `json:"organizer_id"`
	PostId      string `json:"post_id"`
	Detail      string `json:"detail"`
}

type CreateResponseRequest struct {
	OrganizerId string `json:"organizer_id" binding:"required"`
	PostId      string `json:"post_id" binding:"required"`
	Detail      string `json:"detail"`
}

type CreateResponseResponse struct {
	Message string `json:"message"`
}
