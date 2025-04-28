from flask import Flask, request, jsonify
from ai4bharat.transliteration import XlitEngine
import re
import os

# Set model directory to use pre-downloaded models
os.environ["AI4BHARAT_XLIT_MODELS_PATH"] = "/code/models"

app = Flask(__name__)

# Engines for transliteration
hindi_engine = XlitEngine("hi", beam_width=10, rescore=True)
urdu_engine = XlitEngine("ur", src_script_type="indic", beam_width=8, rescore=False)

def normalize_urdu(text: str) -> str:
    """Strip Arabic diacritics and zero-width joiners for more robust transliteration."""
    return re.sub(r"[\u064B-\u065F\u200C\u200D]", "", text)

def urdu_to_roman(text: str) -> str:
    """Convert Urdu script to Roman using the engine."""
    return urdu_engine.translit_sentence(text, lang_code="ur")

def roman_to_devanagari(roman: str) -> str:
    """Convert Roman to Devanagari (Hindi orthography)."""
    return hindi_engine.translit_sentence(roman)["hi"]

@app.route("/transliterate", methods=["POST"])
def transliterate():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify(status="error", message="Please provide 'text' field with Urdu content"), 400

    urdu_text = normalize_urdu(data["text"].strip())
    if not urdu_text:
        return jsonify(status="error", message="Empty text provided"), 400

    try:
        roman_text = urdu_to_roman(urdu_text)
        dev_text = roman_to_devanagari(roman_text)
        return jsonify(status="success", original=urdu_text, devanagari=dev_text)
    except Exception as e:
        return jsonify(status="error", message=f"Error in transliteration: {e}"), 500

@app.route("/", methods=["GET"])
def home():
    return jsonify(
        name="Urdu to Devanagari Transliteration API",
        description="Convert Urdu text to Devanagari script",
        endpoints=[
            {
                "path": "/transliterate",
                "method": "POST",
                "body": {"text": "Urdu text to transliterate"},
                "description": "Transliterate Urdu text to Devanagari",
            }
        ],
    )

if __name__ == "__main__":
    print("Starting Urdu to Devanagari Transliteration API…")
    print("API running at http://localhost:8000")
    app.run(debug=True, host="0.0.0.0", port=8000)
