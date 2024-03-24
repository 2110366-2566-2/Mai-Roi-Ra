package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type RefundRepository struct {
	db *gorm.DB
}

type IRefundRepository interface {
	CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponse, error)
}

func NewRefundRepository(
	db *gorm.DB,
) IRefundRepository {
	return &RefundRepository{
		db: db,
	}
}

func (r *RefundRepository) CreateRefund(req *st.CreateRefundRequest) (*st.CreateRefundResponse, error) {
	log.Println("[Repo: CreateRefund]: Called")
	refundModel := models.Refund{
		RefundId:     	utils.GenerateUUID(),
		TransactionId: 	req.TransactionId,
		UserId: 	  	req.UserId,
		RefundAmount: 	req.RefundAmount,
		RefundReason: 	req.RefundReason,
		RefundDate:   	time.Now(),
	}

	trans := r.db.Begin().Debug()
	if err := trans.Create(&refundModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateRefund]: Insert data in refunds table error:", err)
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateRefund]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &st.CreateRefundResponse{
		RefundId: refundModel.RefundId,
	}, nil
}