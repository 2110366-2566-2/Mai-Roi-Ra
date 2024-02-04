package models

import (
	"time"

	"github.com/google/uuid"
)

type Event struct {
	EventID        uuid.UUID `gorm:"type:uuid;not null;primaryKey" json:"event_id" binding:"required"`
	OrganizerID    uuid.UUID `gorm:"type:uuid;not null" json:"organizer_id" binding:"required"`
	AdminID        uuid.UUID `gorm:"type:uuid;not null" json:"admin_id" binding:"required"`
	LocationID     uuid.UUID `gorm:"type:uuid;not null" json:"location_id" binding:"required"`
	StartDate      time.Time `gorm:"type:date;not null" json:"start_date" binding:"required"`
	EndDate        time.Time `gorm:"type:date;not null" json:"end_date" binding:"required"`
	Status         string    `gorm:"type:varchar(16);not null;check:valid_status" json:"status" binding:"required"`
	ParticipantFee float64   `gorm:"type:double precision;not null;check:positive_value" json:"participant_fee" binding:"required"`
	Description    string    `gorm:"type:varchar(1000)" json:"description" binding:"required"`
	EventName      string    `gorm:"type:varchar(64);not null" json:"event_name" binding:"required"`
	Deadline       time.Time `gorm:"type:date;not null" json:"deadline" binding:"required"`
	Activities     string    `gorm:"type:text;not null" json:"activities" binding:"required"`
	EventImage     *string   `gorm:"type:varchar(1024)" json:"event_image"`
	CreatedAt      time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Event) TableName() string {
	return "Events"
}
