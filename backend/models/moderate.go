package models

import (
	"time"
)

type Moderate struct {
	UserId      string    `gorm:"column:UserId;not null;primaryKey" json:"user_id" binding:"required"`
	OrganizerId string    `gorm:"column:OrganizerId;not null" json:"organizer_id" binding:"required"`
	CreatedAt   time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}


func (Moderate) TableName() string {
	return "Moderates"
}
