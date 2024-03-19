package routers

import (
	"log"

	//"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/middleware"

	controllers "github.com/2110366-2566-2/Mai-Roi-Ra/backend/controllers"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/middleware"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/token"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.uber.org/dig"
)

type routers struct {
	tokenMaker token.Maker
}

func setupCORS() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	})
}

func SetupRouter(c *dig.Container) *gin.Engine {
	r := gin.Default()

	r.Use(setupCORS())

	// Swagger setup
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	err := c.Invoke(func(eventController *controllers.EventController, locationController *controllers.LocationController, userController *controllers.UserController, testController *controllers.TestController, announcementController *controllers.AnnouncementController, participateController *controllers.ParticipateController, problemController *controllers.ProblemController) {
		setupEventRoutes(r, eventController)
		setupLocationRoutes(r, locationController)
		setupUserRoutes(r, userController)
		setupTestRoutes(r, testController)
		setupAnnouncementRoutes(r, announcementController)
		setupParticipateRoutes(r, participateController)
		setupProblemRoutes(r, problemController)
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	return r
}

func setupEventRoutes(r *gin.Engine, controller *controllers.EventController) {
	eventRoutes := r.Group("/api/v1/events")
	{
		eventRoutes.POST("", controller.CreateEvent)
		eventRoutes.GET("", controller.GetEventLists)
		eventRoutes.GET("/:id", controller.GetEventDataById)
		eventRoutes.PUT("/:id", controller.UpdateEvent)
		eventRoutes.DELETE("/:id", controller.DeleteEventById)
	}
}

func setupLocationRoutes(r *gin.Engine, controller *controllers.LocationController) {
	locationRoutes := r.Group("/api/v1/locations")
	{
		locationRoutes.GET("", controller.GetLocationById)
	}
}

func setupUserRoutes(r *gin.Engine, controller *controllers.UserController) {
	userRoutes := r.Group("/api/v1/users")
	{
		userRoutes.POST("/", controller.CreateUser)
		userRoutes.POST("/participate", controller.RegisterEvent)
		userRoutes.GET("/:id", controller.GetUserByUserId)
		userRoutes.GET("/events", controller.GetParticipatedEventLists)
		userRoutes.GET("/:id/searchevent", controller.SearchEvent)
		userRoutes.GET("/:id/searchhistory", controller.GetSearchHistories)
		userRoutes.PUT("/:id", controller.UpdateUserInformation)
		userRoutes.PUT("/notification", controller.ToggleNotifications)
		userRoutes.DELETE("/:event_id", controller.CancelRegisterEvent)
	}
	loginRoutes := r.Group("/api/v1")
	{
		loginRoutes.POST("/login", controller.LoginUser)
		loginRoutes.POST("/loginemail", controller.LoginUserEmail)
		loginRoutes.POST("/loginphone", controller.LoginUserPhone)
	}
	authRoutes := r.Group("/api/v1", middleware.Authentication())
	{
		authRoutes.POST("/logout", controller.LogoutUser)
		authRoutes.GET("/auth/users", controller.GetAllUsers)
	}
}

func setupTestRoutes(r *gin.Engine, controller *controllers.TestController) {
	testRoutes := r.Group("/api/v1/test")
	{
		testRoutes.GET("", controller.GetTest)
	}
}

func setupAnnouncementRoutes(r *gin.Engine, controller *controllers.AnnouncementController) {
	announcementRoutes := r.Group("/api/v1/announcements")
	{
		announcementRoutes.POST("/", controller.SendAnnouncement)
		announcementRoutes.POST("/registered_email", controller.SendRegisteredEmail)
		announcementRoutes.POST("/reminder_email", controller.SendReminderEmail)
		announcementRoutes.POST("/cancelled_email", controller.SendCancelledEmail)
	}
}

func setupParticipateRoutes(r *gin.Engine, controller *controllers.ParticipateController) {
	participateRoutes := r.Group("/api/v1/participate")
	{
		participateRoutes.POST("/is_registered", controller.IsRegistered)
	}
}

func setupProblemRoutes(r *gin.Engine, controller *controllers.ProblemController) {
	problemRoutes := r.Group("/api/v1/problems")
	{
		problemRoutes.POST("", controller.CreateProblem)
		problemRoutes.GET("/:id", controller.GetProblemDetailById)
		problemRoutes.GET("", controller.GetProblemLists)
		problemRoutes.PUT("/:id", controller.UpdateProblem)
		problemRoutes.DELETE("/:id", controller.DeleteProblemById)
	}
}
