package services

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
)

type PostService struct {
	// logger            *log.Logger
	RepositoryGateway repository.RepositoryGateway
}

type IPostService interface {
	CreatePost(*st.CreatePostRequest) (*st.CreatePostResponse, error)
	DeletePostById(req *st.DeletePostRequest) (*st.DeletePostResponse, error)
}

func NewPostService(
	repoGateway repository.RepositoryGateway,
) IPostService {
	return &PostService{
		RepositoryGateway: repoGateway,
	}
}

func (s *PostService) CreatePost(req *st.CreatePostRequest) (*st.CreatePostResponse, error) {
	log.Println("[Service: CreatePost]: Called")

	postModel := models.Post{
		PostId: utils.GenerateUUID(),
		UserId: req.UserId,
		PostImage: req.PostImage,
		Caption: req.Caption,
		RatingScore: req.RatingScore,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	res, err := s.RepositoryGateway.PostRepository.CreatePost(&postModel)
	if err != nil {
		return nil, err
	}
	return res, nil
}

func (s *PostService) DeletePostById(req *st.DeletePostRequest) (*st.DeletePostResponse, error) {
	log.Println("[Service: DeletePostById] Called")
	res, err := s.RepositoryGateway.PostRepository.DeletePostById(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}

