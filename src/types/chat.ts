/**
 * CHAT TYPES
 * Type definitions for the portfolio chatbot
 */

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  history: Pick<ChatMessage, "role" | "content">[];
}

export interface ChatResponse {
  content: string;
  done: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}
