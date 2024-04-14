package controllers

import (
	"log"
	"net/http"

	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	"github.com/gin-gonic/gin"
)

type PostController struct {
	ServiceGateway services.ServiceGateway
}

func NewPostController(
	sg services.ServiceGateway,
) *PostController {
	return &PostController{
		ServiceGateway: sg,
	}
}

// GetPostById endpoint
// @Summary Get post detail
// @Description Get the details of a specific post by its ID.
// @Tags posts
// @Accept json
// @Produce json
// @Param post_id path string true "Post ID"
// @Success 200 {object} st.GetPostByIdResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /posts/{post_id} [get]
func (c *PostController) GetPostById(ctx *gin.Context) {
	req := &st.PostIdRequest{
		PostId: ctx.Param("id"),
	}
	log.Println("[CTRL: GetPostById] Input:", req)
	res, err := c.ServiceGateway.PostService.GetPostById(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetPostById] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// GetPostListsByEventId endpoint
// @Summary Get list of posts by EventId
// @Description Get list of posts by EventId.
// @Tags posts
// @Accept json
// @Produce json
// @Param event_id query string false "event_id"
// @Success 200 {object} st.GetPostListsByEventIdResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /posts/events/{event_id} [get]
func (c *PostController) GetPostListsByEventId(ctx *gin.Context) {
	req := &st.EventIdRequest{
		EventId: ctx.Query("event_id"),
	}
	log.Println("[CTRL: GetPostListsByEventId] Input:", req)
	res, err := c.ServiceGateway.PostService.GetPostListsByEventId(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: GetPostListsByEventId] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// CreatePost endpoint
// @Summary Create a new post
// @Description Create a new post with the provided details
// @Tags posts
// @Accept json
// @Produce json
// @Param request body st.CreatePostRequest true "CreatePost Request (rating_score must be integer between 1-5)."
// @Success 200 {object} st.CreatePostResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /posts [post]
func (c *PostController) CreatePost(ctx *gin.Context) {
	var req *st.CreatePostRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreatePost] Input:", req)
	res, err := c.ServiceGateway.PostService.CreatePost(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Println("[CTRL: CreatePost] Output:", res)
	ctx.JSON(http.StatusOK, res)
}

// DeletePostById deletes a post by its ID.
// @Summary Delete post by ID
// @Description Delete a post with the specified ID.
// @Tags posts
// @Accept json
// @Produce json
// @Param post_id path string true "Post ID" example:"post123"
// @Success 200 {object} st.MessageResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /posts/{post_id} [delete]
func (c *PostController) DeletePostById(ctx *gin.Context) {
	req := &st.PostIdRequest{
		PostId: ctx.Param("id"),
	}
	log.Println("[CTRL: DeletePost] Input:", req)
	deleteMessage, err := c.ServiceGateway.PostService.DeletePostById(req)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Println("[CTRL: DeletePost] Output:", deleteMessage)
	ctx.JSON(http.StatusOK, deleteMessage)
}
