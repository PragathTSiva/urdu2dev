import requests
import json

def test_transliteration(text):
    url = "http://localhost:8000/transliterate"
    headers = {"Content-Type": "application/json"}
    data = {"text": text}
    
    try:
        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        
        print(f"\nTransliterating: '{text}'")
        print(f"Status: {result.get('status', 'unknown')}")
        
        if response.status_code == 200:
            print(f"Romanized: {result.get('romanized', '')}")
            print(f"Devanagari: {result.get('devanagari', '')}")
        else:
            print(f"Message: {result.get('message', 'Unknown error')}")
            if "available_phrases" in result:
                print("Available phrases:")
                for i, phrase in enumerate(result["available_phrases"], 1):
                    print(f"  {i}. {phrase}")
    except requests.exceptions.ConnectionError:
        print(f"\nError: Could not connect to API. Make sure the server is running.")
    except Exception as e:
        print(f"\nError: {str(e)}")

def add_new_mapping(urdu, latin):
    url = "http://localhost:8000/add-mapping"
    headers = {"Content-Type": "application/json"}
    data = {"urdu": urdu, "latin": latin}
    
    try:
        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        
        print(f"\nAdding new mapping:")
        print(f"Urdu: '{urdu}'")
        print(f"Latin: '{latin}'")
        print(f"Status: {result.get('status', 'unknown')}")
        print(f"Message: {result.get('message', '')}")
        print(f"Total mappings: {result.get('total_mappings', 0)}")
    except requests.exceptions.ConnectionError:
        print(f"\nError: Could not connect to API. Make sure the server is running.")
    except Exception as e:
        print(f"\nError: {str(e)}")

def get_available_mappings():
    url = "http://localhost:8000/mappings"
    
    try:
        response = requests.get(url)
        result = response.json()
        
        print("\nAvailable Mappings:")
        print(f"Total: {result.get('count', 0)}")
        
        if result.get("status") == "success":
            for i, (urdu, latin) in enumerate(result.get("mappings", {}).items(), 1):
                if i <= 5:  # Show only first 5 mappings to avoid clutter
                    print(f"  {i}. {urdu} → {latin}")
            
            if result.get("count", 0) > 5:
                print(f"  ... and {result.get('count', 0) - 5} more")
    except requests.exceptions.ConnectionError:
        print(f"\nError: Could not connect to API. Make sure the server is running.")
    except Exception as e:
        print(f"\nError: {str(e)}")

if __name__ == "__main__":
    print("Urdu to Devanagari API Test")
    print("===========================")
    
    # Test some phrases that are in the dictionary
    test_transliteration("السلام علیکم")  # Assalamu alaikum
    test_transliteration("شکریہ")  # Thank you
    
    # Test a phrase that is not in the dictionary
    test_transliteration("میرا نام محمد ہے")  # My name is Muhammad
    
    # Add a new mapping
    add_new_mapping("میرا نام محمد ہے", "mera naam muhammad hai")
    
    # Test the newly added phrase
    test_transliteration("میرا نام محمد ہے")
    
    # Get available mappings
    get_available_mappings() 