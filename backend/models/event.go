package models

import (
	"time"
)

type Event struct {
	EventId          string    `gorm:"column:event_id;not null;primaryKey"`
	OrganizerId      string    `gorm:"column:organizer_id;not null"`
	AdminId          string    `gorm:"column:admin_id;not null"`
	LocationId       string    `gorm:"column:location_id;not null"`
	StartDate        time.Time `gorm:"column:start_date;not null"`
	EndDate          time.Time `gorm:"column:end_date;not null"`
	Status           string    `gorm:"column:status;not null;check:valid_status"`
	ParticipantFee   float64   `gorm:"column:participant_fee;not null;check:positive_value"`
	ParticipantCount int       `gorm:"column:participant_count;not null"`
	Description      string    `gorm:"column:description;not null"`
	EventName        string    `gorm:"column:event_name;not null"`
	Deadline         time.Time `gorm:"column:deadline;not null"`
	Activities       string    `gorm:"column:activities;not null"`
	EventImage       *string   `gorm:"column:event_image"`
	CreatedAt        time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt        time.Time `gorm:"column:updated_at"`
}

func (Event) TableName() string {
	return "events"
}
