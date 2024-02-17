package services

import (
	"fmt"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type ParticipateService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IParticipateService interface {
	SendAnnouncement(req *st.SendAnnouncementRequest) (*st.SendAnnounceResponse, error)
}

func NewParticipateService(
	repoGateway repository.RepositoryGateway,
) IParticipateService {
	return &ParticipateService{
		RepositoryGateway: repoGateway,
	}
}

func (s *ParticipateService) SendAnnouncement(req *st.SendAnnouncementRequest) (*st.SendAnnounceResponse, error) {
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
	log.Println("Sender:", sender)
	to := req.To
	cc := req.Cc
	bcc := req.Bcc
	attachFiles := req.AttachFiles
	if err = sender.SendEmail(req.Subject, req.Content, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}
	res := fmt.Sprintf("Email Send from %s to %s successful", cfg.Email.Address, to)
	return &st.SendAnnounceResponse{
		AnnounceStatus: res,
	}, nil
}
