package utils

import (
	"github.com/google/uuid"
)

const (
	// numberBytes  = "1234567890"
	// letterBytes  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	// alphanumeric = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
)

// GenerateUUID ...
func GenerateUUID() string {
	return uuid.New().String()
}
