package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type RefundController struct {
	ServiceGateway services.ServiceGateway
}

func NewRefundController(
	sg services.ServiceGateway,
) *RefundController {
	return &RefundController{
		ServiceGateway: sg,
	}
}

// CreateRefund
// @Summary CreateRefund
// @Description CreateRefund for user to initiate refund process
// @Tags refunds
// @Accept json
// @Produce json
// @Param request body st.CreateRefundRequest true "Refund Request"
// @Success 200 {object} st.CreateRefundResponseList
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /refunds [post]
func (c *RefundController) CreateRefund(ctx *gin.Context) {
	var req *st.CreateRefundRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateRefund] Input:", req)
	res, err := c.ServiceGateway.RefundService.CreateRefund(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateRefund] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
