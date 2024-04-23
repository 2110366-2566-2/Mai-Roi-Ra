package models

import (
	"time"
)

type Post struct {
	PostId      string    `gorm:"column:post_id;not null;primaryKey"`
	UserId      string    `gorm:"column:user_id;not null"`
	EventId     string    `gorm:"column:event_id;not null"`
	Caption     *string   `gorm:"column:caption"`
	RatingScore int       `gorm:"column:rating_score;check:rating_range"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`
}

func (Post) TableName() string {
	return "posts"
}
