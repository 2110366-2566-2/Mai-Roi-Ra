package models

import (
	"time"

	"github.com/google/uuid"
)

type Participate struct {
	UserID    uuid.UUID `gorm:"type:uuid;not null" json:"user_id" binding:"required"`
	EventID   uuid.UUID `gorm:"type:uuid;not null" json:"event_id" binding:"required"`
	CreatedAt time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Participate) TableName() string {
	return "Participates"
}