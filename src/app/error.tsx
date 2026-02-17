'use client'

import Link from 'next/link'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui'

/**
 * Error Page (Route-level)
 * 
 * Handles errors within route segments
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 text-center">
        {/* Error Title */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-red/10 mb-6">
            <AlertTriangle className="w-8 h-8 text-accent-red" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-[var(--muted)] max-w-md mx-auto">
            An error occurred while loading this page. 
            Like an outlier in a dataset, sometimes things don't go as expected.
          </p>
        </div>

        {/* Debug info */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 max-w-md mx-auto mb-8 font-mono text-sm text-left">
          <p className="text-[var(--muted)]"># Error Details</p>
          <p className="text-accent-red">Message: {error.message || 'Unknown error'}</p>
          {error.digest && (
            <p className="text-[var(--muted)]">Digest: {error.digest}</p>
          )}
          <p className="text-accent-green mt-2"># Resolution</p>
          <p className="text-[var(--muted)]">Try refreshing or go back home</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="secondary" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
