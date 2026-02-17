package api

import (
	"encoding/json"
	"net/http"
	models "user-management-backend/types"
)

func sendError(w http.ResponseWriter, msg string, code int) {
	w.WriteHeader(code)

	w.Header().Set("Content-Type", "application/json")

	response := models.LoginResponse{
		Status:  "Error",
		Message: msg,
	}

	json.NewEncoder(w).Encode(response)
}
