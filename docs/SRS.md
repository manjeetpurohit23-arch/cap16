# Software Requirements Specification (SRS)
## Project Name: GEN AI Powered Travel Guide

### 1. Introduction
#### 1.1 Purpose
This document provides a comprehensive architectural and functional overview of the "GEN AI Powered Travel Guide." The system is designed to provide users with intelligent, personalized travel itineraries based on destination, budget, and travel days.

#### 1.2 Scope
The system involves a web application that interacts with a MERN stack backend and a Python microservice to deliver optimized travel recommendations.

### 2. Overall Description
#### 2.1 Product Perspective
The application follows a standard distributed web model:
- Frontend (ReactJS) handles UI/UX.
- Backend (Node/Express) handles Auth & User Data.
- AI Service (Python/FastAPI) processes algorithms and Generative logic.

#### 2.2 User Classes
- **Guest**: Can view the landing page and sign up.
- **Authenticated User**: Can generate itineraries, manage profile, view saved trips, and download PDFs.
- **Admin**: Can view general analytics, total generated trips, and block/unblock users.

### 3. System Features
#### 3.1 Fully Automated Trip Generation
- **Description**: The core feature leveraging Gen AI to map out day-to-day tourist attractions and food recommendations.

#### 3.2 Secure Auth
- **Description**: JWT-based session security with bcrypt password hashing.

### 4. Non-Functional Requirements
- **Performance**: AI Generation should respond within 5-10 seconds.
- **Scalability**: Dockerized components allowing independent scaling of Python and Node backends.
- **Security**: Prevent SQL/NoSQL injection, robust CORS setup.
- **Availability**: Standard cloud deployment targeting 99.9% uptime.
