🎬 CineMatch — Hybrid Movie Recommendation System

CineMatch is a Hybrid Movie Recommendation System that delivers personalized movie recommendations by combining
Content-Based Filtering and Collaborative Filtering (SVD).
The system uses real-world datasets and a Python-based machine learning backend, integrated with a modern React frontend.

🚀 Key Features

🎯 Hybrid Recommendation Engine

Content-based filtering using TF-IDF and cosine similarity

Collaborative filtering using SVD (matrix factorization)

👤 User-personalized recommendations

⚡ FastAPI backend for real-time ML inference

🎨 Modern UI built with React, Vite, Tailwind CSS, and shadcn/ui

📊 Model evaluation using RMSE

🧪 Trained on real-world MovieLens and TMDB datasets

🔗 Fully integrated frontend and backend (no mock data)

🧠 System Architecture
Frontend (React + Vite)
        |
        |  HTTP API Call
        v
Backend (FastAPI)
        |
        |  Hybrid Recommendation Logic
        v
Content-Based Filtering + Collaborative Filtering (SVD)


The frontend handles user interaction and visualization.

The backend performs all recommendation computations using trained ML models.

📁 Project Structure
cinema-ai/
├── backend/        # Python ML backend
│   ├── api.py
│   ├── hybrid.py
│   ├── requirements.txt
│   ├── models/
│   │   └── README.md
│   └── data/
│       └── README.md
│
├── src/            # React frontend source code
├── public/         # Static frontend assets
├── index.html
├── package.json
└── README.md       # This file

🧩 Backend Details
🔧 Tech Stack

Python

FastAPI

Pandas, NumPy

Scikit-learn

Surprise (SVD)

▶️ How to Run Backend
cd backend
pip install -r requirements.txt
uvicorn api:app --reload


Backend runs at:

http://127.0.0.1:8000

📡 API Endpoint
Get Movie Recommendations
GET /recommend


Query Parameters

user_id → User ID from MovieLens dataset

movie → Movie title selected by the user

Example Request

http://127.0.0.1:8000/recommend?user_id=1&movie=Avatar


Example Response

{
  "recommendations": [
    "Aliens",
    "Titanic",
    "The Abyss",
    "Prometheus",
    "Avatar: The Way of Water"
  ]
}

🎨 Frontend Details
🔧 Tech Stack

React

Vite

TypeScript

Tailwind CSS

shadcn/ui

▶️ How to Run Frontend
npm install
npm run dev


Frontend runs at:

http://localhost:8080

📊 Model Accuracy

Metric: RMSE (Root Mean Squared Error)

Value: ~0.94

An RMSE below 1 indicates that the predicted ratings differ from actual ratings by less than one star on average, which is considered good performance for sparse recommendation datasets.

📦 Datasets Used

This project is trained and evaluated using real datasets only.

🎞 MovieLens 100K Dataset

Used for collaborative filtering (user–movie ratings)

Source:
https://www.kaggle.com/datasets/prajitdatta/movielens-100k-dataset

🎬 TMDB 5000 Movies Dataset

Used for content-based filtering (movie metadata)

Includes movie overviews, genres, cast, crew, and keywords

Source:
https://www.kaggle.com/datasets/tmdb/tmdb-movie-metadata/data

📦 Model & Data Files

Trained model files (.pkl) and large datasets are not included in the repository due to GitHub file size limitations.

All source code required to recreate the models locally is provided.

Refer to:

backend/models/README.md

backend/data/README.md

🎓 Academic Notes

This project demonstrates:

Real-world recommendation system design

Hybrid machine learning approach

Frontend–backend integration

All recommendations are generated using trained ML models

No mock data is used in either backend or frontend
