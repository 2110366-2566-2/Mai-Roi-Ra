package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type SearchRepository struct {
	db *gorm.DB
}

type ISearchRepository interface {
	SaveSearchEvent(req *st.SearchEventRequest) (*string, error)
	GetSearchHistories(userId *string) ([]*models.SearchHistory, error)
}

func NewSearchRepository(
	db *gorm.DB,
) ISearchRepository {
	return &SearchRepository{
		db: db,
	}
}

func (r *SearchRepository) SaveSearchEvent(req *st.SearchEventRequest) (*string, error) {
	log.Println("[Repo: SaveSearchEvent] Called")
	historyModel := models.SearchHistory{
		UserID:          req.UserId,
		SearchID:        utils.GenerateUUID(),
		SearchName:      req.Search,
		SearchTimestamp: time.Time{},
	}

	trans := r.db.Begin().Debug()
	if err := trans.Create(&historyModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: SaveSearchEvent]: Insert data in Search Histories table error:", err)
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: SaveSearchEvent]: Call orm DB Commit error:", err)
		return nil, err
	}

	message := "Save Search Successful"

	return &message, nil
}

func (r *SearchRepository) GetSearchHistories(userId *string) ([]*models.SearchHistory, error) {
	log.Println("[Repo: GetSearchHistories] Called")
	var searchHistoryLists []*models.SearchHistory
	query := r.db

	query = query.Where(`user_id=?`, *userId)

	query = query.Order("search_timestamp DESC")

	if err := query.Find(&searchHistoryLists).Error; err != nil {
		log.Println("[Repo: GetSearchHistories]: cannot query the search history:", err)
		return nil, err
	}
	return searchHistoryLists, nil
}
