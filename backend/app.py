from flask import Flask
from routes.ocr_routes import ocr_bp
from routes.gemini_routes import gemini_bp
from routes.opencv_routes import opencv_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(ocr_bp)
    app.register_blueprint(gemini_bp)
    app.register_blueprint(opencv_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5000, debug=True)
