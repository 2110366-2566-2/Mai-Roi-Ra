package models

import (
	"time"
)

type Problem struct {
	ProblemId     string     `gorm:"column:problem_id;not null;primaryKey"`
	UserId        string     `gorm:"column:user_id;not null"`
	AdminUsername *string    `gorm:"column:admin_username"`
	Problem       string     `gorm:"column:problem;not null"`
	Description   string     `gorm:"column:description;not null"`
	Reply         *string    `gorm:"column:reply"`
	Status        string     `gorm:"column:status;not null"`
	CreatedAt     time.Time  `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt     *time.Time `gorm:"column:updated_at;autoUpdateTime"`
}

func (Problem) TableName() string {
	return "problems"
}
