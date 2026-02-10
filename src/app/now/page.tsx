import type { Metadata } from 'next'
import { resumeData } from '@/data/resume'
import { Card, Badge } from '@/components/ui'
import { Briefcase, BookOpen, Check, X, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Now',
  description: `What ${resumeData.personal.name} is currently focused on.`,
}

/**
 * Now Page
 * 
 * SOURCE: resume.ts now data
 * Implements /now page from DEVELOPMENT_PLAN.md
 * Updated monthly with current focus areas
 */
export default function NowPage() {
  const { now, personal } = resumeData

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Now</h1>
            <p className="text-xl text-[var(--muted)] mb-4">
              What I'm currently focused on. This page is updated monthly.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Last updated: <time dateTime={now.lastUpdated}>{now.lastUpdated}</time>
            </p>
          </header>

          {/* Currently Building */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Briefcase className="w-6 h-6 text-primary-500" />
              Currently Building
            </h2>
            <Card>
              <p className="text-[var(--muted)] leading-relaxed">
                {now.currentlyBuilding}
              </p>
            </Card>
          </section>

          {/* Currently Learning */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <BookOpen className="w-6 h-6 text-primary-500" />
              Currently Learning
            </h2>
            <div className="space-y-3">
              {now.currentlyLearning.map((topic, idx) => (
                <Card key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0">
                    <span className="text-primary-500 text-sm font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-[var(--muted)]">{topic}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Current Status */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Sparkles className="w-6 h-6 text-primary-500" />
              What Excites Me Right Now
            </h2>
            <Card>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-accent-green">→</span>
                  <p className="text-[var(--muted)]">
                    MLOps and the tooling around deploying ML models in production
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent-green">→</span>
                  <p className="text-[var(--muted)]">
                    The intersection of web development and machine learning
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent-green">→</span>
                  <p className="text-[var(--muted)]">
                    Building interpretable models that stakeholders can actually understand
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Currently Avoiding */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <X className="w-6 h-6 text-accent-red" />
              Currently Avoiding
            </h2>
            <Card className="border-accent-red/20">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-accent-red">✕</span>
                  <p className="text-[var(--muted)]">
                    Tutorial hell — building real projects instead of endlessly watching courses
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent-red">✕</span>
                  <p className="text-[var(--muted)]">
                    Chasing every new ML framework — focusing on fundamentals first
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent-red">✕</span>
                  <p className="text-[var(--muted)]">
                    Perfectionism — shipping and iterating beats waiting for perfect
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Available For */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Check className="w-6 h-6 text-accent-green" />
              Available For
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {now.availableFor.map((item, idx) => (
                <Card key={idx}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-green" />
                    <p className="font-medium">{item}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="mt-6 bg-primary-500/5 border-primary-500/20">
              <p className="text-center">
                <span className="text-[var(--muted)]">Want to work together? </span>
                <a href={`mailto:${personal.email}`} className="text-primary-500 font-medium hover:underline">
                  Get in touch →
                </a>
              </p>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
