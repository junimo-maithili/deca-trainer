from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/send-filet', methods=["POST"])
def receive_file():
    data = request.json
    transcript = data.get("formData")
    
