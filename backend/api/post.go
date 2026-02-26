package api

import (
	"encoding/json"
	"net/http"
	"time"
	"user-management-backend/database"
	models "user-management-backend/types"

	"github.com/golang-jwt/jwt/v5"
)

// In a real project the secret key should be stored in a .env file (never hardcoded)
// var jwtKey = []byte(os.Getenv("SECRET_KEY"))
var jwtKey = []byte("SECRET_KEY")

func HandleAddUser(w http.ResponseWriter, r *http.Request) {
	// only allow method POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newUser models.User

	// reads incoming json and adds to User struct
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// if name is longer than 10 characters => error
	if len(newUser.Name) > 10 {
		http.Error(w, "Name too long", http.StatusBadRequest)
		return
	}

	// if email is longer than 80 characters => error
	if len(newUser.Email) > 80 {
		http.Error(w, "Email too long", http.StatusBadRequest)
		return
	}

	// adding to users table
	lastId, err := database.AddUser(newUser.Name, newUser.Email)
	if err != nil {
		http.Error(w, "Failed to save user", http.StatusInternalServerError)
		return
	}

	// Update ID and send the created user as a JSON response
	newUser.ID = int(lastId)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var credentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
		Rights   string `json:"rights"`
	}

	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	var storedPassword string
	var rights string

	query := "SELECT password, rights FROM admins WHERE name = ?"
	err := database.DB.QueryRow(query, credentials.Username).Scan(&storedPassword, &rights)

	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// securely compare the hashed password from DB with the plain text from user
	if storedPassword != credentials.Password {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// create the JWT Claims
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := jwt.MapClaims{
		"username": credentials.Username,
		"rights":   rights,
		"exp":      expirationTime.Unix(),
	}

	// generate the Token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	// send response to React
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "OK",
		"token":   tokenString,
		"rights":  rights,
		"message": "Welcome, " + credentials.Username,
	})
}

func HandleAddAdmin(w http.ResponseWriter, r *http.Request) {
	// only allow method POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newAdmin models.Admins

	// reads incoming json and adds to Admin struct
	err := json.NewDecoder(r.Body).Decode(&newAdmin)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// if name is longer than 15 characters => error
	if len(newAdmin.Name) > 15 {
		http.Error(w, "Name too long", http.StatusBadRequest)
		return
	}

	// if rights are not full or read => error
	if newAdmin.Rights != "Full" && newAdmin.Rights != "Read" {
		http.Error(w, "Rights should be Full or Read", http.StatusBadRequest)
		return
	}

	// adding to admins table
	lastId, err := database.AddAdmin(newAdmin.Name, newAdmin.Rights, newAdmin.Password)
	if err != nil {
		http.Error(w, "Failed to save user", http.StatusInternalServerError)
		return
	}

	// Update ID and send the created user as a JSON response
	newAdmin.ID = int(lastId)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newAdmin)
}
