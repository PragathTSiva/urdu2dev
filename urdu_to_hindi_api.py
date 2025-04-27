import fix_torch_load  # Import the torch patch first

from flask import Flask, request, jsonify
from ai4bharat.transliteration import XlitEngine
import re

app = Flask(__name__)

# 1. Latin (Roman) -> Devanagari (Hindi orthography)
hindi_engine = XlitEngine("hi", beam_width=10, rescore=True)

# 2. Urdu script -> Roman (using indic→roman model)
urdu_engine = XlitEngine("ur", src_script_type="indic", beam_width=8, rescore=False)

# Fallback dictionary for special cases not handled well by the model
urdu_to_latin = {
    "السلام علیکم": "assalamu alaikum",
    "شکریہ": "shukriya",
    # Extend as needed
}

# ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
# Helpers
# ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

def normalize_urdu(text: str) -> str:
    """Strip Arabic diacritics and zero-width joiners for more robust transliteration."""
    return re.sub(r"[\u064B-\u065F\u200C\u200D]", "", text)


def urdu_to_roman(text: str) -> str:
    """Convert Urdu script to Roman using the engine, falling back to dictionary if needed."""
    if text in urdu_to_latin:
        return urdu_to_latin[text]
    return urdu_engine.translit_sentence(text, lang_code="ur")


def roman_to_devanagari(roman: str) -> str:
    """Convert Roman to Devanagari (Hindi orthography)."""
    return hindi_engine.translit_sentence(roman)["hi"]

# ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
# Routes
# ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

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
        return jsonify(status="success", original=urdu_text, romanized=roman_text, devanagari=dev_text)
    except Exception as e:
        return jsonify(status="error", message=f"Error in transliteration: {e}"), 500


@app.route("/transliterate-word", methods=["POST"])
def transliterate_word():
    data = request.get_json()
    if not data or "word" not in data:
        return jsonify(status="error", message="Please provide 'word' field"), 400

    urdu_word = normalize_urdu(data["word"].strip())
    if not urdu_word:
        return jsonify(status="error", message="Empty word provided"), 400

    try:
        topk = data.get("topk", 5)
        beam_width = data.get("beam_width", 10)

        if urdu_word in urdu_to_latin:
            roman_word = urdu_to_latin[urdu_word]
        else:
            roman_candidates = urdu_engine.translit_word(urdu_word, lang_code="ur", topk=1)
            roman_word = roman_candidates[0] if roman_candidates else urdu_word

        devanagari_options = hindi_engine.translit_word(roman_word, topk=topk, beam_width=beam_width)["hi"]

        return jsonify(status="success", original=urdu_word, romanized=roman_word, devanagari_options=devanagari_options)
    except Exception as e:
        return jsonify(status="error", message=f"Error in transliteration: {e}"), 500


@app.route("/transliterate-sentence", methods=["POST"])
def transliterate_sentence():
    data = request.get_json()
    if not data or "sentence" not in data:
        return jsonify(status="error", message="Please provide 'sentence' field"), 400

    urdu_sentence = normalize_urdu(data["sentence"].strip())
    if not urdu_sentence:
        return jsonify(status="error", message="Empty sentence provided"), 400

    try:
        roman_sentence = urdu_to_roman(urdu_sentence)
        devanagari_sentence = roman_to_devanagari(roman_sentence)
        return jsonify(status="success", original=urdu_sentence, romanized=roman_sentence, devanagari=devanagari_sentence)
    except Exception as e:
        return jsonify(status="error", message=f"Error in transliteration: {e}"), 500


@app.route("/add-fallback-mapping", methods=["POST"])
def add_fallback_mapping():
    data = request.get_json()
    if not data or "urdu" not in data or "latin" not in data:
        return jsonify(status="error", message="Please provide both 'urdu' and 'latin' fields"), 400

    urdu = data["urdu"].strip()
    latin = data["latin"].strip()
    if not urdu or not latin:
        return jsonify(status="error", message="Empty text provided for one or more fields"), 400

    urdu_to_latin[urdu] = latin
    return jsonify(status="success", message="Fallback mapping added successfully", urdu=urdu, latin=latin, total_mappings=len(urdu_to_latin))


@app.route("/fallback-mappings", methods=["GET"])
def get_fallback_mappings():
    return jsonify(status="success", mappings=urdu_to_latin, count=len(urdu_to_latin))


@app.route("/", methods=["GET"])
def home():
    return jsonify(
        name="Urdu to Hindi Transliteration API",
        description="Convert Urdu text to Devanagari (Hindi) script",
        endpoints=[
            {
                "path": "/transliterate",
                "method": "POST",
                "body": {"text": "Urdu text to transliterate"},
                "description": "Transliterate Urdu text to Devanagari",
            },
            {
                "path": "/transliterate-word",
                "method": "POST",
                "body": {"word": "Urdu word", "topk": 5, "beam_width": 10},
                "description": "Get multiple transliteration options for an Urdu word",
            },
            {
                "path": "/transliterate-sentence",
                "method": "POST",
                "body": {"sentence": "Urdu sentence to transliterate"},
                "description": "Transliterate an Urdu sentence to Devanagari",
            },
            {
                "path": "/add-fallback-mapping",
                "method": "POST",
                "body": {"urdu": "Urdu text", "latin": "Romanized text"},
                "description": "Add a new fallback mapping for special cases",
            },
            {
                "path": "/fallback-mappings",
                "method": "GET",
                "description": "Get all available fallback mappings",
            },
        ],
    )


if __name__ == "__main__":
    print("Starting Urdu to Hindi Transliteration API…")
    print("API running at http://localhost:8000")
    app.run(debug=True, host="0.0.0.0", port=8000)
