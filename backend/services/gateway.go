package services

import (
	"go.uber.org/dig"
)

// Repository ...
type Service struct {
	ServiceGateway ServiceGateway
}

// RepositoryGateway ...
type ServiceGateway struct {
	dig.In
	TestService ITestService
}

// NewRepository ...
func NewRepository(sg ServiceGateway) *Service {
	return &Service{
		ServiceGateway: sg,
	}
}
