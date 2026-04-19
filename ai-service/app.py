from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

from recommendation import generate_itinerary, generate_hotels
from budget_optimizer import optimize_budget

app = FastAPI(title="Travel AI Microservice")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    destination: str
    days: int
    budget: str

@app.get("/api/health")
def health_check():
    return {"status": "AI Fast API is running"}

@app.post("/api/recommendation/generate")
def get_recommendation(request: TripRequest):
    try:
        # Step 1: Use heuristic ML logic for budget
        estimated_cost, breakdown = optimize_budget(request.destination, request.days, request.budget)
        
        # Step 2: Use Generative AI (mocked or real) for itinerary
        itinerary = generate_itinerary(request.destination, request.days, request.budget, breakdown)

        return {
            "metadata": {
                "destination": request.destination,
                "days": request.days,
                "budget_tier": request.budget,
                "total_estimated_cost": estimated_cost,
                "budget_breakdown": breakdown,
                "hotels": generate_hotels(request.destination, request.budget),
                "backdrop_image": f"https://source.unsplash.com/1600x900/?{request.destination.replace(' ', ',')}"
            },
            "itinerary": itinerary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
