from flask import Flask
from routes.ocr_routes import ocr_bp
from routes.gemini_routes import gemini_bp
from routes.opencv_routes import opencv_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["https://presentation-trainer.vercel.app/"])

    app.register_blueprint(ocr_bp)
    app.register_blueprint(gemini_bp)
    app.register_blueprint(opencv_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
