# Software Design Document (SDD)
## Project Name: GEN AI Powered Travel Guide

### 1. Introduction
This SW Design Document structures the high-level implementation of the travel recommendation system.

### 2. Architecture Design
We follow a Microservices-inspired multi-tier architecture.

#### 2.1 Frontend Tier (Client)
- **Framework**: React 18
- **Styling**: Tailwind CSS for rapid utility-based styling, Lucide React for iconography.
- **State**: React Context API
- **Charts**: Recharts for budget analysis.

#### 2.2 API Gateway / Auth Tier (Main Backend)
- **Framework**: Node.js + Express
- **Database**: MongoDB (Mongoose ORM)
- **Role**: Handles all HTTP requests, validates tokens, routes heavy AI generation tasks to the Python microservice.

#### 2.3 AI Processing Tier
- **Framework**: Python 3.10+, FastAPI
- **Model Integration**: Evaluates Generative AI prompts and maps responses to structured JSON.
- **Budgeting**: Pandas used for normalization of cost estimates.

### 3. Database Design (NoSQL)
**Collections:**
- `users`: `{_id, email, passwordHash, role, createdAt}`
- `trips`: `{_id, userId, destination, days, budget, structuredItinerary(Array), totalEstimatedCost, createdAt}`

### 4. User Interface Design
- **Theme**: Dark Modern Premium Design.
- **Transitions**: Smooth page fades using Framer Motion (or pure CSS animation).
- **Navigation**: Sticky top-nav showing user avatar conditionally.

### 5. Deployment Architecture
- Docker-Compose network containing `frontend-app`, `backend-api`, `python-ai`, and `mongo-db`.
- Jenkins orchestrates tests and pushes images to Docker Hub.
