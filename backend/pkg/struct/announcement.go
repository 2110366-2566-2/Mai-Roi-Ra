package structure

import "time"

type Announcement struct {
	Header      string    `gorm:"column:header;not null" json:"header"`
	Description string    `gorm:"column:description;not null" json:"description"`
	CreatedAt   time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"column:updated_at" json:"updated_at"`
}

type GetAnnouncementListsRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type GetAnnouncementListsResponse struct {
	AnnouncementList []Announcement `json:"announcement_list"`
}