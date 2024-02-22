package repository

import (
	"gorm.io/gorm"
)

type AdminRepository struct {
	db *gorm.DB
}

type IAdminRepository interface {
	// GetRandomAdmin() (*models.Admin, error)
}

func NewAdminRepository(
	db *gorm.DB,
) IAdminRepository {
	return &AdminRepository{
		db: db,
	}
}

// func (r *AdminRepository) GetRandomAdmin() (*models.Admin, error) {
// 	log.Println("[Repo: GetRandomAdmin]: Called")
// 	var admin models.Admin
// 	if err := r.db.Order("RANDOM()").First(&admin).Error; err != nil {
// 		log.Println("[Repo: GetRandomAdmin]: Error randomized the admin")
// 		return nil, err
// 	}
// 	return &admin, nil
// }
