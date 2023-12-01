# Final Year Project VIVA Q&A Prep

### Q1. What was the main motivation behind this project?
**Ans:** Traditional travel planning is highly fragmented. Users have to visit a website for flights, another for hotels, and blogs for itineraries. Our solution utilizes Generative AI to provide a centralized, personalized plan within seconds.

### Q2. Why did you choose the MERN stack instead of purely utilizing Python (like Django/Flask) for the whole app?
**Ans:** React provides un-matched SPA responsiveness and component reusability. Node.js manages I/O intense HTTP routing efficiently. Python is undeniably best for ML and data manipulation, which is why we isolated it into its own microservice so each tech stack does what it's best at.

### Q3. How does the AI itinerary generation actually work?
**Ans:** The React frontend captures user parameters (destination, duration, budget). The node backend validates the session and passes this payload to our Python FastAPI service. The Python service constructs an optimal structured Prompt which is executed against a Generative AI endpoint. The text response is heuristically parsed into structured JSON and returned to the frontend.

### Q4. How are passwords stored in the database?
**Ans:** Passwords are never stored in plain text. We utilize the `bcrypt` library to salt and hash the passwords. If the DB is compromised, user text passwords remain secure.

### Q5. What is JWT and why is it used here?
**Ans:** JSON Web Tokens form our stateless authentication mechanism. Once a user logs in, the Node backend issues a JWT. It's stored in the browser (usually cookies or local storage) and passed in the `Authorization` header for protected routes to prove identity without querying the DB every time.

### Q6. How did your team collaborate?
**Ans:** We used Git for version control and GitHub for remote repository management. We divided features into smaller stories using a Jira-styled Kanban Board. We simulated agile sprints.

### Q7. What are the roles of Docker and Jenkins?
**Ans:** Docker packages our apps into standardized "Containers" to avoid the "it works on my machine" problem. Jenkins is our continuous integration tool that automatically pulls new code commits from GitHub, builds them, and ensures they are deployment ready.
