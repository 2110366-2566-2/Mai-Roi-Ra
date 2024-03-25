package services

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/stripe/stripe-go/v72"
	"github.com/stripe/stripe-go/v72/transfer"

	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type TransactionService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type ITransactionService interface {
	CreateQRPromptPay(req *st.CreateQRPromptPayRequest) (*st.CreateQRPromptPayResponse, error)
	GetPaymentIntentById(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error)
	TransferToOrganizer(req *st.TransferToOrganizerRequest) (*st.TransferToOrganizerResponse, error)
}

func NewTransactionService(
	repoGateway repository.RepositoryGateway,
) ITransactionService {
	return &TransactionService{
		RepositoryGateway: repoGateway,
	}
}

var (
	Stripe = payment.NewStripeService()
)

func (s *TransactionService) CreateQRPromptPay(req *st.CreateQRPromptPayRequest) (*st.CreateQRPromptPayResponse, error) {
	log.Println("[Service: CreateQRPromptPay]: Called")

	// TODO : Send clientSecret to frontend with correct amount

	res, err := Stripe.CreatePromptPayPayment(int64(req.TransactionAmount), "thb")
	if err != nil {
		return nil, err
	}

	reqCreate := &st.CreateTransactionRequest{
		UserId:            req.UserId,
		TransactionAmount: req.TransactionAmount,
		Status:            constant.PENDING,
	}

	_, err = s.RepositoryGateway.TransactionRepository.CreateTransaction(reqCreate, res.PaymentIntentId)
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (s *TransactionService) GetPaymentIntentById(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error) {
	log.Println("[Service: GetPaymentIntentById]: Called")

	// TODO : Check whether the transaction is done

	paymentId := ""
	if req != nil {
		paymentId = req.PaymentIntentId
	}

	res, err := Stripe.GetPaymentIntent(&st.GetPaymentIntentByIdRequest{
		PaymentIntentId: paymentId,
	})

	if err != nil {
		return nil, err
	}
	return res, nil
}

func (s *TransactionService) TransferToOrganizer(req *st.TransferToOrganizerRequest) (*st.TransferToOrganizerResponse, error) {
	log.Println("[Service: TransferToOrganizer] Called")

	// Load the configuration to get the Stripe secret key
	cfg, err := config.NewConfig(".env")
	if err != nil {
		log.Println("[Service: TransferToOrganizer] Error loading config:", err)
		return nil, err
	}

	// Set the Stripe secret key
	stripe.Key = cfg.Stripe.SecretKey
	
	// Retrieve the organizer's user record to get the Stripe account ID
	getUserReq := &st.GetUserByUserIdRequest{
		UserId: req.OrganizerId,
	}
	organizer, err := s.RepositoryGateway.UserRepository.GetUserByID(getUserReq)
	if err != nil {
		log.Println("[Service: TransferToOrganizer] Organizer not found:", err)
		return nil, err
	}

	// // Retrieve the organizer's user record to get the Stripe account ID
	// organizer, err := s.RepositoryGateway.UserRepository.GetUserByID(req.OrganizerId)
	// if err != nil {
	// 	log.Println("[Service: TransferToOrganizer] Organizer not found:", err)
	// 	return nil, err
	// }

	// Convert the amount to cents (or the smallest currency unit) and create a transfer
	params := &stripe.TransferParams{
		Amount:      stripe.Int64(int64(req.TransactionAmount * 100)),  // Assuming the amount is in baht
		Currency:    stripe.String(string("thb")),                      // Set currency to Thai Baht
		Destination: stripe.String(organizer.PaymentGatewayCustomerID), // Use the Stripe account ID from the organizer's user record
	}

	// Create the transfer with Stripe
	t, err := transfer.New(params)
	if err != nil {
		log.Println("[Service: TransferToOrganizer] Error creating transfer:", err)
		return nil, err
	}

	// Create a transaction record in your database using your method
	transactionId, err := s.RepositoryGateway.TransactionRepository.CreateOrganizerTransferRecord(req.OrganizerId, t.ID, req.TransactionAmount)
	if err != nil {
		log.Println("[Service: TransferToOrganizer] Error saving transaction to database:", err)
		return nil, err
	}

	return &st.TransferToOrganizerResponse{
		TransactionId: transactionId,
		Status:        "Completed", // Set the status based on the transfer result
	}, nil
}
