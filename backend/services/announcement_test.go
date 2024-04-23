package services

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	st "github.com/2110366-2566-2/Mai-Roi-Ra/backend/pkg/struct"
)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)  // Set Gin to Test Mode
	r := gin.Default()
	r.POST("/api/v1/announcements", SendAnnouncement)
	return r
}

// SendAnnouncement handles POST requests to send announcements
func SendAnnouncement(c *gin.Context) {
	var req st.SendAnnouncementRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	// Check for required fields and length constraints
	if req.EventId == "" || req.EventName == "" || req.Subject == "" || len(req.Subject) > 100 || req.Content == "" || len(req.Content) > 256 {
		errorMessage := "Check your fields: "
		if req.Subject == "" || len(req.Subject) > 100 {
			errorMessage += "Subject must be between 1 and 100 characters. "
		}
		if req.Content == "" || len(req.Content) > 256 {
			errorMessage += "Content must be between 1 and 256 characters. "
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": errorMessage})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Announcement sent successfully"})
}

func TestSendAnnouncementAPI(t *testing.T) {
	router := setupRouter()

	tests := []struct {
		description    string
		requestBody    string
		expectedStatus int
		expectedBody   string
	}{
		{
			description:    "Valid Request",
			requestBody:    `{"event_id": "550e8400-e29b-41d4-a716-446655440400", "event_name": "Annual Gathering", "subject": "Event Update", "content": "Please find details of the event."}`,
			expectedStatus: http.StatusOK,
			expectedBody:   `{"status":"success","message":"Announcement sent successfully"}`,
		},
		{
			description:    "Invalid Request - Empty Subject",
			requestBody:    `{"event_id": "550e8400-e29b-41d4-a716-446655440400", "event_name": "Annual Gathering", "subject": "", "content": "Details"}`,
			expectedStatus: http.StatusBadRequest,
			expectedBody:   `{"error":"Check your fields: Subject must be between 1 and 100 characters. "}`,
		},
		{
			description:    "Invalid Request - Subject Too Long",
			requestBody:    `{"event_id": "550e8400-e29b-41d4-a716-446655440400", "event_name": "Annual Gathering", "subject": "` + strings.Repeat("a", 101) + `", "content": "Details"}`,
			expectedStatus: http.StatusBadRequest,
			expectedBody:   `{"error":"Check your fields: Subject must be between 1 and 100 characters. "}`,
		},
		{
			description:    "Invalid Request - Empty Content",
			requestBody:    `{"event_id": "550e8400-e29b-41d4-a716-446655440400", "event_name": "Annual Gathering", "subject": "Valid Subject", "content": ""}`,
			expectedStatus: http.StatusBadRequest,
			expectedBody:   `{"error":"Check your fields: Content must be between 1 and 256 characters. "}`,
		},
		{
			description:    "Invalid Request - Content Too Long",
			requestBody:    `{"event_id": "550e8400-e29b-41d4-a716-446655440400", "event_name": "Annual Gathering", "subject": "Valid Subject", "content": "` + strings.Repeat("a", 257) + `"}`,
			expectedStatus: http.StatusBadRequest,
			expectedBody:   `{"error":"Check your fields: Content must be between 1 and 256 characters. "}`,
		},
	}

	for _, tc := range tests {
		t.Run(tc.description, func(t *testing.T) {
			req, _ := http.NewRequest("POST", "/api/v1/announcements", bytes.NewBufferString(tc.requestBody))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)

			assert.Equal(t, tc.expectedStatus, w.Code)
			assert.JSONEq(t, tc.expectedBody, w.Body.String(), "Response body should match expected body")
		})
	}
}
