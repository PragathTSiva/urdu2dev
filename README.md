# Urdu to Devanagari Transliteration Tool

A web application that converts Urdu text to Devanagari (Hindi) script using AI4Bharat's transliteration engine.

## Architecture

The project consists of two main components:
1. **Backend API**: A Flask server that handles the transliteration process
2. **Frontend**: A Next.js web application that provides a user interface

### How Transliteration Works

The transliteration process works in two steps:
1. Urdu script is converted to Latin (Roman) script using AI4Bharat's transliteration engine or a fallback dictionary
2. The Latin script is then converted to Devanagari script using AI4Bharat's Hindi transliteration engine

## Backend Setup

1. Create and activate a Python virtual environment with Python 3.9:

```bash
python3.9 -m venv venv
source venv/bin/activate
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Run the API server:

```bash
python urdu_to_hindi_api.py
```

This will start the server on http://localhost:8000.

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

The frontend will be available at http://localhost:3000.

## API Endpoints

### 1. Transliterate Text

**Endpoint:** `/transliterate`

**Method:** POST

**Request Body:**
```json
{
  "text": "السلام علیکم"
}
```

**Success Response:**
```json
{
  "status": "success",
  "original": "السلام علیکم",
  "devanagari": "अस्सलामु अलैकुम"
}
```

### 2. API Information

**Endpoint:** `/`

**Method:** GET

**Success Response:**
```json
{
  "name": "Urdu to Devanagari Transliteration API",
  "description": "Convert Urdu text to Devanagari script",
  "endpoints": [
    {
      "path": "/transliterate",
      "method": "POST",
      "body": {"text": "Urdu text to transliterate"},
      "description": "Transliterate Urdu text to Devanagari"
    }
  ]
}
``` 