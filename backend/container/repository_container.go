package container

import repositories "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"

// RepositoryProvider Inject Repository
func (c *Container) RepositoryProvider() {
	// Repository

	// if err := c.Container.Provide(repositories.NewRepository); err != nil {
	// 	c.Error = err
	// }

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

	if err := c.Container.Provide(repositories.NewAdminRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewOrganizerRepository); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(repositories.NewParticipateRepository); err != nil {
		c.Error = err
	}
}