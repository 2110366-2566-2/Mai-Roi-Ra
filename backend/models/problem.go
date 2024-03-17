package models

import (
	"time"
)

// Problem model definition
type Problem struct {
	ProblemId     string    `gorm:"column:problem_id;not null;primaryKey" json:"problem_id" binding:"required"`
	AdminUsername string    `gorm:"column:admin_username;not null" json:"admin_username"`
	Problem       string    `gorm:"column:problem;not null" json:"problem"`
	Description   string    `gorm:"column:description;not null" json:"description"`
	Reply         string    `gorm:"column:reply;not null" json:"reply"`
	Status        string    `gorm:"column:status;not null" json:"status"`
	CreatedAt     time.Time `gorm:"column:created_at;autoCreateTime" json:"created_at"`
	UpdatedAt     time.Time `gorm:"column:updated_at;autoUpdateTime" json:"updated_at"`
}

func (Problem) TableName() string {
	return "problems"
}
