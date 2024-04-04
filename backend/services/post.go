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
	GetPostById(*st.GetPostByIdRequest) (*st.GetPostByIdResponse, error)
	GetPostListsByEventId(req *st.GetPostListsByEventIdRequest) (*st.GetPostListsByEventIdResponse, error)
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

func (s *PostService) GetPostById(req *st.GetPostByIdRequest) (*st.GetPostByIdResponse, error) {
	log.Println("[Service: GetPostById] Called")
	res, err := s.RepositoryGateway.PostRepository.GetPostById(req.PostId)
	if err != nil {
		return nil, err
	}

	return &st.GetPostByIdResponse{
		PostId:      req.PostId,
		UserId:      res.UserId,
		EventId:     res.EventId,
		PostImage:   res.PostImage,
		Caption:     res.Caption,
		RatingScore: res.RatingScore,
	}, nil
}

func (s *PostService) GetPostListsByEventId(req *st.GetPostListsByEventIdRequest) (*st.GetPostListsByEventIdResponse, error) {
	log.Println("[Service: GetPostListsByEventId] Called")
	postLists, err := s.RepositoryGateway.PostRepository.GetPostListsByEventId(req)
	if err != nil {
		return nil, err
	}
	res := &st.GetPostListsByEventIdResponse{
		PostLists: make([]st.PostList, 0),
	}

	for _, v := range postLists {
		post := st.PostList{
			PostId:      v.PostId,
			UserId:      v.UserId,
			EventId:     v.EventId,
			PostImage:   v.PostImage,
			Caption:     v.Caption,
			RatingScore: v.RatingScore,
		}

		res.PostLists = append(res.PostLists, post)
	}
	return res, nil
}

func (s *PostService) CreatePost(req *st.CreatePostRequest) (*st.CreatePostResponse, error) {
	log.Println("[Service: CreatePost]: Called")

	postModel := models.Post{
		PostId:      utils.GenerateUUID(),
		UserId:      req.UserId,
		EventId:     req.EventId,
		PostImage:   req.PostImage,
		Caption:     req.Caption,
		RatingScore: req.RatingScore,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
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
