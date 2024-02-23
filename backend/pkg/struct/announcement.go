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

type SendAnnouncementRequest struct {
	EventId   string `json:"event_id"`
	EventName string `json:"event_name"`
	Subject   string `json:"subject"`
	Content   string `json:"content"`
}

type SendAnnounceResponse struct {
	AnnounceStatus string `json:"announce_status"`
}
