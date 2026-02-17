'use client'

import { useState, useRef, useCallback } from 'react'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Interactive Code Block
 * 
 * Features:
 * - Copy-to-clipboard button
 * - Line numbers
 * - Expandable/collapsible for long code
 * - Language indicator
 */

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  maxLines?: number
  className?: string
}

export function CodeBlock({
  code,
  language = 'plaintext',
  filename,
  showLineNumbers = true,
  maxLines = 20,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  const lines = code.split('\n')
  const isLongCode = lines.length > maxLines
  const displayedCode = isExpanded ? code : lines.slice(0, maxLines).join('\n')
  const hiddenLines = lines.length - maxLines

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [code])

  return (
    <div className={cn(
      'relative group rounded-lg border border-[var(--border)] overflow-hidden bg-[var(--card)]',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex items-center gap-3">
          {/* Window dots */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-accent-red/70" />
            <span className="w-3 h-3 rounded-full bg-accent-orange/70" />
            <span className="w-3 h-3 rounded-full bg-accent-green/70" />
          </div>
          
          {/* Filename or language */}
          <span className="text-xs text-[var(--muted)] font-mono">
            {filename || language}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all',
            'opacity-0 group-hover:opacity-100',
            'hover:bg-[var(--card-hover)]',
            copied ? 'text-accent-green' : 'text-[var(--muted)]'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <pre
          ref={codeRef}
          className="p-4 text-sm font-mono overflow-x-auto"
        >
          <code className="flex flex-col">
            {displayedCode.split('\n').map((line, index) => (
              <span key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-[var(--muted)] w-8 flex-shrink-0 text-right pr-4">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1">{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>

        {/* Expand/collapse for long code */}
        {isLongCode && (
          <div className={cn(
            'sticky bottom-0 left-0 right-0',
            !isExpanded && 'bg-gradient-to-t from-[var(--card)] via-[var(--card)] to-transparent pt-8'
          )}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors border-t border-[var(--border)]"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show {hiddenLines} more lines
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
