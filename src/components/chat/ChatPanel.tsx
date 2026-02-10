/**
 * CHAT PANEL COMPONENT
 * Enterprise-grade chat window with message grouping, scroll shadows,
 * typing indicators, and full accessibility support.
 */

'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { X, Minus, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage, shouldGroupMessages } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

// =============================================================================
// CONSTANTS
// =============================================================================

const SUGGESTED_QUESTIONS = [
  "What makes Kumlesh a good fit for ML roles?",
  "Walk me through his most impactful project",
  "How do his skills connect across projects?",
  "What problems can he help solve?",
] as const;

// =============================================================================
// TYPES
// =============================================================================

interface ChatPanelProps {
  /** Array of chat messages */
  messages: ChatMessageType[];
  /** Whether AI is currently generating a response */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Callback to send a message */
  onSendMessage: (message: string) => void;
  /** Callback to close the panel */
  onClose: () => void;
  /** Callback to minimize the panel */
  onMinimize: () => void;
}

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

interface TypingIndicatorProps {
  className?: string;
}

function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 mt-4',
        className
      )}
      role="status"
      aria-label="AI is reasoning"
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full',
          'flex items-center justify-center',
          'bg-[var(--surface-raised)] border border-[var(--border-default)]',
          'text-[var(--text-secondary)]'
        )}
        aria-hidden="true"
      >
        <Bot className="w-4 h-4" />
      </div>
      
      {/* Typing dots */}
      <div
        className={cn(
          'inline-flex items-center gap-1 px-4 py-3',
          'bg-[var(--chat-assistant-bg)] rounded-2xl rounded-bl-md'
        )}
      >
        <span
          className="typing-dot w-2 h-2 rounded-full bg-[var(--chat-typing-dot)]"
          aria-hidden="true"
        />
        <span
          className="typing-dot w-2 h-2 rounded-full bg-[var(--chat-typing-dot)]"
          aria-hidden="true"
        />
        <span
          className="typing-dot w-2 h-2 rounded-full bg-[var(--chat-typing-dot)]"
          aria-hidden="true"
        />
        <span className="sr-only">Typing...</span>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  onSelectQuestion: (question: string) => void;
}

function EmptyState({ onSelectQuestion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      {/* Icon */}
      <div
        className={cn(
          'w-16 h-16 mb-4 rounded-2xl',
          'bg-gradient-to-br from-[var(--interactive-primary)] to-[var(--interactive-primary-active)]',
          'flex items-center justify-center',
          'shadow-lg shadow-[var(--interactive-primary)]/20'
        )}
      >
        <Sparkles className="w-8 h-8 text-white" aria-hidden="true" />
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
        Hi! I&apos;m the Portfolio AI
      </h3>
      
      {/* Description */}
      <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-[280px]">
        I analyze and synthesize insights about Kumlesh&apos;s work. Ask me anything — I&apos;ll reason through it.
      </p>
      
      {/* Suggested questions */}
      <div className="w-full space-y-2" role="group" aria-label="Suggested questions">
        <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2">
          Try asking
        </p>
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            onClick={() => onSelectQuestion(question)}
            className={cn(
              'w-full text-left text-sm px-4 py-3',
              'bg-[var(--surface-raised)] hover:bg-[var(--interactive-secondary-hover)]',
              'border border-[var(--border-subtle)] hover:border-[var(--border-default)]',
              'rounded-xl',
              'transition-all duration-150',
              'text-[var(--text-primary)]',
              'chat-focus-ring'
            )}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        'mx-4 mb-4 px-4 py-3 rounded-xl',
        'bg-[var(--feedback-error-light)] border border-[var(--feedback-error)]/20',
        'text-sm text-[var(--feedback-error)]'
      )}
    >
      <p className="font-medium">Something went wrong</p>
      <p className="text-[var(--feedback-error)]/80 mt-0.5">{message}</p>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ChatPanel({
  messages,
  isLoading,
  error,
  onSendMessage,
  onClose,
  onMinimize,
}: ChatPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasScrollTop, setHasScrollTop] = useState(false);
  const [hasScrollBottom, setHasScrollBottom] = useState(false);

  // Process messages with grouping information
  const processedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const prevMessage = messages[index - 1];
      const nextMessage = messages[index + 1];
      
      const isGrouped = shouldGroupMessages(message, prevMessage);
      const isLastInGroup = !nextMessage || !shouldGroupMessages(nextMessage, message);
      
      return {
        message,
        isGrouped,
        isLastInGroup,
      };
    });
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Update scroll shadow indicators
  const updateScrollShadows = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    const tolerance = 5;
    
    setHasScrollTop(scrollTop > tolerance);
    setHasScrollBottom(scrollTop + clientHeight < scrollHeight - tolerance);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    updateScrollShadows();
    container.addEventListener('scroll', updateScrollShadows, { passive: true });
    
    // Also update on resize
    const resizeObserver = new ResizeObserver(updateScrollShadows);
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('scroll', updateScrollShadows);
      resizeObserver.disconnect();
    };
  }, [updateScrollShadows, messages]);

  const hasMessages = messages.length > 0;

  return (
    <aside
      className={cn(
        'flex flex-col',
        'w-[400px] max-w-[calc(100vw-2rem)]',
        'h-[560px] max-h-[calc(100vh-8rem)]',
        // Mobile full-width
        'max-sm:w-full max-sm:h-[calc(100vh-5rem)] max-sm:max-h-none',
        // Appearance
        'bg-[var(--surface-overlay)]',
        'border border-[var(--border-default)]',
        'rounded-2xl',
        'shadow-2xl shadow-black/10',
        'overflow-hidden',
        // Animation
        'chat-panel-enter'
      )}
      role="dialog"
      aria-label="Chat with Portfolio AI"
      aria-modal="false"
    >
      {/* Header */}
      <header
        className={cn(
          'flex items-center justify-between',
          'px-4 py-3',
          'border-b border-[var(--border-default)]',
          'bg-[var(--surface-base)]'
        )}
      >
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div
            className={cn(
              'relative w-10 h-10 rounded-xl',
              'bg-gradient-to-br from-[var(--interactive-primary)] to-[var(--interactive-primary-active)]',
              'flex items-center justify-center',
              'shadow-md shadow-[var(--interactive-primary)]/20'
            )}
          >
            <Bot className="w-5 h-5 text-white" aria-hidden="true" />
            {/* Online indicator */}
            <span
              className={cn(
                'absolute -bottom-0.5 -right-0.5',
                'w-3 h-3 rounded-full',
                'bg-[var(--feedback-success)]',
                'border-2 border-[var(--surface-base)]'
              )}
              aria-hidden="true"
            />
          </div>
          
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Portfolio AI
            </h2>
            <p className="text-xs text-[var(--text-tertiary)]">
              {isLoading ? 'Reasoning...' : 'Ready'}
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className={cn(
              'w-9 h-9 rounded-lg',
              'flex items-center justify-center',
              'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--interactive-secondary)]',
              'transition-colors duration-150',
              'chat-focus-ring'
            )}
            aria-label="Minimize chat"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={onClose}
            className={cn(
              'w-9 h-9 rounded-lg',
              'flex items-center justify-center',
              'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--interactive-secondary)]',
              'transition-colors duration-150',
              'chat-focus-ring'
            )}
            aria-label="Close chat"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Messages area */}
      <div
        ref={scrollContainerRef}
        className={cn(
          'flex-1 overflow-y-auto',
          'chat-scrollbar chat-scroll-container',
          hasScrollTop && 'has-scroll-top',
          hasScrollBottom && 'has-scroll-bottom'
        )}
      >
        {!hasMessages ? (
          <EmptyState onSelectQuestion={onSendMessage} />
        ) : (
          <div
            className="px-4 py-4"
            role="list"
            aria-label="Chat messages"
          >
            {processedMessages.map(({ message, isGrouped, isLastInGroup }) => (
              <ChatMessage
                key={message.id}
                message={message}
                isGrouped={isGrouped}
                isLastInGroup={isLastInGroup}
              />
            ))}
            
            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && <ErrorBanner message={error} />}

      {/* Input */}
      <ChatInput
        onSend={onSendMessage}
        disabled={!!error}
        isLoading={isLoading}
        placeholder="Ask me anything — I'll reason through it..."
      />
    </aside>
  );
}
