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
	EventService IEventService
	UserService IUserService
}



// NewService ...
func NewService(sg ServiceGateway) *Service {
	return &Service{
		ServiceGateway: sg,
	}
}
