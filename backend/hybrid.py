import pickle

# Load models
movies = pickle.load(open("models/content_model.pkl", "rb"))
top_neighbors = pickle.load(open("models/top_neighbors.pkl", "rb"))
svd = pickle.load(open("models/svd_model.pkl", "rb"))

movies["title"] = movies["title"].str.lower().str.strip()


def content_candidates(movie_title, k=15):
    movie_title = movie_title.lower().strip()

    if movie_title not in movies["title"].values:
        return []

    idx = movies[movies["title"] == movie_title].index[0]

    # Get precomputed neighbors
    neighbors = top_neighbors.get(idx, [])[:k]

    return [movies.iloc[i] for i in neighbors]


def hybrid_recommend(user_id, movie_title, k=5):
    candidates = content_candidates(movie_title)

    ranked = []
    for row in candidates:
        est = svd.predict(user_id, hash(row["title"]) % 10000).est
        ranked.append((row["title"], est))

    ranked.sort(key=lambda x: x[1], reverse=True)

    return [i[0].title() for i in ranked[:k]]
