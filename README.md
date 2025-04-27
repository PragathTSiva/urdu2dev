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
  "romanized": "assalamu alaikum",
  "devanagari": "अस्सलामु अलैकुम"
}
```

### 2. Transliterate Word (with multiple options)

**Endpoint:** `/transliterate-word`

**Method:** POST

**Request Body:**
```json
{
  "word": "السلام",
  "topk": 5,
  "beam_width": 10
}
```

**Success Response:**
```json
{
  "status": "success",
  "original": "السلام",
  "romanized": "assalamu",
  "devanagari_options": ["अस्सलामु", "असलामु", "अस्सलाम", ...]
}
```

### 3. Transliterate Sentence

**Endpoint:** `/transliterate-sentence`

**Method:** POST

**Request Body:**
```json
{
  "sentence": "السلام علیکم"
}
```

**Success Response:**
```json
{
  "status": "success",
  "original": "السلام علیکم",
  "romanized": "assalamu alaikum",
  "devanagari": "अस्सलामु अलैकुम"
}
```

### 4. Add Fallback Mapping

**Endpoint:** `/add-fallback-mapping`

**Method:** POST

**Request Body:**
```json
{
  "urdu": "میرا نام محمد ہے",
  "latin": "mera naam muhammad hai"
}
```

**Success Response:**
```json
{
  "status": "success",
  "message": "Fallback mapping added successfully",
  "urdu": "میرا نام محمد ہے",
  "latin": "mera naam muhammad hai",
  "total_mappings": 3
}
```

### 5. Get Fallback Mappings

**Endpoint:** `/fallback-mappings`

**Method:** GET

**Success Response:**
```json
{
  "status": "success",
  "mappings": {
    "السلام علیکم": "assalamu alaikum",
    "شکریہ": "shukriya"
  },
  "count": 2
}
```

## Testing

You can test the API using the provided test script:

```bash
python test_urdu_api.py
```

## Current Limitations

The transliteration tool has a few limitations:

1. Quality of transliteration depends on AI4Bharat's underlying models
2. Some Urdu phrases or words may not transliterate perfectly due to phonetic differences
3. Very specialized or technical Urdu terms might need manual fallback mappings
4. Performance may vary with long or complex text

## Future Improvements

Potential enhancements to the system:

1. Improved frontend UI with pronunciation guides
2. Support for batch processing of multiple texts
3. User accounts to save frequently used phrases
4. Integration with speech synthesis for pronunciation
5. Enhanced error handling and feedback mechanisms 