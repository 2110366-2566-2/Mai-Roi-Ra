package repository

import (
	"fmt"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"

	"gorm.io/gorm"
)

type ResponseRepository struct {
	db *gorm.DB
}

type IResponseRepository interface {
	CreateResponse(req *models.Response) (*st.CreateResponseResponse, error)
}

func NewResponseRepository(
	db *gorm.DB,
) IResponseRepository {
	return &ResponseRepository{
		db: db,
	}
}

func (r *ResponseRepository) CreateResponse(req *models.Response) (*st.CreateResponseResponse, error) {
	log.Println("[Repo: CreateResponse]: Called")
	trans := r.db.Begin().Debug()
	if err := trans.Create(&req).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateResponse]: Insert data in Responses table error:", err)
		return nil, err
	}
	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateResponse]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &st.CreateResponseResponse{
		Message: fmt.Sprintf(`Response Created Succesful for PostID : %s`,req.PostId),
	}, nil
}