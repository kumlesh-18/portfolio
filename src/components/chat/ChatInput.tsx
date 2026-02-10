/**
 * CHAT INPUT COMPONENT
 * Input field with send button for chat messages
 */

'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = "Ask me about Kumlesh's portfolio..." 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSend(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 border-t border-border bg-background">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        className={cn(
          'flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5',
          'text-sm placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'max-h-[120px]'
        )}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-xl',
          'bg-primary text-primary-foreground',
          'transition-all duration-200',
          'hover:bg-primary/90 active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          'focus:outline-none focus:ring-2 focus:ring-primary/20'
        )}
        aria-label="Send message"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
