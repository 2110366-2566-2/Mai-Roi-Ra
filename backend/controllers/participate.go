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

// @Summary Send Announcement
// @Description Sends an announcement email to the specified recipients.
// @Tags participates
// @Accept json
// @Produce json
// @Param request body st.SendAnnouncementRequest true "Send Announcement Request"
// @Success 200 {object} st.SendAnnounceResponse "Announcement successfully sent"
// @Failure 400 {object} object "Bad request - error in sending the announcement"
// @Router /send-announcement [post]
func (c *ParticipateController) SendAnnouncement(ctx *gin.Context, req *st.SendAnnouncementRequest) {
	log.Println("[CTRL: SendAnnouncement]: Input:", req)
	res, err := c.ServiceGateway.ParticipateService.SendAnnouncement(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendAnnouncement]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}
