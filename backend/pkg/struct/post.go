package structure

type GetPostByIdRequest struct {
	PostId string `json:"post_id" binding:"required"`
}

type GetPostByIdResponse struct {
	PostId            string  `json:"post_id"`
	UserId            string  `json:"user_id"`
	Username          string  `json:"username"`
	EventId           string  `json:"event_id"`
	Caption           *string `json:"caption"`
	RatingScore       int     `json:"rating_score"`
	OrganizerResponse string  `json:"organizer_response"`
}

type PostList struct {
	PostId      string  `json:"post_id"`
	UserId      string  `json:"user_id"`
	EventId     string  `json:"event_id"`
	Caption     *string `json:"caption"`
	RatingScore int     `json:"rating_score"`
}

type GetPostListsByEventIdRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type GetPostListsByEventIdResponse struct {
	PostLists []PostList `json:"post_lists"`
}

type CreatePostRequest struct {
	UserId      string  `json:"user_id" binding:"required" example:"User001"`
	EventId     string  `json:"event_id" binding:"required" example:"Event001"`
	Caption     *string `json:"caption" binding:"required" example:"Caption1"`
	RatingScore int     `json:"rating_score" binding:"gte=1,lte=5" example:"4"` // RatingScore must be an integer between 1 and 5.
}

type CreatePostResponse struct {
	PostId string `json:"post_id" binding:"required"`
}

type DeletePostRequest struct {
	PostId string `json:"post_id" binding:"required"`
}

type DeletePostResponse struct {
	Message string `json:"message"`
}
