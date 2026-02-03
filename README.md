# Scalable REST API – Backend

A Node.js + Express backend with JWT authentication and user-specific task management using MongoDB (Mongoose).

---

## Features

- User authentication (Register / Login)
- JWT-based route protection
- User-specific tasks (CRUD)
- MongoDB with Mongoose
- Environment-based configuration
- CORS enabled for frontend integration

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **dotenv** for environment variables

---

## Project Structure

```text
backend/
│── .env
│── .gitignore
│── package.json
│── src/
│   ├── server.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── models/
│       ├── User.js
│       └── Task.js
```

---

## Setup Instructions

### Clone the repository

```bash
git clone <your-repo-url>
cd scalable-rest-api/backend
```

### Install dependencies

```bash
npm install
```

### Create `.env` file

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
PORT=5000
JWT_SECRET=your_jwt_secret
```

> Never commit `.env` to GitHub

---

## Run the server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server will start at:

```
http://localhost:5000
```

---

## Authentication APIs

### Register

**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

## Task APIs (Protected)

> Add header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Get all tasks (logged-in user)

**GET** `/api/tasks`

### Create task

**POST** `/api/tasks`

```json
{
  "title": "Learn Express"
}
```

### Update task

**PUT** `/api/tasks/:id`

```json
{
  "completed": true
}
```

### Delete task

**DELETE** `/api/tasks/:id`

---

## Testing with Postman

1. Login → copy JWT token
2. Set Header:

   ```
   Authorization: Bearer <token>
   ```

3. Call `/api/tasks`

---

## Common Errors

| Error               | Cause                   |
| ------------------- | ----------------------- |
| 401 Unauthorized    | Missing / invalid token |
| MONGO_URI undefined | `.env` not loaded       |
| Empty task list     | No tasks for user       |

---

## Best Practices

- Use `.env.example` for sharing config
- Keep controllers thin
- Protect routes using middleware
- Never expose secrets

---

## Future Improvements

- Pagination & filtering
- Task categories
- Role-based access
- Deployment (Render / Railway)

---

## License

MIT License

---

### 👩‍💻 Author

Built as part of a scalable REST API learning p
