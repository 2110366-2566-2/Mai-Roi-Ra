package services

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
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

	restransaction , err := s.RepositoryGateway.TransactionRepository.GetTransactionDataById(req.TransactionId)
	if err != nil {
		return nil, err
	}

	stripe := payment.NewStripeService()

	reqpayment := &st.GetPaymentIntentByIdRequest{
		PaymentIntentId: restransaction.PaymentIntentID,
	}
	respayment , err := stripe.GetPaymentIntent(reqpayment)
	if err != nil {
		return nil, err
	}

	_, err = stripe.IssueRefund(restransaction.PaymentIntentID)
	if err != nil {
		return nil, err
	}

	refundModel := models.Refund{
		RefundId: utils.GenerateUUID(),
		TransactionId: req.TransactionId,
		UserId: restransaction.UserID,
		RefundAmount: respayment.TransactionAmount,
		RefundReason: req.RefundReason,
		RefundDate: time.Now(),
	}

	createres, err := s.RepositoryGateway.RefundRepository.CreateRefund(&refundModel)
	if err != nil {
		return nil, err
	}

	resrefund := &st.CreateRefundResponse{
		RefundId: createres.RefundId,
	}

	return resrefund, nil
}




