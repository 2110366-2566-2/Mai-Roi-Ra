package repository

import (
	"errors"
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type IProblemRepository interface {
	CreateProblem(req *st.CreateProblemRequest) (*models.Problem, error)
	GetProblemDetailById(problemID string) (*models.Problem, error)
	GetProblemLists(req *st.GetProblemListsRequest) ([]models.Problem, error)
	UpdateProblem(req *st.UpdateProblemRequest) (*st.ProblemResponse, error)
	DeleteProblemById(req *st.DeleteProblemByIdRequest) (*st.ProblemResponse, error)
}

type ProblemRepository struct {
	DB *gorm.DB
}

// NewProblemRepository creates a new instance of the ProblemRepository.
func NewProblemRepository(db *gorm.DB) IProblemRepository {
	return &ProblemRepository{
		DB: db,
	}
}

func (repo *ProblemRepository) CreateProblem(req *st.CreateProblemRequest) (*models.Problem, error) {
	log.Println("[Repo: CreateProblem] Called")

	problemModel := models.Problem{
		ProblemId:     utils.GenerateUUID(),
		UserId:        req.UserId,
		AdminUsername: nil,
		Problem:       req.Problem,
		Description:   req.Description,
		Reply:         nil,
		Status:        "Pending",
		CreatedAt:     time.Now(),
	}

	trans := repo.DB.Begin().Debug()

	if err := trans.Create(&problemModel).Error; err != nil {
		log.Println("[Repo: CreateProblem] Error creating problem:", err)
		trans.Rollback()
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		log.Println("[Repo: CreateProblem]: Call orm DB Commit error:", err)
		trans.Rollback()
		return nil, err
	}

	return &problemModel, nil
}

func (repo *ProblemRepository) GetProblemDetailById(problemID string) (*models.Problem, error) {
	log.Println("[Repo: GetProblemDetailById] Called")

	var problem models.Problem
	if err := repo.DB.Where("problem_id = ?", problemID).First(&problem).Error; err != nil {
		log.Println("[Repo: GetProblemDetailById] Error finding problem:", err)
		return nil, err
	}

	return &problem, nil
}

// GetProblemsByStatus retrieves problems by their status.
func (repo *ProblemRepository) GetProblemLists(req *st.GetProblemListsRequest) ([]models.Problem, error) {
	log.Println("[Repo: GetProblemsByStatus] Called")

	var problems []models.Problem
	query := repo.DB.Where(`user_id = ?`, req.UserId)
	if req.Status != "" {
		query = query.Where(`status = ?`, req.Status)
	}
	if err := query.Find(&problems).Error; err != nil {
		log.Println("[Repo: GetProblemsByStatus] Error finding problems:", err)
		return nil, err
	}
	return problems, nil
}

func (repo *ProblemRepository) UpdateProblem(req *st.UpdateProblemRequest) (*st.ProblemResponse, error) {
	log.Println("[Repo: UpdateProblem] Called")
	var problem models.Problem
	if err := repo.DB.Where("problem_id = ?", req.ProblemId).First(&problem).Error; err != nil {
		log.Println("[Repo: UpdateProblem] Problem not found:", err)
		return nil, err
	}

	if req.AdminUsername != nil {
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

	trans := repo.DB.Begin().Debug()

	if err := trans.Save(&problem).Error; err != nil {
		log.Println("[Repo: UpdateProblem] Error updating problem in the database:", err)
		trans.Rollback()
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		log.Println("[Repo: UpdateProblem]: Call orm DB Commit error:", err)
		trans.Rollback()
		return nil, err
	}

	return &st.ProblemResponse{
		Response: "Update problem successfully",
	}, nil
}

func (r *ProblemRepository) DeleteProblemById(req *st.DeleteProblemByIdRequest) (*st.ProblemResponse, error) {
	log.Println("[Repo: DeleteProblemById]: Called")

	var problemModel models.Problem

	if result := r.DB.Where("problem_id = ?", req.ProblemId).First(&problemModel); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			log.Println("[Repo: DeleteEventById] no records found")
			return nil, result.Error
		} else {
			log.Println("[Repo: DeleteEventById] something wrong when deleting from database:", result.Error)
			return nil, result.Error
		}
	} else {
		if err := r.DB.Delete(&problemModel).Error; err != nil {
			log.Println("[Repo: DeleteEventById] errors when delete from database")
			return nil, err
		}
	}

	return &st.ProblemResponse{
		Response: "Delete problem successfully",
	}, nil
}