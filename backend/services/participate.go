package services

import (
	"log"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type ParticipateService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IParticipateService interface {
	IsRegistered(req *st.IsRegisteredRequest) (*st.IsRegisteredResponse, error)
}

func NewParticipateService(
	repoGateway repository.RepositoryGateway,
) IParticipateService {
	return &ParticipateService{
		RepositoryGateway: repoGateway,
	}
}

// used the same struct as before, cause this function is so ez
func (s *ParticipateService) IsRegistered(req *st.IsRegisteredRequest) (*st.IsRegisteredResponse, error) {
	log.Println("[Service: IsRegistered]: Called")
	res, err := s.RepositoryGateway.ParticipateRepository.IsRegistered(req)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return nil, err
	}
	return res, err
}
