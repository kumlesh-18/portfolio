/**
 * CHAT WIDGET COMPONENT
 * Enterprise-grade floating chat widget with proper state management,
 * accessibility, and smooth animations.
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatPanel } from './ChatPanel';
import type { ChatMessage } from '@/types/chat';

// =============================================================================
// CONSTANTS
// =============================================================================

const Z_INDEX = {
  panel: 700,
  trigger: 710,
} as const;

// =============================================================================
// UTILITIES
// =============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// =============================================================================
// TYPES
// =============================================================================

type WidgetState = 'closed' | 'open' | 'minimized';

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatWidget() {
  const [widgetState, setWidgetState] = useState<WidgetState>('closed');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Clear notification when opening
  useEffect(() => {
    if (widgetState === 'open') {
      setHasNewMessage(false);
    }
  }, [widgetState]);

  // Handle sending a message
  const handleSendMessage = useCallback(async (content: string) => {
    // Create user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Prepare history for API (exclude system messages)
    const history = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response stream available');
      }

      // Create placeholder for assistant response
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Process the stream
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              fullContent += parsed.content;
              
              // Update message content
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === assistantMessage.id
                    ? { ...msg, content: fullContent }
                    : msg
                )
              );
            }
          } catch {
            // Ignore JSON parse errors for incomplete chunks
          }
        }
      }

      // Notify if minimized
      if (widgetState === 'minimized') {
        setHasNewMessage(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages, widgetState]);

  // State handlers
  const handleOpen = useCallback(() => {
    setWidgetState('open');
  }, []);

  const handleClose = useCallback(() => {
    setWidgetState('closed');
  }, []);

  const handleMinimize = useCallback(() => {
    setWidgetState('minimized');
  }, []);

  const handleToggle = useCallback(() => {
    setWidgetState(prev => prev === 'open' ? 'closed' : 'open');
  }, []);

  const isOpen = widgetState === 'open';
  const isMinimized = widgetState === 'minimized';
  const showNotification = (isMinimized || widgetState === 'closed') && hasNewMessage;

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className={cn(
            'fixed',
            'bottom-24 right-4',
            'max-sm:bottom-20 max-sm:right-2 max-sm:left-2'
          )}
          style={{ zIndex: Z_INDEX.panel }}
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

      {/* Floating Trigger Button */}
      <button
        onClick={handleToggle}
        className={cn(
          'fixed bottom-4 right-4',
          // Size - meets touch target requirements
          'w-14 h-14',
          'max-sm:w-12 max-sm:h-12',
          // Shape
          'rounded-full',
          // Colors
          'bg-[var(--interactive-primary)]',
          'text-[var(--text-inverse)]',
          // Shadow
          'shadow-lg shadow-[var(--interactive-primary)]/25',
          'hover:shadow-xl hover:shadow-[var(--interactive-primary)]/30',
          // Layout
          'flex items-center justify-center',
          // Transitions
          'transition-all duration-300',
          'hover:scale-105',
          'active:scale-95',
          // Focus
          'chat-focus-ring',
          // Pulse animation when closed (attention getter)
          !isOpen && !isMinimized && messages.length === 0 && 'chat-trigger-pulse'
        )}
        style={{ zIndex: Z_INDEX.trigger }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {/* Icon with rotation transition */}
        <span
          className={cn(
            'transition-transform duration-300',
            isOpen && 'rotate-90'
          )}
        >
          {isOpen ? (
            <X className="w-6 h-6 max-sm:w-5 max-sm:h-5" aria-hidden="true" />
          ) : (
            <MessageCircle className="w-6 h-6 max-sm:w-5 max-sm:h-5" aria-hidden="true" />
          )}
        </span>

        {/* Notification badge */}
        {showNotification && (
          <span
            className={cn(
              'absolute -top-1 -right-1',
              'w-5 h-5',
              'flex items-center justify-center',
              'bg-[var(--feedback-error)]',
              'text-white text-xs font-bold',
              'rounded-full',
              'border-2 border-[var(--surface-base)]',
              'animate-pulse'
            )}
            aria-label="New message"
          >
            {messages.filter(m => m.role === 'assistant').length > 0 ? '!' : ''}
          </span>
        )}
      </button>
    </>
  );
}
