package repository

import (
	
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	
	"gorm.io/gorm"
)

type EventRepository struct {
	db *gorm.DB
}

type IEventRepository interface {
	CreateEvent(req *models.Event) (*st.CreateEventResponse, error)
	GetEventLists(req *st.GetEventListsRequest) ([]*models.Event, error)
	GetEventDataById(string) (*models.Event, error)
	UpdateEvent(req *models.Event) (*st.UpdateEventResponse, error)
	DeleteEventById(req *st.DeleteEventRequest) (*st.DeleteEventResponse, error)
}

func NewEventRepository(
	db *gorm.DB,
) IEventRepository {
	return &EventRepository{
		db: db,
	}
}

func (r *EventRepository) CreateEvent(req *models.Event) (*st.CreateEventResponse, error) {
	log.Println("[Repo: CreateEvent]: Called")
	trans := r.db.Begin().Debug()
	if err := trans.Create(&req).Error; err != nil {
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
		EventId: req.EventId,
	}, nil
}

func (r *EventRepository) UpdateEvent(req *models.Event) (*st.UpdateEventResponse, error) {
    log.Println("[Repo: UpdateEvent]: Called")

    if err := r.db.Model(&models.Event{}).Where("event_id = ?", req.EventId).
        Updates(map[string]interface{}{
            "StartDate":      req.StartDate,
            "EndDate":        req.EndDate,
            "Status":         req.Status,
            "ParticipantFee": req.ParticipantFee,
            "Description":    req.Description,
            "EventName":      req.EventName,
            "Deadline":       req.Deadline,
            "Activities":     req.Activities,
            "EventImage":     req.EventImage,
        }).Error; err != nil {
        log.Println("[Repo: UpdateEvent] Error updating event in Events table:", err)
        return nil, err
    }

    return &st.UpdateEventResponse{
        EventId: req.EventId,
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
		Message: "success",
	}, nil
}

func (r *EventRepository) GetEventLists(req *st.GetEventListsRequest) ([]*models.Event, error) {
	log.Println("[Repo: GetEventLists] Called")
	var eventLists []*models.Event
	query := r.db

	if req.OrganizerId != "" {
		query = query.Where(`organizer_id=?`, req.OrganizerId)
	}
	// status
	if req.Filter != "" {
		query = query.Where(`status=?`, req.Filter)
	}

	if req.Sort != "" {
		query = query.Order(req.Sort)
	}

	query = query.Offset(req.Offset)

	if req.Limit > 0 {
		query = query.Limit(req.Limit)
	}
	if err := query.Find(&eventLists).Error; err != nil {
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
