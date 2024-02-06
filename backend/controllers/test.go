package controllers

import (
	"log"
	"net/http"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/models"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/services"
	_ "github.com/2110366-2566-2/Mai-Roi-Ra/backend/swagger/docs" // Import the auto-generated docs file
	"github.com/gin-gonic/gin"
)
type TestController struct {
	logger         *log.Logger
	ServiceGateway services.ServiceGateway
}

// @Summary GetTest
// @Description Get a test message
// @Tags Test
// @Accept json
// @Produce json
// @Success 200 {object} st.TestResponse
// @Router /test [get]
func GetTest(c *gin.Context) {
	log.Println("[CTRL: GetTest] Called")

	res, err := services.GetTest()

	if err != nil {
		log.Fatal("[CTRL: GetTest] error: ", err)
	}

	respo := st.TestResponse{
		Message: res.Message,
	}
	c.JSON(http.StatusOK, respo)
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