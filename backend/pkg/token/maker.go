package token

import (
	"time"
)

// maker is use to manage token creation
type Maker interface {
	// create token for a specific username and duration
	CreateToken(username string, duration time.Duration) (string, error)

	//vertifying token check validation
	VertifyToken(token string) (*Payload, error)
}
