package models

import "time"

type Announcement struct {
	AnnouncementId string    `gorm:"column:announcement_id;not null;primaryKey" json:"announcement_id" binding:"required"`
	EventId        string    `gorm:"column:event_id;not null" json:"event_id" binding:"required"`
	Header         string    `gorm:"column:header;not null" json:"header"`
	Description    string    `gorm:"column:description;not null" json:"description"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time `gorm:"column:updated_at" json:"updated_at"`
}