package models

import (
	"time"

	"github.com/google/uuid"
)

type Post struct {
	PostID      uuid.UUID `gorm:"type:uuid;not null;primaryKey" json:"post_id" binding:"required"`
	UserID      uuid.UUID `gorm:"type:uuid;not null;" json:"user_id" binding:"required"`
	PostImage   *string   `gorm:"type:varchar(1024)" json:"post_image"`
	Caption     *string   `gorm:"type:varchar(1000)" json:"caption"`
	RatingScore int       `gorm:"type:int;check:rating_range" json:"rating_score" binding:"gte=1,lte=5"`
	CreatedAt   time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Post) TableName() string {
	return "Posts"
}
