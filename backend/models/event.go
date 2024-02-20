package models

import (
	"time"
)

type Event struct {
	EventId          string    `gorm:"column:event_id;not null;primaryKey" json:"event_id" binding:"required"`
	OrganizerId      string    `gorm:"column:organizer_id;not null" json:"organizer_id" binding:"required"`
	AdminId          string    `gorm:"column:admin_id;not null" json:"admin_id" binding:"required"`
	LocationId       string    `gorm:"column:location_id;not null" json:"location_id" binding:"required"`
	StartDate        time.Time `gorm:"column:start_date;not null" json:"start_date" binding:"required"`
	EndDate          time.Time `gorm:"column:end_date;not null" json:"end_date" binding:"required"`
	Status           string    `gorm:"column:status;not null;check:valid_status" json:"status" binding:"required"`
	ParticipantFee   float64   `gorm:"column:participant_fee;not null;check:positive_value" json:"participant_fee" binding:"required"`
	ParticipantCount int       `gorm:"colomn:participant_count;not null" json:"participant_count" binding:"required"`
	Description      string    `gorm:"column:description;not null" json:"description" binding:"required"`
	EventName        string    `gorm:"column:event_name;not null" json:"event_name" binding:"required"`
	Deadline         time.Time `gorm:"column:deadline;not null" json:"deadline" binding:"required"`
	Activities       string    `gorm:"column:activities;not null" json:"activities" binding:"required"`
	EventImage       *string   `gorm:"column:event_image" json:"event_image"`
	CreatedAt        time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt        time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Event) TableName() string {
	return "events"
}
