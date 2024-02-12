package structure

type CreateEventRequest struct {
	OrganizerId    string  `json:"organizer_id" binding:"required"`
	AdminId        string  `json:"admin_id" binding:"required"`
	LocationId     string  `json:"location_id" binding:"required"`
	StartDate      string  `json:"start_date" binding:"required"`
	EndDate        string  `json:"end_date" binding:"required"`
	Status         string  `json:"status" binding:"required"`
	ParticipantFee float64 `json:"participant_fee" binding:"required"`
	Description    string  `json:"description" binding:"required"`
	EventName      string  `json:"event_name" binding:"required"`
	Deadline       string  `json:"deadline" binding:"required"`
	Activities     string  `json:"activities" binding:"required"`
	EventImage     *string `json:"event_image"`
}

type CreateEventResponse struct {
	EventId string `json:"event_id"`
}

type UpdateEventRequest struct {
	EventId        string  `json:"event_id"`
	StartDate      string  `json:"start_date" binding:"required"`
	EndDate        string  `json:"end_date" binding:"required"`
	Status         string  `json:"status" binding:"required"`
	ParticipantFee float64 `json:"participant_fee" binding:"required"`
	Description    string  `json:"description" binding:"required"`
	EventName      string  `json:"event_name" binding:"required"`
	Deadline       string  `json:"deadline" binding:"required"`
	Activities     string  `json:"activities" binding:"required"`
	EventImage     *string `json:"event_image"`
}

type UpdateEventResponse struct {
	EventId        string    `json:"event_id"`
}

type DeleteEventRequest struct {
	EventId        string    `json:"event_id"`
}

type DeleteEventResponse struct {
	EventId        string    `json:"event_id"`
}

type GetEventList struct {
	EventId     string `json:"event_id"`
	EventName   string `json:"event_name"`
	StartDate   string `json:"start_date"`
	EndDate     string `json:"end_date"`
	Description string `json:"description"`
	Status      string `json:"status"`
	EventImage  string `json:"event_image"`
	City        string `json:"city"`
	District    string `json:"district"`
}

type GetEventListsRequest struct {
	OrganizerId string `json:"organizer_id"`
	Filter      string `json:"filter"`
	Sort        string `json:"sort"`
	Offset      int    `json:"offset"`
	Limit       int    `json:"limit"`
}

type GetEventListsResponse struct {
	EventLists []GetEventList `json:"event_lists"`
}

type GetEventDataByIdRequest struct {
	EventId string `json:"event_id"`
}

type GetEventDataByIdResponse struct {
	EventId        string  `json:"event_id"`
	OrganizerId    string  `json:"organizer_id"`
	AdminId        string  `json:"admin_id"`
	LocationId     string  `json:"location_id"`
	StartDate      string  `json:"start_date"`
	EndDate        string  `json:"end_date"`
	Status         string  `json:"status"`
	ParticipantFee float64 `json:"participant_fee"`
	Description    string  `json:"description"`
	EventName      string  `json:"event_name"`
	Deadline       string  `json:"deadline"`
	Activities     string  `json:"activities"`
	EventImage     string `json:"event_image"`
	Country        string  `json:"country"`
	City           string  `json:"city"`
	District       string  `json:"district"`
	LocationName   string  `json:"location_name"`
}
