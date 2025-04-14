
/**
 * OpenRouter AI Service for text generation
 */

// Define response type for OpenRouter
interface OpenRouterResponse {
  id: string;
  choices: {
    text: string;
    index: number;
    finish_reason: string;
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Define parameters for text generation
interface GenerationParams {
  prompt: string;
  platform?: 'twitter' | 'linkedin' | 'facebook';
  tone?: 'professional' | 'casual' | 'humorous';
  maxLength?: number;
}

// Main function to generate text with OpenRouter
export async function generateText(params: GenerationParams): Promise<string> {
  const { prompt, platform = 'twitter', tone = 'professional', maxLength = 280 } = params;
  
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error("OpenRouter API key is missing. Add VITE_OPENROUTER_API_KEY to your .env.local file");
    return "Error: API key is missing. Please check your environment variables.";
  }
  
  try {
    // Construct the prompt with platform and tone guidance
    const enhancedPrompt = `Write a ${tone} social media post for ${platform} about: ${prompt}. Keep it under ${maxLength} characters.`;
    
    // In production, make a real API call to OpenRouter
    // For development without API key, use mock responses
    if (apiKey === 'your-openrouter-api-key') {
      // Mock responses based on platform and tone (same as before)
      const responses = {
        twitter: {
          professional: `Excited to announce our latest product update! Check out how we're improving user experience and delivering more value. #Innovation #ProductUpdate`,
          casual: `Just shipped something awesome! 🚀 Can't wait for you all to try our cool new features! Link in bio. #NewRelease`,
          humorous: `Our developers have been fueled by coffee and dreams to bring you this update. Enjoy the new features! #CoffeeCodeRepeat`
        },
        linkedin: {
          professional: `We're pleased to announce our latest product enhancement that addresses key customer needs while improving overall workflow efficiency.`,
          casual: `Just launched: Our team has been working hard on these new features, and we're excited to share them with our community!`,
          humorous: `If our product were a superhero, it just got new powers! Check out our latest update that makes work less work-y.`
        },
        facebook: {
          professional: `We're excited to share our latest product update designed to enhance your experience and streamline your workflow.`,
          casual: `New features just dropped! 🎉 We think you're going to love what we've been working on!`,
          humorous: `We're pretty sure our latest update deserves a standing ovation... or at least a thumbs up! Check it out!`
        }
      };
      
      return responses[platform][tone];
    }
    
    // Real API call to OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert social media content creator. Write content for ${platform} in a ${tone} tone.`
          },
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        max_tokens: Math.min(maxLength, 1000),
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Unknown error');
    }
    
    const data = await response.json();
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error('Error generating text:', error);
    return `Failed to generate text: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export default {
  generateText,
};
