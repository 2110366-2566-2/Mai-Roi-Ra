package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

// IProblemRepository interface defines the methods that the ProblemRepository must implement.
type IProblemRepository interface {
	CreateProblem(req *st.CreateProblemRequest) (*models.Problem, error)
	GetProblemByID(problemID string) (*models.Problem, error)
	GetProblemsByStatus(status string) ([]models.Problem, error)
	UpdateProblem(req *st.UpdateProblemRequest) (*models.Problem, error)
}

// ProblemRepository represents the repository for the Problem model.
type ProblemRepository struct {
	DB *gorm.DB
}

// NewProblemRepository creates a new instance of the ProblemRepository.
func NewProblemRepository(db *gorm.DB) IProblemRepository {
	return &ProblemRepository{
		DB: db,
	}
}

// CreateProblem adds a new problem to the database.
func (repo *ProblemRepository) CreateProblem(req *st.CreateProblemRequest) (*models.Problem, error) {
	log.Println("[Repo: CreateProblem] Called")

	problemModel := models.Problem{
		ProblemID:     utils.GenerateUUID(),
		AdminUsername: req.AdminUsername,
		Problem:       req.Problem,
		Description:   req.Description,
		Reply:         req.Reply,
		Status:        req.Status,
		CreatedAt:     time.Time{},
	}

	if err := repo.DB.Create(&problemModel).Error; err != nil {
		log.Println("[Repo: CreateProblem] Error creating problem:", err)
		return nil, err
	}

	return &problemModel, nil
}

// GetProblemByID retrieves a problem by its ID.
func (repo *ProblemRepository) GetProblemByID(problemID string) (*models.Problem, error) {
	log.Println("[Repo: GetProblemByID] Called")

	var problem models.Problem
	if err := repo.DB.Where("problem_id = ?", problemID).First(&problem).Error; err != nil {
		log.Println("[Repo: GetProblemByID] Error finding problem:", err)
		return nil, err
	}

	return &problem, nil
}

// GetProblemsByStatus retrieves problems by their status.
func (repo *ProblemRepository) GetProblemsByStatus(status string) ([]models.Problem, error) {
	log.Println("[Repo: GetProblemsByStatus] Called")

	var problems []models.Problem
	if err := repo.DB.Where("status = ?", status).Find(&problems).Error; err != nil {
		log.Println("[Repo: GetProblemsByStatus] Error finding problems:", err)
		return nil, err
	}

	return problems, nil
}

// UpdateProblem updates specific fields of an existing problem in the database.
func (repo *ProblemRepository) UpdateProblem(req *st.UpdateProblemRequest) (*models.Problem, error) {
	log.Println("[Repo: UpdateProblem] Called")

	// Find the problem by problem_id
	var problem models.Problem
	if err := repo.DB.Where("problem_id = ?", req.ProblemId).First(&problem).Error; err != nil {
		log.Println("[Repo: UpdateProblem] Problem not found:", err)
		return nil, err
	}

	// Update the fields based on the request
	if req.AdminUsername != "" {
		problem.AdminUsername = req.AdminUsername
	}
	if req.Problem != "" {
		problem.Problem = req.Problem
	}
	if req.Description != "" {
		problem.Description = req.Description
	}
	if req.Reply != nil {
		problem.Reply = req.Reply
	}
	if req.Status != "" {
		problem.Status = req.Status
	}
	// Do not update CreatedAt during an update operation

	// Save the updated version
	if err := repo.DB.Save(&problem).Error; err != nil {
		log.Println("[Repo: UpdateProblem] Error updating problem in the database:", err)
		return nil, err
	}

	return &problem, nil
}
