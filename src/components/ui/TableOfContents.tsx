'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { List } from 'lucide-react'

export interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

/**
 * Table of Contents Component
 * 
 * Displays a navigable table of contents with active section highlighting
 * Supports headings of different levels (h2, h3, h4)
 */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    )

    // Observe all heading elements
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  if (items.length === 0) {
    return null
  }

  return (
    <nav
      className={cn(
        'sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto',
        className
      )}
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
        <List className="w-4 h-4" />
        <span>On this page</span>
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                'block py-1 transition-colors hover:text-[var(--foreground)]',
                activeId === item.id
                  ? 'text-primary-500 font-medium border-l-2 border-primary-500 pl-3 -ml-3'
                  : 'text-[var(--muted)]'
              )}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  // Update URL without triggering scroll
                  window.history.pushState(null, '', `#${item.id}`)
                }
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * Extract headings from HTML content
 * @param content - HTML content string
 * @returns Array of TOC items
 */
export function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /<h([2-4])\s+id="([^"]+)"[^>]*>([^<]+)<\/h[2-4]>/g
  const headings: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1], 10),
      id: match[2],
      title: match[3],
    })
  }

  return headings
}
