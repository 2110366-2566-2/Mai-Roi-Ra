package routers

import (
	"log"

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
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	})
}

func SetupRouter(c *dig.Container) *gin.Engine {
	r := gin.Default()

	r.Use(setupCORS())

	// Swagger setup
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	groupRoutes := r.Group("api/v1")

	err := c.Invoke(func(controller *controllers.Controller) {
		setupEventRoutes(groupRoutes, controller.Gateway.EventController)
		setupLocationRoutes(groupRoutes, controller.Gateway.LocationController)
		setupUserRoutes(groupRoutes, controller.Gateway.UserController)
		setupTestRoutes(groupRoutes, controller.Gateway.TestController)
		setupAnnouncementRoutes(groupRoutes, controller.Gateway.AnnouncementController)
		setupParticipateRoutes(groupRoutes, controller.Gateway.ParticipateController)
		setupProblemRoutes(groupRoutes, controller.Gateway.ProblemController)
		setupTransactionRoutes(groupRoutes, controller.Gateway.TransactionController)
		setupRefundRoutes(groupRoutes, controller.Gateway.RefundController)
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	return r
}

func setupEventRoutes(r *gin.RouterGroup, controller *controllers.EventController) {
	eventRoutes := r.Group("/events")
	{
		eventRoutes.POST("/", controller.CreateEvent)
		eventRoutes.GET("/", controller.GetEventLists)
		eventRoutes.GET("/:id", controller.GetEventDataById)
		eventRoutes.PUT("/:id", controller.UpdateEvent)
		eventRoutes.PUT("/:id/verify", controller.VerifyEvent)
		eventRoutes.DELETE("/:id", controller.DeleteEventById)
		eventRoutes.GET("/participant", controller.GetParticipantLists)
	}
}

func setupLocationRoutes(r *gin.RouterGroup, controller *controllers.LocationController) {
	locationRoutes := r.Group("/locations")
	{
		locationRoutes.GET("/:id", controller.GetLocationById)
	}
}

func setupUserRoutes(r *gin.RouterGroup, controller *controllers.UserController) {
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/", controller.CreateUser)
		userRoutes.POST("/participate", controller.RegisterEvent)
		userRoutes.GET("/:id", controller.GetUserByUserId)
		userRoutes.GET("/events", controller.GetParticipatedEventLists)
		userRoutes.POST("/:id/searchevent", controller.SearchEvent)
		userRoutes.GET("/:id/searchhistory", controller.GetSearchHistories)
		userRoutes.PUT("/:id", controller.UpdateUserInformation)
		userRoutes.PUT("/notification", controller.ToggleNotifications)
		userRoutes.DELETE("/:event_id", controller.CancelRegisterEvent)
		userRoutes.PUT("/send_otp_email", controller.SendOTPEmail)
		userRoutes.PUT("/verify_otp", controller.VerifyOTP)
		userRoutes.PUT("/update_user_role", controller.UpdateUserRole)
	}
	loginRoutes := r.Group("")
	{
		loginRoutes.POST("/login", controller.LoginUser)
		loginRoutes.POST("/loginemail", controller.LoginUserEmail)
		loginRoutes.POST("/loginphone", controller.LoginUserPhone)
	}
	authRoutes := r.Group("", middleware.Authentication())
	{
		authRoutes.POST("/logout", controller.LogoutUser)
		authRoutes.GET("/auth/users", controller.GetAllUsers)
	}
	gAuth := r.Group("", middleware.GoogleAuth())
	{
		gAuth.GET("/auth/:provider/login", controller.LoginGoogle)
		gAuth.GET("/auth/:provider/callback", controller.CallbackGoogle)
	}
}

func setupTestRoutes(r *gin.RouterGroup, controller *controllers.TestController) {
	testRoutes := r
	{
		testRoutes.POST("/upload", controller.TestUpload)
		testRoutes.GET("/", controller.GetTest)
		testRoutes.GET("/test/qr", controller.TestCreatePromptPayPayment)
	}
}

func setupAnnouncementRoutes(r *gin.RouterGroup, controller *controllers.AnnouncementController) {
	announcementRoutes := r.Group("/announcements")
	{
		announcementRoutes.POST("/", controller.SendAnnouncement)
		announcementRoutes.POST("/registered_email", controller.SendRegisteredEmail)
		announcementRoutes.POST("/reminder_email", controller.SendReminderEmail)
		announcementRoutes.POST("/cancelled_email", controller.SendCancelledEmail)
	}
}

func setupParticipateRoutes(r *gin.RouterGroup, controller *controllers.ParticipateController) {
	participateRoutes := r.Group("/participate")
	{
		participateRoutes.GET("/is_registered", controller.IsRegistered)
	}
}

func setupProblemRoutes(r *gin.RouterGroup, controller *controllers.ProblemController) {
	problemRoutes := r.Group("/problems")
	{
		problemRoutes.POST("/", controller.CreateProblem)
		problemRoutes.GET("/:id", controller.GetProblemDetailById)
		problemRoutes.GET("/", controller.GetProblemLists)
		problemRoutes.PUT("/:id", controller.UpdateProblem)
		problemRoutes.DELETE("/:id", controller.DeleteProblemById)
	}
}

func setupTransactionRoutes(r *gin.RouterGroup, controller *controllers.TransactionController) {
	transactionRoutes := r.Group("/transactions")
	{
		transactionRoutes.POST("/qr", controller.CreateQRPromptPay)
		transactionRoutes.GET("/payment-intent/:id", controller.GetPaymentIntentById)
	}
}

func setupRefundRoutes(r *gin.RouterGroup, controller *controllers.RefundController) {
	refundRoutes := r.Group("/refunds")
	{
		refundRoutes.POST("/", controller.CreateRefund)
	}
}
