package models

import (
	"time"
)

type Moderate struct {
	UserId      string    `gorm:"column:user_id;not null;primaryKey" json:"user_id" binding:"required"`
	OrganizerId string    `gorm:"column:organizer_id;not null" json:"organizer_id" binding:"required"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
}

func (Moderate) TableName() string {
	return "moderates"
}
