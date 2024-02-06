package models

import (
	"time"
)

type Organizer struct {
	OrganizerId string      `gorm:"column:OrganizerId;primaryKey;not null" json:"organizer_id" binding:"required"`
	OfficeHours []time.Time `gorm:"column:OfficeHours;not null" json:"office_hours" binding:"required"`
	CreatedAt   time.Time   `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}

func (Organizer) TableName() string {
	return "Organizers"
}
