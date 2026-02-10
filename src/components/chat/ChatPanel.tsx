/**
 * CHAT PANEL COMPONENT
 * Main chat window with messages and input
 */

'use client';

import { useRef, useEffect } from 'react';
import { X, Minimize2, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatPanelProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  onMinimize: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Kumlesh worked on?",
  "Tell me about his ML skills",
  "What's his experience with Python?",
  "How can I contact Kumlesh?",
];

export function ChatPanel({
  messages,
  isLoading,
  error,
  onSendMessage,
  onClose,
  onMinimize,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className={cn(
        'flex flex-col w-[380px] h-[500px] max-h-[80vh]',
        'bg-background border border-border rounded-2xl shadow-2xl',
        'overflow-hidden',
        // Mobile responsiveness
        'max-w-[calc(100vw-32px)] max-sm:w-full max-sm:h-[70vh]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Portfolio Assistant</h3>
            <p className="text-xs text-muted-foreground">Ask me anything</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Hi! I'm Kumlesh's AI Assistant</h4>
            <p className="text-sm text-muted-foreground mb-4">
              I know everything about his projects, skills, and experience. Ask me anything!
            </p>
            
            {/* Suggested Questions */}
            <div className="w-full space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Try asking:
              </p>
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(question)}
                  className={cn(
                    'w-full text-left text-sm px-3 py-2 rounded-lg',
                    'bg-muted/50 hover:bg-muted transition-colors',
                    'text-foreground'
                  )}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Thinking...</span>
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
}
