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

	// Retrieve existing event by ID
	existingEvent, err := r.GetEventDataById(req.EventId)
	if err != nil {
		log.Println("[Repo: UpdateEvent] Error getting existing event:", err)
		return nil, err
	}

	// Update fields based on the request
	if req.StartDate != "" {
		startDate, err := utils.StringToTime(req.StartDate)
		if err != nil {
			log.Println("[Repo: UpdateEvent] Error parsing StartDate to time.Time format:", err)
			return nil, err
		}
		existingEvent.StartDate = startDate
	}

	if req.EndDate != "" {
		endDate, err := utils.StringToTime(req.EndDate)
		if err != nil {
			log.Println("[Repo: UpdateEvent] Error parsing EndDate to time.Time format:", err)
			return nil, err
		}
		existingEvent.EndDate = endDate
	}
	
	existingEvent.Status = req.Status
	existingEvent.ParticipantFee = req.ParticipantFee
	existingEvent.Description = req.Description
	existingEvent.EventName = req.EventName

	if req.Deadline != "" {
		deadline, err := utils.StringToTime(req.Deadline)
		if err != nil {
			log.Println("[Repo: UpdateEvent] Error parsing Deadline to time.Time format:", err)
			return nil, err
		}
		existingEvent.Deadline = deadline
	}

	existingEvent.Activities = req.Activities
	existingEvent.EventImage = req.EventImage

	if req.EventImage != nil {
		existingEvent.EventImage = req.EventImage
	}

	
	// Update other fields as needed...

	// Start a transaction
	trans := r.db.Begin().Debug()

	// Update the event in the database
	if err := trans.Save(&existingEvent).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: UpdateEvent] Error updating event in Events table:", err)
		return nil, err
	}

	// Commit the transaction
	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: UpdateEvent] Error committing transaction:", err)
		return nil, err
	}

	return &st.UpdateEventResponse{
		EventId:         existingEvent.EventId,
		StartDate:       existingEvent.StartDate,
		EndDate:         existingEvent.EndDate,
		Status:          existingEvent.Status,
		ParticipantFee:  existingEvent.ParticipantFee,
		Description:     existingEvent.Description,
		EventName:       existingEvent.EventName,
		Deadline:        existingEvent.Deadline,
		Activities:      existingEvent.Activities,
		EventImage:      existingEvent.EventImage,
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