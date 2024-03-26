package services

import (
	"fmt"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"

	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type TransactionService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type ITransactionService interface {
	CreateQRPromptPay(req *st.CreateQRPromptPayRequest) (*st.CreateQRPromptPayResponse, error)
	GetPaymentIntentById(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error)
	SendTransactionEmail(req *st.SendTransactionEmailRequest) (*st.SendTransactionEmailResponse, error)
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

	res, err := Stripe.CreatePromptPayPayment(int64(req.TransactionAmount), constant.THB)
	if err != nil {
		return nil, err
	}

	reqCreate := &st.CreateTransactionRequest{
		UserId:            req.UserId,
		EventId:           req.EventId,
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
	resPaymentData, err := Stripe.GetPaymentIntent(&st.GetPaymentIntentByIdRequest{
		PaymentIntentId: paymentId,
	})

	if err != nil {
		return nil, err
	}

	transModel, err := s.RepositoryGateway.TransactionRepository.GetTransactionDataByPaymentId(resPaymentData.PaymentIntentId)
	if err != nil {
		return nil, err
	}

	status := constant.PENDING
	if resPaymentData.Status == constant.PAYMENT_CANCELED {
		status = constant.CANCELLED
	} else if resPaymentData.Status == constant.PAYMENT_SUCCEEDED {
		status = constant.COMPLETED
	}

	reqUpdate := &st.UpdateTransactionRequest{
		TransactionId: transModel.TransactionID,
		Status:        status,
	}

	_, err = s.RepositoryGateway.TransactionRepository.UpdateTransaction(reqUpdate)
	if err != nil {
		return nil, err
	}

	return resPaymentData, nil
}

// SendTransactionEmail implements ITransactionService.
func (s *TransactionService) SendTransactionEmail(req *st.SendTransactionEmailRequest) (*st.SendTransactionEmailResponse, error) {
	log.Println("[Service: SendTransactionEmail]: Called")
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}
	log.Println("Config path from Gmail:", cfg)

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	status, userEmail, err := s.RepositoryGateway.UserRepository.IsEnableNotification(req.UserID)
	if err != nil || status == nil {
		return nil, err
	}
	isEnableNotification := *status
	email := ""
	if userEmail != nil {
		email = *userEmail
	}

	if isEnableNotification && email != "" {
		to = append(to, email)
	} else {
		return nil, fmt.Errorf("user has disabled notifications or email is not available")
	}

	// Parse the transaction date
	transactionDate, err := time.Parse("2006/01/02", req.TransactionDate)
	if err != nil {
		return nil, fmt.Errorf("error parsing transaction date: %v", err)
	}

	// Format the transaction date
	formattedDate := transactionDate.Format("2006-01-02")

	contentHTML := fmt.Sprintf(`
	<html>
	<head>
		<style>
			body {
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				margin: 40px auto;
				max-width: 600px;
				color: #333333;
			}
			h3 {
				font-size: 24px;
				margin-bottom: 20px;
				color: #333333;
			}
			p {
				margin-bottom: 20px;
				color: #666666;
			}
			.signature {
				margin-top: 20px;
				font-style: italic;
			}
		</style>
	</head>
	<body>
		<h3>Dear Customer,</h3>
		<p>We are pleased to inform you that your transaction has been successfully processed.</p>
		<p>Transaction Details:</p>
		<p>- Transaction ID: %s</p>
		<p>- Event ID: %s</p>
		<p>- Amount: %.2f THB</p>
		<p>- Transaction Date: %s</p>
		<p class="signature">Best regards,<br>Mai-Roi-Ra team</p>
	</body>
	</html>
	`, req.TransactionID, req.EventID, req.Amount, formattedDate)

	if err = sender.SendEmail("Transaction Successful", "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}

	res := fmt.Sprintf("Transaction email sent successfully from %s to %s", cfg.Email.Address, to)
	return &st.SendTransactionEmailResponse{
		SendStatus: res,
	}, nil
}
