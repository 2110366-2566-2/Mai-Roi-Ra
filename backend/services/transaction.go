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
	CreatePayment(req *st.CreatePaymentRequest) (*st.CreatePaymentResponse, error)
	GetPaymentIntentById(req *st.GetPaymentIntentByIdRequest) (*st.GetPaymentIntentByIdResponse, error)
	TransferToOrganizer(req *st.TransferToOrganizerRequest) (*models.Transaction, error)
	ConfirmPaymentIntent(req string) error
	IsPaid(req *st.IsPaidRequest) (*st.IsPaidResponse, error)
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

func (s *TransactionService) CreatePayment(req *st.CreatePaymentRequest) (*st.CreatePaymentResponse, error) {
	log.Println("[Service: CreatePayment]: Called")

	// TODO : Send clientSecret to frontend with correct amount

	res, err := Stripe.CreatePaymentIntent(int64(req.TransactionAmount), constant.THB, req.EventId, req.UserId, req.PaymentType)
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
	paymentId := ""
	if req != nil {
		paymentId = req.PaymentIntentId
	}
	resPaymentIntent, err := Stripe.GetPaymentIntent(&st.GetPaymentIntentByIdRequest{
		PaymentIntentId: paymentId,
	})

	if err != nil {
		return nil, err
	}

	transModel, err := s.RepositoryGateway.TransactionRepository.GetTransactionDataById(resPaymentIntent.ID)
	if err != nil {
		return nil, err
	}

	resEvent, err := s.RepositoryGateway.EventRepository.GetEventDataById(transModel.EventID)
	if err != nil {
		return nil, err
	}

	paymentAmount := float64(resPaymentIntent.Amount) / 100
	numParticipants := int(paymentAmount / resEvent.ParticipantFee)

	status := constant.PENDING
	if resPaymentIntent.Status == constant.PAYMENT_CANCELED {
		status = constant.CANCELLED
	} else if resPaymentIntent.Status == constant.PAYMENT_SUCCEEDED {
		status = constant.COMPLETED
	}

	reqUpdate := &st.UpdateTransactionRequest{
		TransactionId: transModel.TransactionID,
		Status:        status,
	}

	if transModel.Status == constant.PENDING {
		_, err = s.RepositoryGateway.TransactionRepository.UpdateTransaction(reqUpdate)
		if err != nil {
			return nil, err
		}
	}

	res := &st.GetPaymentIntentByIdResponse{
		EventId:             transModel.EventID,
		UserId:              transModel.UserID,
		NumParticipants:     numParticipants,
		PaymentIntentId:     resPaymentIntent.ID,
		PaymentClientSecret: resPaymentIntent.ClientSecret,
		TransactionAmount:   paymentAmount,
		Currency:            string(resPaymentIntent.Currency),
		Status:              status,
	}

	return res, nil
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

	userId, _ := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(req.OrganizerId)

	// create paymentIntent
	paymentIntent, intentErr := Stripe.CreatePaymentIntent(int64(amount), currency, event.EventId, userId, 1)

	// paymentIntent, intentErr := Stripe.CreateTransferPaymentIntent(int64(amount), currency, "acct_1OycjtLp3rKqqCov", userId, event.EventId)
	if intentErr != nil {
		log.Println("[Service: TransferToOrganizer] Called Stripe.CreatePaymentId error: ", err)
		return nil, err
	}

	transferReq := &st.CreateOrganizerTransferRecordRequest{
		PaymentIntentId: paymentIntent.PaymentIntentId,
		UserId:          userId,
		EventId:         event.EventId,
		Amount:          int64(paymentIntent.TransactionAmount),
		Status:          paymentIntent.Status,
	}

	// transferReq := &st.CreateOrganizerTransferRecordRequest{
	// 	PaymentIntentId: paymentIntent.ID,
	// 	UserId:          userId,
	// 	EventId:         event.EventId,
	// 	Amount:          int64(paymentIntent.Amount),
	// 	Status:          string(paymentIntent.Status),
	// }

	res, repoErr := s.RepositoryGateway.TransactionRepository.CreateOrganizerTransferRecord(transferReq)
	if repoErr != nil {
		log.Println("[Service: TransferToOrganizer] Called repo err: ", err)
		return nil, err
	}

	return res, nil

}

func (s *TransactionService) ConfirmPaymentIntent(req string) error {
	log.Println("[Service: ConfirmPaymentIntent] Called")
	if err := Stripe.ConfirmPaymentIntent(req); err != nil {
		log.Println("[Service: ConfirmPaymentIntent] Error:", err)
		return err
	}
	return nil
}

func (s *TransactionService) IsPaid(req *st.IsPaidRequest) (*st.IsPaidResponse, error) {
	log.Println("[Service: IsPaid]: Called")

	resUser , err := s.RepositoryGateway.OrganizerRepository.GetUserIdFromOrganizerId(req.OrganizerId)
	if err != nil {
		return nil, err
	}

	res, err := s.RepositoryGateway.TransactionRepository.IsPaid(req.EventId, resUser)
	if err != nil {
		log.Println("[Service: Call Repo Error]:", err)
		return nil, err
	}
	return res, err
}