package container

import (
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/cloud"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"

	services "github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
)

// ServiceProvider Inject Service
func (c *Container) ServiceProvider() {
	if err := c.Container.Provide(services.NewTestService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewEventService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewLocationService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewUserService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewParticipateService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewAnnouncementService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewProblemService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewTransactionService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewRefundService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewPostService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewResponseService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(cloud.NewAWSCloudService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(payment.NewStripeService); err != nil {
		c.Error = err
	}

	if err := c.Container.Provide(services.NewService); err != nil {
		c.Error = err
	}
}
