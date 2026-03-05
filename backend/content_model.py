import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from preprocess import preprocess


def train_content_model():
    movies = preprocess()

    # keep matrix sparse (DO NOT convert to array)
    tfidf = TfidfVectorizer(max_features=5000, stop_words="english")
    vectors = tfidf.fit_transform(movies["tags"])

    similarity = cosine_similarity(vectors)

    top_k = 20
    top_neighbors = {}

    for i in range(len(similarity)):
        idx = np.argsort(similarity[i])[-top_k-1:-1][::-1]
        top_neighbors[i] = idx.tolist()

    pickle.dump(movies, open("models/content_model.pkl", "wb"))
    pickle.dump(top_neighbors, open("models/top_neighbors.pkl", "wb"))

    print("Content-based model trained with Top-K neighbors.")


if __name__ == "__main__":
    train_content_model()
