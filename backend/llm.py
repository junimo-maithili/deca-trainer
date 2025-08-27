from google import genai
from dotenv import load_dotenv
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# LLM setup
env_path = Path(__file__).resolve().parent.parent / "frontend" / ".env"
load_dotenv(dotenv_path=env_path)
key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=key)

app = Flask(__name__)
CORS(app)

# Route for receiving data
@app.route('/send-transcript', methods=["POST"])
def receive_data():
    data = request.json
    transcript = data.get("transcript")

    if not transcript:
        return jsonify({"error": "Transcript is empty"}), 400

    try:  
        response = client.models.generate_content(model="gemini-2.0-flash", contents=transcript)
        print(response)
        return jsonify({"response": response.text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_reloader=False)
