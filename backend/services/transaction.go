package services

import (
	"fmt"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"

	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type TransactionService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type ITransactionService interface {
	CreatePayment(req *st.CreatePaymentRequest) (*st.CreatePaymentResponse, error)
	GetPaymentIntentById(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error)
	SendTransactionEmail(req *st.SendTransactionEmailRequest) (*st.SendTransactionEmailResponse, error)
	TransferToOrganizer(req *st.TransferToOrganizerRequest) (*models.Transaction, error)
	ConfirmPaymentIntent(req string) error
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

func (s *TransactionService) CreatePayment(req *st.CreatePaymentRequest) (*st.CreatePaymentResponse, error) {
	log.Println("[Service: CreatePayment]: Called")

	// TODO : Send clientSecret to frontend with correct amount

	res, err := Stripe.CreatePaymentIntent(int64(req.TransactionAmount), constant.THB, req.EventId, req.UserId, req.PaymentType)
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
	paymentId := ""
	if req != nil {
		paymentId = req.PaymentIntentId
	}
	resPaymentIntent, err := Stripe.GetPaymentIntent(&st.GetPaymentIntentByIdRequest{
		PaymentIntentId: paymentId,
	})

	if err != nil {
		return nil, err
	}

	transModel, err := s.RepositoryGateway.TransactionRepository.GetTransactionDataById(resPaymentIntent.ID)
	if err != nil {
		return nil, err
	}

	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(transModel.EventID)
	if err != nil {
		return nil, err
	}

	paymentAmount := float64(resPaymentIntent.Amount) / 100
	numParticipants := int(paymentAmount / resEvent.ParticipantFee)

	status := constant.PENDING
	if resPaymentIntent.Status == constant.PAYMENT_CANCELED {
		status = constant.CANCELLED
	} else if resPaymentIntent.Status == constant.PAYMENT_SUCCEEDED {
		status = constant.COMPLETED
	}

	reqUpdate := &st.UpdateTransactionRequest{
		TransactionId: transModel.TransactionID,
		Status:        status,
	}

	if transModel.Status == constant.PENDING {
		_, err = s.RepositoryGateway.TransactionRepository.UpdateTransaction(reqUpdate)
		if err != nil {
			return nil, err
		}
	}

	res := &st.GetPaymentIntentByIdResponse{
		EventId:             transModel.EventID,
		UserId:              transModel.UserID,
		NumParticipants:     numParticipants,
		PaymentIntentId:     resPaymentIntent.ID,
		PaymentClientSecret: resPaymentIntent.ClientSecret,
		TransactionAmount:   paymentAmount,
		Currency:            string(resPaymentIntent.Currency),
		Status:              status,
	}

	if resPaymentIntent.Status == constant.PAYMENT_SUCCEEDED {
		status = constant.COMPLETED

		// Send the transaction success email
		emailReq := &st.SendTransactionEmailRequest{
			UserID:          transModel.UserID,
			TransactionID:   transModel.TransactionID,
			Amount:          paymentAmount,
			TransactionDate: utils.ToDateString(time.Now()), 
			EventID:         transModel.EventID,
		}
		_, emailErr := s.SendTransactionEmail(emailReq)
		if emailErr != nil {
			log.Printf("[Service: GetPaymentIntentById] Error sending transaction success email: %v\n", emailErr)
			return nil, fmt.Errorf("[Service: GetPaymentIntentById] Error sending transaction success email: %w", emailErr)
		}
	}

	return res, nil
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

	// Fetch event data
	eventData, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventID)
	if err != nil {
		return nil, err
	}

	// Format dates
	formattedStartDate := utils.ToDateString(eventData.StartDate)
	formattedEndDate := utils.ToDateString(eventData.EndDate)

	// Update email content to include event details
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
        <p>We are pleased to inform you that your transaction for the event <strong>%s</strong> has been successfully processed.</p>
        <p>Transaction Details:</p>
        <p>- Transaction ID: %s</p>
        <p>- Amount: %.2f THB</p>
        <p>- Transaction Date: %s</p>
        <p>Event Details:</p>
        <p>- Event Name: %s</p>
        <p>- Description: %s</p>
        <p>- Activity: %s</p>
        <p>- Start Date: %s</p>
        <p>- End Date: %s</p>
        <img src="%s" alt="Event Image" style="width:200px;height:auto;">
        <p class="signature">Best regards,<br>Mai-Roi-Ra team</p>
    </body>
    </html>
    `, eventData.EventName, req.TransactionID, req.Amount, utils.ToDateString(time.Now()), eventData.EventName, eventData.Description, eventData.Activities, formattedStartDate, formattedEndDate, utils.GetString(eventData.EventImage))

	if err = sender.SendEmail("Transaction Successful", "", contentHTML, to, cc, bcc, attachFiles); err != nil {
		return nil, err
	}

	res := fmt.Sprintf("Transaction email sent successfully from %s to %s", cfg.Email.Address, to)
	return &st.SendTransactionEmailResponse{
		SendStatus: res,
	}, nil
}

func (s *TransactionService) TransferToOrganizer(req *st.TransferToOrganizerRequest) (*models.Transaction, error) {
	log.Println("[Service: TransferToOrganizer] Called")

	event, err := s.RepositoryGateway.EventRepository.GetEventDataById(req.EventID)
	if err != nil {
		log.Println("[Service: TransferToOrganizer] Called Events Repo and error: ", err)
		return nil, err
	}

	// initialize param
	amount := int(event.ParticipantFee) * event.ParticipantCount
	currency := constant.THB

	userId, _ := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(req.OrganizerId)

	// create paymentIntent
	paymentIntent, intentErr := Stripe.CreatePaymentIntent(int64(amount), currency, event.EventId, userId, 1)

	// paymentIntent, intentErr := Stripe.CreateTransferPaymentIntent(int64(amount), currency, "acct_1OycjtLp3rKqqCov", userId, event.EventId)
	if intentErr != nil {
		log.Println("[Service: TransferToOrganizer] Called Stripe.CreatePaymentId error: ", err)
		return nil, err
	}

	transferReq := &st.CreateOrganizerTransferRecordRequest{
		PaymentIntentId: paymentIntent.PaymentIntentId,
		UserId:          userId,
		EventId:         event.EventId,
		Amount:          int64(paymentIntent.TransactionAmount),
		Status:          paymentIntent.Status,
	}

	// transferReq := &st.CreateOrganizerTransferRecordRequest{
	// 	PaymentIntentId: paymentIntent.ID,
	// 	UserId:          userId,
	// 	EventId:         event.EventId,
	// 	Amount:          int64(paymentIntent.Amount),
	// 	Status:          string(paymentIntent.Status),
	// }

	res, repoErr := s.RepositoryGateway.TransactionRepository.CreateOrganizerTransferRecord(transferReq)
	if repoErr != nil {
		log.Println("[Service: TransferToOrganizer] Called repo err: ", err)
		return nil, err
	}

	// Send email notification to the organizer
	organizer, _ := s.RepositoryGateway.UserRepository.GetUserByID(&st.GetUserByUserIdRequest{UserId: userId})
	if organizer != nil && organizer.IsEnableNotification {
		emailRequest := &st.SendTransactionEmailRequest{
			UserID:          userId,
			TransactionID:   paymentIntent.PaymentIntentId,
			Amount:          float64(paymentIntent.TransactionAmount),
			TransactionDate: utils.ToDateString(time.Now()),
			EventID:         event.EventId,
		}
		_, emailErr := s.SendTransactionEmail(emailRequest)
		if emailErr != nil {
			log.Println("[Service: TransferToOrganizer] Email sending error: ", emailErr)
			// Not returning the error here to ensure the transfer process is not affected
		}
	}
	return res, nil

}

func (s *TransactionService) ConfirmPaymentIntent(req string) error {
	log.Println("[Service: ConfirmPaymentIntent] Called")
	if err := Stripe.ConfirmPaymentIntent(req); err != nil {
		log.Println("[Service: ConfirmPaymentIntent] Error:", err)
		return err
	}
	return nil
}
