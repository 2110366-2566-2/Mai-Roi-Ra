package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type LocationRepository struct {
	db *gorm.DB
}

type ILocationRepository interface {
	GetLocationById(string) (*models.Location, error)
	GetLocationByName(locationName string, district string, city string) (*models.Location, error)
	CreateLocation(req models.Location) (*string, error)
}

func NewLocationRepository(
	db *gorm.DB,
) ILocationRepository {
	return &LocationRepository{
		db: db,
	}
}

func (r *LocationRepository) CreateLocation(req models.Location) (*string, error) {
	log.Println("[Repo: CreateLocation]: Called")
	trans := r.db.Begin().Debug()
	if err := trans.Create(&req).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateLocation]: Insert data in location table error:", err)
		return nil, err
	}
	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateLocation]: Call orm DB Commit error:", err)
		return nil, err
	}
	return &req.LocationId, nil
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

func (r *LocationRepository) GetLocationByName(locationName string, district string, city string) (*models.Location, error) {
	log.Println("[Repo: GetLocationByName]: Called")
	var location models.Location

	if err := r.db.Where("location_name LIKE ?", "%"+locationName+"%").First(&location).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("[Repo: GetLocationByName]: Location not found, creating a new one")
			locationMod := models.Location{
				LocationId:   utils.GenerateUUID(),
				Country:      "Thailand",
				City:         city,
				District:     district,
				LocationName: locationName,
				CreatedAt:    time.Now(),
			}
			_, err := r.CreateLocation(locationMod)
			if err != nil {
				log.Println("[Repo: GetLocationByName]: Error creating location:", err)
				return nil, err
			}
			return &locationMod, nil
		} else {
			log.Println("[Repo: GetLocationByName]: Error finding location by locationName:", err)
			return nil, err
		}
	}
	return &location, nil
}
