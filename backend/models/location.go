package models

import (
	"time"

	"github.com/google/uuid"
)

type Location struct {
	LocationID   uuid.UUID `gorm:"type:uuid;not null" json:"location_id" binding:"required"`
	Country      string    `gorm:"type:varchar(64);not null" json:"country" binding:"required"`
	City         string    `gorm:"type:varchar(64);not null" json:"city" binding:"required"`
	District     string    `gorm:"type:varchar(64);not null" json:"district" binding:"required"`
	LocationName string    `gorm:"type:varchar(64);not null" json:"location_name" binding:"required"`
	CreatedAt    time.Time `gorm:"type:timestamp without time zone;autoCreateTime" json:"created_at"`
}

func (Location) TableName() string {
	return "Locations"
}
