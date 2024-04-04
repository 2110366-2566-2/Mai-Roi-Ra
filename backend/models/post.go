package models

import (
	"time"
)

type Post struct {
	PostId      string    `gorm:"column:post_id;not null;primaryKey" json:"post_id" binding:"required"`
	UserId      string    `gorm:"column:user_id;not null;" json:"user_id" binding:"required"`
	EventId     string    `gorm:"column:event_id;not null;" json:"event_id" binding:"required"`
	Caption     *string   `gorm:"column:caption" json:"caption"`
	RatingScore int       `gorm:"column:rating_score;check:rating_range" json:"rating_score" binding:"gte=1,lte=5"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Post) TableName() string {
	return "posts"
}
