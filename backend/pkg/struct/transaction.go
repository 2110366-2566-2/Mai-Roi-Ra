package structure

type CreatePaymentRequest struct {
	UserId            string  `json:"user_id" binding:"required"`
	EventId           string  `json:"event_id" binding:"required"`
	TransactionAmount float64 `json:"transaction_amount" binding:"required"`
	PaymentType       int     `json:"payment_type" binding:"required"`
}

type CreatePaymentResponse struct {
	EventId             string            `json:"event_id"`
	PaymentIntentId     string            `json:"payment_intent_id"`
	PaymentClientSecret string            `json:"payment_client_secret"`
	PaymentMethodType   string            `json:"payment_method_type"`
	TransactionAmount   float64           `json:"transaction_amount"`
	Status              string            `json:"status"`
	MetaData            map[string]string `json:"meta_data"`
}

type CreateTransactionRequest struct {
	UserId            string  `json:"user_id" binding:"required"`
	EventId           string  `json:"event_id" binding:"required"`
	TransactionAmount float64 `json:"transaction_amount" binding:"required"`
	Status            string  `json:"status" binding:"required"`
}

type UpdateTransactionRequest struct {
	TransactionId string `json:"transaction_id" binding:"required"`
	Status        string `json:"status" binding:"required"`
}

type SendTransactionEmailRequest struct {
	UserID          string  `json:"user_id"`
	TransactionID   string  `json:"transaction_id"`
	EventID         string  `json:"event_id"`
	Amount          float64 `json:"amount"`
	TransactionDate string  `json:"transaction_date"`
}

type TransferToOrganizerRequest struct {
	OrganizerId string `json:"organizer_id" binding:"required"` // This is the system user ID of the organizer
	EventID     string `json:"event_id" binding:"required"`
}

type CreateOrganizerTransferRecordRequest struct {
	PaymentIntentId string `json:"payment_intent_id" binding:"required"`
	UserId          string `json:"user_id" binding:"required"`
	EventId         string `json:"event_id" binding:"required"`
	Amount          int64  `json:"amount" binding:"required"`
	Status          string `json:"status" binding:"required"`
}

type IsPaidRequest struct {
	OrganizerId string `json:"organizer_id" binding:"required"`
	EventId     string `json:"event_id" binding:"required"`
}

type IsPaidResponse struct {
	IsPaid bool `json:"is_paid" binding:"required"`
}
