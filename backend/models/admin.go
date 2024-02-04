package models

import (
	"time"

	"github.com/google/uuid"
)

type Admin struct {
	AdminID   uuid.UUID `gorm:"type:uuid;primaryKey;not null" json:"admin_id" binding:"required"`
	Password  string    `gorm:"type:varchar(64);not null" json:"password" binding:"required"`
	CreatedAt time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Admin) TableName() string {
	return "Admins"
}
