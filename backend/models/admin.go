package models

import (
	"time"
)

type Admin struct {
	AdminId   string    `gorm:"primaryKey;column:admin_id" json:"admin_id" binding:"required"`
	Password  string    `gorm:"column:password" json:"password" binding:"required"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
}

func (Admin) TableName() string {
	return "Admins"
}
