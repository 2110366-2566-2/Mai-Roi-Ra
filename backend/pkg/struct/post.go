package structure

type GetPostByIdRequest struct {
	PostId string `json:"post_id" binding:"required"`
}

type GetPostByIdResponse struct {
	PostId      string  `json:"post_id"`
	UserId      string  `json:"user_id"`
	EventId 	string  `json:"event_id"`
	PostImage   *string `json:"post_image"`
	Caption     *string `json:"caption"`
	RatingScore int     `json:"rating_score"`
}

type PostList struct {
	PostId      string  `json:"post_id"`
	UserId      string  `json:"user_id"`
	EventId 	string  `json:"event_id"`
	PostImage   *string `json:"post_image"`
	Caption     *string `json:"caption"`
	RatingScore int     `json:"rating_score"`
}

type GetPostListsByEventIdRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type GetPostListsByEventIdResponse struct {
	PostLists  []PostList `json:"post_lists"`
}

type CreatePostRequest struct {
	UserId      string  `json:"user_id" binding:"required"`
	EventId		string  `json:"event_id" binding:"required"`
	PostImage   *string `json:"post_image"`
	Caption     *string `json:"caption" binding:"required"`
	RatingScore int     `json:"rating_score" binding:"gte=1,lte=5"`
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
