package controllers

import "time"

type CreateEventRequest struct {
	OrganizerId    string    `json:"organizer_id" binding:"required"`
	AdminId        string    `json:"admin_id" binding:"required"`
	LocationId     string    `json:"location_id" binding:"required"`
	StartDate      time.Time `json:"start_date" binding:"required"`
	EndDate        time.Time `json:"end_date" binding:"required"`
	Status         string    `json:"status" binding:"required"`
	ParticipantFee float64   `json:"participant_fee" binding:"required"`
	Description    string    `json:"description" binding:"required"`
	EventName      string    `json:"event_name" binding:"required"`
	Deadline       time.Time `json:"deadline" binding:"required"`
	Activities     string    `json:"activities" binding:"required"`
	EventImage     *string   `json:"event_image"`
}

type CreateEventResponse struct {
	EventID   string    `json:"event_id"`
	CreatedAt time.Time `json:"created_at"`
}
