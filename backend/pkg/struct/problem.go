package structure

import (
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
)

type CreateProblemRequest struct {
	AdminUsername string    `json:"admin_username" binding:"required"`
	Problem       string    `json:"problem" binding:"required"`
	Description   string    `json:"description" binding:"required"`
	Reply         *string   `json:"reply"`
	Status        string    `json:"status" binding:"required"`
	CreatedAt     time.Time `json:"created_at"` // Add this field
}

type GetProblemByIDRequest struct {
	ProblemId string `json:"problem_id" binding:"required"`
}

type GetProblemsByStatusRequest struct {
	Status string `json:"status" binding:"required"`
}

type UpdateProblemRequest struct {
	ProblemId     string  `json:"problem_id" binding:"required"`
	AdminUsername string  `json:"admin_username"`
	Problem       string  `json:"problem"`
	Description   string  `json:"description"`
	Reply         *string `json:"reply"`
	Status        string  `json:"status"`
}

type ProblemResponse struct {
	Problem models.Problem `json:"problem"`
}

type ProblemsResponse struct {
	Problems []models.Problem `json:"problems"`
}
