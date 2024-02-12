package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type EventRepository struct {
	db *gorm.DB
}

type IEventRepository interface {
	CreateEvent(*st.CreateEventRequest) (*st.CreateEventResponse, error)
	GetEventLists(req *st.GetEventListsRequest) ([]*models.Event, error)
	GetEventDataById(string) (*models.Event, error)
	UpdateEvent(req *st.UpdateEventRequest) (*st.UpdateEventResponse, error)
	DeleteEventById(req *st.DeleteEventRequest) (*st.DeleteEventResponse, error)
}

func NewEventRepository(
	db *gorm.DB,
) IEventRepository {
	return &EventRepository{
		db: db,
	}
}

func (r *EventRepository) CreateEvent(req *st.CreateEventRequest) (*st.CreateEventResponse, error) {
	log.Println("[Repo: CreateEvent]: Called")
	startDate, err := utils.StringToTime(req.StartDate)
	if err != nil {
		log.Println("[Repo: CreateEvent] Error parsing StartDate to time.Time format:", err)
		return nil, err
	}
	endDate, err := utils.StringToTime(req.EndDate)
	if err != nil {
		log.Println("[Repo: CreateEvent] Error parsing EndDate to time.Time format:", err)
		return nil, err
	}
	deadline, err := utils.StringToTime(req.Deadline)
	if err != nil {
		log.Println("[Repo: CreateEvent] Error parsing Deadline to time.Time format:", err)
		return nil, err
	}
	eventImage := req.EventImage
	emptyString := ""
	if eventImage == nil {
		eventImage = &emptyString
	}
	eventModel := models.Event{
		EventId:        utils.GenerateUUID(),
		OrganizerId:    req.OrganizerId,
		AdminId:        req.AdminId,
		LocationId:     req.LocationId,
		StartDate:      startDate,
		EndDate:        endDate,
		Status:         req.Status,
		ParticipantFee: req.ParticipantFee,
		Description:    req.Description,
		EventName:      req.EventName,
		Deadline:       deadline,
		Activities:     req.Activities,
		EventImage:     eventImage,
	}
	trans := r.db.Begin().Debug()
	if err := trans.Create(&eventModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateEvent]: Insert data in Events table error:", err)
		return nil, err
	}
	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateEvent]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &st.CreateEventResponse{
		EventId: eventModel.EventId,
	}, nil
}

func (r *EventRepository) UpdateEvent(req *st.UpdateEventRequest) (*st.UpdateEventResponse, error) {
	log.Println("[Repo: UpdateEvent]: Called")

	startDate, err := utils.StringToTime(req.StartDate)
	if err != nil {
		log.Println("[Repo: Updatevent] Error parsing StartDate to time.Time format:", err)
		return nil, err
	}
	endDate, err := utils.StringToTime(req.EndDate)
	if err != nil {
		log.Println("[Repo: UpdateEvent] Error parsing EndDate to time.Time format:", err)
		return nil, err
	}
	deadline, err := utils.StringToTime(req.Deadline)
	if err != nil {
		log.Println("[Repo: UpdateEvent] Error parsing Deadline to time.Time format:", err)
		return nil, err
	}

	eventImage := req.EventImage
	emptyString := ""
	if eventImage == nil {
		eventImage = &emptyString
	}

	if err := r.db.Model(&models.Event{}).Where("event_id = ?", req.EventId).
	Updates(map[string]interface{}{
		"StartDate":      startDate,
		"EndDate":        endDate,
		"Status":         req.Status,
		"ParticipantFee": req.ParticipantFee,
		"Description":    req.Description,
		"EventName":      req.EventName,
		"Deadline":       deadline,
		"Activities":     req.Activities,
		"EventImage":     req.EventImage,
	}).Error; err != nil {
	log.Println("[Repo: UpdateEvent] Error updating event in Events table:", err)
	return nil, err
}
	// Retrieve the updated event
	updatedEvent, err := r.GetEventDataById(req.EventId)
	if err != nil {
		log.Println("[Repo: UpdateEvent] Error retrieving updated event:", err)
		return nil, err
	}

	return &st.UpdateEventResponse{
		EventId:         updatedEvent.EventId,
	}, nil
}

func (r *EventRepository) DeleteEventById(req *st.DeleteEventRequest) (*st.DeleteEventResponse, error) {
	log.Println("[Repo: DeleteEventById]: Called")

	// Delete the event from the database
	if err := r.db.Where("event_id = ?", req.EventId).Delete(&models.Event{}).Error; err != nil {
		log.Println("[Repo: DeleteEventById] Error deleting event from Events table:", err)
		return nil, err
	}

	// Return a success message
	return &st.DeleteEventResponse{
		EventId: req.EventId,
	}, nil
}

func (r *EventRepository) GetEventLists(req *st.GetEventListsRequest) ([]*models.Event, error) {
	log.Println("[Repo: GetEventLists] Called")
	var eventLists []*models.Event
	// will declare filter later in sprint 2
	if err := r.db.Find(&eventLists).Error; err != nil {
		log.Println("[Repo: GetEventLists]: cannot query the events:", err)
		return nil, err
	}
	return eventLists, nil
}

func (r *EventRepository) GetEventDataById(eventId string) (*models.Event, error) {
	log.Println("[Repo: GetEventDataById]: Called")
	var event models.Event
	if err := r.db.Where(`event_id=?`, eventId).Find(&event).Error; err != nil {
		log.Println("[Repo: GetEventDataById]: cannot find event_id:", err)
		return nil, err
	}
	return &event, nil
}