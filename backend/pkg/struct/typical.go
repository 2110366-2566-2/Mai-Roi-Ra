package structure

type UserIdRequest struct {
	UserId string `json:"user_id" binding:"required"`
}

type EventIdRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type PostIdRequest struct {
	PostId string `json:"post_id" binding:"required"`
}

type ProblemIdRequest struct {
	ProblemId string `json:"problem_id" binding:"required"`
}

type MessageResponse struct {
	Response string `json:"response"`
}
