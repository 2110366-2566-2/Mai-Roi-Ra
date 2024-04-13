package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type ResponseController struct {
	ServiceGateway services.ServiceGateway
}

func NewResponseController(
	sg services.ServiceGateway,
) *ResponseController {
	return &ResponseController{
		ServiceGateway: sg,
	}
}

// GetResponseByPostId endpoint
// @Summary Get response detail
// @Description Get the details of a specific response by post ID.
// @Tags responses
// @Accept json
// @Produce json
// @Param post_id path string true "Post ID"
// @Success 200 {object} models.Response
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /responses/{post_id} [get]
func (c *ResponseController) GetResponseByPostId(ctx *gin.Context) {
	req := &st.GetResponseByPostIdRequest{
		PostId: ctx.Param("id"),
	}
	log.Println("[CTRL: GetResponseByPostId] Input:", req)
	res, err := c.ServiceGateway.ResponseService.GetResponseByPostId(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetResponseByPostId] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// CreateResponse endpoint
// @Summary Create a new response
// @Description Create a new response with the provided details.
// @Tags responses
// @Accept json
// @Produce json
// @Param request body st.CreateResponseRequest true "CreateResponse Request"
// @Success 200 {object} st.CreateResponseResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /responses [post]
func (c *ResponseController) CreateResponse(ctx *gin.Context) {
	var req *st.CreateResponseRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateResponse] Input:", req)
	res, err := c.ServiceGateway.ResponseService.CreateResponse(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreateResponse] Output:", res)
	ctx.JSON(http.StatusOK, res)
}
