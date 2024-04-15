package services

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type ResponseService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IResponseService interface {
	GetResponseByPostId(req *st.PostIdRequest) (*st.GetResponseByPostIdResponse, error)
	CreateResponse(req *st.CreateResponseRequest) (*st.MessageResponse, error)
}

func NewResponseService(
	repoGateway repository.RepositoryGateway,
) IResponseService {
	return &ResponseService{
		RepositoryGateway: repoGateway,
	}
}

func (s *ResponseService) GetResponseByPostId(req *st.PostIdRequest) (*st.GetResponseByPostIdResponse, error) {
	log.Println("[Service: GetResponseByPostId] Called")
	res, err := s.RepositoryGateway.ResponseRepository.GetResponseByPostId(req.PostId)
	if err != nil {
		return nil, err
	}

	return &st.GetResponseByPostIdResponse{
		OrganizerId: res.OrganizerId,
		PostId:      res.PostId,
		Detail:      res.Detail,
	}, nil
}

func (s *ResponseService) CreateResponse(req *st.CreateResponseRequest) (*st.MessageResponse, error) {
	log.Println("[Service: CreateResponse]: Called")

	ResponseModel := models.Response{
		OrganizerId: req.OrganizerId,
		PostId:      req.PostId,
		Detail:      req.Detail,
	}

	res, err := s.RepositoryGateway.ResponseRepository.CreateResponse(&ResponseModel)
	if err != nil {
		return nil, err
	}
	return res, nil
}
