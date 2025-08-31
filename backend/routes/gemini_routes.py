from flask import Blueprint, request, jsonify
from services.gemini_service import evaluate_roleplay
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.ocr_service import extract_text

gemini_bp = Blueprint("gemini", __name__)

@gemini_bp.route("/send-transcript", methods=["POST", "GET"])
def receive_data():
    return "hi!!"
    data = request.json
    transcript = data.get("transcript")
    judge_prompt = extract_text()
    response = evaluate_roleplay(transcript, judge_prompt)
    return jsonify({"response": response})