package structure

type CreatePostRequest struct {
	UserId      string    `json:"user_id" binding:"required"`
	PostImage   *string   `json:"post_image"`
	Caption     *string   `json:"caption" binding:"required"`
	RatingScore int       `json:"rating_score" binding:"gte=1,lte=5"`
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