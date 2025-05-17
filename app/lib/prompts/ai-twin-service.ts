/**
 * AI Twin Service
 * 
 * This file contains functions for generating AI twin responses using the LLM API.
 */

import { sendAgentPrompt } from '../verida-llm-service';
import { generateAiTwinPrompt } from './ai-twin-prompts';

/**
 * Generate a response from the AI Twin using the agent LLM API
 * @param twinData - The AI twin data
 * @param userMessage - The user's message
 * @returns Promise with the AI twin's response
 */
export async function generateAiTwinResponse(twinData: any, userMessage: string): Promise<string> {
  try {
    // Generate the prompt using the template
    const prompt = generateAiTwinPrompt(twinData, userMessage);

    // Send the agent prompt
    const response = await sendAgentPrompt({
      prompt,
      temperature: 0.7 // Slightly creative but still coherent
    });

    // Extract the response text from the result
    let responseText = '';
    
    console.log("API Response:", JSON.stringify(response, null, 2));
    
    // Check for the response structure that contains the output field
    if (response && response.response && response.response.output) {
      responseText = response.response.output;
    }
    // Check for the older format with result.content
    else if (response && response.result && response.result.content) {
      responseText = response.result.content;
    }
    // Check for the format with choices array
    else if (response && response.result && response.result.choices && response.result.choices.length > 0) {
      responseText = response.result.choices[0].message.content;
    }
    else {
      // Fallback response if the API doesn't return the expected format
      responseText = "I'm sorry, I couldn't process your message right now. Could you try again?";
      console.error("Unexpected API response format:", response);
    }

    return responseText;
  } catch (error) {
    console.error('Error generating AI twin response:', error);
    return "I'm having trouble connecting right now. Let's try again in a moment.";
  }
} 