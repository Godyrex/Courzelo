from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True) 

# chargiw il model w dictionnaire
model = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/programModel.joblib')
label_encoders = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/labelEncoders.joblib')

# ta7wil donne
def safe_transform(label_encoders, labels):
    transformed_labels = []
    for label in labels:
        transformed = False
        for le in label_encoders.values():
            try:
                transformed_labels.append(le.transform([label])[0])
                transformed = True
                break
            except ValueError:
                continue
        if not transformed:
            print(f"Unseen label: {label}")
            transformed_labels.append(len(le.classes_))
    return np.array(transformed_labels)
#api flask
@app.route('/predict', methods=['POST'])
def predict():
    # yekho skills w institution
    data = request.get_json(force=True)
    print("Data : ", data)
    skills = data['skills']
    # nhadhro donne
    new_observation_encoded = safe_transform(label_encoders, skills + [data['institution']])
    new_observation_encoded = new_observation_encoded.reshape(1, -1)

    # Prediction
    prediction = model.predict(new_observation_encoded)

    # niba3tho il program
    output = prediction[0]
    print("output : ", output)
    return jsonify(output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)