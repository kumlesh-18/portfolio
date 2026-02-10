/**
 * GROQ CLIENT
 * Configuration and client setup for Groq API
 */

import Groq from "groq-sdk";

// Initialize Groq client
// The API key should be set in environment variable: GROQ_API_KEY
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groq;

// Available models (as of 2024)
export const GROQ_MODELS = {
  // Recommended for chat - fast and capable
  LLAMA_3_70B: "llama-3.3-70b-versatile",
  // Alternative - good balance
  LLAMA_3_8B: "llama-3.1-8b-instant",
  // Mixtral - good for complex tasks
  MIXTRAL: "mixtral-8x7b-32768",
} as const;

// Default model for portfolio chatbot
export const DEFAULT_MODEL = GROQ_MODELS.LLAMA_3_70B;

// Rate limiting configuration
export const RATE_LIMIT = {
  maxRequestsPerMinute: 10,
  maxTokensPerRequest: 1024,
};
