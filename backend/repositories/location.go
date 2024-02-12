package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"gorm.io/gorm"
)

type LocationRepository struct {
	db *gorm.DB
}

type ILocationRepository interface {
	GetLocationById(string) (*models.Location, error)
}

func NewLocationRepository(
	db *gorm.DB,
) ILocationRepository {
	return &LocationRepository{
		db: db,
	}
}

func (r *LocationRepository) GetLocationById(locationId string) (*models.Location, error) {
	log.Println("[Repo: GetLocationById]: Called")
	var location models.Location
	if err := r.db.Where(`location_id=?`, locationId).Find(&location).Error; err != nil {
		log.Println("[Repo: GetLocationById]: cannot find location_id:", err)
		return nil, err
	}
	return &location, nil
}
