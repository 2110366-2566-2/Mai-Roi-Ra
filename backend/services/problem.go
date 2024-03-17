package services

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
)

type ProblemService struct {
	RepositoryGateway repository.RepositoryGateway
}

type IProblemService interface {
	CreateProblem(req *st.CreateProblemRequest) (*models.Problem, error)
	GetProblemByID(req *st.GetProblemByIDRequest) (*models.Problem, error)
	GetProblemsByStatus(req *st.GetProblemsByStatusRequest) ([]models.Problem, error)
	UpdateProblem(req *st.UpdateProblemRequest) (*models.Problem, error)
	SendEmailToAdmin(problemID string) error
}

func NewProblemService(repoGateway repository.RepositoryGateway) IProblemService {
	return &ProblemService{
		RepositoryGateway: repoGateway,
	}
}

func (s *ProblemService) CreateProblem(req *st.CreateProblemRequest) (*models.Problem, error) {
	log.Println("[Service: CreateProblem] Called")
	problem, err := s.RepositoryGateway.ProblemRepository.CreateProblem(req)
	if err != nil {
		log.Println("[Service: CreateProblem] Error creating problem:", err)
		return nil, err
	}
	return problem, nil
}

func (s *ProblemService) GetProblemByID(req *st.GetProblemByIDRequest) (*models.Problem, error) {
	log.Println("[Service: GetProblemByID] Called")
	problem, err := s.RepositoryGateway.ProblemRepository.GetProblemByID(req.ProblemId)
	if err != nil {
		log.Println("[Service: GetProblemByID] Error retrieving problem:", err)
		return nil, err
	}
	return problem, nil
}

func (s *ProblemService) GetProblemsByStatus(req *st.GetProblemsByStatusRequest) ([]models.Problem, error) {
	log.Println("[Service: GetProblemsByStatus] Called")
	problems, err := s.RepositoryGateway.ProblemRepository.GetProblemsByStatus(req.Status)
	if err != nil {
		log.Println("[Service: GetProblemsByStatus] Error retrieving problems:", err)
		return nil, err
	}
	return problems, nil
}

func (s *ProblemService) UpdateProblem(req *st.UpdateProblemRequest) (*models.Problem, error) {
	log.Println("[Service: UpdateProblem] Called")
	problem, err := s.RepositoryGateway.ProblemRepository.UpdateProblem(req)
	if err != nil {
		log.Println("[Service: UpdateProblem] Error updating problem:", err)
		return nil, err
	}
	return problem, nil
}

func (s *ProblemService) SendEmailToAdmin(problemID string) error {
	log.Println("[Service: SendEmailToAdmin] Called")
	// Implementation for sending an email to the admin
	// ...

	return nil // or return an actual error if something goes wrong
}
