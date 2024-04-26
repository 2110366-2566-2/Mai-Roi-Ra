package middleware

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/casbin/casbin/v2"
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
	KeyToken  = "token"
	//KeyUserID = "userID"
	KeyRole = "role"
	KeyUserID = "user_id"
	MaxAge    = 86400 * 30
	IsProd    = true
)

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		cfg, err := config.NewConfig(func() string {
			return ".env"
		}())
		if err != nil {
			log.Println("[Config]: Error initializing .env")
			// return
		}
		SecretKey := cfg.App.TokenSecretKey

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
			keyrole, ok := claims["role"].(string)
			if !ok {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
				return
			}
			c.Set(KeyToken, tokenString)
			c.Set(KeyUserID, userID)
			c.Set(KeyRole, keyrole)
			fmt.Println("Authentication successful")
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token_2"})
			return
		}
		c.Next()
	}
}

func TestAuthorization() gin.HandlerFunc {
	return func(c *gin.Context) {
		CasbinEnforcer, _ := casbin.NewEnforcer("model.conf","policy.csv")
			// Check authorization using Casbin
			// If CasbinEnforcer is not initialized, you'll need to initialize it first
			if CasbinEnforcer == nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "CasbinEnforcer is not initialized"})
				return
			}
		c.Next();
	}
}

func Authorization() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract token from Authorization header
		CasbinEnforcer, _ := casbin.NewEnforcer("model.conf","policy.csv")
		// Check authorization using Casbin
		// If CasbinEnforcer is not initialized, you'll need to initialize it first
		if CasbinEnforcer == nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "CasbinEnforcer is not initialized"})
			return
		}

		// Store user's role in the context
		user_role , _ := c.Get(KeyRole)
		path := c.Request.URL.Path
		request := c.Request.Method

		fmt.Println(user_role)
		fmt.Println(path)
		fmt.Println(request)

		// Check if the user's role is allowed
		if res, _ := CasbinEnforcer.Enforce(user_role, path, request); !res {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "Unauthorized"})
			return
		} 

		fmt.Println("Authorization successful")
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
			// return
		}
		// Cookies
		SecretKey := cfg.App.TokenSecretKey
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
