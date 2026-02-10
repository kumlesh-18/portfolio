/**
 * CHAT MESSAGE COMPONENT
 * Renders individual chat messages with proper styling
 */

'use client';

import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        'flex w-full mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
        )}
      >
        {/* Avatar indicator */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              🤖
            </span>
            <span className="font-medium">Portfolio Assistant</span>
          </div>
        )}
        
        {/* Message content with proper line breaks */}
        <div className="whitespace-pre-wrap break-words">
          {message.content}
        </div>
        
        {/* Timestamp */}
        <div
          className={cn(
            'text-[10px] mt-1',
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
