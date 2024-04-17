package cloud

import (
	"context"
	"os"

	//"fmt"
	"log"
	"mime/multipart"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gin-gonic/gin"
)

type awsService struct {
	service    *s3.S3
	bucketName string
}

type CloudService interface {
	SaveFile(ctx *gin.Context, fileHeader *multipart.FileHeader) (uploadId string, err error)
	GetFileUrl(ctx context.Context, uploadID string) (string, error)
}

func NewAWSCloudService(bucket string) *awsService {
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		return nil
	}
	session, err := session.NewSession(&aws.Config{
		Region:      aws.String(cfg.S3.AwsRegion),
		Credentials: credentials.NewStaticCredentials(cfg.S3.AwsAccessKeyID, cfg.S3.AwsSecretKey, ""),
	})
	if err != nil {
		return nil
	}

	service := s3.New(session)

	res := &awsService{
		service: service,
	}

	if bucket == constant.PROFILE {
		res.bucketName = cfg.S3.AwsBucketProfileName
	} else if bucket == constant.EVENT {
		res.bucketName = cfg.S3.AwsBucketEventName
	} else {
		log.Println("[Config]: Error wrong bucket name")
	}

	return res
}

func (c *awsService) SaveFile(ctx *gin.Context, fileHeader *multipart.FileHeader, id string) (string, error) {
	log.Println("[Service: awsService]: Called")
	file, err := fileHeader.Open()
	if err != nil {
		log.Println("Error open file", err)
		return "", err
	}

	_, err = c.service.PutObject(&s3.PutObjectInput{
		Body:        file,
		Bucket:      aws.String(c.bucketName),
		Key:         aws.String(id),
		ContentType: aws.String("image/jpeg"),
	})
	if err != nil {
		log.Println("Error save file", err)
		return "", err
	}
	log.Println("File Saved Successfully")

	var url string
	if c.bucketName == constant.EVENT {
		url = os.Getenv("AWS_EVENT_URL")
	} else {
		url = os.Getenv("AWS_PROFILE_URL")
	}

	url = url + id
	return url, nil
}

func (c *awsService) DeleteFile(ctx *gin.Context, uploadID string) error {
	log.Println("[Service: awsService]: Called to delete file with ID:", uploadID)

	_, err := c.service.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(c.bucketName),
		Key:    aws.String(uploadID),
	})
	if err != nil {
		log.Println("Error deleting file", err)
		return err
	}

	log.Println("File deleted successfully")
	return nil
}
