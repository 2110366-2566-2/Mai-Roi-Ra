package main

import (
	"fmt"
	"log"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	container "github.com/2110366-2566-2/Mai-Roi-Ra/backend/container"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/routers"
	//uncomment to start scheduler
	//"github.com/2110366-2566-2/Mai-Roi-Ra/backend/scheduler"
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
	cfg, err := config.NewConfig(func() string {
		return ".env"
	}())
	if err != nil {
		log.Println("[Config]: Error initializing .env")
		// return
	}

	c := container.NewContainer()

	r := routers.SetupRouter(c.Container)

	//uncomment to start scheduler
	//go scheduler.StartReminderEmailJob()
	
	port := fmt.Sprintf(":%s", cfg.App.AppPort)
	if err := r.Run(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
