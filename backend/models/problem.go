package models

import (
	"time"
)

type Problem struct {
	ProblemID     string     `gorm:"column:problem_id;not null;primaryKey" json:"problem_id"`
	AdminUsername string     `gorm:"column:admin_username;not null" json:"admin_username"`
	Problem       string     `gorm:"column:problem;not null" json:"problem"`
	Description   string     `gorm:"column:description;not null" json:"description"`
	Reply         *string    `gorm:"column:reply" json:"reply"` // Can be NULL
	Status        string     `gorm:"column:status;not null" json:"status"`
	CreatedAt     time.Time  `gorm:"column:created_at;not null;autoCreateTime" json:"created_at"`
	UpdatedAt     *time.Time `gorm:"column:updated_at" json:"updated_at"` // Can be NULL
}

func (Problem) TableName() string {
	return "problems"
}
