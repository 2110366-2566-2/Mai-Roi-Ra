package models

type Review struct {
	UserId  string `gorm:"column:UserId;not null" json:"user_id" binding:"required"`
	EventId string `gorm:"column:EventId;not null" json:"event_id" binding:"required"`
	PostId  string `gorm:"column:PostId;not null" json:"post_id" binding:"required"`
}

func (Review) TableName() string {
	return "Reviews"
}
