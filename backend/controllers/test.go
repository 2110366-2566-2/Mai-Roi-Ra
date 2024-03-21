package controllers

import (
	"log"
	"net/http"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/constant"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/cloud"
	_ "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	_ "github.com/2110366-2566-2/Mai-Roi-Ra/backend/swagger/docs" // Import the auto-generated docs file
	"github.com/gin-gonic/gin"
)

type TestController struct {
	// logger         *log.Logger
	ServiceGateway services.ServiceGateway
}

func NewTestController(
	sg services.ServiceGateway,
) *TestController {
	return &TestController{
		ServiceGateway: sg,
	}
}

// @Summary GetTest
// @Description Get a test message
// @Tags Test
// @Accept json
// @Produce json
// @Success 200 {object} structure.TestResponse
// @Router /test [get]
func (c *TestController) GetTest(ctx *gin.Context) {
	log.Println("[CTRL: GetTest] Called")

	res, err := services.GetTest()

	if err != nil {
		log.Fatal("[CTRL: GetTest] error: ", err)
	}

	ctx.JSON(http.StatusOK, res)
}

func (c *TestController) GetInformationByUserId(ctx *gin.Context, userId string) (models.User, error) {
	log.Println("[Service:CreateOrUpdateTransfer] Called")
	result, err := c.ServiceGateway.TestService.GetInformationByUserId(ctx, userId)
	if err != nil {
		log.Println(c, "[Service:GetInformationByUserId]: Call Service GetInformationByUserId error", err)
		return models.User{}, err
	}
	return result, nil
}

func (c *TestController) TestUpload(ctx *gin.Context) {
	log.Println("[CTRL: TestUpload] Called")
	fileHeader, err := ctx.FormFile("image")
	if err != nil {
		log.Println("[CTRL: TestUpload] Called and read header failed: ", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	// Check if filHeader is nil before accessing its properties
	if fileHeader == nil || fileHeader.Header == nil {
		log.Println("HELLO YEYEY: filHeader is nil or filHeader.Header is nil")
		return
	}
	Cloud := cloud.NewAWSCloudService(constant.EVENT) // or try changing to constant.PROFILE
	log.Println("FILEHEADER: ", fileHeader.Header)
	uploadId, err := Cloud.SaveFile(ctx, fileHeader)

	if err != nil {
		log.Println("[CTRL: TestUpload] Called and save file failed: ", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	url, err := Cloud.GetFileUrl(ctx, uploadId)
	if err != nil {
		log.Println("[CTRL: TestUpload] Called and get file failed: ", err)
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	log.Println(url)
}
