package database

import (
	"database/sql"
	"fmt"
	"log"

	models "user-management-backend/types"

	_ "modernc.org/sqlite"
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

	CREATE TABLE IF NOT EXISTS admins (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	password TEXT NOT NULL,
	rights TEXT NOT NULL
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
	// gets all user that have character in name
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
	// deleting user from users table
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
	_, err := DB.Exec("UPDATE users SET name = ?, email = ? WHERE id = ?", name, email, id)
	return err
}

func AddUser(name string, email string) (int64, error) {
	// adding user to users table
	result, err := DB.Exec("INSERT INTO users (name, email) VALUES (?, ?)", name, email)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}

func GetAdmins() ([]models.Admins, error) {

	rows, err := DB.Query("SELECT id, name, rights FROM admins")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.Admins
	for rows.Next() {
		var u models.Admins
		if err := rows.Scan(&u.ID, &u.Name, &u.Rights); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}

func AddAdmin(name string, rights string, password string) (int64, error) {
	// adding admin to admins table
	result, err := DB.Exec("INSERT INTO admins (name, rights, password) VALUES (?, ?, ?)", name, rights, password)
	if err != nil {
		return 0, err
	}

	return result.LastInsertId()
}
