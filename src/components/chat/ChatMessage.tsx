/**
 * CHAT MESSAGE COMPONENT
 * Enterprise-grade message bubble with proper accessibility,
 * semantic markup, avatars, timestamps, and message grouping support.
 */

'use client';

import { memo, useMemo } from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const formattedTime = useMemo(() => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  }, [date]);
  
  return (
    <time
      dateTime={date.toISOString()}
      className={cn(
        'text-xs text-[var(--text-tertiary)] tabular-nums',
        className
      )}
    >
      {formattedTime}
    </time>
  );
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
        'flex gap-3 w-full message-enter',
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
          {/* Message text with proper whitespace handling */}
          <p className="whitespace-pre-wrap break-words m-0">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp - show on last message or if explicitly requested */}
        {showTimestamp && isLastInGroup && (
          <Timestamp
            date={message.timestamp}
            className={cn('mt-0.5', isUser ? 'mr-1' : 'ml-1')}
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

