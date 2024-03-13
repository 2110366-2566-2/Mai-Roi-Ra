package mail

import (
	"testing"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/stretchr/testify/require"
)

func TestSendEmailWithGmail(t *testing.T) {
	cfg, err := config.NewConfig(func() string {
		return "../../.env"
	}())

	require.NoError(t, err)

	sender := NewGmailSender(cfg.Email.Name, cfg.Email.Address, cfg.Email.Password)

	subject := "A test email"
	content := `
	<h1>Hello World </h1>
	<p> This is a test message from natchy </p>
	`
	to := []string{"natthasith.wir@gmail.com"}
	attachFiles := []string{"../../../README.md"}

	err = sender.SendEmail(subject, content, content, to, nil, nil, attachFiles)
	require.NoError(t, err)
}
