package repository

import (
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"gorm.io/gorm"
)

type AnnouncementRepository struct {
	DB *gorm.DB
}

type IAnnouncementRepository interface {
	GetAnnouncementsForEvent(req *st.GetAnnouncementListsRequest) (*st.GetAnnouncementListsResponse, error)
}

func NewAnnouncementRepository(
	DB *gorm.DB,
) IAnnouncementRepository {
	return &AnnouncementRepository{
		DB: DB,
	}
}

func (r *AnnouncementRepository) GetAnnouncementsForEvent(req *st.GetAnnouncementListsRequest) (*st.GetAnnouncementListsResponse, error) {
	log.Println("[Repo: GetAnnouncementsForEvent]: Called")
	var AnnouncementLists []*models.Announcement
	query := r.DB

	if req.EventId != "" {
		query = query.Where(`event_id=?`, req.EventId)
	}

	// Sorting by req.CreateAt from latest to oldest
	query = query.Order("created_at DESC")

	if err := query.Find(&AnnouncementLists).Error; err != nil {
		log.Println("[Repo: GetParticipanstForEvent]: cannot query the participants:", err)
		return nil, err
	}

	res := &st.GetAnnouncementListsResponse{
		AnnouncementList: make([]st.Announcement, 0),
	}
	for _,v := range AnnouncementLists {
		announcement := &st.Announcement{
			Header: v.Header,
			Description: v.Description,
			CreatedAt: v.CreatedAt,
			UpdatedAt: v.UpdatedAt,
		}
		res.AnnouncementList = append(res.AnnouncementList, *announcement)
	}
	return res, nil
}