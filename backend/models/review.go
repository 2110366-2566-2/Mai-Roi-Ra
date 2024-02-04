package models

import (
	"github.com/google/uuid"
)

type Review struct {
	UserID  uuid.UUID `gorm:"type:uuid;not null" json:"user_id" binding:"required"`
	EventID uuid.UUID `gorm:"type:uuid;not null" json:"event_id" binding:"required"`
	PostID  uuid.UUID `gorm:"type:uuid;not null" json:"post_id" binding:"required"`
}

func (Review) TableName() string {
	return "Reviews"
}
