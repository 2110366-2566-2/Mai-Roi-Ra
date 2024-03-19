package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type AnnouncementController struct {
	ServiceGateway services.ServiceGateway
}

func NewAnnouncementController(
	sg services.ServiceGateway,
) *AnnouncementController {
	return &AnnouncementController{
		ServiceGateway: sg,
	}
}

// @Summary Send Announcement
// @Description Sends an announcement email to the specified recipients.
// @Tags announcements
// @Accept json
// @Produce json
// @Param request body st.SendAnnouncementRequest true "Send Announcement Request"
// @Success 200 {object} st.SendAnnounceResponse "Announcement successfully sent"
// @Failure 400 {object} object "Bad request - error in sending the announcement"
// @Router /announcements [post]
func (c *AnnouncementController) SendAnnouncement(ctx *gin.Context) {
	var req *st.SendAnnouncementRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendAnnouncement]: Input:", req)
	res, err := c.ServiceGateway.AnnouncementService.SendAnnouncement(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendAnnouncement]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Send RegisteredEmail
// @Description Sends an Registered email to the specified recipients.
// @Tags announcements
// @Accept json
// @Produce json
// @Param request body st.SendRegisteredEmailRequest true "Send RegisteredEmail Request"
// @Success 200 {object} st.SendRegisteredEmailResponse "RegisteredEmail successfully sent"
// @Failure 400 {object} object "Bad request - error in sending the RegisteredEmail"
// @Router /announcements/registered_email [post]
func (c *AnnouncementController) SendRegisteredEmail(ctx *gin.Context) {
	var req *st.SendRegisteredEmailRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendRegisteredEmail]: Input:", req)
	res, err := c.ServiceGateway.AnnouncementService.SendRegisteredEmail(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendRegisteredEmail]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Send ReminderEmail
// @Description Sends an Reminder email to the specified recipients.
// @Tags announcements
// @Accept json
// @Produce json
// @Param request body st.SendReminderEmailRequest true "Send ReminderEmail Request"
// @Success 200 {object} st.SendReminderEmailResponse "ReminderEmail successfully sent"
// @Failure 400 {object} object "Bad request - error in sending the ReminderEmail"
// @Router /announcements/reminder_email [post]
func (c *AnnouncementController) SendReminderEmail(ctx *gin.Context) {
	var req *st.SendReminderEmailRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendReminderEmail]: Input:", req)
	res, err := c.ServiceGateway.AnnouncementService.SendReminderEmail(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendReminderEmail]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// @Summary Send CancelledEmail
// @Description Sends an Cancelled email to the specified recipients.
// @Tags announcements
// @Accept json
// @Produce json
// @Param request body st.SendCancelledEmailRequest true "Send CancelledEmail Request"
// @Success 200 {object} st.SendCancelledEmailRequest "CancelledEmail successfully sent"
// @Failure 400 {object} object "Bad request - error in sending the CancelledEmail"
// @Router /announcements/cancelled_email [post]
func (c *AnnouncementController) SendCancelledEmail(ctx *gin.Context) {
	var req *st.SendCancelledEmailRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendCancelledEmail]: Input:", req)
	res, err := c.ServiceGateway.AnnouncementService.SendCancelledEmail(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: SendCancelledEmail]: Output:", res)
	ctx.JSON(http.StatusOK, res)
}
