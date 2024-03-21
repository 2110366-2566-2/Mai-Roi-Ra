package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
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

// @Summary IsRegistered
// @Description Determine that whether the user has registered in this events
// @Tags participates
// @Accept json
// @Produce json
// @Param user_id query string true "user_id"
// @Param event_id query string true "event_id"
// @Success 200 {object} structure.IsRegisteredResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /participate/is_registered [get]
func (c *ParticipateController) IsRegistered(ctx *gin.Context) {
	req := &st.IsRegisteredRequest{
		EventId: ctx.Query("event_id"),
		UserId:  ctx.Query("user_id"),
	}
	log.Println("[CTRL: IsRegistered] Input:", req)
	res, err := c.ServiceGateway.ParticipateService.IsRegistered(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: IsRegistered] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
