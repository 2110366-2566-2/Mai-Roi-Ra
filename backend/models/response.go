package models

import (
	"time"
)

type Response struct {
	OrganizerId string    `gorm:"column:organizer_id;not null" json:"organizer_id" binding:"required"`
	PostId      string    `gorm:"column:post_id;not null" json:"post_id" binding:"required"`
	Detail      string    `gorm:"column:detail" json:"detail"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Response) TableName() string {
	return "responses"
}
