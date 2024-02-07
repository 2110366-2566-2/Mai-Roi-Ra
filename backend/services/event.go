package services

import (
	"log"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type EventService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IEventService interface {
	CreateEvent(st.CreateEventRequest) (*st.CreateEventResponse, error)
}

func NewEventService(
	repoGateway repository.RepositoryGateway,
) IEventService {
	return &EventService{
		RepositoryGateway: repoGateway,
	}
}

func (s *EventService) CreateEvent(req st.CreateEventRequest) (*st.CreateEventResponse, error) {
	log.Println("[Service: CreateEvent] Called")
	res, err := s.RepositoryGateway.EventRepository.CreateEvent(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
