package services

import (
	"log"
	"math"
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
	GetPostById(*st.PostIdRequest) (*st.GetPostByIdResponse, error)
	GetPostListsByEventId(req *st.EventIdRequest) (*st.GetPostListsByEventIdResponse, error)
	CreatePost(*st.CreatePostRequest) (*st.CreatePostResponse, error)
	DeletePostById(req *st.PostIdRequest) (*st.MessageResponse, error)
}

func NewPostService(
	repoGateway repository.RepositoryGateway,
) IPostService {
	return &PostService{
		RepositoryGateway: repoGateway,
	}
}

func (s *PostService) GetPostById(req *st.PostIdRequest) (*st.GetPostByIdResponse, error) {
	log.Println("[Service: GetPostById] Called")
	res, err := s.RepositoryGateway.PostRepository.GetPostById(req.PostId)
	if err != nil {
		return nil, err
	}

	Organizerresponse := ""
	resrespose, err := s.RepositoryGateway.ResponseRepository.GetResponseByPostId(req.PostId)
	if err == nil && resrespose != nil {
		Organizerresponse = resrespose.Detail
	}

	requser := &st.UserIdRequest{
		UserId: res.UserId,
	}

	UserName := ""
	UserImage := ""
	resuser, err := s.RepositoryGateway.UserRepository.GetUserByID(requser)
	if err == nil && resuser != nil {
		UserName = resuser.Username
		UserImage = resuser.UserImage
	}

	return &st.GetPostByIdResponse{
		PostId:            req.PostId,
		UserId:            res.UserId,
		Username:          UserName,
		UserImage:         UserImage,
		EventId:           res.EventId,
		Caption:           res.Caption,
		RatingScore:       res.RatingScore,
		OrganizerResponse: Organizerresponse,
	}, nil
}

func (s *PostService) GetPostListsByEventId(req *st.EventIdRequest) (*st.GetPostListsByEventIdResponse, error) {
	log.Println("[Service: GetPostListsByEventId] Called")
	postLists, err := s.RepositoryGateway.PostRepository.GetPostListsByEventId(req)
	if err != nil {
		return nil, err
	}

	postlists := make([]st.PostList, 0)
	var countRatings [6]int // Index 0 for posts with no ratings, 1-5 for respective ratings
	var totalRatings int
	var totalCount int

	for _, v := range postLists {

		if v.RatingScore >= 1 && v.RatingScore <= 5 {
			countRatings[v.RatingScore]++
			totalRatings += v.RatingScore
		} else {
			countRatings[0]++
		}
		totalCount++

		Organizerresponse := ""
		resrespose, err := s.RepositoryGateway.ResponseRepository.GetResponseByPostId(v.PostId)
		if err == nil && resrespose != nil {
			Organizerresponse = resrespose.Detail
		}

		requser := &st.UserIdRequest{
			UserId: v.UserId,
		}

		UserName := ""
		UserImage := ""
		resuser, err := s.RepositoryGateway.UserRepository.GetUserByID(requser)
		if err == nil && resuser != nil {
			UserName = resuser.Username
			UserImage = resuser.UserImage
		}

		post := st.PostList{
			PostId:            v.PostId,
			UserId:            v.UserId,
			Username:          UserName,
			UserImage:         UserImage,
			EventId:           v.EventId,
			Caption:           v.Caption,
			RatingScore:       v.RatingScore,
			OrganizerResponse: Organizerresponse,
		}

		postlists = append(postlists, post)
	}

	// Calculate average rating
	var avgRating float64
	if totalCount > 0 {
		avgRating = float64(totalRatings) / float64(totalCount)
		avgRating = math.Round(avgRating*10) / 10
	}

	res := &st.GetPostListsByEventIdResponse{
		PostLists:   postlists,
		OneRate:     countRatings[1],
		TwoRate:     countRatings[2],
		ThreeRate:   countRatings[3],
		FourRate:    countRatings[4],
		FiveRate:    countRatings[5],
		AverageRate: avgRating,
	}

	return res, nil
}

func (s *PostService) CreatePost(req *st.CreatePostRequest) (*st.CreatePostResponse, error) {
	log.Println("[Service: CreatePost]: Called")

	postModel := models.Post{
		PostId:      utils.GenerateUUID(),
		UserId:      req.UserId,
		EventId:     req.EventId,
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

func (s *PostService) DeletePostById(req *st.PostIdRequest) (*st.MessageResponse, error) {
	log.Println("[Service: DeletePostById] Called")
	res, err := s.RepositoryGateway.PostRepository.DeletePostById(req)
	if err != nil {
		return nil, err
	}
	return res, nil
}
