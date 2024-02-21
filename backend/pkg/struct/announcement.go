package structure

import "time"

type Announcement struct {
	Header      string    `json:"header"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type GetAnnouncementListsRequest struct {
	EventId string `json:"event_id" binding:"required"`
}

type GetAnnouncementListsResponse struct {
	AnnouncementList []Announcement `json:"announcement_list"`
}