package services

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type RefundService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IRefundService interface {
	CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponse, error)
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

	resRefund := &st.CreateRefundResponse{
		RefundId: createRes.RefundId,
	}

	return resRefund, nil
}
