# GEN AI Powered Travel Guide
> A Production-Ready Final Year Capstone Project

![Banner](https://source.unsplash.com/1600x400/?travel,technology)

An intelligent, full-stack travel planning platform utilizing Generative AI to completely automate the trip-building process. Users simply enter a destination, their travel duration, and a budget, and the system orchestrates a comprehensive, personalized day-by-day itinerary.

## 👥 Meet the Team
- **Nancy Nandal** – Project Manager (Scrum, Architecture & Docs)
- **Manjeet Purohit** – AI/ML Engineer (Python, Data Pipeline, Recommendations)
- **Nikhil** – Backend Developer (Node.js, Express, MongoDB, Auth)
- **Deepesh Yadav** – DevOps Engineer (Docker, CI/CD Jenkins, GitHub Actions) 
- **Khushi Balyan** – Frontend Developer (React, Tailwind, Recharts, Framer Motion)

## 🚀 Tech Stack
### Frontend
- **React.js (Vite)**
- **Tailwind CSS & Framer Motion** (Premium UI/UX)
- **Lucide React & Recharts**

### Backend (API Gateway)
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT (JSON Web Tokens) Authentication**

### AI Engine (Microservice)
- **Python 3.10 & FastAPI**
- **Pandas & Scikit-learn (Heuristics)**
- **Generative AI Mock Engine**

### DevOps
- **Docker & Docker Compose**
- **Jenkins Pipeline & GitHub Actions**

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Docker Desktop
- MongoDB (Running locally or via Docker)

### Option 1: Docker Compose (Recommended)
1. Clone the repository.
2. Ensure Docker relies on Linux containers.
3. Open a terminal in the project root and run:
   ```bash
   docker-compose up --build
   ```
4. Access the App:
   - Frontend is at `http://localhost:3000`
   - Node API is at `http://localhost:5000`
   - AI Microservice at `http://localhost:8000`

### Option 2: Manual Start
1. **Database:** Start your local MongoDB server on port 27017.
2. **Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
3. **AI Service:**
   ```bash
   cd ai-service
   pip install -r requirements.txt
   uvicorn app:app --port 8000
   ```
4. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📖 API Documentation

### Node Backend `/api/*`
- `POST /auth/register` - Register a new user (body: name, email, password)
- `POST /auth/login` - Authenticate and receive JWT
- `GET /auth/me` - Get current user profile
- `POST /trips/generate` - Generates a new trip logic (requires token)
- `GET /admin/analytics` - Returns platform statistics

### Python AI Engine `/api/*`
- `POST /recommendation/generate` - Internal microservice called by Node Backend. Requires `destination`, `days`, `budget`.

---
*Created as part of the 2026 Capstone Project Defense. Detailed tracking provided via Jira (see JIRA_BOARD.md)*.
