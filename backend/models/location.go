package models

import (
	"time"
)

type Location struct {
	LocationId   string    `gorm:"column:location_id;not null" json:"location_id" binding:"required"`
	Country      string    `gorm:"column:country;not null" json:"country" binding:"required"`
	City         string    `gorm:"column:city;not null" json:"city" binding:"required"`
	District     string    `gorm:"column:district;not null" json:"district" binding:"required"`
	LocationName string    `gorm:"column:location_name;not null" json:"location_name" binding:"required"`
	CreatedAt    time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Location) TableName() string {
	return "locations"
}
