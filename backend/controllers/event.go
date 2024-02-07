package controllers

import (
	"fmt"
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

func UpdateEvent(c *gin.Context) {
	// Get the eventid parameter from the URL
	eventID := c.Param("eventid")

	// Parse the JSON request body into an Event struct
	var updatedEvent st.UpdateEventRequest
	if err := c.ShouldBindJSON(&updatedEvent); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Return a successful response
	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Updated event with ID: %s", eventID),
		"event":   updatedEvent,
	})
}

func DeleteEvent(c *gin.Context) {
	// Get the eventid parameter from the URL
	eventID := c.Param("eventid")

	// Return a successful response
	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Deleted event with ID: %s", eventID),
	})
}