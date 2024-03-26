package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"gorm.io/gorm"
)

type TransactionRepository struct {
	db *gorm.DB
}

type ITransactionRepository interface {
	GetTransactionDataById(transactionId string) (*models.Transaction, error)
	GetTransactionListByEventId(eventId string) ([]*models.Transaction, error)
	CreateTransaction(req *st.CreateTransactionRequest, paymentIntentId string) (*st.CreateTransactionResponse, error)
	UpdateTransaction(req *st.UpdateTransactionRequest) (*st.TransactionResponse, error)
	// GetTransactionDataByPaymentId(paymentIntentId string) (*models.Transaction, error)
	CreateOrganizerTransferRecord(req *st.CreateOrganizerTransferRecordRequest) (*models.Transaction, error)
}

func NewTransactionRepository(
	db *gorm.DB,
) ITransactionRepository {
	return &TransactionRepository{
		db: db,
	}
}

var (
	Stripe = payment.NewStripeService()
)

func (r *TransactionRepository) GetTransactionDataById(transactionId string) (*models.Transaction, error) {
	log.Println("[Repo: GetTransactionDataById]: Called")
	var transaction models.Transaction
	if err := r.db.Where(`transaction_id=?`, transactionId).Find(&transaction).Error; err != nil {
		log.Println("[Repo: GetTransactionDataById]: cannot find transaction_id:", err)
		return nil, err
	}
	return &transaction, nil
}

func (r *TransactionRepository) GetTransactionListByEventId(eventId string) ([]*models.Transaction, error) {
	log.Println("[Repo: GetTransactionListByEventId] Called")

	var transactionLists []*models.Transaction

	// Find events where start_date is equal to the input startDate
	if err := r.db.Where("event_id = ? AND status = ?", eventId, constant.COMPLETED).Find(&transactionLists).Error; err != nil {
		log.Println("[Repo: GetTransactionListByEventId] Error querying the transactions:", err)
		return nil, err
	}
	return transactionLists, nil
}

func (r *TransactionRepository) CreateTransaction(req *st.CreateTransactionRequest, paymentIntentId string) (*st.CreateTransactionResponse, error) {
	log.Println("[Repo: CreateTransaction]: Called")
	transactionModel := models.Transaction{
		TransactionID:     paymentIntentId,
		UserID:            req.UserId,
		EventID:           req.EventId,
		TransactionAmount: req.TransactionAmount,
		TransactionDate:   time.Now(),
		Status:            req.Status,
		TransactionWay:    constant.PAYMENT_RECEIVED,
		CreatedAt:         time.Now(),
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
	if err := r.db.Where(`transaction_id=?`, req.TransactionId).Find(&transaction).Error; err != nil {
		log.Print("[Repo: UpdateTransaction] transaction_id not found")
		return nil, err
	}

	// Change status
	if req.Status != "" {
		transaction.Status = req.Status
	}

	transaction.UpdatedAt = time.Now()

	transaction.TransactionWay = constant.PAYMENT_RECEIVED // will change later

	// Save the updated version
	if err := r.db.Save(&transaction).Error; err != nil {
		log.Println("[Repo: UpdateTransaction] Error updating in the database:", err)
		return nil, err
	}
	return &st.TransactionResponse{
		Response: "Update Transaction Successful",
	}, nil
}

func (r *TransactionRepository) CreateOrganizerTransferRecord(req *st.CreateOrganizerTransferRecordRequest) (*models.Transaction, error) {
	log.Println("[Repo: CreateOrganizerTransferRecord] Called")

	var status string

	switch req.Status {
	case "succeeded":
		status = constant.COMPLETED
	case "requires_payment_method", "requires_confirmation", "requires_action":
		status = constant.PENDING
	case "canceled":
		status = constant.CANCELLED
	default:
		status = constant.PENDING
	}

	transactionModel := models.Transaction{
		TransactionID:     req.PaymentIntentId,
		UserID:            req.UserId,
		EventID:           req.EventId,
		TransactionAmount: float64(req.Amount),
		TransactionDate:   time.Time{},
		Status:            status,
		TransactionWay:    constant.PAYMENT_TRANSFERRED,
		CreatedAt:         time.Time{},
	}

	trans := r.db.Begin().Debug()
	if err := trans.Create(&transactionModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateOrganizerTransferRecord] Insert data in transactions table error:", err)
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateOrganizerTransferRecord] Call orm DB Commit error:", err)
		return nil, err
	}

	return &transactionModel, nil
}
