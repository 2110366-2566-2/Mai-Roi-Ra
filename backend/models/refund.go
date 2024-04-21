package models

import (
	"time"
)

type Refund struct {
	RefundId      string    `gorm:"column:refund_id;not null;primaryKey"`
	TransactionId string    `gorm:"column:transaction_id;not null"`
	UserId        string    `gorm:"column:user_id;not null"`
	RefundAmount  float64   `gorm:"column:refund_amount;not null"`
	RefundReason  string    `gorm:"column:refund_reason;not null"`
	RefundDate    time.Time `gorm:"column:refund_date;not null;default:CURRENT_TIMESTAMP"`
}

func (Refund) TableName() string {
	return "refunds"
}