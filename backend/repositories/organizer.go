package repository

import (
	"log"
	"time"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"gorm.io/gorm"
)

type OrganizerRepository struct {
	db *gorm.DB
}

type IOrganizerRepository interface {
	CreateOrganizerWithUserId(userId string) (*string, error)
	GetOrganizerIdFromUserId(req string) (string, error)
	GetUserIdFromOrganizerId(req string) (string, error)
}

func NewOrganizerRepository(
	db *gorm.DB,
) IOrganizerRepository {
	return &OrganizerRepository{
		db: db,
	}
}

func (r *OrganizerRepository) CreateOrganizerWithUserId(userId string) (*string, error) {
	log.Println("[Repo: CreateOrganizerWithUserId]: Called")

	orgModel := models.Organizer{
		OrganizerId:      utils.GenerateUUID(),
		UserId:           userId,
		StartOfficeHours: time.Time{},
		EndOfficeHours:   time.Time{},
		CreatedAt:        time.Time{},
	}

	trans := r.db.Begin().Debug()
	if err := trans.Create(&orgModel).Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateOrganizerWithUserId]: Insert data in Users table error:", err)
		return nil, err
	}

	if err := trans.Commit().Error; err != nil {
		trans.Rollback()
		log.Println("[Repo: CreateOrganizerWithUserId]: Call orm DB Commit error:", err)
		return nil, err
	}

	return &orgModel.OrganizerId, nil
}

// GetUserByID retrieves a user by their ID.
func (r *OrganizerRepository) GetOrganizerIdFromUserId(req string) (string, error) {
	log.Println("[REPO: GetOrganizerIdFromUserId]: Called")
	var organizer models.Organizer
	if err := r.db.Where("user_id = ?", req).Find(&organizer).Error; err != nil {
		return "", err
	}
	return organizer.OrganizerId, nil
}

func (r *OrganizerRepository) GetUserIdFromOrganizerId(req string) (string, error) {
	log.Println("[REPO: GetUserIdFromOrganizerId]: Called")
	var organizer models.Organizer
	if err := r.db.Where("organizer_id = ?", req).Find(&organizer).Error; err != nil {
		return "", err
	}
	return organizer.UserId, nil
}
