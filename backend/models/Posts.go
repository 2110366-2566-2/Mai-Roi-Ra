package models

import (
	"time"
)

// Post model struct
type Post struct {
	PostID      string    `gorm:"type:char(10);not null;primaryKey" json:"post_id" binding:"required"`
	CreatedAt   time.Time `gorm:"type:timestamp without time zone;not null" json:"created_at" binding:"required"`
	PostImage   string    `gorm:"type:varchar(1024)" json:"post_image"`
	Caption     string    `gorm:"type:varchar(1000)" json:"caption"`
	RatingScore int       `gorm:"type:int;check:rating_range" json:"rating_score" binding:"gte=1,lte=5"`
	UserID      string    `gorm:"type:char(10);not null" json:"user_id" binding:"required"`
}

// TableName specifies the table name for the Post model
func (Post) TableName() string {
	return "Posts"
}

// CustomValidatorPost struct to define custom validation rules for Post
type CustomValidatorPost struct{}

// ValidateRatingRange is a custom validator function for rating score range
func (CustomValidatorPost) ValidateRatingRange(field interface{}) bool {
	if rating, ok := field.(int); ok {
		return rating >= 1 && rating <= 5
	}
	return false
}