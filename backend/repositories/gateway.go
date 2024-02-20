package repository

import (
	"go.uber.org/dig"
)

// Repository ...
type Repository struct {
	RepositoryGateway RepositoryGateway
}

// RepositoryGateway ...
type RepositoryGateway struct {
	dig.In
	TestRepository        ITestRepository
	EventRepository       IEventRepository
	UserRepository        IUserRepository
	LocationRepository    ILocationRepository
	AdminRepository       IAdminRepository
	OrganizerRepository   IOrganizerRepository
	ParticipateRepository IParticipateRepository
}

// NewRepository ...
func NewRepository(rg RepositoryGateway) *Repository {
	return &Repository{
		RepositoryGateway: rg,
	}
}