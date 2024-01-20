import json

def generate_itinerary(destination: str, days: int, budget: str, budget_breakdown: dict):
    """
    In production with an API Key, this uses Google Gemini or OpenAI:
    import google.generativeai as genai
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    
    For reliability during capstone defense without exposing API constraints, 
    we implement a robust deterministic local-mock engine that acts as the scraped structured GenAI output.
    """

    itinerary_list = []
    
    for day in range(1, days + 1):
        day_plan = {
            "day": day,
            "theme": f"Exploring {destination} - Day {day}",
            "schedule": [
                {
                    "time": "09:00 AM",
                    "activity": f"Breakfast at a local {budget} cafe in {destination}",
                    "type": "Food"
                },
                {
                    "time": "11:00 AM",
                    "activity": f"Visit the central museum and historical district of {destination}",
                    "type": "Sightseeing"
                },
                {
                    "time": "01:00 PM",
                    "activity": "Lunch break",
                    "type": "Food"
                },
                {
                    "time": "03:00 PM",
                    "activity": f"Nature walk or local park visit near {destination} center",
                    "type": "Leisure"
                },
                {
                    "time": "07:00 PM",
                    "activity": f"Dinner reservations at a highly-rated {budget} restaurant",
                    "type": "Food"
                }
            ]
        }
        itinerary_list.append(day_plan)
        
    return itinerary_list
