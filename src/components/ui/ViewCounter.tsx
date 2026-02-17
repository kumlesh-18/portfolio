'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * View Counter Component
 * 
 * Displays and tracks view count for articles/projects
 */

interface ViewCounterProps {
  slug: string
  increment?: boolean
  className?: string
  showIcon?: boolean
}

export function ViewCounter({
  slug,
  increment = true,
  className,
  showIcon = true,
}: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // Increment view on mount if enabled
        if (increment) {
          const res = await fetch(`/api/views?slug=${slug}`, {
            method: 'POST',
          })
          const data = await res.json()
          setViews(data.views)
        } else {
          const res = await fetch(`/api/views?slug=${slug}`)
          const data = await res.json()
          setViews(data.views)
        }
      } catch (error) {
        console.error('Failed to fetch views:', error)
        setViews(0)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [slug, increment])

  const formatViews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-sm text-[var(--muted)]',
        className
      )}
    >
      {showIcon && <Eye className="w-4 h-4" />}
      {loading ? (
        <span className="w-8 h-4 bg-[var(--card-hover)] rounded animate-pulse" />
      ) : (
        <span>{views !== null ? formatViews(views) : '—'} views</span>
      )}
    </span>
  )
}
