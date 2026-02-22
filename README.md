# Todo List Application

A full-stack Todo List application built with React (Frontend) and Node.js/Express (Backend), featuring a SQL Server database and full Docker support.

More details in the file: [react-fullstack-challenge-2-1-.pdf](https://github.com/davide-murro/todo-list-application-challenge/blob/main/react-fullstack-challenge-2-1-.pdf).


## 🛠 Backend (Node.js + Express)

The backend provides a RESTful API to manage tasks and uses SQL Server for persistent storage.

### Features
- **Node.js 24**: Built using Node.js environment.
- **Database Support**: Use `msnodesqlv8` (Windows native) locally and `mssql` (Tedious) in Docker.

### Running Locally
1. `cd backend`
2. `npm install`
3. `npm run dev`


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


## 🗺 Application Navigation & Usage

The To-Do List application is designed to manage your daily tasks easily.

### Structure:

1.  **Add a Task**: Add a task with title and description.
2.  **View Tasks**: Display tasks in a list format.
3.  **Toggle Status**: Checkbox to toggle the task status between "Active" and "Completed".
4.  **Edit a Task**: Edit each task from the list.
5.  **Delete a Task**: Delete each task from the list.
6.  **Filter Tasks**: Filter bar to view:
    - **All**: Shows every task.
    - **Active**: Shows only uncompleted tasks.
    - **Completed**: Shows only finished tasks.


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


## ☁️ Deploying on GCP (Google Cloud Platform)

The application is containerized, making **Google Cloud Run** the ideal deployment target.

### Steps to Deploy:

1.  **Prepare GCP Project:**
    - Create a project in the [GCP Console](https://console.cloud.google.com/).
    - Enable the **Cloud Run** and **Artifact Registry** APIs.
    - Install the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) locally.

2.  **Containerize & Push:**
    - Authenticate: `gcloud auth login`
    - Configure Docker: `gcloud auth configure-docker`
    - Create a repository in Artifact Registry for your images.
    - Tag and push your backend and frontend images.

3.  **Deploy Backend:**
    - Deploy to Cloud Run: `gcloud run deploy backend --image [IMAGE_URL]`
    - Note the generated URL for the next step.

4.  **Deploy Frontend:**
    - Update `VITE_API_URL` in the frontend config to point to the backend URL.
    - Rebuild the frontend image.
    - Deploy to Cloud Run: `gcloud run deploy frontend --image [IMAGE_URL]`

5.  **Database Configuration:**
    - Ensure the Cloud Run services are authorized to connect to the instance.
    - Update backend environment variables with Cloud SQL connection details.
