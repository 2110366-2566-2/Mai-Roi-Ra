package scheduler

import (
	db "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/db"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	service "github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/robfig/cron/v3"
	"log"
	"time"
)

func StartReminderEmailJob() {
	// Create a new cron job runner
	c := cron.New()

	// Define the schedule for the job (run at every midnight)
	schedule := "18 13 * * *"

	// Add the job to the cron schedule
	c.AddFunc(schedule, func() {
		SendReminderEmail()
	})

	// Start the cron job runner
	c.Start()

	// Run indefinitely (you might want to run this in the background in a production environment)
	select {}
}

func SendReminderEmail() error {
	g := db.InitPgDB()
	announcementrepository := repository.NewAnnouncementRepository(g)
	eventrepository := repository.NewEventRepository(g)
	locationrepository := repository.NewLocationRepository(g)
	participaterepository := repository.NewParticipateRepository(g)
	userrepository := repository.NewUserRepository(g)
	organizerrepository := repository.NewOrganizerRepository(g)

	AnnouncementService := service.NewAnnouncementService(repository.RepositoryGateway{
		AnnouncementRepository: announcementrepository,
		UserRepository:         userrepository,
		OrganizerRepository:    organizerrepository,
	})
	currentTime := time.Now()
	Tomorrow := currentTime.Add(24 * time.Hour)
	EventService := service.NewEventService(repository.RepositoryGateway{
		EventRepository:       eventrepository,
		LocationRepository:    locationrepository,
		UserRepository:        userrepository,
		ParticipateRepository: participaterepository,
	})
	reqEvent := &st.GetEventListsByStartDateRequest{
		StartDate: Tomorrow.Format("2006-01-02"),
	}
	resEvents, err := EventService.GetEventListsByStartDate(reqEvent)
	if err != nil {
		log.Printf("Error sending reminder email for event")
		return err
	}

	for _, event := range resEvents.EventLists {
		reqparticipant := &st.GetParticipantListsRequest{
			EventId: event.EventId,
		}
		respaticipant, err := EventService.GetParticipantLists(reqparticipant)
		if err != nil {
			log.Printf("Error sending reminder email for event")
			return err
		}
		startDate, err := time.Parse("20060102", event.StartDate)
		if err != nil {
			log.Printf("Error parsing time")
			return err
		}
		for _, participant := range respaticipant.ParticipantList {
			reqreminder := &st.SendReminderEmailRequest{
				UserId:        participant.UserId,
				OrganizerId:   event.OrganizerId,
				EventId:       event.EventId,
				EventName:     event.EventName,
				EventDate:     startDate.Format("2006-01-02"),
				EventLocation: event.LocationName,
			}
			_, err := AnnouncementService.SendReminderEmail(reqreminder)
			if err != nil {
				log.Printf("Error sending reminder email for event")
				return err
			}
		}
	}
	return nil
}
