/**
 * CHAT INPUT COMPONENT
 * Enterprise-grade chat input with auto-resize, accessibility,
 * character count, and proper keyboard handling.
 */

'use client';

import { 
  useState, 
  useRef, 
  useEffect, 
  useCallback,
  type KeyboardEvent,
  type ChangeEvent 
} from 'react';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// CONSTANTS
// =============================================================================

const MAX_MESSAGE_LENGTH = 500;
const MIN_HEIGHT = 44; // Touch target minimum
const MAX_HEIGHT = 120;

// =============================================================================
// TYPES
// =============================================================================

interface ChatInputProps {
  /** Callback when message is sent */
  onSend: (message: string) => void;
  /** Whether input is disabled (e.g., during loading) */
  disabled?: boolean;
  /** Whether AI is currently responding */
  isLoading?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Additional class names */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatInput({ 
  onSend, 
  disabled = false,
  isLoading = false,
  placeholder = "Type a message...",
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Computed states
  const isEmpty = message.trim().length === 0;
  const isOverLimit = message.length > MAX_MESSAGE_LENGTH;
  const canSend = !isEmpty && !disabled && !isLoading && !isOverLimit;
  const charCount = message.length;
  const showCharCount = charCount > MAX_MESSAGE_LENGTH * 0.8;

  // Auto-resize textarea based on content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    // Reset to auto to get accurate scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate new height within bounds
    const newHeight = Math.min(Math.max(textarea.scrollHeight, MIN_HEIGHT), MAX_HEIGHT);
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [message, adjustHeight]);

  // Focus input when component mounts
  useEffect(() => {
    // Small delay to ensure panel animation completes
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!canSend) return;
    
    const trimmedMessage = message.trim();
    onSend(trimmedMessage);
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = `${MIN_HEIGHT}px`;
    }
  }, [canSend, message, onSend]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift for multiline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={cn(
        'flex items-end gap-3 p-4',
        'border-t border-[var(--border-default)]',
        'bg-[var(--surface-base)]',
        className
      )}
    >
      {/* Input container */}
      <div className="relative flex-1 min-w-0">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || isLoading}
          placeholder={placeholder}
          rows={1}
          aria-label="Message input"
          aria-describedby={showCharCount ? 'char-count' : undefined}
          aria-invalid={isOverLimit}
          className={cn(
            'w-full resize-none',
            'px-4 py-2.5',
            'text-sm text-[var(--text-primary)]',
            'placeholder:text-[var(--text-tertiary)]',
            'bg-[var(--surface-raised)]',
            'border border-[var(--border-default)]',
            'rounded-xl',
            'transition-all duration-200',
            // Focus states
            'focus:outline-none focus:border-[var(--interactive-primary)]',
            'focus:ring-2 focus:ring-[var(--interactive-primary)]/20',
            // Disabled state
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Error state
            isOverLimit && 'border-[var(--feedback-error)] focus:border-[var(--feedback-error)]',
            // Scrollbar
            'chat-scrollbar'
          )}
          style={{ minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT }}
        />
        
        {/* Character count indicator */}
        {showCharCount && (
          <div
            id="char-count"
            className={cn(
              'absolute right-3 bottom-1 text-xs tabular-nums',
              'transition-colors duration-150',
              isOverLimit
                ? 'text-[var(--feedback-error)] font-medium'
                : 'text-[var(--text-tertiary)]'
            )}
            aria-live="polite"
          >
            {charCount}/{MAX_MESSAGE_LENGTH}
          </div>
        )}
      </div>
      
      {/* Send button */}
      <button
        type="submit"
        disabled={!canSend}
        aria-label={isLoading ? 'Sending message...' : 'Send message'}
        className={cn(
          'flex-shrink-0',
          'w-11 h-11', // 44px touch target
          'flex items-center justify-center',
          'rounded-xl',
          'transition-all duration-200',
          // Enabled state
          'bg-[var(--interactive-primary)] text-[var(--text-inverse)]',
          'hover:bg-[var(--interactive-primary-hover)]',
          'active:bg-[var(--interactive-primary-active)] active:scale-95',
          // Focus state
          'chat-focus-ring',
          // Disabled state
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'disabled:hover:bg-[var(--interactive-primary)]',
          'disabled:active:scale-100'
        )}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="w-5 h-5" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
