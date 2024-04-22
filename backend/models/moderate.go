package models

import (
	"time"
)

type Moderate struct {
	UserId      string    `gorm:"column:user_id;not null;primaryKey"`
	OrganizerId string    `gorm:"column:organizer_id;not null"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`
}

func (Moderate) TableName() string {
	return "moderates"
}
