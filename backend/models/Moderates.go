package model

import (
	"time"
)

type Moderate struct {
	UserID      string    `json:"user_id"`
	OrganizerID string    `json:"organizer_id"`
	CreatedAt   time.Time `json:"created_at"`
}