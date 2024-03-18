package models

import (
	"time"
)

type Transaction struct {
	TransactionID     string    `gorm:"column:transaction_id;primaryKey" json:"transaction_id"`
	UserID            string    `gorm:"column:user_id;not null" json:"user_id" binding:"required"`
	TransactionAmount float64   `gorm:"column:transaction_amount" json:"transaction_amount" binding:"required"`
	TransactionDate   time.Time `gorm:"column:transaction_date;autoCreateTime" json:"transaction_date"`
	Status            string    `gorm:"column:status;not null;check:status in ('Completed','Pending','Canceled')" json:"status" binding:"required"`
}

func (Transaction) TableName() string {
	return "transactions"
}
