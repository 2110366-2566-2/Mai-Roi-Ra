package models

import (
	"time"
)

type Transaction struct {
	TransactionID     string    `gorm:"column:transaction_id;primaryKey"`
	UserID            string    `gorm:"column:user_id;not null"`
	EventID           string    `gorm:"column:event_id;not null"`
	TransactionAmount float64   `gorm:"column:transaction_amount"`
	TransactionDate   time.Time `gorm:"column:transaction_date;autoCreateTime"`
	Status            string    `gorm:"column:status;not null;check:status in ('Completed','Pending','Cancelled')"`
	TransactionWay    string    `gorm:"column:transaction_way;not null"`
	CreatedAt         time.Time `gorm:"column:created_at;autoCreateTime"`
	UpdatedAt         time.Time `gorm:"column:updated_at"`
}

func (Transaction) TableName() string {
	return "transactions"
}
