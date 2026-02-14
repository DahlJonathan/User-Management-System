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

	id := r.URL.Query().Get("id")

	if id != "" {
		user, err := database.GetUserId(id)
		if err != nil {
			if err.Error() == "no_user_found" {
				w.WriteHeader(http.StatusNotFound)
				json.NewEncoder(w).Encode(map[string]string{"message": "no user found"})
				return
			}
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
		return
	}

	name := r.URL.Query().Get("name")
	if name != "" {
		users, err := database.GetUserName(name) // Nyt palauttaa []User
		if err != nil {
			if err.Error() == "no_user_found" {
				w.WriteHeader(http.StatusNotFound)
				json.NewEncoder(w).Encode(map[string]string{"message": "Käyttäjiä ei löytynyt tällä nimellä"})
				return
			}
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users) // Lähettää listan
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
