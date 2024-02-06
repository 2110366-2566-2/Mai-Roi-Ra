package models

import (
	"time"
)

type Post struct {
	PostId      string    `gorm:"column:PostId;not null;primaryKey" json:"post_id" binding:"required"`
	UserId      string    `gorm:"column:UserId;not null;" json:"user_id" binding:"required"`
	PostImage   *string   `gorm:"column:PostImage" json:"post_image"`
	Caption     *string   `gorm:"column:Caption" json:"caption"`
	RatingScore int       `gorm:"column:RatingScore;check:rating_range" json:"rating_score" binding:"gte=1,lte=5"`
	CreatedAt   time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}


func (Post) TableName() string {
	return "Posts"
}
