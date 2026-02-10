/**
 * CHAT WIDGET COMPONENT
 * Floating chat bubble with expandable chat panel
 */

'use client';

import { useState, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatPanel } from './ChatPanel';
import type { ChatMessage } from '@/types/chat';

// Generate unique ID for messages
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Prepare history for API
    const history = messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          history,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      // Create assistant message placeholder
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Read stream
      let fullContent = '';
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              continue;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                
                // Update the assistant message with accumulated content
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === assistantMessage.id 
                      ? { ...msg, content: fullContent }
                      : msg
                  )
                );
              }
            } catch {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && !isMinimized && (
        <div 
          className={cn(
            'fixed bottom-20 right-4 z-50',
            'animate-in slide-in-from-bottom-4 fade-in duration-300',
            'max-sm:right-2 max-sm:left-2 max-sm:bottom-20'
          )}
        >
          <ChatPanel
            messages={messages}
            isLoading={isLoading}
            error={error}
            onSendMessage={handleSendMessage}
            onClose={handleClose}
            onMinimize={handleMinimize}
          />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        className={cn(
          'fixed bottom-4 right-4 z-50',
          'w-14 h-14 rounded-full',
          'bg-primary text-primary-foreground',
          'shadow-lg hover:shadow-xl',
          'flex items-center justify-center',
          'transition-all duration-300',
          'hover:scale-105 active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
          // Animation
          isOpen ? 'rotate-0' : 'animate-bounce-subtle'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        
        {/* Notification dot when minimized with messages */}
        {isMinimized && messages.length > 0 && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-destructive rounded-full animate-pulse" />
        )}
      </button>

      {/* Subtle bounce animation */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
      `}</style>
    </>
  );
}
