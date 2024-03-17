package models

import (
	"time"
)

type Refund struct {
	RefundId      string    `gorm:"column:refund_id;not null;primaryKey" json:"refund_id"`
	TransactionId string    `gorm:"column:transaction_id;not null" json:"transaction_id"`
	UserId        string    `gorm:"column:user_id;not null" json:"user_id"`
	RefundAmount  float64   `gorm:"column:refund_amount;not null" json:"refund_amount"`
	RefundReason  string    `gorm:"column:refund_reason;not null" json:"refund_reason"`
	RefundDate    time.Time `gorm:"column:refund_date;not null;default:CURRENT_TIMESTAMP" json:"refund_date"`
}

func (Refund) TableName() string {
	return "refunds"
}
