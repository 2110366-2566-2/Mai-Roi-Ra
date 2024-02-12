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