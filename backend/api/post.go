package api

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"user-management-backend/database"
	models "user-management-backend/types"
)

func HandleAddUser(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var newUser models.User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	if len(newUser.Name) > 50 {
		http.Error(w, "Name too long", http.StatusBadRequest)
		return
	}

	lastId, err := database.AddUser(newUser.Name, newUser.Email)
	if err != nil {
		http.Error(w, "Failed to save user", http.StatusInternalServerError)
		return
	}

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

	var credentials models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&credentials); err != nil {
		sendError(w, "Virheellinen pyyntö", http.StatusBadRequest)
		return
	}

	var storedPassword string
	query := "SELECT password FROM admins WHERE name = ?"

	err := database.DB.QueryRow(query, credentials.Username).Scan(&storedPassword)

	if err != nil {
		if err == sql.ErrNoRows {
			sendError(w, "Väärä ylläpitäjän tunnus tai salasana", http.StatusUnauthorized)
			return
		}
		log.Printf("Tietokantavirhe: %v", err)
		http.Error(w, "Sisäinen palvelinvirhe", http.StatusInternalServerError)
		return
	}

	if storedPassword != credentials.Password {
		sendError(w, "Väärä ylläpitäjän tunnus tai salasana", http.StatusUnauthorized)
		return
	}

	response := models.LoginResponse{
		Status:  "OK",
		Message: "Tervetuloa ylläpitäjä, " + credentials.Username,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
