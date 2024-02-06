package models

import (
	"time"
)

type Admin struct {
	AdminId   string    `gorm:"primaryKey;column:AdminId" json:"admin_id" binding:"required"`
	Password  string    `gorm:"column:Password" json:"password" binding:"required"`
	CreatedAt time.Time `gorm:"column:CreatedAt;autoCreateTime" json:"created_at"`
}

func (Admin) TableName() string {
	return "Admins"
}
