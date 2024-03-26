package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type TransactionController struct {
	ServiceGateway services.ServiceGateway
}

func NewTransactionController(
	sg services.ServiceGateway,
) *TransactionController {
	return &TransactionController{
		ServiceGateway: sg,
	}
}

// GetPaymentIntentById
// @Summary Retrieve Payment Intent by ID
// @Description Retrieve details of a payment intent by its ID
// @Tags transactions
// @Accept json
// @Produce json
// @Param id path string true "Payment Intent ID"
// @Success 200 {object} st.GetPaymentIntentByIdResponse "success"
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /transactions/payment-intent/{id} [get]
func (c *TransactionController) GetPaymentIntentById(ctx *gin.Context) {
	paymentIntentId := ctx.Param("id")
	req := &st.GetPaymentIntentByIdRequest{
		PaymentIntentId: paymentIntentId,
	}
	log.Println("[CTRL: GetPaymentIntentById] Input:", req)
	res, err := c.ServiceGateway.TransactionService.GetPaymentIntentById(req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to retrieve payment intent", "error": err})
		return
	}

	log.Println("[CTRL: GetPaymentIntentById] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// CreateQRPromptPay Get QR
// @Summary CreateQRPromptPay
// @Description CreateQRPromptPay for user to pay
// @Tags transactions
// @Accept json
// @Produce json
// @Param request body st.CreateQRPromptPayRequest true "Get PromptPay"
// @Success 200 {object} st.TransactionResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /transactions/qr [post]
func (c *TransactionController) CreateQRPromptPay(ctx *gin.Context) {
	var req *st.CreateQRPromptPayRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateQRPromptPay] Input:", req)
	res, err := c.ServiceGateway.TransactionService.CreateQRPromptPay(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateQRPromptPay] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// TransferToOrganizer
// @Summary Transfer money to organizer
// @Description Transfer the specified amount of money to the organizer's account
// @Tags transactions
// @Accept json
// @Produce json
// @Param request body st.TransferToOrganizerRequest true "Transfer to Organizer"
// @Success 200 {object} models.Transaction "success"
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /transactions/transfer [post]
func (c *TransactionController) TransferToOrganizer(ctx *gin.Context) {
	var req *st.TransferToOrganizerRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: TransferToOrganizer] Input:", req)
	res, err := c.ServiceGateway.TransactionService.TransferToOrganizer(req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to transfer money to organizer", "error": err})
		return
	}
	log.Println("[CTRL: TransferToOrganizer] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
