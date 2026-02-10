import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui'

/**
 * Custom 404 Page
 * 
 * Per DEVELOPMENT_PLAN.md "Hidden Excellence Touches"
 * Custom 404 page with personality
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Title */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-primary-500 mb-4">404</h1>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-[var(--muted)] max-w-md mx-auto">
            Like a NaN in your dataset, this page is mysteriously missing. 
            Let's get you back on track.
          </p>
        </div>

        {/* Debug info (playful ML reference) */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 max-w-md mx-auto mb-8 font-mono text-sm text-left">
          <p className="text-[var(--muted)]"># Error Analysis</p>
          <p className="text-accent-red">Status: 404 (NotFoundError)</p>
          <p className="text-[var(--muted)]">Confidence: 100%</p>
          <p className="text-[var(--muted)]">Predicted Class: missing_page</p>
          <p className="text-accent-green mt-2"># Recommended Action</p>
          <p className="text-[var(--muted)]">Navigate to valid route</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/work">
            <Button variant="secondary" size="lg">
              <Search className="w-4 h-4 mr-2" />
              View My Work
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12">
          <p className="text-sm text-[var(--muted)] mb-4">Popular destinations:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/work" className="text-primary-500 hover:underline">
              Case Studies
            </Link>
            <span className="text-[var(--border)]">•</span>
            <Link href="/systems" className="text-primary-500 hover:underline">
              How I Think
            </Link>
            <span className="text-[var(--border)]">•</span>
            <Link href="/about" className="text-primary-500 hover:underline">
              About Me
            </Link>
            <span className="text-[var(--border)]">•</span>
            <Link href="/contact" className="text-primary-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
