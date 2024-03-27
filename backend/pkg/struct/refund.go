package structure

type CreateRefundRequest struct {
	EventId      string `json:"event_id" binding:"required"`
	RefundReason string `json:"refund_reason" binding:"required"`
}

type CreateRefundResponse struct {
	RefundId string `json:"refund_id"`
}

type CreateRefundResponseList struct {
	RefundIdList []string `json:"refund_id_list"`
}
type SendRefundEmailRequest struct {
	RefundId string `json:"refund_id"`
}

type SendRefundEmailResponse struct {
	SendStatus string `json:"send_status"`
}
