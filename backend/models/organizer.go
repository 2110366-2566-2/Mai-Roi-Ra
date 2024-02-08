package models

import (
	"time"
)

type Organizer struct {
	OrganizerId string      `gorm:"column:organizer_id;primaryKey;not null" json:"organizer_id" binding:"required"`
	OfficeHours []time.Time `gorm:"column:office_hours;not null" json:"office_hours" binding:"required"`
	CreatedAt   time.Time   `gorm:"column:created_at;autoCreateTime" json:"created_at"`
}

func (Organizer) TableName() string {
	return "organizers"
}
