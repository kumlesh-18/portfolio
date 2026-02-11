import Link from 'next/link'
import { ArrowRight, Github, Linkedin, FileText } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Button, BGPattern } from '@/components/ui'

/**
 * Hero Section
 * 
 * SOURCE: resume.ts personal data
 * - Name: Kumlesh Kumar
 * - Title: Junior Machine Learning Engineer
 * - Positioning: ML Engineer building data products
 */
export function Hero() {
  const { personal } = resumeData

  return (
    <section className="relative py-20 lg:py-32">
      {/* Grid Background Pattern */}
      <BGPattern variant="grid" mask="fade-edges" size={32} fill="var(--border)" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 text-sm text-[var(--muted)] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
            </span>
            Available for ML/Data Science opportunities
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-[var(--foreground)]">{personal.name}</span>
            <span className="block gradient-text mt-2">{personal.title}</span>
          </h1>

          {/* Positioning statement */}
          <p className="text-xl lg:text-2xl text-[var(--muted)] max-w-2xl mb-8 leading-relaxed">
            {personal.positioning}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link href="/work">
              <Button size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/systems">
              <Button variant="secondary" size="lg">
                How I Think
              </Button>
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-[var(--border)] hover:border-primary-500/50 hover:bg-[var(--card-hover)] transition-colors"
              aria-label="View GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-[var(--border)] hover:border-primary-500/50 hover:bg-[var(--card-hover)] transition-colors"
              aria-label="View LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-3 rounded-lg border border-[var(--border)] hover:border-primary-500/50 hover:bg-[var(--card-hover)] transition-colors"
              aria-label="Send email"
            >
              <FileText className="w-5 h-5" />
            </a>
            <span className="text-sm text-[var(--muted)] ml-2">
              {personal.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
