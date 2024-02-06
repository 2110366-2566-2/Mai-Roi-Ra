package models

import (
	"time"
)

type Response struct {
	OrganizerId string    `gorm:"column:OrganizerId;not null" json:"organizer_id" binding:"required"`
	PostId      string    `gorm:"column:PostId;not null" json:"post_id" binding:"required"`
	Detail      string    `gorm:"column:Detail" json:"detail"`
	CreatedAt   time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}


func (Response) TableName() string {
	return "Responses"
}
