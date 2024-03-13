package services

import (
	"errors"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
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
	GetEventListsByStartDate(req *st.GetEventListsByStartDateRequest) (*st.GetEventListsByStartDateResponse, error)
	GetEventDataById(st.GetEventDataByIdRequest) (*st.GetEventDataByIdResponse, error)
	UpdateEvent(req *st.UpdateEventRequest) (*st.UpdateEventResponse, error)
	DeleteEventById(req *st.DeleteEventRequest) (*st.DeleteEventResponse, error)
	GetParticipantLists(req *st.GetParticipantListsRequest) (*st.GetParticipantListsResponse, error)
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
	resLocation, err := s.RepositoryGateway.LocationRepository.GetLocationByName(req.LocationName, req.District, req.City)
	if err != nil {
		return nil, err
	}
	resAdmin, err := s.RepositoryGateway.UserRepository.GetRandomAdmin()
	if err != nil {
		return nil, err
	}
	startDate, err := utils.StringToTime(req.StartDate)
	if err != nil {
		log.Println("[Service: CreateEvent] Error parsing StartDate to time.Time format:", err)
		return nil, err
	}
	endDate, err := utils.StringToTime(req.EndDate)
	if err != nil {
		log.Println("[Service: CreateEvent] Error parsing EndDate to time.Time format:", err)
		return nil, err
	}
	deadline := startDate.AddDate(0, 0, -3)

	if startDate.After(endDate) {
		log.Println("[Service: CreateEvent] Start date must be before end date.")
		return nil, errors.New("start date must be before end date")
	}

	eventImage := req.EventImage
	eventModel := models.Event{
		EventId:        utils.GenerateUUID(),
		OrganizerId:    req.OrganizerId,
		UserId:         resAdmin.UserID,
		LocationId:     resLocation.LocationId,
		StartDate:      startDate,
		EndDate:        endDate,
		Status:         req.Status,
		ParticipantFee: req.ParticipantFee,
		Description:    req.Description,
		EventName:      req.EventName,
		Deadline:       deadline,
		Activities:     req.Activities,
		EventImage:     &eventImage,
	}

	res, err := s.RepositoryGateway.EventRepository.CreateEvent(&eventModel)
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
		EventLists: make([]st.GetEventList, 0),
	}

	for _, v := range resEvents {
		locationId := v.LocationId
		resLocation, err := s.RepositoryGateway.LocationRepository.GetLocationById(locationId)
		if err != nil {
			return nil, err
		}
		eventImage := ""
		if v.EventImage != nil {
			eventImage = *v.EventImage
		}
		res := st.GetEventList{
			EventId:     v.EventId,
			EventName:   v.EventName,
			StartDate:   utils.GetDate(v.StartDate),
			EndDate:     utils.GetDate(v.EndDate),
			Description: v.Description,
			Status:      v.Status,
			EventImage:  eventImage,
			City:        resLocation.City,
			District:    resLocation.District,
		}
		resLists.EventLists = append(resLists.EventLists, res)
	}
	return resLists, nil
}

func (s *EventService) GetEventListsByStartDate(req *st.GetEventListsByStartDateRequest) (*st.GetEventListsByStartDateResponse, error) {
	log.Println("[Service: GetEventListsByStartDate]: Called")
	resEvents, err := s.RepositoryGateway.EventRepository.GetEventListsByStartDate(req.StartDate)
	if err != nil {
		return nil, err
	}
	log.Println("[Service: GetEventListsByStartDate]: resEvents:", resEvents)
	resLists := &st.GetEventListsByStartDateResponse{
		EventLists: make([]st.GetEventListByStartDate, 0),
	}
	for _, v := range resEvents {
		resLocation, err := s.RepositoryGateway.LocationRepository.GetLocationById(v.LocationId)
		if err != nil {
			return nil, err
		}
		eventImage := ""
		if v.EventImage != nil {
			eventImage = *v.EventImage
		}
		res := st.GetEventListByStartDate{
			EventId:     v.EventId,
			OrganizerId: v.OrganizerId,
			EventName:   v.EventName,
			StartDate:   utils.GetDate(v.StartDate),
			EndDate:     utils.GetDate(v.EndDate),
			Description: v.Description,
			Status:      v.Status,
			EventImage:  eventImage,
			LocationName: resLocation.LocationName,
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
	eventImage := ""
	if resEvent.EventImage != nil {
		eventImage = *resEvent.EventImage
	}
	announcementreq := &st.GetAnnouncementListsRequest{
		EventId: req.EventId,
	}
	resAnnouncement, err := s.RepositoryGateway.AnnouncementRepository.GetAnnouncementsForEvent(announcementreq)
	if err != nil {
		return nil, err
	}
	res := &st.GetEventDataByIdResponse{
		EventId:          resEvent.EventId,
		OrganizerId:      resEvent.OrganizerId,
		UserId:           resEvent.UserId,
		LocationId:       resLocation.LocationId,
		StartDate:        utils.GetDateCalendarFormat(resEvent.StartDate),
		EndDate:          utils.GetDateCalendarFormat(resEvent.EndDate),
		Status:           resEvent.Status,
		ParticipantFee:   resEvent.ParticipantFee,
		Description:      resEvent.Description,
		EventName:        resEvent.EventName,
		Deadline:         utils.GetDateCalendarFormat(resEvent.Deadline),
		Activities:       resEvent.Activities,
		EventImage:       eventImage,
		Country:          resLocation.Country,
		City:             resLocation.City,
		District:         resLocation.District,
		LocationName:     resLocation.LocationName,
		ParticipantCount: resEvent.ParticipantCount,
		AnnouncementList: resAnnouncement.AnnouncementList,
	}
	return res, nil
}

func (s *EventService) UpdateEvent(req *st.UpdateEventRequest) (*st.UpdateEventResponse, error) {
	log.Println("[Service: UpdateEvent]: Called")

	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}

	resLocation, err := s.RepositoryGateway.LocationRepository.GetLocationById(resEvent.LocationId)
	if err != nil {
		return nil, err
	}

	locationModel := models.Location{
		LocationId:   resLocation.LocationId,
		Country:      resLocation.Country,
		City:         req.City,
		District:     req.District,
		LocationName: req.LocationName,
		CreatedAt:    resLocation.CreatedAt,
		UpdatedAt:    time.Now(),
	}

	err = s.RepositoryGateway.LocationRepository.UpdateLocation(locationModel)
	if err != nil {
		return nil, err
	}

	startDate, err := utils.StringToTime(req.StartDate)
	if err != nil {
		log.Println("[Service: UpdateEvent] Error parsing StartDate to time.Time format:", err)
		return nil, err
	}
	endDate, err := utils.StringToTime(req.EndDate)
	if err != nil {
		log.Println("[Service: UpdateEvent] Error parsing EndDate to time.Time format:", err)
		return nil, err
	}
	deadline := startDate.AddDate(0, 0, -3)

	if startDate.After(endDate) {
		log.Println("[Service: UpdateEvent] Start date must be before end date.")
		return nil, errors.New("start date must be before end date")
	}

	eventImage := req.EventImage

	eventModel := models.Event{
		EventId:        resEvent.EventId,
		OrganizerId:    resEvent.OrganizerId,
		UserId:         resEvent.UserId,
		LocationId:     resLocation.LocationId,
		StartDate:      startDate,
		EndDate:        endDate,
		Status:         req.Status,
		ParticipantFee: req.ParticipantFee,
		Description:    req.Description,
		EventName:      req.EventName,
		Deadline:       deadline,
		Activities:     req.Activities,
		EventImage:     &eventImage,
	}

	res, err := s.RepositoryGateway.EventRepository.UpdateEvent(&eventModel)
	if err != nil {
		return nil, err
	}
	return res, nil

}

func (s *EventService) DeleteEventById(req *st.DeleteEventRequest) (*st.DeleteEventResponse, error) {
	log.Println("[Service: DeleteEvent]: Called")

	resevent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}
	announcementService := NewAnnouncementService(s.RepositoryGateway)
	reqparticipate := &st.GetParticipantListsRequest{
		EventId: req.EventId,
	}
	resparticipate,err := s.RepositoryGateway.ParticipateRepository.GetParticipantsForEvent(reqparticipate)
	if err != nil {
		return nil, err
	}

	for _,v := range resparticipate{
		reqcancelled := &st.SendCancelledEmailRequest{
			UserId:      v.UserId,
			EventId:	 resevent.EventId,	
			EventName:   resevent.EventName,
			EventDate:   resevent.StartDate.Format("2006-01-02"),
		}
		if _,err := announcementService.SendCancelledEmail(reqcancelled); err != nil {
			log.Println("[Service: Call SendCancelledEmail]:", err)
			return nil, err
		}
	}

	// Delete the event using the repository
	deleteMessage, err := s.RepositoryGateway.EventRepository.DeleteEventById(req)
	if err != nil {
		log.Println("[Service: DeleteEvent] Error deleting event:", err)
		return nil, err
	}

	return deleteMessage, nil
}

func (s *EventService) GetParticipantLists(req *st.GetParticipantListsRequest) (*st.GetParticipantListsResponse, error) {
	log.Println("[Service: GetParticipantLists]: Called")
	userList, err := s.RepositoryGateway.ParticipateRepository.GetParticipantsForEvent(req)
	if err != nil {
		log.Println("[Service: GetParticipantLists] called repo participant error", err)
		return nil, err
	}
	log.Println("[Service: GetParticipantLists]: userList:", userList)

	resLists, err := s.RepositoryGateway.UserRepository.GetUserDataForEvents(userList)
	if err != nil {
		log.Println("[Service: GetParticipantLists] error when called repo GetUserDataForEvents", err)
	}

	return resLists, nil
}
