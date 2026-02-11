import type { Metadata } from 'next'
import { Card, Badge } from '@/components/ui'
import { GitCommit, Calendar, Sparkles, Bug, Wrench, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Version history and updates to this portfolio website.',
}

/**
 * Changelog Page
 * 
 * Documents site version history per DEVELOPMENT_PLAN.md
 * Shows what has been added, changed, fixed over time
 */

interface ChangelogEntry {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  changes: {
    type: 'added' | 'changed' | 'fixed' | 'improved'
    description: string
  }[]
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date: 'February 2026',
    type: 'minor',
    changes: [
      { type: 'added', description: 'RSS feed for writing/blog posts' },
      { type: 'added', description: 'Reading time estimates on articles' },
      { type: 'added', description: 'Table of contents for long-form content' },
      { type: 'added', description: 'Skip-to-content accessibility link' },
      { type: 'added', description: 'Client-side search functionality' },
      { type: 'added', description: 'Newsletter signup component' },
      { type: 'added', description: 'Changelog page (this page!)' },
      { type: 'added', description: 'Colophon page with tech stack details' },
      { type: 'improved', description: 'Hero section with entrance animations' },
      { type: 'improved', description: 'Overall accessibility and keyboard navigation' },
    ],
  },
  {
    version: '1.0.0',
    date: 'February 2026',
    type: 'major',
    changes: [
      { type: 'added', description: 'Initial portfolio launch' },
      { type: 'added', description: 'Home page with hero, metrics, and projects' },
      { type: 'added', description: 'Work page with case studies' },
      { type: 'added', description: 'Writing/blog page with articles' },
      { type: 'added', description: 'Systems page for technical deep-dives' },
      { type: 'added', description: 'Experiments page documenting learning projects' },
      { type: 'added', description: 'About page with personal story' },
      { type: 'added', description: 'Now page with current focus' },
      { type: 'added', description: 'Contact page with form' },
      { type: 'added', description: 'Resume page with PDF viewer' },
      { type: 'added', description: 'AI Chatbot powered by Groq API' },
      { type: 'added', description: 'Dark/light theme toggle' },
      { type: 'added', description: 'Custom 404 page' },
      { type: 'added', description: 'Responsive mobile design' },
    ],
  },
]

const typeIcons = {
  added: <Sparkles className="w-4 h-4 text-accent-green" />,
  changed: <Wrench className="w-4 h-4 text-accent-purple" />,
  fixed: <Bug className="w-4 h-4 text-accent-red" />,
  improved: <Zap className="w-4 h-4 text-primary-500" />,
}

const typeBadgeVariants = {
  added: 'success',
  changed: 'default',
  fixed: 'error',
  improved: 'primary',
} as const

export default function ChangelogPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Changelog</h1>
            <p className="text-xl text-[var(--muted)]">
              A history of updates and improvements to this portfolio. 
              Keeping track of what has changed over time.
            </p>
          </div>

          {/* Changelog entries */}
          <div className="space-y-8">
            {changelog.map((entry, index) => (
              <Card key={entry.version} className="p-6">
                {/* Version header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-5 h-5 text-primary-500" />
                    <span className="text-xl font-bold">v{entry.version}</span>
                  </div>
                  <Badge variant={entry.type === 'major' ? 'primary' : 'default'}>
                    {entry.type}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
                    <Calendar className="w-4 h-4" />
                    {entry.date}
                  </span>
                </div>

                {/* Changes list */}
                <ul className="space-y-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li
                      key={changeIndex}
                      className="flex items-start gap-3 py-1"
                    >
                      {typeIcons[change.type]}
                      <span className="text-[var(--foreground)]">
                        {change.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Future notice */}
          <div className="mt-12 p-6 border border-dashed border-[var(--border)] rounded-lg text-center">
            <p className="text-[var(--muted)]">
              More updates coming soon. This site is continuously improved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
