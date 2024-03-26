package structure

type CreateQRPromptPayRequest struct {
	UserId            string  `json:"user_id" binding:"required"`
	EventId           string  `json:"event_id" binding:"required"`
	TransactionAmount float64 `json:"transaction_amount" binding:"required"`
}

type CreateQRPromptPayResponse struct {
	EventId             string  `json:"event_id"`
	PaymentIntentId     string  `json:"payment_intent_id"`
	PaymentClientSecret string  `json:"payment_client_secret"`
	PaymentMethodType   string  `json:"payment_method_type"`
	TransactionAmount   float64 `json:"transaction_amount"`
}

type CreateTransactionRequest struct {
	UserId            string  `json:"user_id" binding:"required"`
	EventId           string  `json:"event_id" binding:"required"`
	TransactionAmount float64 `json:"transaction_amount" binding:"required"`
	Status            string  `json:"status" binding:"required"`
}

type CreateTransactionResponse struct {
	TransactionId string `json:"transaction_id"`
}

type UpdateTransactionRequest struct {
	TransactionId string `json:"transaction_id" binding:"required"`
	Status        string `json:"status" binding:"required"`
}

type GetTransactionByPaymentIdRequest struct {
	PaymentIntentId string `json:"payment_intent_id" binding:"required"`
}

type GetTransactionByPaymentIdResponse struct {
	TransactionId     string  `json:"transaction_id"`
	UserId            string  `json:"user_id"`
	PaymentIntentId   string  `json:"payment_intent_id"`
	Status            string  `json:"status"`
	TransactionAmount float64 `json:"transaction_amount"`
}

type SendTransactionEmailRequest struct {
	UserID          string  `json:"user_id"`
	TransactionID   string  `json:"transaction_id"`
	EventID         string  `json:"event_id"`
	Amount          float64 `json:"amount"`
	TransactionDate string  `json:"transaction_date"`
}

type SendTransactionEmailResponse struct {
	SendStatus string `json:"send_status"`
}

// ? Use for ...
/*
	UpdateTransactionResponse, CreateQRPromptPayResponse
*/
type TransactionResponse struct {
	Response string
}
