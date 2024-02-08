package services

import (
	"log"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
)

type EventService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IEventService interface {
	CreateEvent(*st.CreateEventRequest) (*st.CreateEventResponse, error)
	GetEventLists(req *st.GetEventListsRequest) (*st.GetEventListsResponse, error)
	GetEventDataById(st.GetEventDataByIdRequest) (*st.GetEventDataByIdResponse, error)
}

func NewEventService(
	repoGateway repository.RepositoryGateway,
) IEventService {
	return &EventService{
		RepositoryGateway: repoGateway,
	}
}

func (s *EventService) CreateEvent(req *st.CreateEventRequest) (*st.CreateEventResponse, error) {
	log.Println("[Service: CreateEvent]: Called")
	res, err := s.RepositoryGateway.EventRepository.CreateEvent(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (s *EventService) GetEventLists(req *st.GetEventListsRequest) (*st.GetEventListsResponse, error) {
	log.Println("[Service: GetEventLists]: Called")
	resEvents, err := s.RepositoryGateway.EventRepository.GetEventLists(req)
	if err != nil {
		return nil, err
	}
	log.Println("[Service: GetEventLists]: resEvents:", resEvents)
	resLists := &st.GetEventListsResponse{
		EventLists: make([]st.GetEventList, 0), // Initialize the slice if necessary
	}
	for _, v := range resEvents {
		locationId := v.LocationId
		resLocation, err := s.RepositoryGateway.LocationRepository.GetLocationById(locationId)
		if err != nil {
			return nil, err
		}
		res := st.GetEventList{
			EventName:   v.EventName,
			StartDate:   utils.GetDate(v.StartDate),
			EndDate:     utils.GetDate(v.EndDate),
			Description: v.Description,
			Status:      v.Status,
			City:        resLocation.City,
			District:    resLocation.District,
		}
		resLists.EventLists = append(resLists.EventLists, res)
	}
	return resLists, nil
}

func (s *EventService) GetEventDataById(req st.GetEventDataByIdRequest) (*st.GetEventDataByIdResponse, error) {
	log.Println("[Service: GetEventDataById]: Called")
	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}
	resLocation, err := s.RepositoryGateway.LocationRepository.GetLocationById(resEvent.LocationId)
	if err != nil {
		return nil, err
	}
	res := &st.GetEventDataByIdResponse{
		StartDate:      utils.GetDate(resEvent.StartDate),
		EndDate:        utils.GetDate(resEvent.EndDate),
		Status:         resEvent.Status,
		ParticipantFee: resEvent.ParticipantFee,
		Description:    resEvent.Description,
		EventName:      resEvent.EventName,
		Deadline:       utils.GetDate(resEvent.Deadline),
		Activities:     resEvent.Activities,
		EventImage:     resEvent.EventImage,
		Country:        resLocation.Country,
		City:           resLocation.City,
		District:       resLocation.District,
		LocationName:   resLocation.LocationName,
	}
	return res, nil
}
