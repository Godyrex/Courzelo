from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
from joblib import load
import datetime

# Load the trained model
model = load('C:/Users/Oussema/Documents/GitHub/Courzelo/Models/TimeTable/model.pkl')

app = Flask(__name__)
CORS(app, supports_credentials=True)  # This will enable CORS for all routes and include the Access-Control-Allow-Credentials header
from dateutil.parser import parse
@app.route('/predictModule', methods=['POST'])
def predict():
    # Get the data from the POST request
    data = request.get_json(force=True)
    print(data)
    # Convert the data into a pandas dataframe

    # Check if 'LastUpdate' and 'CurrentDate' keys exist in the data
        # Convert the date columns to Unix timestamps
    LastUpdate = int(parse(data[0]).timestamp()) if data[0] != 'null' else 0
    CurrentDate = int(parse(data[1]).timestamp()) if data[1] != 'null' else 0
    df = pd.DataFrame([[LastUpdate, CurrentDate]], columns=['LastUpdate', 'CurrentDate'])

        # Make a prediction using the model
    prediction = model.predict(df)
    print("prediction : ",prediction[0])
        # Return the prediction as a JSON response
    return jsonify(int(prediction[0]))

if __name__ == '__main__':
    app.run(port=5000, debug=True)