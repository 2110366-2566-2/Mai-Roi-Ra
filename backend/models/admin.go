package models

import (
	"time"
)

type Admin struct {
	AdminId   string    `gorm:"primaryKey;column:admin_id" json:"admin_id" binding:"required"`
	Password  string    `gorm:"column:password" json:"password" binding:"required"`
	CreatedAt time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Admin) TableName() string {
	return "admins"
}
