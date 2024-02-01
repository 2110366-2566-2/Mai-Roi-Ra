package models

import (
	"time"

	"github.com/google/uuid"
)

type Response struct {
	OrganizerID uuid.UUID `gorm:"type:uuid;not null" json:"organizer_id" binding:"required"`
	PostID      uuid.UUID `gorm:"type:uuid;not null" json:"post_id" binding:"required"`
	Detail      string    `gorm:"type:varchar(1000)" json:"detail"`
	CreatedAt   time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Response) TableName() string {
	return "Responses"
}
