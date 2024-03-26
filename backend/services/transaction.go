package services

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/payment"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"

	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type TransactionService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type ITransactionService interface {
	CreateQRPromptPay(req *st.CreateQRPromptPayRequest) (*st.CreateQRPromptPayResponse, error)
	GetPaymentIntentById(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error)
	TransferToOrganizer(req *st.TransferToOrganizerRequest) (*models.Transaction, error)
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

func (s *TransactionService) CreateQRPromptPay(req *st.CreateQRPromptPayRequest) (*st.CreateQRPromptPayResponse, error) {
	log.Println("[Service: CreateQRPromptPay]: Called")

	// TODO : Send clientSecret to frontend with correct amount

	res, err := Stripe.CreatePromptPayPayment(int64(req.TransactionAmount), constant.THB)
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

	// TODO : Check whether the transaction is done

	paymentId := ""
	if req != nil {
		paymentId = req.PaymentIntentId
	}
	resPaymentData, err := Stripe.GetPaymentIntent(&st.GetPaymentIntentByIdRequest{
		PaymentIntentId: paymentId,
	})

	if err != nil {
		return nil, err
	}

	transModel, err := s.RepositoryGateway.TransactionRepository.GetTransactionDataByPaymentId(resPaymentData.PaymentIntentId)
	if err != nil {
		return nil, err
	}

	status := constant.PENDING
	if resPaymentData.Status == constant.PAYMENT_CANCELED {
		status = constant.CANCELLED
	} else if resPaymentData.Status == constant.PAYMENT_SUCCEEDED {
		status = constant.COMPLETED
	}

	reqUpdate := &st.UpdateTransactionRequest{
		TransactionId: transModel.TransactionID,
		Status:        status,
	}

	_, err = s.RepositoryGateway.TransactionRepository.UpdateTransaction(reqUpdate)
	if err != nil {
		return nil, err
	}

	return resPaymentData, nil
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
	destination := req.OrganizerStripeAccountId

	// create paymentIntent
	paymentIntentId, intentErr := Stripe.CreatePaymentIntentID(int64(amount), currency)
	if intentErr != nil {
		log.Println("[Service: TransferToOrganizer] Called Stripe.CreatePaymentId error: ", err)
		return nil, err
	}

	// get PaymentIntent object
	tmp := &st.GetPaymentIntentByIdRequest{
		PaymentIntentId: *paymentIntentId,
	}

	userId, _ := s.RepositoryGateway.OrganizerRepository.GetOrganizerIdFromUserId(req.OrganizerId)

	// create Transfer Object
	transfer, transferErr := Stripe.TransferToOrganizer(int64(amount), currency, destination, *paymentIntentId, req.EventID, userId)
	if transferErr != nil {
		log.Println("[Service: TransferToOrganizer] Called transfer service error: ", err)
		return nil, transferErr
	}

	res, repoErr := s.RepositoryGateway.TransactionRepository.CreateOrganizerTransferRecord(tmp, transfer)
	if repoErr != nil {
		log.Println("[Service: TransferToOrganizer] Called repo err: ", err)
		return nil, err
	}

	return res, nil

}
