package scheduler

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	service "github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
	"github.com/robfig/cron/v3"
	db "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/db"
)

func StartReminderEmailJob() {
	// Create a new cron job runner
	c := cron.New()

	// Define the schedule for the job (run at every midnight)
	schedule := "06 15 * * *"

	// Add the job to the cron schedule
	c.AddFunc(schedule, func() {
		SendReminderEmail()
	})

	// Start the cron job runner
	c.Start()

	// Run indefinitely (you might want to run this in the background in a production environment)
	select {}
}

func TestSendEmailWithGmail() error {
	
	cfg,err := config.NewConfig("github.com/2110366-2566-2/Mai-Roi-Ra/backend/.env")
	if(err != nil) {return err}
	
	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)

	subject := "A test email"
	content := `
	<h1>Hello World </h1>
	<p> This is a test message from natchy </p>
	`
	to := []string{"JdaKung@gmail.com"}
	attachFiles := []string{"../../README.md"}

	_ = sender.SendEmail(subject, content, content, to, nil, nil, attachFiles)
	return nil
}

func SendReminderEmail() error {
	g := db.InitPgDB()
	announcementrepository := repository.NewAnnouncementRepository(g)
	AnnouncementService := service.NewAnnouncementService(repository.RepositoryGateway{
		AnnouncementRepository: announcementrepository,
	})
	currentTime := time.Now()
	Tomorrow := currentTime.Add(24 * time.Hour)
	eventrepository := repository.NewEventRepository(g)
	EventService := service.NewEventService(repository.RepositoryGateway{
		EventRepository: eventrepository,
	})
	reqEvent := &st.GetEventListsByEndDateRequest{
		EndDate: Tomorrow.Format("2006-01-02"),
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