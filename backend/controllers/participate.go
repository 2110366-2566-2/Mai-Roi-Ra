package controllers

import (
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
)

type ParticipateController struct {
	ServiceGateway services.ServiceGateway
}

func NewParticipateController(
	sg services.ServiceGateway,
) *ParticipateController {
	return &ParticipateController{
		ServiceGateway: sg,
	}
}
