package models

import (
	"time"
)

type Post struct {
	PostId      string    `gorm:"column:post_id;not null;primaryKey" json:"post_id" binding:"required"`
	UserId      string    `gorm:"column:user_id;not null;" json:"user_id" binding:"required"`
	PostImage   *string   `gorm:"column:post_image" json:"post_image"`
	Caption     *string   `gorm:"column:caption" json:"caption"`
	RatingScore int       `gorm:"column:rating_score;check:rating_range" json:"rating_score" binding:"gte=1,lte=5"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
}

func (Post) TableName() string {
	return "Posts"
}
