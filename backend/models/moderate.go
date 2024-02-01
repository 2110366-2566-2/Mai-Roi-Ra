package models

import (
	"time"
)

// Moderate model struct
type Moderate struct {
	UserID      string    `gorm:"type:char(10);not null;primaryKey" json:"user_id" binding:"required"`
	OrganizerID string    `gorm:"type:char(10);not null" json:"organizer_id" binding:"required"`
	CreatedAt   time.Time `gorm:"type:timestamp without time zone;not null" json:"created_at" binding:"required"`
}

// TableName specifies the table name for the Moderate model
func (Moderate) TableName() string {
	return "Moderates"
}