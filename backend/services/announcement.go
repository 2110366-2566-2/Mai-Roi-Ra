package services

import (
	"fmt"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type AnnouncementService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IAnnouncementService interface {
	SendAnnouncement(req *st.SendAnnouncementRequest) (*st.SendAnnounceResponse, error)
	SendRegisteredEmail(req *st.SendRegisteredEmailRequest) (*st.SendRegisteredEmailResponse, error)
	SendReminderEmail(req *st.SendReminderEmailRequest) (*st.SendReminderEmailResponse, error)
	SendCancelledEmail(req *st.SendCancelledEmailRequest) (*st.SendCancelledEmailResponse, error)
}

func NewAnnouncementService(
	repoGateway repository.RepositoryGateway,
) IAnnouncementService {
	return &AnnouncementService{
		RepositoryGateway: repoGateway,
	}
}

func (s *AnnouncementService) SendAnnouncement(req *st.SendAnnouncementRequest) (*st.SendAnnounceResponse, error) {
	log.Println("[Service: SendAnnouncement]: Called")
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	log.Println("Config path from Gmail:", cfg)

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	reqParticipantsList := &st.GetParticipantListsRequest{
		EventId: req.EventId,
	}

	resParticipants, err := s.RepositoryGateway.ParticipateRepository.GetParticipantsForEvent(reqParticipantsList)

	if err != nil {
		return nil, err
	}

	for _, v := range resParticipants {
		status, userEmail, err := s.RepositoryGateway.UserRepository.IsEnableNotification(v.UserId)
		if err != nil || status == nil {
			return nil, err
		}
		isEnableNotification := *status
		email := ""
		if userEmail != nil {
			email = *userEmail
		}
		if isEnableNotification && email != "" {
			to = append(to, email)
		}
	}

	resAdmin, resOrganizer, err := s.RepositoryGateway.EventRepository.GetAdminAndOrganizerEventById(req.EventId)
	if err != nil {
		return nil, err
	}

	adminId := ""
	orgId := ""
	if resAdmin != nil {
		adminId = *resAdmin
	}
	if resOrganizer != nil {
		orgId = *resOrganizer
	}

	userRes, err := s.RepositoryGateway.UserRepository.GetUserByID(&st.GetUserByUserIdRequest{
		UserId: adminId,
	})
	if err != nil {
		return nil, err
	}
	orgUserId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(orgId)
	if err != nil {
		return nil, err
	}
	orgRes, err := s.RepositoryGateway.UserRepository.GetUserByID(&st.GetUserByUserIdRequest{
		UserId: orgUserId,
	})
	if err != nil {
		return nil, err
	}

	adminEmail := ""
	if userRes != nil {
		adminEmail = *userRes.Email
	}
	orgName := ""
	if orgRes != nil {
		orgName = orgRes.FirstName + " " + orgRes.LastName
	}
	// append admin to email
	to = append(to, adminEmail)
	eventData, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}
	eventImage := ""
	if eventData != nil {
		eventImage = *eventData.EventImage
	}
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
		<h3>Dear participants in %s,</h3>
		<p>%s</p>
		<p class="signature">Best regards,<br>%s (Organizer),<br>Mai-Roi-Ra team</p>
	</body>
	</html>
`, req.EventName, req.Content, orgName)

	// Insert image
	attachFiles = append(attachFiles, eventImage)
	// attachFiles = append(attachFiles, "../../frontend/public/img/icon_sunlight.png")

	if err = sender.SendEmail(req.Subject, "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}

	announceModel := &models.Announcement{
		AnnouncementId: utils.GenerateUUID(),
		EventId:        req.EventId,
		Header:         req.Subject,
		Description:    req.Content,
		CreatedAt:      time.Now(),
	}

	if err = s.RepositoryGateway.AnnouncementRepository.CreateAnnouncement(announceModel); err != nil {
		return nil, err
	}

	res := fmt.Sprintf("Email Send from %s to %s successful", cfg.Email.Address, to)
	return &st.SendAnnounceResponse{
		AnnounceStatus: res,
	}, nil
}

func (s *AnnouncementService) SendRegisteredEmail(req *st.SendRegisteredEmailRequest) (*st.SendRegisteredEmailResponse, error) {
	log.Println("[Service: SendRegisteredEmail]: Called")
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	log.Println("Config path from Gmail:", cfg)

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	status, userEmail, err := s.RepositoryGateway.UserRepository.IsEnableNotification(req.UserId)
	if err != nil || status == nil {
		return nil, err
	}
	isEnableNotification := *status
	email := ""
	if userEmail != nil {
		email = *userEmail
	}

	if isEnableNotification && email != "" {
		to = append(to, email)
	} else {
		return nil, err
	}

	orgId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(req.OrganizerId)
	if err != nil {
		return nil, err
	}
	orgUserId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(orgId)
	if err != nil {
		return nil, err
	}
	orgRes, err := s.RepositoryGateway.UserRepository.GetUserByID(&st.GetUserByUserIdRequest{
		UserId: orgUserId,
	})
	if err != nil {
		return nil, err
	}

	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}

	eventImage := ""
	if resEvent.EventImage != nil {
		eventImage = *resEvent.EventImage
	}

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
		<h3>Dear participants,</h3>
		<p>We are thrilled to inform you that your registration for %s has been successfully received and confirmed!</p>
		<p>Please mark your calendar accordingly and ensure you are prepared to fully engage in the event activities. Should you have any questions or require further assistance, feel free to reach out to us at %s.</p>
		<p class="signature">Best regards,<br>Mai-Roi-Ra team</p>
	</body>
	</html>
	`, req.EventName, *orgRes.PhoneNumber)

	// Insert image
	attachFiles = append(attachFiles, eventImage)
	// attachFiles = append(attachFiles, "../../frontend/public/img/icon_sunlight.png")

	if err = sender.SendEmail("Register Event Successful!", "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}
	res := fmt.Sprintf("Email Send from %s to %s successful", cfg.Email.Address, to)
	return &st.SendRegisteredEmailResponse{
		SendStatus: res,
	}, nil
}

func (s *AnnouncementService) SendReminderEmail(req *st.SendReminderEmailRequest) (*st.SendReminderEmailResponse, error) {
	log.Println("[Service: SendReminderEmail]: Called")
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	log.Println("Config path from Gmail:", cfg)

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	status, userEmail, err := s.RepositoryGateway.UserRepository.IsEnableNotification(req.UserId)
	if err != nil || status == nil {
		return nil, err
	}
	isEnableNotification := *status
	email := ""
	if userEmail != nil {
		email = *userEmail
	}

	if isEnableNotification && email != "" {
		to = append(to, email)
	} else {
		return nil, err
	}

	orgId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(req.OrganizerId)
	if err != nil {
		return nil, err
	}
	orgUserId, err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(orgId)
	if err != nil {
		return nil, err
	}
	orgRes, err := s.RepositoryGateway.UserRepository.GetUserByID(&st.GetUserByUserIdRequest{
		UserId: orgUserId,
	})
	if err != nil {
		return nil, err
	}

	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}

	eventImage := ""
	if resEvent.EventImage != nil {
		eventImage = *resEvent.EventImage
	}

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
		<h3>Dear participants,</h3>
		<p>We wanted to send you a friendly reminder that the event is scheduled to start tomorrow, %s. We're thrilled to have you join us for what promises to be an inspiring and informative experience.</p>
		<p>Here are some important details to keep in mind:</p>
		<p>. Event Name: %s</p>
		<p>. Date: %s</p>
		<p>. Location: %s</p>
		<p>Please ensure that you have everything you need for the event. If there are any last-minute preparations or questions you have, don't hesitate to reach out to us at %s. We're here to assist you and make sure you have a smooth and enjoyable experience.</p>
		<p class="signature">Best regards,<br><br>Mai-Roi-Ra team</p>
	</body>
	</html>
	`, req.EventDate, req.EventName, req.EventDate, req.EventLocation, *orgRes.PhoneNumber)

	// Insert image
	attachFiles = append(attachFiles, eventImage)
	// attachFiles = append(attachFiles, "../../frontend/public/img/icon_sunlight.png")

	if err = sender.SendEmail("Reminder of Event Tomorrow", "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}
	res := fmt.Sprintf("Email Send from %s to %s successful", cfg.Email.Address, to)
	return &st.SendReminderEmailResponse{
		SendStatus: res,
	}, nil
}

func (s *AnnouncementService) SendCancelledEmail(req *st.SendCancelledEmailRequest) (*st.SendCancelledEmailResponse, error) {
	log.Println("[Service: SendCancelledEmail]: Called")
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	log.Println("Config path from Gmail:", cfg)

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	status, userEmail, err := s.RepositoryGateway.UserRepository.IsEnableNotification(req.UserId)
	if err != nil || status == nil {
		return nil, err
	}
	isEnableNotification := *status
	email := ""
	if userEmail != nil {
		email = *userEmail
	}

	if isEnableNotification && email != "" {
		to = append(to, email)
	} else {
		return nil, err
	}

	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventId)
	if err != nil {
		return nil, err
	}

	eventImage := ""
	if resEvent.EventImage != nil {
		eventImage = *resEvent.EventImage
	}

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
		<h3>Dear participants,</h3>
		<p>We regret to inform you that %s, scheduled for %s, has been canceled. We understand the inconvenience this may cause and sincerely apologize for any disruption to your plans.</p>
  		<p>We understand that this news may be disappointing, especially after the anticipation leading up to the event. Please know that this decision was not taken lightly, and we explored all possible alternatives before reaching this conclusion.</p>
  		<p>Once again, we apologize for any inconvenience caused and thank you for your understanding and support during this challenging time.</p>
		<p class="signature">Best regards,<br><br>Mai-Roi-Ra team</p>
	</body>
	</html>
	`, req.EventName, req.EventDate)

	// Insert image
	attachFiles = append(attachFiles, eventImage)
	// attachFiles = append(attachFiles, "../../frontend/public/img/icon_sunlight.png")

	if err = sender.SendEmail("Event Cancelled", "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}
	res := fmt.Sprintf("Email Send from %s to %s successful", cfg.Email.Address, to)
	return &st.SendCancelledEmailResponse{
		SendStatus: res,
	}, nil
}
