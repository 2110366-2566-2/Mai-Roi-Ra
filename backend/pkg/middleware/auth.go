// package middleware

// import (
// 	"errors"
// 	"log"
// 	"net/http"
// 	"strings"

// 	"github.com/gin-gonic/gin"
// 	"github.com/golang-jwt/jwt"
// 	"go.uber.org/dig"
// )

// const (
// 	// Replace "secret-key" with your actual secret key
// 	// Ensure this key is stored securely and not hardcoded in production
// 	SecretKey = "secret-key"
// 	KeyToken  = "token"
// 	KeyUserID = "userID"
// )

// func validateToken(signedToken string) (string, error) {
// 	parsedToken, err := jwt.Parse(signedToken, func(token *jwt.Token) (interface{}, error) {
// 		return []byte(SecretKey), nil
// 	})
// 	if err != nil {
// 		return "", err
// 	}
// 	if claims, ok := parsedToken.Claims.(jwt.MapClaims); ok && parsedToken.Valid {
// 		userID := claims["user_id"].(string)
// 		return userID, nil
// 	}
// 	return "", errors.New("Invalid token")
// }

// func Authentication(con *dig.Container) gin.HandlerFunc {
// 	return func(c *gin.Context) {
// 		const BearerSchema = "Bearer "
// 		authHeader := c.GetHeader("Authorization")
// 		if authHeader == "" {
// 			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
// 			return
// 		}

// 		if !strings.HasPrefix(authHeader, BearerSchema) {
// 			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
// 			return
// 		}

// 		tokenString := authHeader[len(BearerSchema):]

// 		userID, err := validateToken(tokenString)
// 		if err != nil {
// 			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token???", "details": err.Error()})
// 			return
// 		}
// 		log.Println("Hi if you are seeing this you're very close")
// 		c.Set(KeyToken, tokenString)
// 		c.Set(KeyUserID, userID)
// 		c.Next()
// 	}
// }

package middleware

import (
	"fmt"
	"net/http"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

const (
	// Replace "YourSecretKey" with your actual secret key
	// Ensure this key is stored securely and not hardcoded in production
	SecretKey = "YourSecretKey"
	KeyToken  = "token"
	KeyUserID = "userID"
)

func Authentication(con *dig.Container) gin.HandlerFunc {
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
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token_2" })
			return
		}

		// Process request
		c.Next()
	}
}
