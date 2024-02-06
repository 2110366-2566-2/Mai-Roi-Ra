package models

import (
	"time"
)

type Participate struct {
	UserId    string    `gorm:"column:UserId;not null" json:"user_id" binding:"required"`
	EventId   string    `gorm:"column:EventId;not null" json:"event_id" binding:"required"`
	CreatedAt time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}


func (Participate) TableName() string {
	return "Participates"
}
