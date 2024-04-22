package models

import (
	"time"
)

type Organizer struct {
	OrganizerId      string    `gorm:"column:organizer_id;primaryKey;not null"`
	UserId           string    `gorm:"column:user_id;not null"`
	StartOfficeHours time.Time `gorm:"column:start_office_hours"`
	EndOfficeHours   time.Time `gorm:"column:end_office_hours"`
	CreatedAt        time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt        time.Time `gorm:"column:updated_at"`
}

func (Organizer) TableName() string {
	return "organizers"
}
