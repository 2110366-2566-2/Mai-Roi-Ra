package models

import (
	"time"
)

// Event model struct
type Event struct {
	EventID         string    `gorm:"type:char(10);not null;primaryKey" json:"event_id"`
	OrganizerID     string    `gorm:"type:char(10);not null" json:"organizer_id"`
	AdminID         string    `gorm:"type:char(10);not null" json:"admin_id"`
	LocationID      string    `gorm:"type:char(10);not null" json:"location_id"`
	StartDate       time.Time `gorm:"type:date;not null" json:"start_date"`
	EndDate         time.Time `gorm:"type:date;not null" json:"end_date"`
	Status          string    `gorm:"type:varchar(16);not null;check:valid_status" json:"status"`
	ParticipantFee  float64   `gorm:"type:double precision;not null;check:positive_value" json:"participant_fee"`
	Description     string    `gorm:"type:varchar(1000)" json:"description"`
	EventName       string    `gorm:"type:varchar(64);not null" json:"event_name"`
	CreatedAt       time.Time `gorm:"type:timestamp without time zone;not null" json:"created_at"`
	Deadline        time.Time `gorm:"type:date;not null" json:"deadline"`
	Activities      string    `gorm:"type:text;not null" json:"activities"`
	EventImage      string    `gorm:"type:varchar(1024)" json:"event_image"`
}

// TableName specifies the table name for the Event model
func (Event) TableName() string {
	return "Events"
}

// CustomValidatorEvent struct to define custom validation rules for Event
type CustomValidatorEvent struct{}

// ValidateStatus is a custom validator function for event status
func (CustomValidatorEvent) ValidateStatus(field interface{}) bool {
	if status, ok := field.(string); ok {
		return status == "Approved" || status == "Rejected" || status == "Waiting"
	}
	return false
}

// ValidatePositiveValue is a custom validator function for positive values
func (CustomValidatorEvent) ValidatePositiveValue(field interface{}) bool {
	if value, ok := field.(float64); ok {
		return value >= 0
	}
	return false
}