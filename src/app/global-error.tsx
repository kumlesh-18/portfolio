'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui'

/**
 * Global Error Page (500)
 * 
 * Handles unexpected runtime errors
 * Per DEVELOPMENT_PLAN.md "Hidden Excellence Touches"
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console (could send to error tracking service)
    console.error('Application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          {/* Error Title */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
            <p className="text-2xl font-semibold mb-2">Something Went Wrong</p>
            <p className="text-gray-400 max-w-md mx-auto">
              An unexpected error occurred. Don't worry, it's not your fault. 
              Our models sometimes make prediction errors too.
            </p>
          </div>

          {/* Debug info (playful ML reference) */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 max-w-md mx-auto mb-8 font-mono text-sm text-left">
            <p className="text-gray-500"># Error Analysis</p>
            <p className="text-red-400">Status: 500 (InternalServerError)</p>
            <p className="text-gray-500">Type: Runtime Exception</p>
            {error.digest && (
              <p className="text-gray-500">Digest: {error.digest}</p>
            )}
            <p className="text-green-400 mt-2"># Recommended Action</p>
            <p className="text-gray-500">Retry or navigate to safety</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={reset}
              className="bg-blue-600 hover:bg-blue-700"
            >
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

          {/* Contact */}
          <p className="mt-12 text-sm text-gray-500">
            If this keeps happening, please{' '}
            <Link href="/contact" className="text-blue-400 hover:underline">
              let me know
            </Link>
            .
          </p>
        </div>
      </body>
    </html>
  )
}
