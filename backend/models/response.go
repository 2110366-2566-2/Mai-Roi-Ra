package models

import (
	"time"
)

type Response struct {
	OrganizerId string    `gorm:"column:organizer_id;not null"`
	PostId      string    `gorm:"column:post_id;not null"`
	Detail      string    `gorm:"column:detail"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt   time.Time `gorm:"column:updated_at"`
}

func (Response) TableName() string {
	return "responses"
}