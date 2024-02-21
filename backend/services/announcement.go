package services

import (
	"fmt"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type AnnouncementService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IAnnouncementService interface {
	SendAnnouncement(req *st.SendAnnouncementRequest) (*st.SendAnnounceResponse, error)
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

	res := fmt.Sprintf("Email Send from %s to %s successful", cfg.Email.Address, to)
	return &st.SendAnnounceResponse{
		AnnounceStatus: res,
	}, nil
}
