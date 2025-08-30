
from dotenv import load_dotenv
import os
from pathlib import Path
import google.generativeai as genai

# LLM setup
env_path = Path(__file__).resolve().parent.parent / "frontend" / ".env"
load_dotenv(dotenv_path=env_path)
key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key)
