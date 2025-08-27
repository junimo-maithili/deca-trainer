from flask import Blueprint, request, jsonify
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from services.ocr_service import extract_text

ocr_bp = Blueprint("ocr", __name__)

@ocr_bp.route("/send-file", methods=["POST"])
def return_text_rubric():
    file = request.files["file"]
    text = extract_text(file)
    return jsonify(text)