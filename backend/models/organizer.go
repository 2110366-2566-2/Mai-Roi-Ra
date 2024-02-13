package models

import (
	"time"
)

type Organizer struct {
	OrganizerId      string    `gorm:"column:organizer_id;primaryKey;not null" json:"organizer_id" binding:"required"`
	UserId           string    `gorm:"column:user_id;not null" json:"user_id" binding:"required"`
	StartOfficeHours time.Time `gorm:"column:start_office_hours" json:"start_office_hours"`
	EndOfficeHours   time.Time `gorm:"column:end_office_hours" json:"end_office_hours"`
	CreatedAt        time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt        time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Organizer) TableName() string {
	return "organizers"
}
