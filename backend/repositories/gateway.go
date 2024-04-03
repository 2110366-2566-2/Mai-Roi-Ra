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
	TestRepository         ITestRepository
	EventRepository        IEventRepository
	UserRepository         IUserRepository
	LocationRepository     ILocationRepository
	OrganizerRepository    IOrganizerRepository
	ParticipateRepository  IParticipateRepository
	AnnouncementRepository IAnnouncementRepository
	ProblemRepository      IProblemRepository
	SearchRepository       ISearchRepository
	OtpRepository          IOtpRepository
	TransactionRepository  ITransactionRepository
	RefundRepository	   IRefundRepository
	PostRepository		   IPostRepository
}

// NewRepository ...
func NewRepository(rg RepositoryGateway) *Repository {
	return &Repository{
		RepositoryGateway: rg,
	}
}
