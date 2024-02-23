package scheduler

import (
	"log"
	"time"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	service "github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/robfig/cron/v3"
)

func StartReminderEmailJob() {
	// Create a new cron job runner
	c := cron.New()

	// Define the schedule for the job (run at every midnight)
	schedule := "0 0 * * *"

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
	currentTime := time.Now()
	Tomorrow := currentTime.Add(24 * time.Hour)

	AnnouncementService := service.NewAnnouncementService(repository.RepositoryGateway{}) 	//Initialize ไงวะ
	EventService := service.NewEventService(repository.RepositoryGateway{})					//Initialize ไงวะ

	reqEvent := &st.GetEventListsByEndDateRequest{
		EndDate: Tomorrow.String(),
	}
	resEvents,err := EventService.GetEventListsByEndDate(reqEvent)
	if err != nil {
		log.Printf("Error sending reminder email for event")
		return err
	}
	
	for _, event := range resEvents.EventLists {
		reqparticipant := &st.GetParticipantListsRequest{
			EventId: event.EventId,
		}
		respaticipant,err := EventService.GetParticipantLists(reqparticipant)
		if err != nil {
			log.Printf("Error sending reminder email for event")
			return err
		}
		for _, participant := range respaticipant.ParticipantList {
			reqreminder := &st.SendReminderEmailRequest{
				UserId: participant.UserId,
				OrganizerId: event.OrganizerId,
				EventId: event.EventId,
				EventName: event.EventName,
				EventDate: event.EndDate,
				EventLocation: event.LocationName,
			}
			_,err :=AnnouncementService.SendReminderEmail(reqreminder)
			if err != nil {
				log.Printf("Error sending reminder email for event")
				return err
			}
		}
	}
	return nil
}