package model

import (
	"time"
)
type Post struct {
	PostId      string `json:"postId" binding:"required"`
	CreatedAt   time.Time `json:"createdAt" binding:"required"`
	PostImage   string `json:"postImage"`
	Caption     string `json:"caption"`
	RatingScore int    `json:"ratingScore" binding:"gte=1,lte=5"`
	UserId      string `json:"UserId" binding:"required"`
}