package services

import (
	"errors"
	"fmt"
	"log"
	"math"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type EventService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IEventService interface {
	CreateEvent(*st.CreateEventRequest) (*st.CreateEventResponse, error)
	GetEventLists(req *st.GetEventListsRequest) (*st.GetEventListsResponse, error)
	GetEventListsByStartDate(req *st.GetEventListsByStartDateRequest) (*st.GetEventListsByStartDateResponse, error)
	GetEndedEventLists(req *st.GetEndedEventListsRequest) (*st.GetEndedEventListsResponse, error)
	GetEventDataById(st.GetEventDataByIdRequest) (*st.GetEventDataByIdResponse, error)
	UpdateEvent(req *st.UpdateEventRequest) (*st.UpdateEventResponse, error)
	DeleteEventById(req *st.DeleteEventRequest) (*st.DeleteEventResponse, error)
	GetParticipantLists(req *st.GetParticipantListsRequest) (*st.GetParticipantListsResponse, error)
	VerifyEvent(req *st.VerifyEventRequest) (*st.VerifyEventResponse, error)
	UpdateEventImage(eventId string, imageUrl string) (*st.UpdateEventResponse, error)
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
		EventId:        req.EventId,
		OrganizerId:    req.OrganizerId,
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
	resEvents, totalEvents, totalPages, err := s.RepositoryGateway.EventRepository.GetEventLists(req)
	if err != nil {
		return nil, err
	}
	log.Println("[Service: GetEventLists]: resEvents:", resEvents)

	eventLists := make([]st.GetEventList, 0)

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
		eventLists = append(eventLists, res)
	}

	resLists := &st.GetEventListsResponse{
		TotalPages: *totalPages,
		TotalEvent: *totalEvents,
		EventLists: eventLists,
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
			EventId:      v.EventId,
			OrganizerId:  v.OrganizerId,
			EventName:    v.EventName,
			StartDate:    utils.GetDate(v.StartDate),
			EndDate:      utils.GetDate(v.EndDate),
			Description:  v.Description,
			Status:       v.Status,
			EventImage:   eventImage,
			LocationName: resLocation.LocationName,
		}
		resLists.EventLists = append(resLists.EventLists, res)
	}
	return resLists, nil
}

func (s *EventService) GetEndedEventLists(req *st.GetEndedEventListsRequest) (*st.GetEndedEventListsResponse, error) {
	log.Println("[Service: GetEndedEventLists]: Called")

	eventlists := make([]models.Event, 0)

	requser := &st.GetUserByUserIdRequest{
		UserId: req.UserId,
	}
	resuser, err := s.RepositoryGateway.UserRepository.GetUserByID(requser)
	if err != nil {
		return nil, err
	}
	if resuser.Role == constant.USER {
		// User
		reqpart := &st.GetParticipatedEventListsRequest{
			UserId: req.UserId,
		}
		respart, err := s.RepositoryGateway.ParticipateRepository.GetParticipatedEventsForUser(reqpart)
		if err != nil {
			return nil, err
		}
		for _, v := range respart {
			event, err := s.RepositoryGateway.EventRepository.GetEventDataById(v.EventId)
			if err != nil {
				return nil, err
			}
			eventlists = append(eventlists, *event)
		}
	} else if resuser.Role == constant.ORGANIZER {
		// Organizer
		resorg, err := s.RepositoryGateway.OrganizerRepository.GetOrganizerIdFromUserId(resuser.UserID)
		if err != nil {
			return nil, err
		}
		reqevent := &st.GetEventListsRequest{
			OrganizerId: resorg,
		}
		resevent, _, _, err := s.RepositoryGateway.EventRepository.GetEventLists(reqevent)
		if err != nil {
			return nil, err
		}
		for _, v := range resevent {
			eventlists = append(eventlists, *v)
		}
	}

	res := &st.GetEndedEventListsResponse{
		EventLists: make([]st.GetEndedEventList, 0),
	}

	for _, v := range eventlists {
		if time.Now().After(v.EndDate) {

			loc, err := s.RepositoryGateway.LocationRepository.GetLocationById(v.LocationId)
			if err != nil {
				return nil, err
			}

			reqpos := &st.GetPostListsByEventIdRequest{
				EventId: v.EventId,
			}

			respos, err := s.RepositoryGateway.PostRepository.GetPostListsByEventId(reqpos)
			if err != nil {
				return nil, err
			}

			var countRatings [6]int // Index 0 for posts with no ratings, 1-5 for respective ratings
			var totalRatings int
			var totalCount int

			for _, v := range respos {
				if v.RatingScore >= 1 && v.RatingScore <= 5 {
					countRatings[v.RatingScore]++
					totalRatings += v.RatingScore
				} else {
					countRatings[0]++
				}
				totalCount++
			}

			var avgRating float64
			if totalCount > 0 {
				avgRating = float64(totalRatings) / float64(totalCount)
				avgRating = math.Round(avgRating*10) / 10
			}

			in := &st.GetEndedEventList{
				EventId:     v.EventId,
				EventName:   v.EventName,
				StartDate:   v.StartDate.String(),
				EndDate:     v.EndDate.String(),
				Description: v.Description,
				Status:      v.Status,
				EventImage:  *v.EventImage,
				City:        loc.City,
				District:    loc.District,
				AverageRate: avgRating,
			}
			res.EventLists = append(res.EventLists, *in)
		}
	}

	return res, nil
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
	orgUserId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(resEvent.OrganizerId)
	if err != nil {
		return nil, err
	}
	orgUserInfo, err := s.RepositoryGateway.UserRepository.GetUserByID(&st.GetUserByUserIdRequest{
		UserId: orgUserId,
	})
	if err != nil {
		return nil, err
	}
	res := &st.GetEventDataByIdResponse{
		EventId:          resEvent.EventId,
		OrganizerId:      resEvent.OrganizerId,
		UserId:           resEvent.AdminId,
		LocationId:       resLocation.LocationId,
		FirstName:        orgUserInfo.FirstName,
		LastName:         orgUserInfo.LastName,
		StartDate:        utils.GetDate(resEvent.StartDate),
		EndDate:          utils.GetDate(resEvent.EndDate),
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

	eventModel := models.Event{
		EventId:        resEvent.EventId,
		OrganizerId:    resEvent.OrganizerId,
		AdminId:        resEvent.AdminId,
		LocationId:     resLocation.LocationId,
		StartDate:      startDate,
		EndDate:        endDate,
		Status:         req.Status,
		ParticipantFee: req.ParticipantFee,
		Description:    req.Description,
		EventName:      req.EventName,
		Deadline:       deadline,
		Activities:     req.Activities,
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

	// announcement
	announcementService := NewAnnouncementService(s.RepositoryGateway)

	// get participant to notify them when the event is cancelled
	reqparticipate := &st.GetParticipantListsRequest{
		EventId: req.EventId,
	}
	resparticipate, err := s.RepositoryGateway.ParticipateRepository.GetParticipantsForEvent(reqparticipate)
	if err != nil {
		return nil, err
	}

	for _, v := range resparticipate {
		reqcancelled := &st.SendCancelledEmailRequest{
			UserId:    v.UserId,
			EventId:   resevent.EventId,
			EventName: resevent.EventName,
			EventDate: resevent.StartDate.Format("2006-01-02"),
		}
		if _, err := announcementService.SendCancelledEmail(reqcancelled); err != nil {
			log.Println("[Service: Call SendCancelledEmail]:", err)
			return nil, err
		}
	}

	// transaction
	restransaction, err := s.RepositoryGateway.TransactionRepository.GetTransactionListByEventId(req.EventId)
	if err != nil {
		return nil, err
	}

	for _, v := range restransaction {

		refundId, refundErr := Stripe.IssueRefund(v.TransactionID)
		if refundErr != nil {
			log.Println("[Service: DeleteEventByDataId] Error issueRefunds: ", refundErr)
			return nil, err
		}

		reqrefund := &models.Refund{
			RefundId:      refundId.ID,
			UserId:        v.UserID,
			RefundAmount:  v.TransactionAmount,
			TransactionId: v.TransactionID,
			RefundReason:  "Event Cancelled",
			RefundDate:    time.Time{},
		}
		_, err := s.RepositoryGateway.RefundRepository.CreateRefund(reqrefund)
		if err != nil {
			return nil, err
		}
	}

	// Delete event after passing a week
	updateReq := &models.Event{
		EventId: req.EventId,
		Status:  "Deleted",
	}
	_, updateErr := s.RepositoryGateway.EventRepository.UpdateEvent(updateReq)
	if updateErr != nil {
		log.Println("[Service: DeleteEvent] Error updating event:", err)
		return nil, err
	}

	res := &st.DeleteEventResponse{
		Message: "Delete Successful",
	}

	return res, nil
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

func (s *EventService) SendApprovalEmail(eventId string) error {
	log.Println("[Service: SendApprovalEmail]: Called")
	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(eventId)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return err
	}

	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return err
	}
	log.Println("Config path from Gmail:", cfg)

	subject := fmt.Sprintf("Event Approval: %s", resEvent.EventName)
	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	resUserId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(resEvent.OrganizerId)
	if err != nil {
		return err
	}

	reqId := st.GetUserByUserIdRequest{
		UserId: resUserId,
	}

	resUser, err := s.RepositoryGateway.UserRepository.GetUserByID(&reqId)
	if err != nil {
		return err
	}
	email := ""
	if resUser.Email != nil {
		email = *resUser.Email
	}

	if email == "" {
		return nil
	}

	to = append(to, email)

	contentHTML := fmt.Sprintf(`
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                margin: 40px auto;
                max-width: 600px;
                color: #333333;
            }
            h3 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333333;
            }
            p {
                margin-bottom: 20px;
                color: #666666;
            }
            .signature {
                margin-top: 20px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <h3>Congratulations, your event "%s" has been approved!</h3>
        <p>Hello %s,</p>
        <p>We are pleased to inform you that your event has been successfully approved. You can now see your event listed on our platform.</p>
        <p class="signature">Best regards,<br>The Mai-Roi-Ra Team</p>
    </body>
    </html>
    `, resEvent.EventName, resUser.Username)

	if err = sender.SendEmail(subject, "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		log.Println("[Service: SendApprovalEmail] Error sending email:", err)
		return err
	}
	return nil
}

func (s *EventService) SendRejectionEmail(eventId string) error {
	log.Println("[Service: SendRejectionEmail]: Called")
	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(eventId)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return err
	}

	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return err
	}
	log.Println("Config path from Gmail:", cfg)

	subject := fmt.Sprintf("Event Rejection: %s", resEvent.EventName)
	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	resUserId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(resEvent.OrganizerId)
	if err != nil {
		return err
	}

	reqId := st.GetUserByUserIdRequest{
		UserId: resUserId,
	}

	resUser, err := s.RepositoryGateway.UserRepository.GetUserByID(&reqId)
	if err != nil {
		return err
	}
	email := ""
	if resUser.Email != nil {
		email = *resUser.Email
	}

	if email == "" {
		return nil
	}

	to = append(to, email)

	contentHTML := fmt.Sprintf(`
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                margin: 40px auto;
                max-width: 600px;
                color: #333333;
            }
            h3 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #333333;
            }
            p {
                margin-bottom: 20px;
                color: #666666;
            }
            .signature {
                margin-top: 20px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <h3>Notification of Event Rejection: "%s"</h3>
        <p>Hello %s,</p>
        <p>We regret to inform you that your event submission has been reviewed and not approved at this time. We appreciate your interest in hosting events with us and encourage you to review our event guidelines for future submissions.</p>
        <p class="signature">Best regards,<br>The Mai-Roi-Ra Team</p>
    </body>
    </html>
    `, resEvent.EventName, resUser.Username)

	if err = sender.SendEmail(subject, "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		log.Println("[Service: SendRejectionEmail] Error sending email:", err)
		return err
	}
	return nil
}

func (s *EventService) VerifyEvent(req *st.VerifyEventRequest) (*st.VerifyEventResponse, error) {
	log.Println("[Service: VerifyEvent]: Called")
	if req.Status == constant.APPROVED {
		err := s.SendApprovalEmail(req.EventId)
		if err != nil {
			log.Println("[Service: VerifyEvent] Error sending approval email:", err)
			// Decide if you want to return an error or just log it
			return nil, err
		}
	} else if req.Status == constant.REJECTED {
		// Assuming you have a similar method for sending rejection emails
		err := s.SendRejectionEmail(req.EventId)
		if err != nil {
			log.Println("[Service: VerifyEvent] Error sending rejection email:", err)
			// Decide if you want to return an error or just log it
			return nil, err
		}
	}

	res, err := s.RepositoryGateway.EventRepository.VerifyEvent(req)
	if err != nil {
		log.Println("[Service: VerifyEvent]: Called Repo Error: ", err)
		return nil, err
	}
	return res, nil
}

func (s *EventService) UpdateEventImage(eventId string, imageUrl string) (*st.UpdateEventResponse, error) {
	log.Println("[Service: UpdateEventImage] Called")
	eventModel := models.Event{
		EventImage: &imageUrl,
		EventId:    eventId,
	}

	res, err := s.RepositoryGateway.EventRepository.UpdateEvent(&eventModel)
	if err != nil {
		log.Println("[Service: UpdateEventImage] Called repo updateEvent error", err)
		return nil, err
	}

	return res, nil
}
