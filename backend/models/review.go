package models

type Review struct {
	UserId  string `gorm:"column:user_id;not null" json:"user_id" binding:"required"`
	EventId string `gorm:"column:event_id;not null" json:"event_id" binding:"required"`
	PostId  string `gorm:"column:post_id;not null" json:"post_id" binding:"required"`
}

func (Review) TableName() string {
	return "reviews"
}
