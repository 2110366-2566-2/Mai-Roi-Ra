package models

import "time"

type Announcement struct {
	AnnouncementId string    `gorm:"column:announcement_id;not null;primaryKey"`
	EventId        string    `gorm:"column:event_id;not null"`
	Header         string    `gorm:"column:header;not null"`
	Description    string    `gorm:"column:description;not null"`
	CreatedAt      time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt      time.Time `gorm:"column:updated_at"`
}

func (Announcement) TableName() string {
	return "announcements"
}
