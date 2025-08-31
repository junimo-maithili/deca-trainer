import os
import google.generativeai as genai

# No need to load .env manually
key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key)