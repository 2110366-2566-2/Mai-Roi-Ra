package services

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	RedirectURL:  "http://localhost:8080/auth/google/callback",
	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
	Endpoint:     google.Endpoint,
}

const oauthStateString = "pseudo-random" // Consider generating this dynamically for each session to prevent CSRF

// InitiateLogin initiates the OAuth2 login flow with Google
func InitiateLogin(c *gin.Context) {
	url := googleOauthConfig.AuthCodeURL(oauthStateString, oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// AuthCallback handles the callback from Google after user consent
func AuthCallback(c *gin.Context) {
	// Ensure the state parameter matches
	state := c.Query("state")
	if state != oauthStateString {
		log.Println("state did not match")
		c.AbortWithError(http.StatusBadRequest, fmt.Errorf("state did not match"))
		return
	}

	code := c.Query("code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("code exchange failed: %s", err.Error())
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("code exchange failed: %s", err.Error()))
		return
	}

	// Use the token to get user information
	response, err := http.Get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		log.Printf("failed getting user info: %s", err.Error())
		c.AbortWithError(http.StatusInternalServerError, fmt.Errorf("failed getting user info: %s", err.Error()))
		return
	}
	defer response.Body.Close()

	c.JSON(http.StatusOK, gin.H{
		"message": "Logged in successfully!",
	})
}
