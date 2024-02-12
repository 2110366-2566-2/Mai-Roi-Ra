package main

import (
	"log"

	container "github.com/2110366-2566-2/Mai-Roi-Ra/backend/container"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/routers"
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
	c := container.NewContainer()

	r := routers.SetupRouter(c.Container)

	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
