package models

import (
	"time"
)

type Location struct {
	LocationId   string    `gorm:"column:LocationId;not null" json:"location_id" binding:"required"`
	Country      string    `gorm:"column:Country;not null" json:"country" binding:"required"`
	City         string    `gorm:"column:City;not null" json:"city" binding:"required"`
	District     string    `gorm:"column:District;not null" json:"district" binding:"required"`
	LocationName string    `gorm:"column:LocationName;not null" json:"location_name" binding:"required"`
	CreatedAt    time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}


func (Location) TableName() string {
	return "Locations"
}
