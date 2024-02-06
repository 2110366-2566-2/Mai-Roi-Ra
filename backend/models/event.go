package models

import (
	"time"
)

type Event struct {
	EventId        string    `gorm:"column:EventId;not null;primaryKey" json:"event_id" binding:"required"`
	OrganizerId    string    `gorm:"column:OrganizerId;not null" json:"organizer_id" binding:"required"`
	AdminId        string    `gorm:"column:AdminId;not null" json:"admin_id" binding:"required"`
	LocationId     string    `gorm:"column:LocationId;not null" json:"location_id" binding:"required"`
	StartDate      time.Time `gorm:"column:StartDate;not null" json:"start_date" binding:"required"`
	EndDate        time.Time `gorm:"column:EndDate;not null" json:"end_date" binding:"required"`
	Status         string    `gorm:"column:Status;not null;check:valid_status" json:"status" binding:"required"`
	ParticipantFee float64   `gorm:"column:ParticipantFee;not null;check:positive_value" json:"participant_fee" binding:"required"`
	Description    string    `gorm:"column:Description;not null" json:"description" binding:"required"`
	EventName      string    `gorm:"column:EventName;not null" json:"event_name" binding:"required"`
	Deadline       time.Time `gorm:"column:Deadline;not null" json:"deadline" binding:"required"`
	Activities     string    `gorm:"column:Activities;not null" json:"activities" binding:"required"`
	EventImage     *string   `gorm:"column:EventImage" json:"event_image"`
	CreatedAt      time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}


func (Event) TableName() string {
	return "Events"
}
