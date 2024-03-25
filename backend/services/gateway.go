package services

import (
	"go.uber.org/dig"
)

// Repository ...
type Service struct {
	ServiceGateway ServiceGateway
}

// ServiceGatway ...
type ServiceGateway struct {
	dig.In
	TestService         ITestService
	EventService        IEventService
	LocationService     ILocationService
	UserService         IUserService
	ParticipateService  IParticipateService
	AnnouncementService IAnnouncementService
	ProblemService      IProblemService
	TransactionService  ITransactionService
}

// NewService ...
func NewService(sg ServiceGateway) *Service {
	return &Service{
		ServiceGateway: sg,
	}
}
