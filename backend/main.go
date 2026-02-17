package main

import (
	"fmt"
	"net/http"
	api "user-management-backend/api"
	"user-management-backend/cors"
	"user-management-backend/database"
)

func main() {
	database.InitDb()
	database.CreateTable()

	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("/users", api.HandleGetUsers)

	mux.HandleFunc("DELETE /users/{id}", api.HandleDeleteUser)

	mux.HandleFunc("PUT /users/{id}", api.HandleEditUser)

	mux.HandleFunc("POST /users", api.HandleAddUser)
	mux.HandleFunc("POST /login", api.HandleLogin)

	c := cors.SetupCors()
	handler := c.Handler(mux)

	fmt.Println("server runnung on localhost:8080")
	http.ListenAndServe(":8080", handler)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Backend is running")
}
