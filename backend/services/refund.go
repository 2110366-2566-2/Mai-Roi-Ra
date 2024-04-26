package services

import (
	"fmt"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	mail "github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils/mail"
)

type RefundService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IRefundService interface {
	CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponseList, error)
	SendRefundEmail(req *st.SendRefundEmailRequest) (*st.SendRefundEmailResponse, error)
}

func NewRefundService(
	repoGateway repository.RepositoryGateway,
) IRefundService {
	return &RefundService{
		RepositoryGateway: repoGateway,
	}
}

func (s *RefundService) CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponseList, error) {
	log.Println("[Service: CreateRefund]: Called")

	var response []string

	res, err := s.RepositoryGateway.TransactionRepository.GetTransactionListByEventId(req.EventId)
	if err != nil {
		return nil, err
	}
	for _, v := range res {
		reqrefund := &models.Refund{
			RefundId:      utils.GenerateUUID(),
			UserId:        v.UserID,
			RefundAmount:  v.TransactionAmount,
			TransactionId: v.TransactionID,
			RefundReason:  "Event Cancelled",
			RefundDate:    time.Time{},
		}
		refundId, err := s.RepositoryGateway.RefundRepository.CreateRefund(reqrefund)
		if err != nil {
			return nil, err
		}
		response = append(response, refundId.RefundId)
	}

	return &st.CreateRefundResponseList{
		RefundIdList: response,
	}, nil
}

func (s *RefundService) SendRefundEmail(req *st.SendRefundEmailRequest) (*st.SendRefundEmailResponse, error) {
	log.Println("[Service: SendRefundEmail]: Called")

	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		// return nil, err
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

	formattedRefundDate := utils.TimeToString(refundModel.RefundDate)

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
