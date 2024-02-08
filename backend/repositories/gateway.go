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
	TestRepository ITestRepository
	EventRepository IEventRepository
	LocationRepository ILocationRepository
}

// NewRepository ...
func NewRepository(rg RepositoryGateway) *Repository {
	return &Repository{
		RepositoryGateway: rg,
	}
}
