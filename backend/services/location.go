package services

import (
	"log"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type LocationService struct {
	RepositoryGateway repository.RepositoryGateway
}

type ILocationService interface {
	GetLocationById(req st.GetLocationByIdRequest) (*st.GetLocationByIdResponse, error)
}

func NewLocationService(
	repoGateway repository.RepositoryGateway,
) ILocationService {
	return &LocationService{
		RepositoryGateway: repoGateway,
	}
}

func (s *LocationService) GetLocationById(req st.GetLocationByIdRequest) (*st.GetLocationByIdResponse, error) {
	log.Println("[Service: GetLocationById]: Called")
	locModel, err := s.RepositoryGateway.LocationRepository.GetLocationById(req.LocationId)
	if err != nil {
		return nil, err
	}
	res := &st.GetLocationByIdResponse{
		Country:      locModel.Country,
		City:         locModel.City,
		District:     locModel.District,
		LocationName: locModel.LocationName,
	}
	return res, nil
}
