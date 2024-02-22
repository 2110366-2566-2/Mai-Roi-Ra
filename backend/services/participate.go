package services

import (
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type ParticipateService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IParticipateService interface {
}

func NewParticipateService(
	repoGateway repository.RepositoryGateway,
) IParticipateService {
	return &ParticipateService{
		RepositoryGateway: repoGateway,
	}
}
