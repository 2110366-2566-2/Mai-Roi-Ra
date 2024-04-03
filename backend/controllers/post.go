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

// CreatePost endpoint
// @Summary Create a new post
// @Description Create a new post with the provided details.
// @Tags posts
// @Accept json
// @Produce json
// @Param request body st.CreatePostRequest true "Create Post Request"
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
// @Success 200 {object} st.PostResponse
// @Failure 400 {object} object "Bad Request"
// @Failure 500 {object} object "Internal Server Error"
// @Router /posts/{post_id} [delete]
func (c *PostController) DeletePostById(ctx *gin.Context) {
	req := &st.DeletePostRequest{
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
