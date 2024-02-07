package container

import controllers "github.com/2110366-2566-2/Mai-Roi-Ra/backend/controllers"

// ControllerProvider Inject Controller
func (c *Container) ControllerProvider() {
	
	// Controller
	// if err := c.Container.Provide(controllers.NewController); err != nil {
	// 	c.Error = err
	// }

	if err := c.Container.Provide(controllers.NewEventController); err != nil {
		c.Error = err
	}

	err := c.Container.Provide(controllers.NewTestController)
    if err != nil {
        c.Error = err
    }
}