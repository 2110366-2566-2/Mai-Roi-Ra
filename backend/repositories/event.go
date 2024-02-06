package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"gorm.io/gorm"
)

type EventRepository struct {
	db *gorm.DB
}

type IEventRepositry interface {
	
}

func (r *EventRepository) CreateEvent(models.Event, error) {
	log.Println("[Repo: CreateEvent]: Called");
	// res, err := r.db.Model(&models.Event).``

}