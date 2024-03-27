package structure

type GetPaymentIntentByIdRequest struct {
	PaymentIntentId string
}

type GetPaymentIntentByIdResponse struct {
	EventId             string
	UserId              string
	NumParticipants     int
	PaymentIntentId     string
	PaymentClientSecret string
	TransactionAmount   float64
	Currency            string
	Status              string
}
