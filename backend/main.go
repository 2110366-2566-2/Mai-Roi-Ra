package main

import (
	"log"

	controllers "github.com/2110366-2566-2/Mai-Roi-Ra/backend/controllers"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/db"
	repository "github.com/2110366-2566-2/Mai-Roi-Ra/backend/repositories"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           Mai-Roi-Ra Swagger API
// @version         1.0
// @description     This is a sample server Mai-Roi-Ra api gateway.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.basic  BasicAuth

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	r := gin.Default()

	// dbMongoClient, err := db.InitMongoDB()
	// if err != nil {
	// 	defer dbMongoClient.Disconnect(context.Background())
	// 	log.Fatal("Error initializing MongoDB:", err)
	// }

	if err := db.InitPgDB(); err != nil {
		log.Fatal("Error connecting to the database:", err)
	}

	//initialize everything and inject the UserRepository into the controller
	controllers.InitializeUserController(repository.NewUserRepository(db.DB.Db))

	r.GET("/api/v1/test", controllers.GetTest)
	r.POST("/api/v1/events", controllers.CreateEvent)
	r.PUT("/api/v1/events/:eventid", controllers.UpdateEvent)
	r.DELETE("/api/v1/events/:eventid", controllers.DeleteEvent)

	// Initialize swagger docs
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8080")
}
