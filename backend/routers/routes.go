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
		AllowOrigins:     []string{"http://localhost:3000","https://mairoira-final.vercel.app/"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	})
}

func SetupRouter(c *dig.Container) *gin.Engine {
	r := gin.Default()

	r.Use(setupCORS())
	//r.Use(middleware.Authorization())

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
		setupPostRoutes(groupRoutes, controller.Gateway.PostController)
		setupResponseRoutes(groupRoutes, controller.Gateway.ResponseController)
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
		eventRoutes.POST("/", middleware.Authentication(), middleware.Authorization(), controller.CreateEvent)               // Organizer , Admin
		eventRoutes.GET("/", controller.GetEventLists)                                                                       // All
		eventRoutes.GET("/end/:id", controller.GetEndedEventLists)                                                           // All
		eventRoutes.GET("/:id", controller.GetEventDataById)                                                                 // All
		eventRoutes.PUT("/:id", middleware.Authentication(), middleware.Authorization(), controller.UpdateEvent)             // Organizer , Admin
		eventRoutes.PUT("/upload/:id", middleware.Authentication(), middleware.Authorization(), controller.UpdateEventImage) // Organizer , Admin
		eventRoutes.PUT("/:id/verify", middleware.Authentication(), middleware.Authorization(), controller.VerifyEvent)      // Admin
		eventRoutes.DELETE("/:id", middleware.Authentication(), middleware.Authorization(), controller.DeleteEventById)      // Organizer , Admin
		eventRoutes.GET("/participant", controller.GetParticipantLists)                                                      // All
	}
}

func setupLocationRoutes(r *gin.RouterGroup, controller *controllers.LocationController) {
	locationRoutes := r.Group("/locations")
	{
		locationRoutes.GET("/:id", controller.GetLocationById) // All
	}
}

func setupUserRoutes(r *gin.RouterGroup, controller *controllers.UserController) {
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/", controller.CreateUser)                                                                              // All
		userRoutes.POST("/participate", middleware.Authentication(), middleware.Authorization(), controller.RegisterEvent)       // User
		userRoutes.GET("/:id", controller.GetUserByUserId)                                                                       // All
		userRoutes.GET("/events", controller.GetParticipatedEventLists)                                                          // All
		userRoutes.POST("/:id/searchevent", controller.SearchEvent)                                                              // All
		userRoutes.GET("/:id/searchhistory", controller.GetSearchHistories)                                                      // All
		userRoutes.PUT("/:id", controller.UpdateUserInformation)                                                                 // All
		userRoutes.PUT("/upload/:id", controller.UpdateUserProfileImage)                                                         // All
		userRoutes.PUT("/notification", controller.ToggleNotifications)                                                          // All
		userRoutes.DELETE("/:event_id", middleware.Authentication(), middleware.Authorization(), controller.CancelRegisterEvent) // User , Admin
		userRoutes.PUT("/send_otp_email", controller.SendOTPEmail)                                                               // All
		userRoutes.PUT("/verify_otp", controller.VerifyOTP)                                                                      // All
		userRoutes.PUT("/update_user_role", middleware.Authentication(), middleware.Authorization(), controller.UpdateUserRole)  // Admin
		userRoutes.GET("/verification_status", controller.GetUserVerificationStatus)                                             // All
	}
	loginRoutes := r.Group("")
	{
		loginRoutes.POST("/login", controller.LoginUser)           // All
		loginRoutes.POST("/loginemail", controller.LoginUserEmail) // All
		loginRoutes.POST("/loginphone", controller.LoginUserPhone) // All
	}
	authRoutes := r.Group("", middleware.Authentication())
	{
		authRoutes.POST("/logout", controller.LogoutUser)     // All
		authRoutes.GET("/auth/users", controller.GetAllUsers) // All
	}
	gAuth := r.Group("", middleware.GoogleAuth())
	{
		gAuth.GET("/auth/:provider/login", controller.LoginGoogle)       // All
		gAuth.GET("/auth/:provider/callback", controller.CallbackGoogle) // All
	}
}

func setupTestRoutes(r *gin.RouterGroup, controller *controllers.TestController) {
	testRoutes := r
	{
		testRoutes.POST("/upload", controller.TestUpload) // All
		testRoutes.GET("/", controller.GetTest)           // All
	}
}

func setupAnnouncementRoutes(r *gin.RouterGroup, controller *controllers.AnnouncementController) {
	announcementRoutes := r.Group("/announcements")
	{
		announcementRoutes.POST("/", controller.SendAnnouncement)                    // All
		announcementRoutes.POST("/registered_email", controller.SendRegisteredEmail) // All
		announcementRoutes.POST("/reminder_email", controller.SendReminderEmail)     // All
		announcementRoutes.POST("/cancelled_email", controller.SendCancelledEmail)   // All
	}
}

func setupParticipateRoutes(r *gin.RouterGroup, controller *controllers.ParticipateController) {
	participateRoutes := r.Group("/participate")
	{
		participateRoutes.GET("/is_registered", controller.IsRegistered) //	All
	}
}

func setupProblemRoutes(r *gin.RouterGroup, controller *controllers.ProblemController) {
	problemRoutes := r.Group("/problems")
	{
		problemRoutes.POST("/", controller.CreateProblem)          // All
		problemRoutes.GET("/:id", controller.GetProblemDetailById) // All
		problemRoutes.GET("/", controller.GetProblemLists)         // All
		problemRoutes.PUT("/:id", controller.UpdateProblem)        // All
		problemRoutes.DELETE("/:id", controller.DeleteProblemById) // All
	}
}

func setupTransactionRoutes(r *gin.RouterGroup, controller *controllers.TransactionController) {
	transactionRoutes := r.Group("/transactions")
	{
		transactionRoutes.POST("/payment", controller.CreatePayment)                          // All
		transactionRoutes.GET("/payment-intent/:id", controller.GetPaymentIntentById)         // All
		transactionRoutes.POST("/send_email", controller.SendTransactionEmail)                // All
		transactionRoutes.POST("/transfer", controller.TransferToOrganizer)                   // All
		transactionRoutes.GET("/payment-intent/confirm/:id", controller.ConfirmPaymentIntent) // All
		transactionRoutes.GET("/is_paid", controller.IsPaid)                                  // All
	}
}

func setupRefundRoutes(r *gin.RouterGroup, controller *controllers.RefundController) {
	refundRoutes := r.Group("/refunds")
	{
		refundRoutes.POST("/", middleware.Authentication(), middleware.Authorization(), controller.CreateRefund) // User , Admin
		refundRoutes.POST("/email", controller.SendRefundEmail)                                                  // All
	}
}

func setupPostRoutes(r *gin.RouterGroup, controller *controllers.PostController) {
	postRoutes := r.Group("/posts")
	{
		postRoutes.GET("/:id", controller.GetPostById)                                                                 // All
		postRoutes.GET("/events/:id", controller.GetPostListsByEventId)                                                // All
		postRoutes.GET("/is_reviewed", middleware.Authentication(), middleware.Authorization(), controller.IsReviewed) // User , Admin
		postRoutes.POST("/", middleware.Authentication(), middleware.Authorization(), controller.CreatePost)           // User , Admin
		postRoutes.DELETE("/:id", controller.DeletePostById)                                                           // Admin
	}
}

func setupResponseRoutes(r *gin.RouterGroup, controller *controllers.ResponseController) {
	responseRoutes := r.Group("/responses")
	{
		responseRoutes.GET("/:id", controller.GetResponseByPostId)                                                   // All
		responseRoutes.POST("/", middleware.Authentication(), middleware.Authorization(), controller.CreateResponse) // Organizer , Admin
	}
}
