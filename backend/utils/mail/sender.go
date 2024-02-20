package mail

import (
	"fmt"
	"log"
	"net/smtp"

	"github.com/jordan-wright/email"
)

const (
	smtpHost = "smtp.gmail.com"
	smtpPort = "587"
)

type EmailSender interface {
	SendEmail(
		subject string,
		content string,
		to []string,
		cc []string,
		bcc []string,
		attachFiles []string,
	) error
}

type GmailSender struct {
	name              string
	fromEmailAddress  string
	fromEmailPassword string
}

func NewGmailSender(name string, fromEmailAddress string, fromEmailPassword string) EmailSender {
	return &GmailSender{
		name:              name,
		fromEmailAddress:  fromEmailAddress,
		fromEmailPassword: fromEmailPassword,
	}
}

func (sender *GmailSender) SendEmail(subject string, content string, to []string, cc []string, bcc []string, attachFiles []string) error {
	e := email.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", sender.name, sender.fromEmailAddress)
	e.To = to
	e.Cc = cc
	e.Bcc = bcc
	e.Subject = subject
	e.HTML = []byte(content)

	// Attached file
	for _, file := range attachFiles {
		_, err := e.AttachFile(file)
		if err != nil {
			log.Println("[Utils: SendEmail]: Failed to attached file:", err)
			return err
		}
	}

	// Set up SMTP server configuration.
	smtpAddr := fmt.Sprintf("%s:%s", smtpHost, smtpPort)

	// SMTP server authentication information.
	fmt.Println("From:", sender.fromEmailAddress)
	fmt.Println("FromPassword:", sender.fromEmailPassword)
	auth := smtp.PlainAuth("", sender.fromEmailAddress, sender.fromEmailPassword, smtpHost)

	err := e.Send(smtpAddr, auth)
	if err != nil {
		log.Println("[Utils: SendEmail]: Failed to send email:", err)
		return err
	}
	return nil
}
