import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // This would serve the JavaScript file for the widget
  // In a real implementation, this would be a bundled JS file

  const widgetCode = `
  class UrduDevanagariTranslator {
    constructor(options) {
      this.container = options.container;
      this.apiKey = options.apiKey;
      this.init();
    }
    
    async init() {
      // Create the widget UI
      this.container.innerHTML = \`
        <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 0.5rem; overflow: hidden;">
          <div style="padding: 1rem; border-bottom: 1px solid #e2e8f0;">
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Urdu to Devanagari Translator</h3>
          </div>
          <div style="padding: 1rem;">
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Urdu Text</label>
              <textarea id="urdu-input" style="width: 100%; min-height: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-family: 'Noto Nastaliq Urdu', serif; text-align: right; direction: rtl;"></textarea>
            </div>
            <div style="text-align: center; margin-bottom: 1rem;">
              <button id="translate-button" style="background-color: #3b82f6; color: white; font-weight: 500; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">Transliterate</button>
            </div>
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Devanagari Text</label>
              <textarea id="devanagari-output" style="width: 100%; min-height: 100px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-family: 'Noto Sans Devanagari', sans-serif;" readonly></textarea>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
              <button id="reset-button" style="background-color: transparent; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Reset</button>
              <button id="copy-button" style="background-color: #f3f4f6; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Copy</button>
            </div>
          </div>
          <div style="padding: 0.5rem; text-align: center; font-size: 0.75rem; color: #6b7280; border-top: 1px solid #e2e8f0;">
            Powered by AI4Bharat IndicXlit
          </div>
        </div>
      \`;
      
      // Add event listeners
      this.setupEventListeners();
    }
    
    setupEventListeners() {
      const translateButton = this.container.querySelector('#translate-button');
      const resetButton = this.container.querySelector('#reset-button');
      const copyButton = this.container.querySelector('#copy-button');
      const urduInput = this.container.querySelector('#urdu-input');
      const devanagariOutput = this.container.querySelector('#devanagari-output');
      
      translateButton.addEventListener('click', async () => {
        const text = urduInput.value.trim();
        if (!text) return;
        
        translateButton.disabled = true;
        translateButton.textContent = 'Transliterating...';
        
        try {
          const result = await this.translateText(text);
          devanagariOutput.value = result;
        } catch (error) {
          console.error('Translation error:', error);
          alert('Translation failed. Please try again.');
        } finally {
          translateButton.disabled = false;
          translateButton.textContent = 'Transliterate';
        }
      });
      
      resetButton.addEventListener('click', () => {
        urduInput.value = '';
        devanagariOutput.value = '';
      });
      
      copyButton.addEventListener('click', () => {
        if (!devanagariOutput.value) return;
        
        devanagariOutput.select();
        document.execCommand('copy');
        
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 2000);
      });
    }
    
    async translateText(text) {
      // In a real implementation, this would call your API
      const response = await fetch('https://api.example.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this.apiKey}\`
        },
        body: JSON.stringify({ text })
      });
      
      if (!response.ok) {
        throw new Error('Translation failed');
      }
      
      const data = await response.json();
      return data.result;
    }
  }
  
  // Add to global scope
  window.UrduDevanagariTranslator = UrduDevanagariTranslator;
  `

  return new NextResponse(widgetCode, {
    headers: {
      "Content-Type": "application/javascript",
    },
  })
}
