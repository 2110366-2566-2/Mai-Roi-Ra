package models

import (
	"time"
)

type Participate struct {
	UserId         string    `gorm:"column:user_id;not null" json:"user_id" binding:"required"`
	EventId        string    `gorm:"column:event_id;not null" json:"event_id" binding:"required"`
	NumParticipant int       `gorm:"column:num_participant;not null" json:"num_participant" binding:"required"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Participate) TableName() string {
	return "participate"
}
