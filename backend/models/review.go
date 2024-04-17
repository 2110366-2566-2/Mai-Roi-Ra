package models

type Review struct {
	UserId  string `gorm:"column:user_id;not null"`
	EventId string `gorm:"column:event_id;not null"`
	PostId  string `gorm:"column:post_id;not null"`
}

func (Review) TableName() string {
	return "reviews"
}

