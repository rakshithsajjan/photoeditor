import { GEMINI_CONFIG } from './config';

// Types for Gemini API responses
export interface GeminiImageResponse {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface GeminiError {
  message: string;
  code: string;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }>;
    };
  }>;
}

export async function generateImage(prompt: string): Promise<string> {
  const url = `${GEMINI_CONFIG.baseUrl}/models/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: GEMINI_CONFIG.headers,
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseModalities: ['Text', 'Image']
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    // Find the first inline image data in the response
    const imageData = data.candidates[0]?.content.parts.find(part => part.inlineData)?.inlineData?.data;
    
    if (!imageData) {
      throw new Error('No image data in response');
    }

    return imageData;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export async function editImage(imageBase64: string, editPrompt: string): Promise<string> {
  const url = `${GEMINI_CONFIG.baseUrl}/models/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: GEMINI_CONFIG.headers,
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: editPrompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64
              }
            }
          ]
        }],
        generationConfig: {
          responseModalities: ['Text', 'Image']
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    // Find the first inline image data in the response
    const imageData = data.candidates[0]?.content.parts.find(part => part.inlineData)?.inlineData?.data;
    
    if (!imageData) {
      throw new Error('No image data in response');
    }

    return imageData;
  } catch (error) {
    console.error('Error editing image:', error);
    throw error;
  }
}

// Placeholder function for image refinement
export async function refineImage(imageUrl: string, refinementPrompt: string): Promise<GeminiImageResponse> {
  console.log('Placeholder image refinement called:', { imageUrl, refinementPrompt });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // TODO: Replace with actual Gemini API implementation
  return {
    imageUrl: 'refined-image-url',
    prompt: refinementPrompt,
    timestamp: Date.now(),
  };
} 