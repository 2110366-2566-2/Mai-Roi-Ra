package services

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
)

type RefundService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IRefundService interface {
	CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponseList, error)
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
