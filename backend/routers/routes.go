package routers

import (
	"log"
	"net/http"
	"strconv"

	//"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/middleware"

	controllers "github.com/2110366-2566-2/Mai-Roi-Ra/backend/controllers"
	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/middleware"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.uber.org/dig"
)

func SetupRouter(c *dig.Container) *gin.Engine {
	r := gin.Default()
	auth := r.Group("", middleware.Authentication(c)) //use auth instead of r if that api want authentication

	// Swagger setup
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Example of setting up a route using the container to resolve dependencies
	err := c.Invoke(func(eventController *controllers.EventController) {
		r.POST("/api/v1/events", func(ctx *gin.Context) {
			var req st.CreateEventRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			eventController.CreateEvent(ctx, &req)
		})
		r.GET("/api/v1/events", func(ctx *gin.Context) {
			offset, err := strconv.Atoi(ctx.DefaultQuery("offset", "0"))
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid offset value"})
				return
			}

			limit, err := strconv.Atoi(ctx.DefaultQuery("limit", "0"))
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit value"})
				return
			}
			req := &st.GetEventListsRequest{
				OrganizerId: ctx.Query("organizer_id"),
				Filter:      ctx.Query("filter"),
				Sort:        ctx.Query("sort"),
				Offset:      offset,
				Limit:       limit,
			}

			eventController.GetEventLists(ctx, req)
		})
		r.GET("/api/v1/events/:id", func(ctx *gin.Context) {
			req := st.GetEventDataByIdRequest{
				EventId: ctx.Param("id"),
			}
			eventController.GetEventDataById(ctx, req)
		})
		r.GET("/api/v1/events/participant", func(ctx *gin.Context) {
			offset, err := strconv.Atoi(ctx.DefaultQuery("offset", "0"))
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid offset value"})
				return
			}

			limit, err := strconv.Atoi(ctx.DefaultQuery("limit", "0"))
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit value"})
				return
			}

			req := &st.GetParticipantListsRequest{
				EventId: ctx.Query("event_id"),
				Offset:  offset,
				Limit:   limit,
			}
			eventController.GetParticipantLists(ctx, req)
		})
		r.PUT("/api/v1/events/:id", func(ctx *gin.Context) {
			var req st.UpdateEventRequest
			if err := ctx.BindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			req.EventId = ctx.Param("id")
			eventController.UpdateEvent(ctx, &req)
		})
		r.DELETE("/api/v1/events/:id", func(ctx *gin.Context) {
			req := st.DeleteEventRequest{
				EventId: ctx.Param("id"),
			}
			eventController.DeleteEventById(ctx, &req)
		})

	})

	if err != nil {
		log.Println(err)
		return nil
	}

	err = c.Invoke(func(locationController *controllers.LocationController) {
		r.GET("/api/v1/locations/:id", func(ctx *gin.Context) {
			req := st.GetLocationByIdRequest{
				LocationId: ctx.Param("id"),
			}
			locationController.GetLocationById(ctx, req)
		})
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	err = c.Invoke(func(testController *controllers.TestController) {
		r.GET("/api/v1/test", func(ctx *gin.Context) {
			// var req st.CreateEventRequest
			// if err := ctx.ShouldBindJSON(&req); err != nil {
			// 	ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			// 	return
			// }
			testController.GetTest(ctx)
		})
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	err = c.Invoke(func(userController *controllers.UserController) {
		// POST
		r.POST("/api/v1/users", func(ctx *gin.Context) {
			var req st.CreateUserRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			userController.CreateUser(ctx, &req)
		})
		r.POST("/api/v1/users/participate", func(ctx *gin.Context) {
			var req st.RegisterEventRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			userController.RegisterEvent(ctx, &req)
		})

		// GET
		r.GET("/api/v1/users/:id", func(ctx *gin.Context) {
			req := st.GetUserByUserIdRequest{
				UserId: ctx.Param("id"),
			}
			userController.GetUserByUserId(ctx, &req)
		})
		r.GET("/api/v1/users/events", func(ctx *gin.Context) {
			offset, err := strconv.Atoi(ctx.DefaultQuery("offset", "0"))
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid offset value"})
				return
			}

			limit, err := strconv.Atoi(ctx.DefaultQuery("limit", "0"))
			if err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit value"})
				return
			}

			req := &st.GetParticipatedEventListsRequest{
				UserId: ctx.Query("user_id"),
				Offset: offset,
				Limit:  limit,
			}
			userController.GetParticipatedEventLists(ctx, req)
		})
		// PUT
		r.PUT("/api/v1/users/:id", func(ctx *gin.Context) {
			var req st.UpdateUserInformationRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			userController.UpdateUserInformation(ctx, &req)
		})
		// // need to login type api in future usage
		// auth.PUT("/api/v1/users/:id", func(ctx *gin.Context) {
		// 	var req st.UpdateUserInformationRequest
		// 	if err := ctx.ShouldBindJSON(&req); err != nil {
		// 		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// 		return
		// 	}
		// 	userController.UpdateUserInformation(ctx, &req)
		// })

		// // delete user but I don't think It's necessary
		// r.DELETE("/api/v1/users/:id", func(ctx *gin.Context) {
		// 	req := st.DeleteUserRequest{
		// 		ID: ctx.Param("id"),
		// 	}
		// 	userController.DeleteUser(ctx, &req)
		// })

		// login/logout is here
		r.PUT("/api/v1/users/notification", func(ctx *gin.Context) {
			req := st.GetUserByUserIdRequest{
				UserId: ctx.Query("user_id"),
			}
			userController.ToggleNotifications(ctx, &req)
		})
		// DELETE
		r.DELETE("/api/v1/users/:event_id", func(ctx *gin.Context) {
			eventID := ctx.Param("event_id")
			userID := ctx.Query("user_id")

			req := st.CancelRegisterEventRequest{
				EventId: eventID,
				UserId:  userID,
			}

			userController.CancelRegisterEvent(ctx, &req)
		})
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	// login/logout is here
	err = c.Invoke(func(userController *controllers.UserController) {
		r.POST("/api/v1/login", func(ctx *gin.Context) {
			var req st.LoginUserRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			userController.LoginUser(ctx, &req)
		})
		r.POST("/api/v1/loginemail", func(ctx *gin.Context) {
			var req st.LoginUserEmailRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			userController.LoginUserEmail(ctx, &req)
		})
		r.POST("/api/v1/loginphone", func(ctx *gin.Context) {
			var req st.LoginUserPhoneRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			userController.LoginUserPhone(ctx, &req)
		})
		auth.POST("/api/v1/logout", func(ctx *gin.Context) {
			var req st.LogoutUserRequest
			req.UserID = ctx.GetString(middleware.KeyUserID)

			userController.LogoutUser(ctx, &req)
		})
		// r.GET("/api/v1/auth/me", func(ctx *gin.Context) {

		// })

		// require token function to test
		auth.GET("/api/v1/auth/users", func(ctx *gin.Context) {
			userController.GetAllUsers(ctx)
		})
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	err = c.Invoke(func(announcementController *controllers.AnnouncementController) {
		r.POST("/api/v1/announcement", func(ctx *gin.Context) {
			var req st.SendAnnouncementRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			announcementController.SendAnnouncement(ctx, &req)
		})
		r.POST("/api/v1/registeredemail", func(ctx *gin.Context) {
			var req st.SendRegisteredEmailRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			announcementController.SendRegisteredEmail(ctx, &req)
		})
		r.POST("/api/v1/reminderemail", func(ctx *gin.Context) {
			var req st.SendReminderEmailRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			announcementController.SendReminderEmail(ctx, &req)
		})
		r.POST("/api/v1/cancelledemail", func(ctx *gin.Context) {
			var req st.SendCancelledEmailRequest
			if err := ctx.ShouldBindJSON(&req); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			announcementController.SendCancelledEmail(ctx, &req)
		})
	})

	if err != nil {
		log.Println(err)
		return nil
	}

	return r
}
