package models

import (
	"time"
)

type SearchHistory struct {
	SearchID        string    `gorm:"column:search_id;primaryKey;default:uuid_generate_v4()" json:"search_id"`
	UserID          string    `gorm:"column:user_id;not null" json:"user_id" binding:"required"`
	SearchName      string    `gorm:"column:search_name;not null" json:"search_name" binding:"required"`
	SearchTimestamp time.Time `gorm:"column:search_timestamp;not null;default:current_timestamp" json:"search_timestamp"`
}

func (SearchHistory) TableName() string {
	return "search_histories"
}
