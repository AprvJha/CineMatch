import pickle

# Load models
movies = pickle.load(open("models/content_model.pkl", "rb"))
similarity = pickle.load(open("models/similarity.pkl", "rb"))
svd = pickle.load(open("models/svd_model.pkl", "rb"))

movies["title"] = movies["title"].str.lower().str.strip()

def content_candidates(movie_title, k=15):
    movie_title = movie_title.lower().strip()

    if movie_title not in movies["title"].values:
        return []

    idx = movies[movies["title"] == movie_title].index[0]
    scores = list(enumerate(similarity[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:k+1]

    return [movies.iloc[i[0]] for i in scores]

def hybrid_recommend(user_id, movie_title, k=5):
    candidates = content_candidates(movie_title)

    ranked = []
    for row in candidates:
        est = svd.predict(user_id, hash(row["title"]) % 10000).est
        ranked.append((row["title"], est))

    ranked.sort(key=lambda x: x[1], reverse=True)
    return [i[0].title() for i in ranked[:k]]
