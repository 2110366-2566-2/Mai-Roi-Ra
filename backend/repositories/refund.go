package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"gorm.io/gorm"
)

type RefundRepository struct {
	db *gorm.DB
}

type IRefundRepository interface {
	CreateRefund(req *models.Refund) (*st.CreateRefundResponse, error)
}

func NewRefundRepository(
	db *gorm.DB,
) IRefundRepository {
	return &RefundRepository{
		db: db,
	}
}

func (r *RefundRepository) CreateRefund(req *models.Refund) (*st.CreateRefundResponse, error) {
	log.Println("[Repo: CreateRefund]: Called")
	trans := r.db.Begin().Debug()
	if err := trans.Create(&req).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateRefund]: Insert data in Refunds table error:", err)
		return nil, err
	}
	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateRefund]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &st.CreateRefundResponse{
		RefundId: req.RefundId,
	}, nil
}
