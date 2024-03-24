package structure

type CreateRefundRequest struct {
	UserId        string    `json:"user_id"`
	TransactionId string    `json:"transaction_id" binding:"required"`
	RefundAmount  float64   `json:"refund_amount"`
	RefundReason  string    `json:"refund_reason" binding:"required"`
}

type CreateRefundResponse struct {
	RefundId string `json:"refund_id"`
}