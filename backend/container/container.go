package container

import (
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/db"
	"go.uber.org/dig"
)

// Container ...
type Container struct {
	Container *dig.Container
	Error     error
}

// Configure ...
func (c *Container) Configure() {
	c.Container = dig.New()

	c.Container.Provide(db.InitPgDB)

	c.ControllerProvider()
	c.ServiceProvider()
	c.RepositoryProvider()
}

// NewContainer ...
func NewContainer() *Container {
	c := &Container{}

	c.Configure()

	return c
}
