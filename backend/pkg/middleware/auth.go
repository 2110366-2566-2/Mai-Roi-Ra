package middleware

import (
	"fmt"
	"net/http"

	"github.com/2110366-2566-2/Mai-Roi-Ra/backend/controllers"
	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

const (
	//TODO store key string in somewhere
	KeyToken  = "token"
	KeyUserID = "userID"
)

func Authentication(con *dig.Container) gin.HandlerFunc {
	return func(c *gin.Context) {
		const Bearer_schema = "Bearer "
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing"})
			return
		}

		tokenString := authHeader[len(Bearer_schema):] // Remove "Bearer " from the header value

		//TODO Implement jwt validation here
		fmt.Println(tokenString)
		//token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		//	// Make sure token's algorithm is what you expect
		//	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		//		return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		//	}
		//
		//	return []byte("YourSecretKey"), nil // Your secret key
		//})
		//
		//if err != nil {
		//	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		//	return
		//}
		//
		//if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//	// Now you can use the claims
		//	// For example: fmt.Println(claims["user_id"], claims["exp"])
		//	c.Set("userID", claims["user_id"])
		//} else {
		//	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		//	return
		//}

		err := con.Invoke(func(gateway *controllers.UserController) {
			user, err := gateway.ValidateToken(tokenString)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
				return
			}
			if user == nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
				return
			}
			c.Set(KeyToken, tokenString)
			c.Set(KeyUserID, user.UserID)
			fmt.Println("authentication successfully")
		})
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}
		// Process request
		c.Next()
	}
}
