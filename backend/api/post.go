package api

import (
    "encoding/json"
    "net/http"
    "user-management-backend/database"
    "user-management-backend/types"
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
    w.WriteHeader(http.StatusCreated) // 201 Created
    json.NewEncoder(w).Encode(newUser)
}