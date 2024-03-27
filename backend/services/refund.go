package services

import (
	"fmt"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type RefundService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IRefundService interface {
	CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponse, error)
	SendRefundEmail(req *st.SendRefundEmailRequest) (*st.SendRefundEmailResponse, error)
}

func NewRefundService(
	repoGateway repository.RepositoryGateway,
) IRefundService {
	return &RefundService{
		RepositoryGateway: repoGateway,
	}
}

func (s *RefundService) CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponse, error) {
	log.Println("[Service: CreateRefund]: Called")

	// TODO : Send clientSecret to frontend with correct amount

	resTransaction, err := s.RepositoryGateway.TransactionRepository.GetTransactionDataById(req.TransactionId)
	if err != nil {
		return nil, err
	}

	stripe := payment.NewStripeService()

	reqPayment := &st.GetPaymentIntentByIdRequest{
		PaymentIntentId: resTransaction.TransactionID,
	}

	respayment, err := stripe.GetPaymentIntent(reqPayment)
	if err != nil {
		return nil, err
	}

	refundRes, err := stripe.IssueRefund(resTransaction.TransactionID)
	if err != nil {
		return nil, err
	}

	refundModel := models.Refund{
		RefundId:      refundRes.ID,
		TransactionId: req.TransactionId,
		UserId:        resTransaction.UserID,
		RefundAmount:  float64(respayment.Amount),
		RefundReason:  req.RefundReason,
		RefundDate:    time.Now(),
	}

	createRes, err := s.RepositoryGateway.RefundRepository.CreateRefund(&refundModel)
	if err != nil {
		return nil, err
	}

	// Prepare and send the refund email
	emailReq := &st.SendRefundEmailRequest{
		RefundId: createRes.RefundId,
		// Add other necessary fields if needed for the email
	}
	_, emailErr := s.SendRefundEmail(emailReq)
	if emailErr != nil {
		log.Printf("[Service: CreateRefund] Error sending refund email: %v\n", emailErr)
		return nil, emailErr
	}

	resRefund := &st.CreateRefundResponse{
		RefundId: createRes.RefundId,
	}

	return resRefund, nil
}

func (s *RefundService) SendRefundEmail(req *st.SendRefundEmailRequest) (*st.SendRefundEmailResponse, error) {
	log.Println("[Service: SendRefundEmail]: Called")

	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil, err
	}

	sender := mail.NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)
	to := make([]string, 0)
	cc := make([]string, 0)
	bcc := make([]string, 0)
	attachFiles := make([]string, 0)

	refundModel, err := s.RepositoryGateway.RefundRepository.GetRefundById(req.RefundId)
	if err != nil {
		return nil, err
	}

	transactionModel, err := s.RepositoryGateway.TransactionRepository.GetTransactionDataById(refundModel.TransactionId)
	if err != nil {
		return nil, err
	}

	eventData, err := s.RepositoryGateway.EventRepository.GetEventDataById(transactionModel.EventID)
	if err != nil {
		return nil, err
	}

	isEnableNotification, userEmail, err := s.RepositoryGateway.UserRepository.IsEnableNotification(refundModel.UserId)
	if err != nil {
		return nil, err
	}

	if *isEnableNotification && userEmail != nil {
		to = append(to, *userEmail)
	} else {
		return nil, nil
	}

	formattedRefundDate := refundModel.RefundDate.Format("2006-01-02")

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
        <p>We regret to inform you that your transaction for the event <strong>%s</strong> has been refunded.</p>
        <p>Refund Details:</p>
        <p>- Transaction ID: %s</p>
        <p>- Refund ID: %s</p>
        <p>- Amount: %.2f THB</p>
        <p>- Refund Date: %s</p>
        <p>- Reason: %s</p>
        <p class="signature">Best regards,<br>Your Event Team</p>
    </body>
    </html>
    `, eventData.EventName, refundModel.TransactionId, refundModel.RefundId, refundModel.RefundAmount, formattedRefundDate, refundModel.RefundReason)

	if err = sender.SendEmail("Refund Issued", "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}

	res := fmt.Sprintf("Refund email sent successfully from %s to %s", cfg.Email.Address, to)
	return &st.SendRefundEmailResponse{
		SendStatus: res,
	}, nil
}
