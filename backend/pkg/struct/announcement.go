package structure

import "time"

type Announcement struct {
	Header      string    `json:"header" binding:"required"`
	Description string    `json:"description" binding:"required"`
	CreatedAt   time.Time `json:"created_at" binding:"required"`
	UpdatedAt   time.Time `json:"updated_at" binding:"required"`
}

type GetAnnouncementListsRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type GetAnnouncementListsResponse struct {
	AnnouncementList []Announcement `json:"announcement_list"`
}