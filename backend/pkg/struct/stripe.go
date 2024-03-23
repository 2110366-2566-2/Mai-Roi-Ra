package structure

type GetPaymentIntentByIdRequest struct {
	PaymentIntentId string
}

type GetPaymentIntentByIdResponse struct {
	PaymentIntentId     string
	PaymentClientSecret string
	TransactionAmount   float64
	Currency            string
	Status              string
}
