package scheduler

import (
	
	"github.com/robfig/cron/v3"
)

func StartReminderEmailJob() {
	// Create a new cron job runner
	c := cron.New()

	// Define the schedule for the job (run at 12 AM one day before the event)
	schedule := "0 0 * * *"

	// Add the job to the cron schedule
	c.AddFunc(schedule, func() {
		// Call the SendReminderEmail function here
		// You need to create an instance of AnnouncementService and populate req with the required data
		// For example:
		// announcementService := NewAnnouncementService()
		// req := &st.SendReminderEmailRequest{
		// 	UserId:       "user_id",
		// 	OrganizerId:  "organizer_id",
		// 	EventId:      "event_id",
		// 	EventName:    "Event Name",
		// 	EventDate:    "Event Date",
		// 	EventLocation: "Event Location",
		// }
		// announcementService.SendReminderEmail(req)
	})

	// Start the cron job runner
	c.Start()

	// Run indefinitely (you might want to run this in the background in a production environment)
	select {}
}

// func SendReminderEmail() {

// 	currentTime := time.Now()

// 	Tomorrow := currentTime.Add(24 * time.Hour)

// 	eventLists, err := repository.NewEventRepository()
// 	if err != nil {
// 		log.Println("Error getting event lists:", err)
// 		return
// 	}

// 	// Iterate through eventLists and send reminder emails for each event
// 	for _, event := range eventLists {
// 		// Assuming SendReminderEmailRequest can be constructed from event data
// 		req := &st.SendReminderEmailRequest{
// 			UserId:        event.UserID,
// 			OrganizerId:   event.OrganizerID,
// 			EventId:       event.ID,
// 			EventName:     event.Name,
// 			EventDate:     event.EndDate, // Use the end date for the reminder
// 			EventLocation: event.Location,
// 			// Add other fields as needed
// 		}

// 		// Assuming SendReminderEmail is a method of AnnouncementService
// 		_, err := announcementService.SendReminderEmail(req)
// 		if err != nil {
// 			log.Printf("Error sending reminder email for event %s: %v", event.ID, err)
// 			// Handle the error as needed (e.g., logging, notifying, etc.)
// 		}
// 	}
// }