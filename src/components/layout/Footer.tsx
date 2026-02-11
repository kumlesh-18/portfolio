'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Rss } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { navItems } from './Navigation'
import { NewsletterForm } from '@/components/ui'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <span className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
                KK
              </span>
              {resumeData.personal.name}
            </Link>
            <p className="text-sm text-[var(--muted)] max-w-xs">
              {resumeData.personal.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              More
            </h3>
            <nav aria-label="Secondary navigation">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/changelog"
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/colophon"
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Colophon
                  </Link>
                </li>
                <li>
                  <a
                    href="/rss.xml"
                    className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1"
                  >
                    <Rss className="w-3 h-3" />
                    RSS Feed
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Stay Updated
            </h3>
            <p className="text-sm text-[var(--muted)]">
              Get notified about new articles.
            </p>
            <NewsletterForm variant="inline" />
            
            <div className="flex gap-4 pt-4">
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="p-2 rounded-lg hover:bg-[var(--card-hover)] transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--muted)]">
            © {currentYear} {resumeData.personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Built with Next.js • Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
