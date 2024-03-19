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
// @Tags problems
// @Accept json
// @Produce json
// @Param request body st.CreateProblemRequest true "Create Problem Request"
// @Success 200 {object} st.CreateProblemResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /problems [post]
func (c *ProblemController) CreateProblem(ctx *gin.Context) {
	var req *st.CreateProblemRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateProblem] Input:", req)
	res, err := c.ServiceGateway.ProblemService.CreateProblem(req)
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
// @Tags problems
// @Accept json
// @Produce json
// @Param problem_id path string true "Problem ID"
// @Success 200 {object} models.Problem
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /problems/{problem_id} [get]
func (c *ProblemController) GetProblemDetailById(ctx *gin.Context) {
	req := &st.GetProblemDetailByIdRequest{
		ProblemId: ctx.Param("id"),
	}
	log.Println("[CTRL: GetProblemDetail] Input:", req)
	res, err := c.ServiceGateway.ProblemService.GetProblemDetailById(req)
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
// @Tags problems
// @Accept json
// @Produce json
// @Param user_id query string true "user_id"
// @Param status query string true "Problem Status (Replied or Pending)"
// @Success 200 {object} st.GetProblemListsResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /problems [get]
func (c *ProblemController) GetProblemLists(ctx *gin.Context) {
	req := &st.GetProblemListsRequest{
		UserId: ctx.Query("user_id"),
		Status: ctx.Query("status"),
	}
	log.Println("[CTRL: GetProblemList] Input:", req)
	res, err := c.ServiceGateway.ProblemService.GetProblemLists(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetProblemList] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// UpdateProblem updates an existing problem.
// @Summary Update existing problem
// @Description Update an existing problem with the provided details.
// @Tags problems
// @Accept json
// @Produce json
// @Param problem_id path string true "Problem ID" example:"problem123"
// @Param request body st.UpdateProblemRequest true "Update Problem Request"
// @Success 200 {object} st.ProblemResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /problems/{problem_id} [put]
func (c *ProblemController) UpdateProblem(ctx *gin.Context) {
	var req *st.UpdateProblemRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	req.ProblemId = ctx.Param("id")
	log.Println("[CTRL: UpdateProblem] Input:", req)
	res, err := c.ServiceGateway.ProblemService.UpdateProblem(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: UpdateProblem] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// DeleteProblemById deletes a problem by its ID.
// @Summary Delete problem by ID
// @Description Delete a problem with the specified ID.
// @Tags problems
// @Accept json
// @Produce json
// @Param problem_id path string true "Problem ID" example:"problem123"
// @Success 200 {object} st.ProblemResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /problems/{problem_id} [delete]
func (c *ProblemController) DeleteProblemById(ctx *gin.Context) {
	req := &st.DeleteProblemByIdRequest{
		ProblemId: ctx.Param("id"),
	}
	log.Println("[CTRL: DeleteProblem] Input:", req)
	deleteMessage, err := c.ServiceGateway.ProblemService.DeleteProblemById(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: DeleteProblem] Output:", deleteMessage)
	ctx.JSON(http.StatusOK, deleteMessage)
}
