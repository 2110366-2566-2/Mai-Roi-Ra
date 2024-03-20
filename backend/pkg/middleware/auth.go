package middleware

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/app/config"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

const (
	// Replace "YourSecretKey" with your actual secret key
	// Ensure this key is stored securely and not hardcoded in production
	SecretKey = "YourSecretKey"
	KeyToken  = "token"
	KeyUserID = "userID"
	MaxAge    = 86400 * 30
	IsProd    = false
)

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		const BearerSchema = "Bearer "
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			return
		}

		if !strings.HasPrefix(authHeader, BearerSchema) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			return
		}

		tokenString := authHeader[len(BearerSchema):] // Remove "Bearer " from the header value

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Make sure token's algorithm is what you expect
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(SecretKey), nil
		})

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token " + err.Error()})
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			userID, ok := claims["user_id"].(string)
			if !ok {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
				return
			}
			c.Set(KeyToken, tokenString)
			c.Set(KeyUserID, userID)
			fmt.Println("Authentication successful")
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token_2"})
			return
		}

		// Process request
		c.Next()
	}
}

func GoogleAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		cfg, err := config.NewConfig(func() string {
			return ".env"
		}())
		if err != nil {
			log.Println("[Config]: Error initializing .env")
			return
		}
		log.Println("Config path from PG:", cfg)
		// Cookies
		store := sessions.NewCookieStore([]byte(SecretKey))
		store.MaxAge(MaxAge)

		store.Options.Path = "/"
		store.Options.HttpOnly = true
		store.Options.Secure = IsProd

		gothic.Store = store

		goth.UseProviders(
			google.New(cfg.GoogleAuth.ClientId, cfg.GoogleAuth.ClientSecret, cfg.GoogleAuth.CallbackURL),
		)
	}
}
