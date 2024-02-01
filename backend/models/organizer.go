package models

import (
	"time"

	"github.com/google/uuid"
)

type Organizer struct {
	OrganizerID uuid.UUID   `gorm:"type:uuid;primaryKey;not null" json:"organizer_id" binding:"required"`
	UserID      uuid.UUID   `gorm:"type:uuid;not null" json:"user_id" binding:"required"`
	OfficeHours []time.Time `gorm:"type:timestamp[];not null" json:"office_hours" binding:"required"`
	CreatedAt   time.Time   `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Organizer) TableName() string {
	return "Organizers"
}
