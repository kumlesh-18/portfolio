/**
 * CHAT PANEL COMPONENT
 * Enterprise-grade chat window with message grouping, scroll shadows,
 * typing indicators, and full accessibility support.
 * 
 * v1.3.0+ Features:
 * - Clear chat button
 * - Retry on error
 * - Conversation export
 * - Context-aware prompts
 * - Keyboard shortcuts (Esc to close)
 */

'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { X, Minus, Bot, Sparkles, Trash2, Download, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage, shouldGroupMessages } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

// =============================================================================
// CONSTANTS
// =============================================================================

// Context-aware suggestions based on current page
const CONTEXT_SUGGESTIONS: Record<string, readonly string[]> = {
  '/': [
    "What makes Kumlesh stand out?",
    "Walk me through his key achievements",
    "What's his tech stack expertise?",
    "How can I contact him?",
  ],
  '/work': [
    "Tell me about these projects",
    "Which project had the biggest impact?",
    "What technologies does he use most?",
    "How does he approach problem-solving?",
  ],
  '/about': [
    "What's his educational background?",
    "What are his core values?",
    "How does he approach ML problems?",
    "What makes him different from others?",
  ],
  '/writing': [
    "What topics does he write about?",
    "Which publications are most popular?",
    "What research has he done?",
    "How does he share knowledge?",
  ],
  '/resume': [
    "Summarize his experience",
    "What are his strongest skills?",
    "What certifications does he have?",
    "What's his career trajectory?",
  ],
  '/contact': [
    "What's the best way to reach him?",
    "Is he open to opportunities?",
    "What kind of roles interest him?",
    "Can I schedule a call?",
  ],
} as const;

const DEFAULT_SUGGESTIONS = [
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
  /** Callback to clear chat */
  onClearChat?: () => void;
  /** Callback to retry last message */
  onRetry?: () => void;
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
  suggestions: readonly string[];
}

function EmptyState({ onSelectQuestion, suggestions }: EmptyStateProps) {
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
        {suggestions.map((question) => (
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
  onRetry?: () => void;
  onDismiss?: () => void;
}

function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        'mx-4 mb-4 px-4 py-3 rounded-xl',
        'bg-[var(--feedback-error-light)] border border-[var(--feedback-error)]/20',
        'text-sm text-[var(--feedback-error)]'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium">Something went wrong</p>
          <p className="text-[var(--feedback-error)]/80 mt-0.5">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
              'bg-[var(--feedback-error)] text-white',
              'hover:bg-[var(--feedback-error)]/90',
              'text-xs font-medium',
              'transition-colors'
            )}
          >
            <RotateCcw className="w-3 h-3" />
            Retry
          </button>
        )}
      </div>
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
  onClearChat,
  onRetry,
}: ChatPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [hasScrollTop, setHasScrollTop] = useState(false);
  const [hasScrollBottom, setHasScrollBottom] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // Get current page for context-aware suggestions
  const pathname = usePathname();
  const suggestions = useMemo(() => {
    return CONTEXT_SUGGESTIONS[pathname] || DEFAULT_SUGGESTIONS;
  }, [pathname]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Export conversation as text
  const handleExport = useCallback(() => {
    const content = messages
      .map((m) => `[${m.role.toUpperCase()}] ${m.content}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  // Clear chat with confirmation
  const handleClearChat = useCallback(() => {
    if (showClearConfirm) {
      onClearChat?.();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  }, [showClearConfirm, onClearChat]);

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
          {/* Export button - only show when there are messages */}
          {hasMessages && (
            <button
              onClick={handleExport}
              className={cn(
                'w-9 h-9 rounded-lg',
                'flex items-center justify-center',
                'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
                'hover:bg-[var(--interactive-secondary)]',
                'transition-colors duration-150',
                'chat-focus-ring'
              )}
              aria-label="Export conversation"
              title="Export conversation"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          
          {/* Clear chat button - only show when there are messages */}
          {hasMessages && onClearChat && (
            <button
              onClick={handleClearChat}
              className={cn(
                'w-9 h-9 rounded-lg',
                'flex items-center justify-center',
                'transition-colors duration-150',
                'chat-focus-ring',
                showClearConfirm
                  ? 'text-[var(--feedback-error)] bg-[var(--feedback-error)]/10'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--interactive-secondary)]'
              )}
              aria-label={showClearConfirm ? 'Click again to confirm' : 'Clear chat'}
              title={showClearConfirm ? 'Click again to confirm' : 'Clear chat'}
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          
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
            aria-label="Close chat (Esc)"
            title="Close (Esc)"
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
          <EmptyState onSelectQuestion={onSendMessage} suggestions={suggestions} />
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
      {error && <ErrorBanner message={error} onRetry={onRetry} />}

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
