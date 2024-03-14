package mail

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"strings"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/utils"
	"github.com/jordan-wright/email"
)

const (
	smtpHost = "smtp.gmail.com"
	smtpPort = "587"
)

type EmailSender interface {
	SendEmail(
		subject string,
		contentText string,
		contentHTML string,
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

func (sender *GmailSender) SendEmail(subject string, contentText string, contentHTML string, to []string, cc []string, bcc []string, attachFiles []string) error {
	e := email.NewEmail()
	e.From = fmt.Sprintf("%s <%s>", sender.name, sender.fromEmailAddress)
	e.To = to
	e.Cc = cc
	e.Bcc = bcc
	e.Subject = subject
	e.Text = []byte(contentText)
	e.HTML = []byte(contentHTML)

	tempFiles := []string{}

	wd, err := os.Getwd()
	if err != nil {
		log.Println("Error getting working directory:", err)
	} else {
		log.Println("Current working directory:", wd)
	}

	for _, file := range attachFiles {
		// Handle http file path
		if strings.HasPrefix(file, "http://") || strings.HasPrefix(file, "https://") {
			tempFilePath := "temp_image.jpg"
			err := utils.DownloadImage(file, tempFilePath)
			if err != nil {
				log.Println("[Utils: SendEmail]: Failed to download image:", err)
				return err
			}
			_, err = e.AttachFile(tempFilePath)
			if err != nil {
				log.Println("[Utils: SendEmail]: Failed to attach downloaded image:", err)
				return err
			}
			tempFiles = append(tempFiles, tempFilePath)
		} else {
			// Handle local file path
			_, err := e.AttachFile(file)
			if err != nil {
				log.Println("[Utils: SendEmail]: Failed to attach file:", err)
				return err
			}
		}
	}
	smtpAddr := fmt.Sprintf("%s:%s", smtpHost, smtpPort)
	auth := smtp.PlainAuth("", sender.fromEmailAddress, sender.fromEmailPassword, smtpHost)
	if err := e.Send(smtpAddr, auth); err != nil {
		log.Println("[Utils: SendEmail]: Failed to send email:", err)
		return err
	}

	// Cleanup temporary files
	for _, tempFile := range tempFiles {
		path := "usr/src/app/" + tempFile
		log.Println("PATH:", path)
		err := os.Remove(path)
		if err != nil {
			log.Println("[Utils: SendEmail]: Failed to remove temporary file:", tempFile, err)
		}
	}
	return nil
}
