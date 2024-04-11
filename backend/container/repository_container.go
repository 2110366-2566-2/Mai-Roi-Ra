package container

import repositories "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"

// RepositoryProvider Inject Repository
func (c *Container) RepositoryProvider() {
	if err := c.Container.Provide(repositories.NewEventRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewTestRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewLocationRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewUserRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewOrganizerRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewParticipateRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewAnnouncementRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewProblemRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewSearchRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewOtpRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewTransactionRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewRefundRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewPostRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewResponseRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewRepository); err != nil {
		c.Error = err
	}
}
