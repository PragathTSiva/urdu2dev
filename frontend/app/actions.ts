"use server"

// Remove the import since it's causing issues and not needed

// This is a placeholder for the actual API call to the IndicXlit model
export async function translateText(text: string): Promise<string> {
  try {
    // Call the local API
    const response = await fetch('http://localhost:8000/transliterate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text
      }),
      cache: 'no-store'
    });
    
    const data = await response.json();
    
    if (data.status === "success") {
      return data.devanagari;
    } else if (data.status === "error" && data.available_phrases) {
      return `Translation not available. Available phrases: ${data.available_phrases.join(", ")}`;
    } else {
      throw new Error(data.message || "Failed to translate text");
    }
  } catch (error) {
    console.error("Error translating text:", error);
    throw new Error("Failed to translate text");
  }
}
