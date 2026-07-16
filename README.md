# 📝 TaskFlow

A full-stack **Task Management Application** built with a Node.js/Express REST API backend and a React frontend. Users can register, create tasks, assign tasks to themselves, and track progress through a personal dashboard.

---

## 🚀 Features

- 🔐 User authentication with JWT (register, login, protected routes)
- 👤 Role-based access — `user` and `admin` roles
- ✅ Create, view, update, and delete tasks
- 📋 Task assignment — users can "take" available tasks
- 📊 Personal dashboard with task overview (pending, assigned, completed)
- 🗓️ Due date support for tasks
- 🛡️ Admin-only controls (view all users, delete users)

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Node.js, Express.js               |
| Database   | MongoDB, Mongoose                 |
| Auth       | JWT, bcryptjs                     |
| Frontend   | React 19, React Router v7, Vite   |
| Styling    | CSS                               |

---

## 📁 Project Structure

```
task-tracker-api/
├── src/                        # Backend
│   ├── controllers/
│   │   ├── authController.js   # Register & login
│   │   ├── taskController.js   # Task CRUD + take task
│   │   └── userController.js   # User profile & admin ops
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── adminMiddleware.js  # Admin role check
│   ├── models/
│   │   ├── Task.js             # Task schema
│   │   └── User.js             # User schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── db.js                   # MongoDB connection
│   └── index.js                # Entry point
│
└── frontend/                   # React frontend
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx   # Task overview & stats
        │   ├── TaskList.jsx    # Browse & take tasks
        │   └── CreateTask.jsx
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            └── Footer.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### Backend Setup

```bash
# Navigate to the backend folder
cd src

# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following to your `.env` file:

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/task-tracker
JWT_SECRET=your_secret_key_here
```

```bash
# Start the server
npm start

# Or in development mode with auto-reload
npm run dev
```

The API will be running at `http://localhost:5000`

---

### Frontend Setup

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running at `http://localhost:5173`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| POST   | `/api/auth/register`  | Register new user |
| POST   | `/api/auth/login`     | Login             |

### Tasks *(requires auth)*
| Method | Endpoint                | Description                   |
|--------|-------------------------|-------------------------------|
| GET    | `/api/tasks`            | Get all tasks                 |
| POST   | `/api/tasks`            | Create a task                 |
| PUT    | `/api/tasks/:id`        | Update a task                 |
| PUT    | `/api/tasks/:id/take`   | Assign task to yourself       |
| DELETE | `/api/tasks/:id`        | Delete a task                 |

### Users *(requires auth)*
| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/users/profile`  | Get your profile               |
| GET    | `/api/users`          | Get all users *(admin only)*   |
| DELETE | `/api/users/:id`      | Delete a user *(admin only)*   |


---

## 👤 Author

**Sharath** — [@AiSharath](https://github.com/AiSharath)

---

> ⭐ If you found this project useful, give it a star on GitHub!
