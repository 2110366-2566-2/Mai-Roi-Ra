package models

import (
	"time"
)

type Location struct {
	LocationId   string    `gorm:"column:location_id;not null"`
	Country      string    `gorm:"column:country;not null"`
	City         string    `gorm:"column:city;not null"`
	District     string    `gorm:"column:district;not null"`
	LocationName string    `gorm:"column:location_name;not null"`
	CreatedAt    time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt    time.Time `gorm:"column:updated_at"`
}

func (Location) TableName() string {
	return "locations"
}

