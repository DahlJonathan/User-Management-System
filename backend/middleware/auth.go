package auth

import (
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// In a real project the secret key should be stored in a .env file (never hardcoded)
// var jwtKey = []byte(os.Getenv("SECRET_KEY"))
var jwtKey = []byte("SECRET_KEY")

func Middleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// get token from Authorization header
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header missing", http.StatusUnauthorized)
			return
		}

		// removes bearer so we get only token part
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")

		// parsing and validating token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		// if everything is ok, continue
		next(w, r)
	}
}
