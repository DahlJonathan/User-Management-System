package models

type Admins struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Rights   string `json:"rights"`
	Password string `json:"password"`
}
