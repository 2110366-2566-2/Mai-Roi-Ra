package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type EventController struct {
	ServiceGateway services.ServiceGateway
}

func NewEventController(
	sg services.ServiceGateway,
) *EventController {
	return &EventController{
		ServiceGateway: sg,
	}
}

// @Summary Create new event
// @Description Create a new event with the provided details.
// @Tags events
// @Accept json
// @Produce json
// @Param request body st.CreateEventRequest true "Create Event Request"
// @Success 200 {object} st.CreateEventResponse "Success"
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /events [post]
func (c *EventController) CreateEvent(ctx *gin.Context, req st.CreateEventRequest) {
	log.Println("[CTRL: CreateEvent] Input:", req)

	res, err := c.ServiceGateway.EventService.CreateEvent(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateEvent] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
