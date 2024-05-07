from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pandas as pd
from joblib import dump

# Load the dataset
df = pd.read_csv('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/TimeTable/moduleDataset.csv')

# Convert the date columns to Unix timestamps
df['LastUpdate'] = pd.to_datetime(df['LastUpdate'], format='%d/%m/%Y %H:%M').astype('int64') / 10**9
df['CurrentDate'] = pd.to_datetime(df['CurrentDate'], format='%d/%m/%Y %H:%M').astype('int64') / 10**9

# Split the dataset into features (X) and target (y)
X = df[['LastUpdate', 'CurrentDate']]
y = df['Popularity']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a RandomForestClassifier model
model = LogisticRegression(max_iter=1000)

# Train the model
model.fit(X_train, y_train)

# Make predictions on the testing set
y_pred = model.predict(X_test)

# Save the model
dump(model, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/TimeTable/model.pkl')

# Evaluate the model
print('Accuracy:', accuracy_score(y_test, y_pred))