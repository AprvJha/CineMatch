import pandas as pd
import ast
from nltk.stem.porter import PorterStemmer

ps = PorterStemmer()

def stem(text):
    return " ".join([ps.stem(i) for i in text.split()])

def convert(obj):
    return [i['name'] for i in ast.literal_eval(obj)]

def get_director(obj):
    for i in ast.literal_eval(obj):
        if i['job'] == 'Director':
            return [i['name']]
    return []

def preprocess():
    movies = pd.read_csv("data/movies.csv")
    credits = pd.read_csv("data/credits.csv")

    movies = movies.merge(credits, on="title")
    movies = movies[['id','title','overview','genres','keywords','cast','crew']]
    movies.dropna(inplace=True)

    movies['genres'] = movies['genres'].apply(convert)
    movies['keywords'] = movies['keywords'].apply(convert)
    movies['cast'] = movies['cast'].apply(lambda x: convert(x)[:3])
    movies['crew'] = movies['crew'].apply(get_director)
    movies['overview'] = movies['overview'].apply(lambda x: x.split())

    for col in ['genres','keywords','cast','crew']:
        movies[col] = movies[col].apply(lambda x: [i.replace(" ","") for i in x])

    movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']
    movies['tags'] = movies['tags'].apply(lambda x: stem(" ".join(x).lower()))

    return movies[['id','title','tags']]
