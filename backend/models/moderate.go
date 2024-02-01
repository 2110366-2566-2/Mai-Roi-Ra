package models

import (
	"time"

	"github.com/google/uuid"
)

type Moderate struct {
	UserID      uuid.UUID `gorm:"type:uuid;not null;primaryKey" json:"user_id" binding:"required"`
	OrganizerID uuid.UUID `gorm:"type:uuid;not null" json:"organizer_id" binding:"required"`
	CreatedAt   time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Moderate) TableName() string {
	return "Moderates"
}
