package models

import (
	"time"
)

type Participate struct {
	UserId         string    `gorm:"column:user_id;not null"`
	EventId        string    `gorm:"column:event_id;not null"`
	NumParticipant int       `gorm:"column:num_participant;not null"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt      time.Time `gorm:"column:updated_at"`
}

func (Participate) TableName() string {
	return "participate"
}
