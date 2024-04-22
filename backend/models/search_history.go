package models

import (
	"time"
)

type SearchHistory struct {
	SearchID        string    `gorm:"column:search_id;primaryKey"`
	UserID          string    `gorm:"column:user_id;not null"`
	SearchName      string    `gorm:"column:search_name;not null"`
	SearchTimestamp time.Time `gorm:"column:search_timestamp;not null;autoCreateTime"`
}

func (SearchHistory) TableName() string {
	return "search_histories"
}