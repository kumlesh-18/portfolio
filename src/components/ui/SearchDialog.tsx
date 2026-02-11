'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { Search, X, FileText, Folder, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resumeData } from '@/data/resume'

/**
 * Search Dialog
 * 
 * Client-side fuzzy search across portfolio content
 * Triggered by Ctrl/Cmd + K or search button
 */

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'project' | 'article' | 'experiment'
}

// Searchable content (can be expanded)
const searchableContent: SearchResult[] = [
  // Pages
  { id: 'home', title: 'Home', description: 'Main portfolio page', url: '/', type: 'page' },
  { id: 'work', title: 'Work', description: 'Case studies and projects', url: '/work', type: 'page' },
  { id: 'writing', title: 'Writing', description: 'Technical articles and blog', url: '/writing', type: 'page' },
  { id: 'systems', title: 'Systems', description: 'How I think about architecture', url: '/systems', type: 'page' },
  { id: 'experiments', title: 'Experiments', description: 'Learning projects and prototypes', url: '/experiments', type: 'page' },
  { id: 'about', title: 'About', description: 'My story and background', url: '/about', type: 'page' },
  { id: 'now', title: 'Now', description: 'What I\'m currently focused on', url: '/now', type: 'page' },
  { id: 'contact', title: 'Contact', description: 'Get in touch', url: '/contact', type: 'page' },
  { id: 'resume', title: 'Resume', description: 'View my resume', url: '/resume', type: 'page' },
  { id: 'changelog', title: 'Changelog', description: 'Site version history', url: '/changelog', type: 'page' },
  { id: 'colophon', title: 'Colophon', description: 'How this site was built', url: '/colophon', type: 'page' },
  
  // Projects from resume
  ...resumeData.projects.map(project => ({
    id: project.id,
    title: project.name,
    description: project.summary,
    url: `/work/${project.id}`,
    type: 'project' as const,
  })),
  
  // Articles  
  { id: 'customer-churn-analysis', title: 'Customer Churn Analysis', description: 'Supervised learning for churn prediction', url: '/writing/customer-churn-analysis', type: 'article' },
  { id: 'cross-validation-guide', title: 'Cross-Validation Guide', description: 'K-Fold and stratified validation', url: '/writing/cross-validation-guide', type: 'article' },
  { id: 'feature-engineering', title: 'Feature Engineering Lessons', description: 'Lessons from real projects', url: '/writing/feature-engineering-lessons', type: 'article' },
]

function fuzzySearch(query: string, items: SearchResult[]): SearchResult[] {
  if (!query.trim()) return []
  
  const lowerQuery = query.toLowerCase()
  
  return items
    .map(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery)
      const descMatch = item.description.toLowerCase().includes(lowerQuery)
      const score = titleMatch ? 2 : descMatch ? 1 : 0
      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
    .slice(0, 8)
}

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setResults(fuzzySearch(query, searchableContent))
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, results.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          window.location.href = results[selectedIndex].url
          onClose()
        }
        break
      case 'Escape':
        onClose()
        break
    }
  }, [results, selectedIndex, onClose])

  if (!isOpen) return null

  const typeIcons = {
    page: <Folder className="w-4 h-4" />,
    project: <FileText className="w-4 h-4" />,
    article: <FileText className="w-4 h-4" />,
    experiment: <FileText className="w-4 h-4" />,
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-[var(--border)]">
            <Search className="w-5 h-5 text-[var(--muted)]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search portfolio..."
              className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-[var(--card-hover)] rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          {query && (
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <ul className="py-2">
                  {results.map((result, index) => (
                    <li key={result.id}>
                      <Link
                        href={result.url}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 hover:bg-[var(--card-hover)]',
                          index === selectedIndex && 'bg-[var(--card-hover)]'
                        )}
                      >
                        <span className="text-[var(--muted)]">
                          {typeIcons[result.type]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{result.title}</p>
                          <p className="text-sm text-[var(--muted)] truncate">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-[var(--muted)]">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}

          {/* Keyboard hints */}
          <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--border)] text-xs text-[var(--muted)]">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--muted)] border border-[var(--border)] rounded-md hover:bg-[var(--card-hover)] transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-[var(--card)] rounded border border-[var(--border)]">
          ⌘K
        </kbd>
      </button>
      <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
