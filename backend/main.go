package main

import (
	"fmt"
	"net/http"
	api "user-management-backend/api"
	"user-management-backend/cors"
	"user-management-backend/database"
	auth "user-management-backend/middleware"
)

func main() {
	database.InitDb()
	database.CreateTable()

	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("/users", auth.Middleware("Read", "Full")(api.HandleGetUsers))

	mux.HandleFunc("DELETE /users/{id}", auth.Middleware("Full")(api.HandleDeleteUser))

	mux.HandleFunc("PUT /users/{id}", auth.Middleware("Full")(api.HandleEditUser))

	mux.HandleFunc("POST /users", auth.Middleware("Full")(api.HandleAddUser))
	mux.HandleFunc("POST /login", api.HandleLogin)

	mux.HandleFunc("/admins", auth.Middleware("Full")(api.HandleGetAdmins))
	mux.HandleFunc("POST /admins", auth.Middleware("Full")(api.HandleAddAdmin))

	c := cors.SetupCors()
	handler := c.Handler(mux)

	fmt.Println("server runnung on localhost:8080")
	http.ListenAndServe(":8080", handler)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	// health check
	fmt.Fprintf(w, "Backend is running")
}
