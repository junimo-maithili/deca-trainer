'''

from flask import Flask
from routes.ocr_routes import ocr_bp
from routes.gemini_routes import gemini_bp
from routes.opencv_routes import opencv_bp
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["https://presentation-trainer.vercel.app/"])

    app.register_blueprint(ocr_bp)
    app.register_blueprint(gemini_bp)
    app.register_blueprint(opencv_bp)

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

'''

from flask import Flask
import os

print("Creating Flask app...")
app = Flask(__name__)
print("Flask app created successfully!")

@app.route('/')
def health():
    print("Health endpoint accessed!")
    return {"status": "healthy", "message": "App is working!"}, 200

@app.route('/test')
def test():
    return "Test endpoint working!", 200

print("Routes registered, app ready!")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)