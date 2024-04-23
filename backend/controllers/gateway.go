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
	TestController         *TestController
	EventController        *EventController
	LocationController     *LocationController
	ParticipateController  *ParticipateController
	AnnouncementController *AnnouncementController
	ProblemController      *ProblemController
	UserController         *UserController
	TransactionController  *TransactionController
	RefundController       *RefundController
	PostController         *PostController
	ResponseController     *ResponseController
}

// NewController ...
func NewController(g Gateway) *Controller {
	return &Controller{
		Gateway: g,
	}
}
