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

	"github.com/casbin/casbin/v2"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

const (
	// Replace "YourSecretKey" with your actual secret key
	// Ensure this key is stored securely and not hardcoded in production
	SecretKey = "YourSecretKey"
	KeyToken  = "token"
	KeyUserID = "userID"
	KeyRole = "role"
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
		user_role := ""
		const BearerSchema = "Bearer "
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, BearerSchema){
			user_role = "VISITOR"
		} else {
			tokenString := authHeader[len(BearerSchema):]
		
			if(tokenString == "") {
				user_role = "VISITOR"
			} else {
				// Parse JWT token
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
					user_role, ok = claims["role"].(string)
					if !ok {
						c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
						return
					}

				} else {
					c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
					return
				}
			}
		}

		// Store user's role in the context
		c.Set(KeyRole, user_role)

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


