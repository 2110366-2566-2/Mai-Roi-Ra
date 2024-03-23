package utils

import (
	"fmt"
	"math/rand"
	"time"

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

func GenerateOTP() string {
	// Create a new random number generator
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	otp := rng.Intn(1000000)        // Generates a number between 0 - 999999
	return fmt.Sprintf("%06d", otp) // Ensures the OTP is 6 digits, padding with zeros if necessary
}

