package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type ProblemController struct {
	ServiceGateway services.ServiceGateway
}

func NewProblemController(sg services.ServiceGateway) *ProblemController {
	return &ProblemController{
		ServiceGateway: sg,
	}
}

// CreateProblem endpoint
// @Summary Create a new problem
// @Description Create a new problem with the provided details.
// @Tags problem
// @Accept json
// @Produce json
// @Param request body st.CreateProblemRequest true "Create Problem Request"
// @Success 200 {object} st.CreateProblemResponse
// @Failure 400 {object} map[string]string "Bad Request"
// @Failure 500 {object} map[string]string "Internal Server Error"
// @Router /problems [post]
func (c *ProblemController) CreateProblem(ctx *gin.Context) {
	var req st.CreateProblemRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: CreateProblem] Input:", req)

	res, err := c.ServiceGateway.ProblemService.CreateProblem(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: CreateProblem] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// GetProblemDetail endpoint
// @Summary Get problem detail
// @Description Get the details of a specific problem by its ID.
// @Tags problem
// @Accept json
// @Produce json
// @Param problem_id path string true "Problem ID"
// @Success 200 {object} models.Problem
// @Failure 400 {object} map[string]string "Bad Request"
// @Failure 500 {object} map[string]string "Internal Server Error"
// @Router /problems/{problem_id} [get]
func (c *ProblemController) GetProblemDetail(ctx *gin.Context) {
	problemID := ctx.Param("problem_id")

	log.Println("[CTRL: GetProblemDetail] Input:", problemID)

	req := st.GetProblemByIDRequest{ProblemId: problemID}
	res, err := c.ServiceGateway.ProblemService.GetProblemByID(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: GetProblemDetail] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// GetProblemList endpoint
// @Summary Get list of problems
// @Description Get a list of problems filtered by status (Replied or Pending).
// @Tags problem
// @Accept json
// @Produce json
// @Param status query string true "Problem Status (Replied or Pending)"
// @Success 200 {object} []models.Problem
// @Failure 400 {object} map[string]string "Bad Request"
// @Failure 500 {object} map[string]string "Internal Server Error"
// @Router /problems [get]
func (c *ProblemController) GetProblemList(ctx *gin.Context) {
	status := ctx.Query("status")

	log.Println("[CTRL: GetProblemList] Input:", status)

	req := st.GetProblemsByStatusRequest{Status: status}
	res, err := c.ServiceGateway.ProblemService.GetProblemsByStatus(&req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: GetProblemList] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// SendEmailToAdmin endpoint
// @Summary Send email to admin
// @Description Send an email notification to the admin regarding a specific problem.
// @Tags problem
// @Accept json
// @Produce json
// @Param problem_id path string true "Problem ID"
// @Success 200 {object} map[string]string "Email sent successfully."
// @Failure 400 {object} map[string]string "Bad Request"
// @Failure 500 {object} map[string]string "Internal Server Error"
// @Router /problems/{problem_id}/send-email [post]
func (c *ProblemController) SendEmailToAdmin(ctx *gin.Context) {
	problemID := ctx.Param("problem_id")

	log.Println("[CTRL: SendEmailToAdmin] Input:", problemID)

	// Assuming SendEmailToAdmin is correctly implemented in the ProblemService
	err := c.ServiceGateway.ProblemService.SendEmailToAdmin(problemID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: SendEmailToAdmin] Output: Email sent successfully")
	ctx.JSON(http.StatusOK, gin.H{"message": "Email sent successfully"})
}
