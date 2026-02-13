package get

import (
	"encoding/json"
	"net/http"
	"user-management-backend/database"
)

func HandleGetUsers(w http.ResponseWriter, r *http.Request) {
	// Only allow GET requests
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	// Get data from database
	users, err := database.GetUser()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Set Content-Type to JSON and send
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
