package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "modernc.org/sqlite"
	"user-management-backend/types"
)

var DB *sql.DB

func InitDb() {
	var err error
	DB, err = sql.Open("sqlite", "./users.db")
	if err != nil {
		log.Fatal(err)
	}

}

func CreateTable() {
	query := `
	CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	email TEXT NOT NULL
	);
	`
	_, err := DB.Exec(query)
	if err != nil {
		log.Fatal(err)
	}
}

func GetUser() ([]models.User, error) {

	rows, err := DB.Query("SELECT id, name, email FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func GetUserId(id string) (models.User, error) {
	var u models.User

	err := DB.QueryRow("SELECT id, name, email FROM users WHERE id = ?", id).Scan(&u.ID, &u.Name, &u.Email)

	if err != nil {
		if err == sql.ErrNoRows {
			return u, fmt.Errorf("no_user_found")
		}
		return u, err
	}
	return u, nil
}

func GetUserName(name string) ([]models.User, error) {

	rows, err := DB.Query("SELECT id, name, email FROM users WHERE name LIKE ?", "%"+name+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User

	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	if len(users) == 0 {
		return nil, fmt.Errorf("no_user_found")
	}

	return users, nil

}

func DeleteUserByID(id string) error {
	// Using Exec becouse delete is not outputting anything
	result, err := DB.Exec("DELETE FROM users WHERE id = ?", id)
	if err != nil {
		return err
	}

	// Checking if its deleted
	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return fmt.Errorf("no_user_found")
	}
	return nil
}

func EditUser(id string, name string, email string) error {
	_, err := DB.Exec("UPDATE users SET name = ?, email = ? WHERE id = ?,", name, email, id)
	return err
}
