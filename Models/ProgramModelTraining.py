import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from joblib import dump

# Load the dataset from CSV
df = pd.read_csv('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/programDataset.csv')

# Split the data into features (X) and target (y)
X = df[['User Skill 1', 'User Skill 2']]
y = df['Program Name']

# Encode categorical features
label_encoder_skill1 = LabelEncoder()
label_encoder_skill2 = LabelEncoder()
X.loc[:, 'User Skill 1'] = label_encoder_skill1.fit_transform(X['User Skill 1'])
X.loc[:, 'User Skill 2'] = label_encoder_skill2.fit_transform(X['User Skill 2'])

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train a logistic regression model
model = LogisticRegression(max_iter=1000)  # Increase max_iter
model.fit(X_train, y_train)

# Predict on the testing set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# Export the trained model and transformers to files
dump(model, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/programModel.joblib')
dump(label_encoder_skill1, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/labelEncoderSkill1.joblib')
dump(label_encoder_skill2, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/labelEncoderSkill2.joblib')
dump(scaler, 'C:/Users/Oussema/Documents/GitHub/Courzelo/Models/scaler.joblib')