from flask import Blueprint, request, jsonify

opencv_bp = Blueprint("video", __name__)

@opencv_bp.route("/send-video", methods=["POST"])
def receive_data():
    data = request.json
    video = data.get("video")
    return jsonify({"response": data})
