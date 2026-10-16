# AstraAI

AstraAI is a full-stack application that combines a modern React frontend with a modular backend service architecture. The project is designed to support secure authentication, scalable service-based APIs, and a clean developer experience.

## Overview

The repository is organized into two main areas:

- `frontend/`: React + Vite client application
- `backend/`: Node.js backend services and local infrastructure

The backend is structured as a microservice-style project, with authentication handled by a dedicated `AuthService` and session management using Redis.

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- Tailwind CSS
- Firebase
- Axios

### Backend
- Node.js
- Express
- MongoDB via Mongoose
- Firebase Admin SDK
- Redis
- Docker Compose

## Repository Structure

```text
astraAI/
├── backend/
│   ├── API_Gateway/
│   ├── Services/
│   │   └── AuthService/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── model/
│   │       ├── routes/
│   │       ├── index.js
│   │       ├── package.json
│   │       └── package-lock.json
│   ├── Shared/
│   ├── docker-compose.yaml
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
├── .gitignore
├── README.md
└── .gitignore
```

## Features

- Modern React-based frontend
- Redux-powered state management
- Firebase authentication integration
- MongoDB-backed user records
- Redis-based session handling
- Service-oriented backend layout for future expansion
- Local Redis environment using Docker Compose

## Prerequisites

Before running the project, ensure you have:

- Node.js 18 or newer
- npm
- Docker and Docker Compose
- MongoDB instance or MongoDB Atlas connection
- Firebase project credentials
- Redis (or use the Docker setup included in the repo)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pankaj-q/astraAI.git
cd astraAI
```

### 2. Start Redis

From the backend directory:

```bash
cd backend
docker-compose up -d
```

This starts the Redis container defined in `backend/docker-compose.yaml`.

### 3. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend or auth service folder with the required values, for example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

Then run the auth service:

```bash
cd backend/Services/AuthService
npm install
npm run dev
```

### 4. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run using Vite and will display the local development URL in the terminal.

## Frontend

The frontend is built with React and Vite, and includes:

- `src/pages/` for route-level UI
- `src/features/` for business logic helpers
- `src/redux/` for store setup and state slices
- `src/utils/` for utility functions
- `src/assets/` for static assets

## Backend

The backend follows a modular service-oriented layout:

- `API_Gateway/` for gateway-related logic
- `Services/AuthService/` for authentication and user handling
- `Shared/` for reusable shared components and infrastructure

The auth service currently provides:

- login endpoint
- logout endpoint
- Firebase token verification
- MongoDB user persistence
- Redis-backed session storage

## Authentication Flow

The API verifies the Firebase ID token sent by the client, creates or retrieves the user in MongoDB, and stores the session data in Redis. A session cookie is then returned to the client for session-based access control.

## Notes

- The repository is still evolving and follows an early-stage modular architecture.
- The frontend contains a default Vite starter README, but the root README is the primary project documentation.
- More services may be added in the future as the application grows.

## License

This project does not currently declare a specific root-level license. If the project is meant for public or commercial use, a license should be added to clarify usage rights.

## Contributing

Contributions are welcome. Please keep the project structure clean, document new services or environment variables clearly, and maintain compatibility with the existing architecture.

## Contact

For questions or collaboration related to AstraAI, contact the repository owner or project maintainer.
