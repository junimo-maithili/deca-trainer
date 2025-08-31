from flask import Flask
import logging
import os
import sys
from routes.ocr_routes import ocr_bp


app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Railway!"


#app.register_blueprint(ocr_bp)
#app.register_blueprint(gemini_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


'''
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)




from flask import Flask
from routes.ocr_routes import ocr_bp
from routes.gemini_routes import gemini_bp
from routes.opencv_routes import opencv_bp
from flask_cors import CORS
import os
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)


logging.info("AAHFHHGHHESHOEIGHO")

app = Flask(__name__)
CORS(app, origins=["https://presentation-trainer.vercel.app/"])

#app.register_blueprint(ocr_bp)
#app.register_blueprint(gemini_bp)
#app.register_blueprint(opencv_bp)


@app.route("/")
def test():
    logging.info("hello!")
    print("WAHOOOOOO")
    return "Backend is alive!"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

'''