package services

import (
	"log"
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

	restransaction , err := s.RepositoryGateway.TransactionRepository.GetTransactionDataById(req.TransactionId)
	if err != nil {
		return nil, err
	}

	stripe := payment.NewStripeService()

	_, err = stripe.IssueRefund(restransaction.PaymentIntentID)
	if err != nil {
		return nil, err
	}

	reqrefund := &st.CreateRefundRequest{
		UserId:            restransaction.UserID,
		TransactionId:     restransaction.TransactionID,
		RefundAmount:      restransaction.TransactionAmount,
		RefundReason:      req.RefundReason,
	}

	createres, err := s.RepositoryGateway.RefundRepository.CreateRefund(reqrefund)
	if err != nil {
		return nil, err
	}

	resrefund := &st.CreateRefundResponse{
		RefundId: createres.RefundId,
	}

	return resrefund, nil
}




