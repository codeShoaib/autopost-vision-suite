
/**
 * Replicate AI Service for image generation
 */

// Define response type for Replicate
interface ReplicateResponse {
  id: string;
  urls: {
    get: string;
    cancel: string;
  };
  status: string;
  output?: string[];
  error?: string;
}

// Define parameters for image generation
interface ImageGenerationParams {
  prompt: string;
  style?: 'photorealistic' | 'cartoon' | 'abstract' | '3d-render';
  aspectRatio?: '1:1' | '16:9' | '4:3' | '9:16';
  negativePrompt?: string;
}

// Main function to generate image with Replicate
export async function generateImage(params: ImageGenerationParams): Promise<string> {
  const { 
    prompt, 
    style = 'photorealistic', 
    aspectRatio = '1:1', 
    negativePrompt = 'low quality, blurry, distorted' 
  } = params;
  
  const apiKey = import.meta.env.VITE_REPLICATE_API_KEY;
  
  if (!apiKey) {
    console.error("Replicate API key is missing. Add VITE_REPLICATE_API_KEY to your .env.local file");
    return "Error: API key is missing. Please check your environment variables.";
  }
  
  try {
    console.log(`Generating image for: ${prompt} (${style}, ${aspectRatio})`);
    
    // If using demo/placeholder API key, return placeholder images
    if (apiKey === 'your-replicate-api-key') {
      // Mock API call - return placeholder images based on style
      const placeholders = {
        'photorealistic': 'https://via.placeholder.com/512x512?text=AI+Generated+Image',
        'cartoon': 'https://via.placeholder.com/512x512?text=Cartoon+Style',
        'abstract': 'https://via.placeholder.com/512x512?text=Abstract+Art',
        '3d-render': 'https://via.placeholder.com/512x512?text=3D+Render'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      return placeholders[style];
    }
    
    // Determine resolution based on aspect ratio
    let width = 768;
    let height = 768;
    
    switch (aspectRatio) {
      case '16:9':
        width = 1024;
        height = 576;
        break;
      case '4:3':
        width = 1024;
        height = 768;
        break;
      case '9:16':
        width = 576;
        height = 1024;
        break;
      default: // 1:1
        width = 768;
        height = 768;
    }
    
    // Adjust prompt based on style
    let enhancedPrompt = prompt;
    switch (style) {
      case 'cartoon':
        enhancedPrompt = `${prompt}, cartoon style, vibrant colors`;
        break;
      case 'abstract':
        enhancedPrompt = `${prompt}, abstract art, artistic interpretation`;
        break;
      case '3d-render':
        enhancedPrompt = `${prompt}, 3D render, realistic lighting, detailed textures`;
        break;
      default: // photorealistic
        enhancedPrompt = `${prompt}, photorealistic, detailed, professional quality`;
    }
    
    // Make API call to Replicate
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiKey}`
      },
      body: JSON.stringify({
        version: "2c1e16157805cd1ccb238f4a7d5c64c54d0d8951b38b9b1765e911a541c8d0eb",
        input: {
          prompt: enhancedPrompt,
          negative_prompt: negativePrompt,
          width,
          height,
          num_outputs: 1,
          guidance_scale: 7.5,
          scheduler: "K_EULER_ANCESTRAL",
          num_inference_steps: 50
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Unknown error');
    }
    
    const prediction = await response.json();
    
    // Poll for the result
    const maxAttempts = 30; // 5 minutes (10 seconds * 30)
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const statusResponse = await fetch(prediction.urls.get, {
        headers: {
          'Authorization': `Token ${apiKey}`
        }
      });
      
      if (!statusResponse.ok) {
        throw new Error(`Failed to check status: ${statusResponse.statusText}`);
      }
      
      const result = await statusResponse.json();
      
      if (result.status === 'succeeded') {
        // Return the first output image URL
        return result.output[0];
      } else if (result.status === 'failed') {
        throw new Error(result.error || 'Generation failed');
      }
      
      // Wait 10 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
    }
    
    throw new Error('Image generation timed out after 5 minutes');
    
  } catch (error) {
    console.error('Error generating image:', error);
    return `Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export default {
  generateImage,
};
