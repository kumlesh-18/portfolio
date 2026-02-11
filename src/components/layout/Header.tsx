'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, FileText } from 'lucide-react'
import { Navigation } from './Navigation'
import { ThemeToggle } from './ThemeToggle'
import { SearchButton } from '@/components/ui'
import { resumeData } from '@/data/resume'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <Link 
            href="/"
            className="flex items-center gap-2 font-semibold text-lg hover:text-primary-500 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
              KK
            </span>
            <span className="hidden sm:block">{resumeData.personal.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <Navigation />
            <SearchButton />
            <Link
              href="/resume"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
              title="View Resume"
            >
              <FileText className="w-4 h-4" />
              Resume
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                "hover:bg-[var(--card-hover)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              )}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border)]">
            <Navigation mobile onItemClick={() => setMobileMenuOpen(false)} />
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
              >
                <FileText className="w-5 h-5" />
                View Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
