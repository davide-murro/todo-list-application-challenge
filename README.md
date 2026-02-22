# Todo List Application

A full-stack Todo List application built with React (Frontend) and Node.js/Express (Backend), featuring a SQL Server database and full Docker support.

## 🛠 Backend (Node.js + Express)

The backend provides a RESTful API to manage tasks and uses SQL Server for persistent storage.

### Features
- **Node.js 24**: Built using Node.js environment.
- **Database Support**: Use `msnodesqlv8` (Windows native) locally and `mssql` (Tedious) in Docker.

### Running Locally
1. `cd backend`
2. `npm install`
3. `npm run dev`

---

## 💻 Frontend (React + Vite)

A modern, responsive user interface for managing your tasks.

### Features
- **Vite**: Fast build tool and development server.
- **React 19**: Utilizing React features.
- **Nginx Serving**: In Docker, the app is built and served via Nginx for high availability.

### Running Locally
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 🚀 Quick Start with Docker

The easiest way to run the entire stack is using Docker Compose.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- **SQL Server Configuration**: Ensure **TCP/IP** is enabled in your SQL Server Configuration Manager and the port is set to `1433`.

### Commands
```bash
docker-compose up --build
```
- **Frontend**: [http://localhost:80](http://localhos:80)
- **Backend API**: [http://localhost:5000/api/tasks](http://localhost:5000/api/tasks)

---

## 🛠 Environment Variables

### Backend (`/backend/.env`)
- `NODE_ENV`: Environment (default: `development`)
- `HOST`: Server host (default: `0.0.0.0`)
- `PORT`: Server port (default: 5000)
- `DB_HOST`: Database host (use `host.docker.internal` for Docker)
- `DB_NAME`: Database name
- `DB_INSTANCE`: SQL Server instance (e.g., `SQLEXPRESS`)
- `DB_PORT`: Database port (default: 1433)
- `DB_USER`: Database user (default: `sa`)
- `DB_PASSWORD`: Database password (default: `[PASSWORD]`)

### Frontend (`/frontend/.env`)
- `VITE_API_URL`: URL of the backend API
