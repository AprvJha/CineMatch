from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from hybrid import hybrid_recommend

app = FastAPI(title="Hybrid Movie Recommendation API")

# Allow frontend (demo only)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recommend")
def recommend(user_id: int, movie: str):
    return {
        "recommendations": hybrid_recommend(user_id, movie)
    }
