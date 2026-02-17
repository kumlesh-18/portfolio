/**
 * CHAT MESSAGE COMPONENT
 * Enterprise-grade message bubble with proper accessibility,
 * semantic markup, avatars, timestamps, and message grouping support.
 * 
 * v1.3.0+ Features:
 * - Copy to clipboard button
 * - Relative timestamps with exact time tooltips
 * - Markdown rendering (bold, links, code)
 * - Message reactions (👍/👎)
 */

'use client';

import { memo, useMemo, useState, useCallback } from 'react';
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatRelativeTime, formatExactTime } from '@/lib/format-relative-time';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

// =============================================================================
// TYPES
// =============================================================================

interface ChatMessageProps {
  /** The message data */
  message: ChatMessageType;
  /** Whether this message is part of a group (same sender, close in time) */
  isGrouped?: boolean;
  /** Whether to show the timestamp */
  showTimestamp?: boolean;
  /** Whether this is the last message in a group */
  isLastInGroup?: boolean;
}

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

interface AvatarProps {
  role: 'user' | 'assistant';
  className?: string;
}

function Avatar({ role, className }: AvatarProps) {
  const isUser = role === 'user';
  
  return (
    <div
      className={cn(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        'transition-colors duration-200',
        isUser
          ? 'bg-[var(--interactive-primary)] text-[var(--text-inverse)]'
          : 'bg-[var(--surface-raised)] border border-[var(--border-default)] text-[var(--text-secondary)]',
        className
      )}
      aria-hidden="true"
    >
      {isUser ? (
        <User className="w-4 h-4" strokeWidth={2} />
      ) : (
        <Bot className="w-4 h-4" strokeWidth={2} />
      )}
    </div>
  );
}

interface TimestampProps {
  date: Date;
  className?: string;
}

function Timestamp({ date, className }: TimestampProps) {
  const relativeTime = useMemo(() => formatRelativeTime(date), [date]);
  const exactTime = useMemo(() => formatExactTime(date), [date]);
  
  return (
    <time
      dateTime={date.toISOString()}
      title={exactTime}
      className={cn(
        'text-xs text-[var(--text-tertiary)] tabular-nums cursor-help',
        'hover:text-[var(--text-secondary)] transition-colors',
        className
      )}
    >
      {relativeTime}
    </time>
  );
}

// =============================================================================
// COPY BUTTON
// =============================================================================

interface CopyButtonProps {
  content: string;
  className?: string;
}

function CopyButton({ content, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [content]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'p-1.5 rounded-md',
        'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
        'hover:bg-[var(--surface-raised)]',
        'transition-all duration-150',
        'opacity-0 group-hover:opacity-100 focus:opacity-100',
        className
      )}
      aria-label={copied ? 'Copied!' : 'Copy message'}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[var(--feedback-success)]" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}

// =============================================================================
// MESSAGE REACTIONS
// =============================================================================

interface MessageReactionsProps {
  messageId: string;
  className?: string;
}

function MessageReactions({ messageId, className }: MessageReactionsProps) {
  const [reaction, setReaction] = useState<'up' | 'down' | null>(null);

  const handleReaction = useCallback((type: 'up' | 'down') => {
    setReaction(prev => prev === type ? null : type);
    // In production, you would send this to analytics
    console.log(`Reaction ${type} for message ${messageId}`);
  }, [messageId]);

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        onClick={() => handleReaction('up')}
        className={cn(
          'p-1 rounded-md transition-all duration-150',
          reaction === 'up'
            ? 'text-[var(--feedback-success)] bg-[var(--feedback-success)]/10'
            : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]',
          'opacity-0 group-hover:opacity-100 focus:opacity-100'
        )}
        aria-label="Helpful"
        aria-pressed={reaction === 'up'}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => handleReaction('down')}
        className={cn(
          'p-1 rounded-md transition-all duration-150',
          reaction === 'down'
            ? 'text-[var(--feedback-error)] bg-[var(--feedback-error)]/10'
            : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]',
          'opacity-0 group-hover:opacity-100 focus:opacity-100'
        )}
        aria-label="Not helpful"
        aria-pressed={reaction === 'down'}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// =============================================================================
// MARKDOWN RENDERER
// =============================================================================

interface MarkdownContentProps {
  content: string;
  className?: string;
}

function MarkdownContent({ content, className }: MarkdownContentProps) {
  // Parse markdown-like syntax
  const renderContent = useMemo(() => {
    // Split by code blocks first
    const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g);
    
    return parts.map((part, index) => {
      // Code block
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).replace(/^\w+\n/, ''); // Remove language identifier
        return (
          <pre
            key={index}
            className="my-2 p-3 bg-[var(--surface-base)] rounded-lg overflow-x-auto text-xs font-mono"
          >
            <code>{code.trim()}</code>
          </pre>
        );
      }
      
      // Inline code
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 bg-[var(--surface-base)] rounded text-xs font-mono"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      
      // Regular text with bold and links
      return (
        <span key={index}>
          {part.split(/(\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g).map((segment, i) => {
            // Bold text
            if (segment.startsWith('**') && segment.endsWith('**')) {
              return <strong key={i}>{segment.slice(2, -2)}</strong>;
            }
            
            // Links
            const linkMatch = segment.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch) {
              return (
                <a
                  key={i}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--interactive-primary)] hover:underline"
                >
                  {linkMatch[1]}
                </a>
              );
            }
            
            return segment;
          })}
        </span>
      );
    });
  }, [content]);

  return <div className={cn('whitespace-pre-wrap break-words', className)}>{renderContent}</div>;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ChatMessageBase({
  message,
  isGrouped = false,
  showTimestamp = true,
  isLastInGroup = true,
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        'group flex gap-3 w-full message-enter',
        isUser ? 'flex-row-reverse' : 'flex-row',
        isGrouped ? 'mt-1' : 'mt-4',
        'first:mt-0'
      )}
      role="listitem"
      aria-label={`${isUser ? 'You' : 'Assistant'} said: ${message.content}`}
    >
      {/* Avatar - only show if not grouped or last in group */}
      {!isGrouped ? (
        <Avatar role={isUser ? 'user' : 'assistant'} />
      ) : (
        <div className="w-8 flex-shrink-0" aria-hidden="true" />
      )}
      
      {/* Message content */}
      <div
        className={cn(
          'flex flex-col gap-1',
          'max-w-[75%] min-w-0',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        {/* Sender label - only on first message in group */}
        {!isGrouped && !isUser && (
          <span className="text-xs font-medium text-[var(--text-secondary)] ml-1">
            Portfolio AI
          </span>
        )}
        
        {/* Message bubble */}
        <div
          className={cn(
            'px-4 py-2.5 text-sm leading-relaxed',
            'rounded-2xl',
            // User messages
            isUser && [
              'bg-[var(--chat-user-bg)] text-[var(--chat-user-text)]',
              isGrouped ? 'rounded-tr-lg' : 'rounded-tr-lg',
              isLastInGroup && 'rounded-br-md',
            ],
            // Assistant messages
            !isUser && [
              'bg-[var(--chat-assistant-bg)] text-[var(--chat-assistant-text)]',
              isGrouped ? 'rounded-tl-lg' : 'rounded-tl-lg',
              isLastInGroup && 'rounded-bl-md',
            ]
          )}
        >
          {/* Message text with markdown rendering for assistant */}
          {isUser ? (
            <p className="whitespace-pre-wrap break-words m-0">
              {message.content}
            </p>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>
        
        {/* Actions row for assistant messages */}
        {!isUser && isLastInGroup && (
          <div className="flex items-center gap-2 ml-1">
            <Timestamp date={message.timestamp} />
            <CopyButton content={message.content} />
            <MessageReactions messageId={message.id} />
          </div>
        )}
        
        {/* Timestamp only for user messages */}
        {isUser && showTimestamp && isLastInGroup && (
          <Timestamp
            date={message.timestamp}
            className="mt-0.5 mr-1"
          />
        )}
      </div>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders during streaming
export const ChatMessage = memo(ChatMessageBase, (prev, next) => {
  return (
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content &&
    prev.isGrouped === next.isGrouped &&
    prev.showTimestamp === next.showTimestamp &&
    prev.isLastInGroup === next.isLastInGroup
  );
});

ChatMessage.displayName = 'ChatMessage';

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Check if two messages should be grouped together
 * Messages are grouped if same sender and within 2 minutes
 */
export function shouldGroupMessages(
  current: ChatMessageType,
  previous: ChatMessageType | undefined
): boolean {
  if (!previous) return false;
  if (current.role !== previous.role) return false;
  
  const timeDiff = current.timestamp.getTime() - previous.timestamp.getTime();
  const twoMinutes = 2 * 60 * 1000;
  
  return timeDiff < twoMinutes;
}

