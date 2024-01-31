package model

import (
	"time"
)
type Event struct {
	EventId        string    `json:"eventId" binding:"required"`
	StartDate      time.Time `json:"startDate" binding:"required"`
	EndDate        time.Time `json:"endDate" binding:"required"`
	Status         string    `json:"status" binding:"required,oneof=Approved Rejected Waiting"`
	ParticipantFee float64   `json:"participantFee" binding:"required,gte=0"`
	Description    string    `json:"description"`
	EventName      string    `json:"eventName" binding:"required"`
	CreatedAt      time.Time `json:"createdAt" binding:"required"`
	Deadline       time.Time `json:"deadline" binding:"required"`
	Activities     string    `json:"activities" binding:"required"`
	EventImage     string    `json:"eventImage"`
}