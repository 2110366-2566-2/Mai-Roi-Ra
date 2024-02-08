package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type LocationController struct {
	ServiceGateway services.ServiceGateway
}

func NewLocationController(
	sg services.ServiceGateway,
) *LocationController {
	return &LocationController{
		ServiceGateway: sg,
	}
}

// @Summary GetLocationById
// @Description Get location by id
// @Tags locations
// @Accept json
// @Produce json
// @Param location_id path string true "Location ID"
// @Success 200 {object} structure.GetLocationByIdResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /locations/{location_id} [get]
func (c *LocationController) GetLocationById(ctx *gin.Context, req st.GetLocationByIdRequest) {
	log.Println("[CTRL: GetLocationById] Input:", req)
	res, err := c.ServiceGateway.LocationService.GetLocationById(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetLocationById] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
