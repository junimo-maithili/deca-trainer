from PIL import Image
import pytesseract
from pdf2image import convert_from_bytes

EXTRACTED_TEXT_PATH = "data/judge_prompt.txt"

def extract_text(file=None):
    if not file:
        try:
            with open(EXTRACTED_TEXT_PATH, "r") as f:
                return f.read()
        except FileNotFoundError:
            return "No rubric text found."

    if file.mimetype == "application/pdf":
        # Read the entire file bytes once
        pdf_bytes = file.read()
        images = convert_from_bytes(pdf_bytes)
        text = "\n".join(pytesseract.image_to_string(img) for img in images)

    else:
        file.seek(0)
        image = Image.open(file)
        text = pytesseract.image_to_string(image).strip()

    with open(EXTRACTED_TEXT_PATH, "w") as f:
        f.write(text)

        return text