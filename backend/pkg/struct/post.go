package structure

type GetPostByIdResponse struct {
	PostId            string  `json:"post_id" example:"1v6v1i1m0z0r1s1c2s1x3w3t4x1m1k1v6"`
	UserId            string  `json:"user_id" example:"9e5d846e-8f41-4a6c-aa48-ecabdf4f0ac3"`
	Username          string  `json:"username" example:"User001"`
	EventId           string  `json:"event_id" example:"b21d43c3-1a0a-4f36-b38b-81d0e57af681"`
	Caption           *string `json:"caption" example:"Caption (Max Length 1000)"`
	RatingScore       int     `json:"rating_score" example:"4"`
	OrganizerResponse string  `json:"organizer_response" example:"Response1"`
}

type PostList struct {
	PostId            string  `json:"post_id" example:"1v6v1i1m0z0r1s1c2s1x3w3t4x1m1k1v6"`
	UserId            string  `json:"user_id" example:"9e5d846e-8f41-4a6c-aa48-ecabdf4f0ac3"`
	Username          string  `json:"username" example:"User001"`
	EventId           string  `json:"event_id" example:"b21d43c3-1a0a-4f36-b38b-81d0e57af681"`
	Caption           *string `json:"caption" example:"Caption (Max Length 1000)"`
	RatingScore       int     `json:"rating_score" example:"4"`
	OrganizerResponse string  `json:"organizer_response" example:"Response1"`
}

type GetPostListsByEventIdResponse struct {
	PostLists   []PostList `json:"post_lists"`
	OneRate     int        `json:"one_rate"`
	TwoRate     int        `json:"two_rate"`
	ThreeRate   int        `json:"three_rate"`
	FourRate    int        `json:"four_rate"`
	FiveRate    int        `json:"five_rate"`
	AverageRate float64    `json:"average_rate"`
}

type CreatePostRequest struct {
	UserId      string  `json:"user_id" binding:"required" example:"9e5d846e-8f41-4a6c-aa48-ecabdf4f0ac3"`
	EventId     string  `json:"event_id" binding:"required" example:"b21d43c3-1a0a-4f36-b38b-81d0e57af681"`
	Caption     *string `json:"caption" binding:"required" example:"Caption (Max Length 1000)"`
	RatingScore int     `json:"rating_score" binding:"gte=1,lte=5" example:"4"` // RatingScore must be an integer between 1 and 5.
}

type CreatePostResponse struct {
	PostId string `json:"post_id" binding:"required" example:"1v6v1i1m0z0r1s1c2s1x3w3t4x1m1k1v6"`
}
