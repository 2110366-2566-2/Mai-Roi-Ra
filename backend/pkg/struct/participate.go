package structure

type SendAnnouncementRequest struct {
	Subject     string   `json:"subject"`
	Content     string   `json:"content"`
	To          []string `json:"to"`
	Cc          []string `json:"cc"`
	Bcc         []string `json:"bcc"`
	AttachFiles []string `json:"attach_files"`
}

type SendAnnounceResponse struct {
	AnnounceStatus string `json:"announce_status"`
}
