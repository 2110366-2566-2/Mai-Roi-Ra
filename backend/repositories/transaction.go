package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type TransactionRepository struct {
	db *gorm.DB
}

type ITransactionRepository interface {
	GetTransactionDataById(transactionId string) (*models.Transaction, error)
	CreateTransaction(req *st.CreateTransactionRequest, paymentIntentId string) (*st.CreateTransactionResponse, error)
	UpdateTransaction(req *st.UpdateTransactionRequest) (*st.TransactionResponse, error)
}

func NewTransactionRepository(
	db *gorm.DB,
) ITransactionRepository {
	return &TransactionRepository{
		db: db,
	}
}

func (r *TransactionRepository) GetTransactionDataById(transactionId string) (*models.Transaction, error) {
	log.Println("[Repo: GetTransactionDataById]: Called")
	var transaction models.Transaction
	if err := r.db.Where(`transaction_id=?`, transactionId).Find(&transaction).Error; err != nil {
		log.Println("[Repo: GetTransactionDataById]: cannot find transaction_id:", err)
		return nil, err
	}
	return &transaction, nil
}

func (r *TransactionRepository) CreateTransaction(req *st.CreateTransactionRequest, paymentIntentId string) (*st.CreateTransactionResponse, error) {
	log.Println("[Repo: CreateTransaction]: Called")
	transactionModel := models.Transaction{
		TransactionID:     utils.GenerateUUID(),
		UserID:            req.UserId,
		PaymentIntentID:   paymentIntentId,
		TransactionAmount: req.TransactionAmount,
		TransactionDate:   time.Now(),
		Status:            req.Status,
	}

	trans := r.db.Begin().Debug()
	if err := trans.Create(&transactionModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateTransaction]: Insert data in transactions table error:", err)
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateTransaction]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &st.CreateTransactionResponse{
		TransactionId: transactionModel.TransactionID,
	}, nil
}

func (r *TransactionRepository) UpdateTransaction(req *st.UpdateTransactionRequest) (*st.TransactionResponse, error) {
	log.Println("[Repo: UpdateTransaction] Called")

	var transaction models.Transaction
	if err := r.db.Where(`transaction_id=?`).Find(&transaction).Error; err != nil {
		log.Print("[Repo: UpdateTransaction] transaction_id not found")
		return nil, err
	}

	// Change status
	if req.Status != "" {
		transaction.Status = req.Status
	}

	// Save the updated version
	if err := r.db.Save(&transaction).Error; err != nil {
		log.Println("[Repo: UpdateTransaction] Error updating in the database:", err)
		return nil, err
	}
	return &st.TransactionResponse{
		Response: "Update Transaction Successful",
	}, nil
}
