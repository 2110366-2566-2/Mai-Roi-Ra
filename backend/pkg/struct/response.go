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
	OrganizerId string `json:"organizer_id" binding:"required" example:"9e5d846e-8f41-4a6c-aa48-ecabdf4f12f4"`
	PostId      string `json:"post_id" binding:"required" example:"1v6v1i1m0z0r1s1c2s1x3w3t4x1m1k1v6"`
	Detail      string `json:"detail" example:"Response Detail"`
}

type CreateResponseResponse struct {
	Message string `json:"message" example:"Create Respose for PostID : 1v6v1i1m0z0r1s1c2s1x3w3t4x1m1k1v6 successful"`
}
