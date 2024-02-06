package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type EventController struct {
	logger         *log.Logger
	ServiceGateway services.ServiceGateway
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
func CreateEvent(c *gin.Context) {
	var req st.CreateEventRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Simulated response for the purpose of Swagger documentation.
	res := st.CreateEventResponse{
		EventId:   "123",
		CreatedAt: "Hello",
	}
	c.JSON(http.StatusOK, res)
}
