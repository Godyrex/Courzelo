from flask import Flask, request, jsonify
import pandas as pd
from joblib import load

app = Flask(__name__)

# Load the model
model = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/User/model.pkl')

from dateutil.parser import parse

@app.route('/predictTFA', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json()
    print(data)

    # Convert ISO 8601 formatted strings to Unix timestamps
    data[1] = int(parse(data[1]).timestamp()) if data[1] != 'null' else 0
    data[2] = int(parse(data[2]).timestamp()) if data[2] != 'null' else 0

    # Make a prediction
    prediction = model.predict(pd.DataFrame([data], index=[0]))

    # Send the prediction as a response
    return jsonify(int(prediction[0]))

if __name__ == '__main__':
    app.run(port=5000)