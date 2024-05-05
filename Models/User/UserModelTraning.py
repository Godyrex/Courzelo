from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pandas as pd
from joblib import dump

# Load the data
df = pd.read_csv('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/User/userDataset.csv')

# Convert login_time and logout_time to datetime and then to integer
df['login_time'] = pd.to_datetime(df['login_time'], format='%d/%m/%Y %H:%M').astype('int64') / 10**9
df['logout_time'] = pd.to_datetime(df['logout_time'], format='%d/%m/%Y %H:%M').astype('int64') / 10**9

# Define the features and the target
features = df[['login_time', 'logout_time', 'device_count']]
target = df['should_enable_tfa']

# Split the data into a training set and a test set
features_train, features_test, target_train, target_test = train_test_split(features, target, test_size=0.2, random_state=42)

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(features_train, target_train)

# Use the model to make predictions on the test set
target_pred = model.predict(features_test)
dump(model, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/User/model.pkl')
# Evaluate the model
print('Accuracy:', accuracy_score(target_test, target_pred))