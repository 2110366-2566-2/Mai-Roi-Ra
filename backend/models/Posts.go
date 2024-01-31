package model

type Post struct {
	PostId      string `json:"postId" binding:"required"`
	CreatedAt   string `json:"createdAt" binding:"required"`
	PostImage   string `json:"postImage"`
	Caption     string `json:"caption"`
	RatingScore int    `json:"ratingScore" binding:"gte=1,lte=5"`
	UserId      string `json:"UserId" binding:"required"`
}