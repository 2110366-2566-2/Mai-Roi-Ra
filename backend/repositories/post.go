package repository

import (
	"errors"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"

	"gorm.io/gorm"
)

type PostRepository struct {
	db *gorm.DB
}

type IPostRepository interface {
	GetPostById(postID string) (*models.Post, error)
	GetPostListsByEventId(req *st.EventIdRequest) ([]models.Post, error)
	IsReviewed(req *st.IsReviewedRequest) (*st.IsReviewedResponse, error)
	CreatePost(req *models.Post) (*st.CreatePostResponse, error)
	DeletePostById(req *st.PostIdRequest) (*st.MessageResponse, error)
}

func NewPostRepository(
	db *gorm.DB,
) IPostRepository {
	return &PostRepository{
		db: db,
	}
}

func (repo *PostRepository) GetPostById(postID string) (*models.Post, error) {
	log.Println("[Repo: GetPostById] Called")

	var post models.Post
	if err := repo.db.Where("post_id = ?", postID).First(&post).Error; err != nil {
		log.Println("[Repo: GetPostById] Error finding post:", err)
		return nil, err
	}

	return &post, nil
}

func (repo *PostRepository) GetPostListsByEventId(req *st.EventIdRequest) ([]models.Post, error) {
	log.Println("[Repo: GetPostListsByEventId] Called")

	var posts []models.Post
	query := repo.db
	if req.EventId != "" {
		query = query.Where(`event_id = ?`, req.EventId)
	}

	if err := query.Find(&posts).Error; err != nil {
		log.Println("[Repo: GetPostListsByEventId] Error finding posts:", err)
		return nil, err
	}

	return posts, nil
}

func (r *PostRepository) IsReviewed(req *st.IsReviewedRequest) (*st.IsReviewedResponse, error) {
	log.Println("[Repo: IsReviewed]: Called")

	response := &st.IsReviewedResponse{
		IsReviewed: false, // Default to false
	}

	query := r.db.Where("event_id = ? AND user_id = ?", req.EventId, req.UserId)
	var count int64
	if err := query.Model(&models.Post{}).Count(&count).Error; err != nil {
		log.Println("[Repo: IsReviewed]: cannot query for existing rows:", err)
		return nil, err
	}

	if count > 0 {
		response.IsReviewed = true
	}

	return response, nil
}

func (r *PostRepository) CreatePost(req *models.Post) (*st.CreatePostResponse, error) {
	log.Println("[Repo: CreatePost]: Called")
	trans := r.db.Begin().Debug()
	if err := trans.Create(&req).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreatePost]: Insert data in Posts table error:", err)
		return nil, err
	}
	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreatePost]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &st.CreatePostResponse{
		PostId: req.PostId,
	}, nil
}

func (r *PostRepository) DeletePostById(req *st.PostIdRequest) (*st.MessageResponse, error) {
	log.Println("[Repo: DeletePostById]: Called")
	postModel := models.Post{}

	// Delete the event from the database
	if result := r.db.Where("post_id = ?", req.PostId).First(&postModel); result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			log.Println("[Repo: DeletePostById] no records found")
			return nil, result.Error
		} else {
			log.Println("[Repo: DeletePostById] something wrong when deleting from database:", result.Error)
			return nil, result.Error
		}
	} else {
		if err := r.db.Delete(&postModel).Error; err != nil {
			log.Println("[Repo: DeletePostById] errors when delete from database")
			return nil, err
		}
	}

	// Return a success message
	return &st.MessageResponse{
		Response: "success",
	}, nil
}
