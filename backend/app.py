import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask
from routes.ocr_routes import ocr_bp
from routes.gemini_routes import gemini_bp
# from routes.opencv_routes import opencv_bp
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "https://presentation-trainer.vercel.app",
    "https://*.vercel.app"
])

# Or for testing, allow all origins (NOT for production)
# CORS(app, origins="*")
app.register_blueprint(ocr_bp)
app.register_blueprint(gemini_bp)
#app.register_blueprint(opencv_bp)

@app.route("/")
def test():
    return "Backend is alive!"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

