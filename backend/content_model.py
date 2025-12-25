import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from preprocess import preprocess

def train_content_model():
    movies = preprocess()

    tfidf = TfidfVectorizer(max_features=5000, stop_words="english")
    vectors = tfidf.fit_transform(movies['tags']).toarray()

    similarity = cosine_similarity(vectors)

    pickle.dump(movies, open("models/content_model.pkl","wb"))
    pickle.dump(similarity, open("models/similarity.pkl","wb"))

    print("Content-based model trained.")

if __name__ == "__main__":
    train_content_model()
