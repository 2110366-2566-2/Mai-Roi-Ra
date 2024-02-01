package model

import (
	"time"
)

type Moderate struct {
	UserId      string    `json:"user_id" binding:"required"`
	OrganizerId string    `json:"organizer_id" binding:"required"`
	CreatedAt   time.Time `json:"created_at" binding:"required"`
}