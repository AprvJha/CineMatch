import pandas as pd
import pickle
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy

ratings = pd.read_csv("data/ratings.csv")

reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(ratings[['userId','movieId','rating']], reader)

trainset, testset = train_test_split(data, test_size=0.2, random_state=42)

model = SVD(n_factors=100, n_epochs=20, lr_all=0.005, reg_all=0.02)
model.fit(trainset)

preds = model.test(testset)
rmse = accuracy.rmse(preds)

pickle.dump(model, open("models/svd_model.pkl","wb"))

print("SVD trained. RMSE:", rmse)


print(model.predict(1, 50))
