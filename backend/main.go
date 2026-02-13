package main

import (
	"fmt"
	"net/http"
	get "user-management-backend/api"
	"user-management-backend/cors"
	"user-management-backend/database"
)

func main() {
	database.InitDb()
	database.CreateTable()

	mux := http.NewServeMux()
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("/users", get.HandleGetUsers)

	c := cors.SetupCors()
	handler := c.Handler(mux)

	fmt.Println("server runnung on localhost:8080")
	http.ListenAndServe(":8080", handler)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "möi")
}
