package payment

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/client"
)

type StripeService struct {
	Client *client.API
}

type IStripeService interface {
	GetPaymentIntent(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error)
	CreatePromptPayPayment(amount int64, currency string) (*stripe.PaymentIntent, error)
	IssueRefund(paymentIntentID string) (*stripe.Refund, error)
	TransferToOrganizer(amount int64, currency, destinationAccountID string) (*stripe.Transfer, error)
}

func NewStripeService() *StripeService {
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Pkg]: Error initializing .env")
		return nil
	}
	log.Println("Config path from Stripe:", cfg)

	publicKey, secretKey := cfg.Stripe.PublicKey, cfg.Stripe.SecretKey
	if publicKey == "" || secretKey == "" {
		log.Println("[Pkg: NewStripeService] Please specify public and secret key in your .env")
		return nil
	}

	stripe.Key = cfg.Stripe.SecretKey
	sc := &client.API{}
	sc.Init(stripe.Key, nil)
	return &StripeService{
		Client: sc,
	}
}

func (s *StripeService) GetPaymentIntent(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error) {
	log.Println("[Pkg: GetPaymentIntent] Called")
	pi, err := s.Client.PaymentIntents.Get(req.PaymentIntentId, nil)
	if err != nil {
		log.Println("[Pkg: GetPaymentIntent]: Error fetching payment intent:", err)
		return nil, err
	}

	transactionAmount := float64(pi.Amount / 100)

	response := &st.GetPaymentIntentByIdResponse{
		PaymentIntentId:     pi.ID,
		PaymentClientSecret: pi.ClientSecret,
		TransactionAmount:   transactionAmount,
		Currency:            string(pi.Currency), // thb
		Status:              string(pi.Status),
	}

	return response, nil
}

func (s *StripeService) CreatePromptPayPayment(amount int64, currency string) (*st.CreateQRPromptPayResponse, error) {
	log.Println("[Pkg: CreatePromptPayPayment] Called")
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(amount * 100),
		Currency: stripe.String(currency),
		PaymentMethodTypes: stripe.StringSlice([]string{
			"promptpay",
		}),
	}
	pi, err := s.Client.PaymentIntents.New(params)
	if err != nil {
		log.Println("[Pkg: CreatePromptPayPayment]: Init PromptPay param error:", err)
		return nil, err
	}
	log.Println("Stripe PI (PromptPay):", pi)

	// add more fields when require more
	responseData := &st.CreateQRPromptPayResponse{
		PaymentIntentId:     pi.ID,
		PaymentClientSecret: pi.ClientSecret,
		PaymentMethodType:   pi.PaymentMethodTypes[0], // PromptPay
		TransactionAmount:   float64(int(pi.Amount) / 100),
	}
	return responseData, nil
}

func (s *StripeService) IssueRefund(paymentIntentID string) (*stripe.Refund, error) {
	log.Println("[Pkg: IssueRefund] Called")
	refundParams := &stripe.RefundParams{
		PaymentIntent: stripe.String(paymentIntentID),
	}
	return s.Client.Refunds.New(refundParams)
}

func (s *StripeService) TransferToOrganizer(amount int64, currency, destinationAccountID string) (*stripe.Transfer, error) {
	log.Println("[Pkg: TransferToOrganizer] Called")
	transferParams := &stripe.TransferParams{
		Amount:      stripe.Int64(amount),
		Currency:    stripe.String(currency),
		Destination: stripe.String(destinationAccountID),
	}
	return s.Client.Transfers.New(transferParams)
}
