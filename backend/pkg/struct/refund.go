package structure

type CreateRefundRequest struct {
	TransactionId string    `json:"transaction_id" binding:"required"`
	RefundReason  string    `json:"refund_reason" binding:"required"`
}

type CreateRefundResponse struct {
	RefundId string `json:"refund_id"`
}