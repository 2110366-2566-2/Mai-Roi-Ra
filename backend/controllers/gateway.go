package controllers

import (
	"go.uber.org/dig"
)

// Controller ...
type Controller struct {
	Gateway Gateway
}

// Gateway ...
type Gateway struct {
	dig.In
	TestController *TestController
}

// NewController ...
func NewController(g Gateway) *Controller {
	return &Controller{
		Gateway: g,
	}
}
