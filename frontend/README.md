Buzzer Application - Technical Documentation

An interactive real-time quiz and buzzer application built with a decoupled architecture using React/TypeScript on the frontend and Spring Boot on the backend.

Directory Structure

buzzer/
├── frontend/ # React + TypeScript application (Vite)
│ ├── src/
│ │ ├── pages/ # Main views (Home, PlayerGame, HostGame, etc.)
│ │ ├── assets/ # Graphic assets (images, buzzer logo)
│ │ ├── App.tsx # Routing configuration (react-router-dom)
│ │ └── main.tsx # Application entry point
│ ├── package.json # Dependencies and npm scripts
│ └── vite.config.ts # Vite configuration
│
└── backend/ # Spring Boot REST API (Java)
├── src/
│ └── main/java/ # Source code (Controllers, Models, Services)
├── pom.xml # Maven configuration and dependencies
└── mvnw # Maven wrapper

Quick Start Guide

1. Launch the Backend (Spring Boot)

Open a terminal, navigate to the backend folder, and execute:

# On Windows (PowerShell / CMD)

mvn spring-boot:run

# On Linux / macOS / Git Bash

./mvnw spring-boot:run

The server starts on http://localhost:8081.

2. Launch the Frontend (Vite / React)

Open a second terminal, navigate to the frontend folder, and execute:

# Install dependencies (first time only)

npm install

# Start the Vite development server

npm run dev

The application will be accessible at http://localhost:5173.

Technical Stack

Frontend: React, TypeScript, Vite, React Router, inline CSS (Beige background #e6dfd5, black text, Georgia font).

Backend: Spring Boot (Java), REST API for session management and quiz logic.
