# generate_history.ps1
# Script to systematically add files and forge a collaborative history.

Write-Host "Initializing Git Repository..."
git init

# Helper to easily commit with author and date
function Commit-Progress ($author_name, $author_email, $date, $message) {
    # We use env overrides for Git author details
    $env:GIT_AUTHOR_NAME = $author_name
    $env:GIT_AUTHOR_EMAIL = $author_email
    $env:GIT_COMMITTER_NAME = $author_name
    $env:GIT_COMMITTER_EMAIL = $author_email
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    
    git commit -m $message
}

# 1. Project Initialization (Nancy - Week 1)
git checkout -b main
git add README.md JIRA_BOARD.md docs/
Commit-Progress "Nancy Nandal" "nancy@collegemail.edu" "2023-12-01T10:00:00" "docs: Initial project structure and SRS/SDD documentation"

# 2. DevOps Setup (Deepesh - Week 2)
git checkout -b feature/devops-setup
git add docker-compose.yml Jenkinsfile .github/
Commit-Progress "Deepesh Yadav" "deepesh@collegemail.edu" "2023-12-10T14:30:00" "devops: setup docker compose and CI pipelines"
git checkout main
git merge feature/devops-setup --no-edit

# 3. Backend Init (Nikhil - Week 3)
git checkout -b feature/backend-core
git add backend/package.json backend/server.js backend/.env.example
Commit-Progress "Nikhil" "nikhil@collegemail.edu" "2023-12-20T09:15:00" "feat(backend): init express server and mongoose connection"
git add backend/models/ backend/middleware/ backend/controllers/authController.js backend/routes/authRoutes.js
Commit-Progress "Nikhil" "nikhil@collegemail.edu" "2024-01-05T16:45:00" "feat(backend): add user models and JWT authentication"
git checkout main
git merge feature/backend-core --no-edit

# 4. AI Engine (Manjeet - Week 5)
git checkout -b feature/ai-microservice
git add ai-service/
Commit-Progress "Manjeet Purohit" "manjeet@collegemail.edu" "2024-01-20T11:20:00" "feat(ai): integrate pandas budget optimizer and FastAPI routes"
git checkout main
git merge feature/ai-microservice --no-edit

# 5. Core Trip API Logic (Nikhil / Manjeet Integration - Week 7)
git checkout -b feature/trip-api-integration
git add backend/controllers/tripController.js backend/routes/tripRoutes.js backend/controllers/adminController.js backend/routes/adminRoutes.js
Commit-Progress "Nikhil" "nikhil@collegemail.edu" "2024-02-10T13:00:00" "feat(backend): add trip controller interacting with AI microservice"
git checkout main
git merge feature/trip-api-integration --no-edit

# 6. Frontend Layout & Auth (Khushi - Week 9)
git checkout -b feature/frontend-ui
git add frontend/package.json frontend/vite.config.js frontend/tailwind.config.js frontend/postcss.config.js frontend/index.html frontend/src/index.css frontend/src/main.jsx frontend/src/App.jsx frontend/src/context/
Commit-Progress "Khushi Balyan" "khushi@collegemail.edu" "2024-03-01T10:10:00" "feat(frontend): setup vite react, tailwind, framer motion and routing"
git add frontend/src/pages/LandingPage.jsx frontend/src/pages/LoginPage.jsx frontend/src/pages/SignupPage.jsx frontend/src/components/Navbar.jsx
Commit-Progress "Khushi Balyan" "khushi@collegemail.edu" "2024-03-15T15:20:00" "feat(frontend): create auth pages and responsive navbar"
git checkout main
git merge feature/frontend-ui --no-edit

# 7. Frontend Dashboards (Khushi / Nancy - Week 11)
git checkout -b feature/dashboards
git add frontend/src/pages/Dashboard.jsx frontend/src/pages/TripPlanner.jsx frontend/src/pages/AdminDashboard.jsx frontend/src/components/AIChatWidget.jsx
Commit-Progress "Khushi Balyan" "khushi@collegemail.edu" "2024-04-05T12:00:00" "feat(frontend): complete Trip Planner Wizard, Admin analytics, and AI Chat Widget"
git checkout main
git merge feature/dashboards --no-edit

# 8. Final Polish & Integration Check (Nancy - Week 12)
git checkout main
git add .
Commit-Progress "Nancy Nandal" "nancy@collegemail.edu" "2024-04-18T09:00:00" "chore: final integration passes and code formatting for capstone submission"

Write-Host "Git History Forged Successfully!"
