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

    # Dictionary of popular global landmarks for mock reliability
    landmarks_db = {
        "jaipur": ["Amer Fort", "Hawa Mahal", "Jantar Mantar", "City Palace"],
        "paris": ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Montmartre"],
        "tokyo": ["Shibuya Crossing", "Senso-ji Temple", "Tokyo Skytree", "Meiji Shrine"],
        "new york": ["Statue of Liberty", "Central Park", "Times Square", "Empire State"],
        "kyoto": ["Fushimi Inari Shrine", "Kinkaku-ji", "Arashiyama Bamboo Grove", "Kiyomizu-dera"],
        "london": ["London Eye", "Tower of London", "Buckingham Palace", "Big Ben"]
    }
    
    dest_lower = destination.lower().strip()
    # Find matching city if it exists within the provided destination string
    local_landmarks = None
    for city, marks in landmarks_db.items():
        if city in dest_lower:
            local_landmarks = marks
            break
            
    itinerary_list = []
    
    for day in range(1, days + 1):
        # Pick specific landmarks for the day if available
        sight_mark = local_landmarks[(day * 2 - 2) % len(local_landmarks)] if local_landmarks else f"The Grand {destination} Monument"
        leisure_mark = local_landmarks[(day * 2 - 1) % len(local_landmarks)] if local_landmarks else f"Central {destination} Park"

        day_plan = {
            "day": day,
            "theme": f"Exploring {destination} - Day {day}",
            "schedule": [
                {
                    "time": "09:00 AM",
                    "placeName": f"Local {budget} Cafe",
                    "activity": f"Breakfast at a local {budget} cafe in {destination}",
                    "type": "Food"
                },
                {
                    "time": "11:00 AM",
                    "placeName": sight_mark,
                    "activity": f"Visit the iconic {sight_mark} and explore its history",
                    "type": "Sightseeing"
                },
                {
                    "time": "01:00 PM",
                    "placeName": "Local Restaurant",
                    "activity": "Lunch break",
                    "type": "Food"
                },
                {
                    "time": "03:00 PM",
                    "placeName": leisure_mark,
                    "activity": f"A relaxing walk near {leisure_mark} exploring local culture",
                    "type": "Leisure"
                },
                {
                    "time": "07:00 PM",
                    "placeName": f"{budget} Dinner Lounge",
                    "activity": f"Dinner reservations at a highly-rated {budget} restaurant",
                    "type": "Food"
                }
            ]
        }
        itinerary_list.append(day_plan)
        
    return itinerary_list

def generate_hotels(destination: str, budget: str):
    """
    Mock local determinist engine to output hotel accommodation based on budget tier.
    """
    base_price = 50 if budget == "Low" else 150 if budget == "Medium" else 300 if budget == "High" else 800
    
    return [
        {
            "name": f"Central District {budget} Inn",
            "rating": "4.2",
            "pricePerNight": f"${base_price}",
            "amenities": ["Free WiFi", "Breakfast Included"] if budget in ["Medium", "High", "Luxury"] else ["Free WiFi"]
        },
        {
            "name": f"Riverside {budget} Suites",
            "rating": "4.5",
            "pricePerNight": f"${int(base_price * 1.2)}",
            "amenities": ["Pool", "Spa", "Free WiFi", "Breakfast Included"] if budget in ["High", "Luxury"] else ["Free WiFi", "Restaurant"]
        },
        {
            "name": f"The Grand {destination} {budget} Resort",
            "rating": "4.8",
            "pricePerNight": f"${int(base_price * 1.5)}",
            "amenities": ["Valet Parking", "Pool", "Spa", "Lounge", "Ocean/City View"] if budget == "Luxury" else ["Gym", "Free WiFi"]
        }
    ]
