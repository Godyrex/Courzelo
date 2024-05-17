import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from joblib import dump

# 1) ya9ra dataset
df = pd.read_csv('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/programDataset.csv')

#2) ta9sim dataset
X = df[['User Skill 1', 'User Skill 2', 'User Skill 3', 'User Skill 4', 'User Skill 5', 'Institution']]
y = df['Program Name']

#3)ta7wil il dataset 
label_encoders = {}
for column in X.columns:
    le = LabelEncoder()
    X.loc[:, column] = le.fit_transform(X[column])
    label_encoders[column] = le
# ta9ssemha l tadrib w test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# yebda yetrena
model = LogisticRegression(max_iter=5000)  # num iteration
model.fit(X_train, y_train)

# test
y_pred = model.predict(X_test)

# yaatina 9adecho thkey
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# yexporti il model w data
dump(model, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/programModel.joblib')
dump(label_encoders, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/labelEncoders.joblib')