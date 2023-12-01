# Jira Project Tracking: GEN AI Powered Travel Guide

## Team Members
- **Nancy Nandal** → Project Manager
- **Manjeet Purohit** → AI/ML Engineer
- **Nikhil** → Backend Developer
- **Deepesh Yadav** → DevOps Engineer
- **Khushi Balyan** → Frontend Developer

## Roadmap & Timeline
- **Sprint 1 (Weeks 1-2)**: Setup, documentation, DB schemas, initial backends.
- **Sprint 2 (Weeks 3-4)**: AI Model prototyping, basic frontend layout.
- **Sprint 3 (Weeks 5-6)**: Frontend & API integration, user authentication flow.
- **Sprint 4 (Weeks 7-8)**: Advanced Dashboard features, AI Chatbot integration.
- **Sprint 5 (Weeks 9-10)**: Jenkins pipelines, bug squashing, reporting UI.
- **Sprint 6 (Weeks 11-12)**: Final deployment, documentation polishing, Viva prep.

## Backlog

### Epic 1: Project Setup & DevOps (Assignee: Deepesh Yadav)
- [x] **US-01 [Task]**: Create GitHub Repository and define branching strategy.
- [x] **US-02 [Task]**: Setup Docker & Docker Compose for Node, React, Python and Mongo.
- [x] **US-03 [Task]**: Create Jenkins Pipeline for CI/CD.
- [x] **US-04 [Task]**: Setup AWS EC2 / Render deployment targets.

### Epic 2: Core Backend Development (Assignee: Nikhil)
- [x] **US-05 [Story]**: As a user, I want a secure REST API backend.
  - Subtask: Initialize Node/Express server.
  - Subtask: Create Mongoose schemas (User, Trip).
- [x] **US-06 [Story]**: As a user, I need to authenticate securely.
  - Subtask: Setup JWT and bcrypt.
  - Subtask: Implement Login, Signup, Forgot password flows.
- [x] **US-07 [Story]**: As an admin, I want to see analytics data via API.
  - Subtask: Create Admin analytical routes.

### Epic 3: AI Engine & Python Backend (Assignee: Manjeet Purohit)
- [x] **US-08 [Story]**: As a user, I want smart recommendations.
  - Subtask: Set up FastAPI wrapper for Data pipelines.
  - Subtask: Integrate generative AI for day-wise itinerary generation.
- [x] **US-09 [Story]**: As a user, I want budget optimization.
  - Subtask: Train/Implement cost estimation heuristics using Scikit/Pandas.
- [x] **US-10 [Story]**: As a user, I want an AI assistant chatbot.
  - Subtask: Create streaming endpoints for travel assistant.

### Epic 4: Frontend Development (Assignee: Khushi Balyan)
- [x] **US-11 [Story]**: As an anonymous user, I want an attractive landing page.
  - Subtask: Scaffold React+Tailwind frontend.
  - Subtask: Build parallax header and animations.
- [x] **US-12 [Story]**: As a user, I want an intuitive dashboard.
  - Subtask: Build user profile page.
  - Subtask: Build "Generate Trip" multi-step wizard.
- [x] **US-13 [Story]**: As a user, I want to see a rich generated itinerary.
  - Subtask: Build Day-by-Day timeline view.
  - Subtask: Integrate Google Maps embed.

### Epic 5: Project Management & Verification (Assignee: Nancy Nandal)
- [x] **US-14 [Task]**: Orchestrate weekly standups and task allocations.
- [x] **US-15 [Task]**: Final integration testing.
- [x] **US-16 [Task]**: Prepare Presentation and Architecture Docs (SRS/SDD).
