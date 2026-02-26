# User Management System

## Technologies

- **Frontend**: React + TypeScript + Vite
- **Backend**: Golang
- **Database**: SQLite

---

## Installation

The repository includes a `user.db` file to make testing the application easier. It contains pre-configured users.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DahlJonathan/User-Management-System.git
2. Navigate to the project folder:
```
cd user-management-system
```

3. Install dependencies:

```
cd frontend
npm install
cd ../backend
go mod tidy
```

### Starting the Application

The application requires two separate terminal windows:

**Terminaali 1 - Backend:**
```
cd backend
go run .
```

**Terminaali 2 - Frontend:**

```
cd frontend
npm run dev
```

Backend starts at `http://localhost:8080` and frontend at `http://localhost:5173`.

## Login

| Role | Description | Username | Password |
| :--- | :--- | :--- | :--- |
| **Admin (Full)** | Full read and write access to all settings. | `adminFull` | `adminfull` |
| **Admin (Read)** | View-only access. Cannot edit or delete. | `adminRead` | `adminread` |

## Usage

You can use the blue dropdown menu to select your search criteria:
  - All users: The text field is disabled. Simply click "Search" to fetch everyone.
  - By Name: Enter a partial or full name in the text field and click "Search".
  - By ID: Enter a specific ID (number) and click "Search". Note: IDs must be positive integers.

### Managing Users  

  - Add User: Click the yellow "Add User" button to open a form for the name and email.
  - Edit User: Click the yellow "Edit" button next to a user to update their details in-line.


### Admin Management `(Under Development 🛠️)`

1. Log in with the **`adminFull`** account.
2. Navigate to the **Settings** gear.
3. Click on the **"Add Admin"** button.
4. Fill in the username, role (Full or Read), and set a password

### SQLite Database

The application uses SQLite and includes pre-populated data for testing.

#### Accessing the Database
Run the following command in your terminal:

```
cd backend
sqlite3 users.db
```
This opens the SQLite prompt: sqlite>

### Useful Commands

Show all tables:
```
.tables
```

Show table structure:
```
.schema "table_name"  
```

Show all rows:
```
SELECT * FROM table_name;
```

Fetch specific data:
```
SELECT name FROM users;
```

Search by name:
```
sqlite> SELECT * FROM users WHERE name = 'Otto';
```

quit
```
.quit
```

