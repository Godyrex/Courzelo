from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True)  # This will enable CORS for all routes and include the Access-Control-Allow-Credentials header

# tchargiw il fichiers
model = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/programModel.joblib')
label_encoder_skill1 = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/labelEncoderSkill1.joblib')
label_encoder_skill2 = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/labelEncoderSkill2.joblib')
scaler = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/scaler.joblib')

#thasen fil input
def safe_transform(label_encoder, labels):
    try:
        return label_encoder.transform(labels)
    except ValueError as e:
        print(f"Unseen label: {e}")
        return np.array([label_encoder.classes_.shape[0]])

@app.route('/predict', methods=['POST'])
def predict():
    # ijib skills
    skills = request.get_json(force=True)
    print("skills : ",skills)
    # ihadher donne
    new_observation_encoded = [safe_transform(label_encoder_skill1, [skills[0]]), safe_transform(label_encoder_skill2, [skills[1]])]
    new_observation_encoded = np.array(new_observation_encoded).reshape(1, -1)
    new_observation_scaled = scaler.transform(new_observation_encoded)

    # nista3mlo model w npredectiw
    prediction = model.predict(new_observation_scaled)

    # nibaatho il program
    output = prediction[0]
    print("output : ",output)
    return jsonify(output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)