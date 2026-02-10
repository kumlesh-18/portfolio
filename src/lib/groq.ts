/**
 * GROQ CLIENT
 * Configuration and client setup for Groq API
 */

import Groq from "groq-sdk";

// Lazy initialization to ensure env vars are available at runtime
let groqClient: Groq | null = null;

export function getGroqClient(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("GROQ_API_KEY environment variable is not set");
    }

    groqClient = new Groq({
      apiKey: apiKey,
    });
  }
  return groqClient;
}

// For backward compatibility - but prefer getGroqClient()
const groq = {
  get chat() {
    return getGroqClient().chat;
  },
};

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
  maxTokensPerRequest: 2048, // Increased for cognitive-depth responses
};
