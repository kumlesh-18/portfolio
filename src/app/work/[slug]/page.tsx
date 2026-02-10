import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Card, Badge, StatusBadge, Button } from '@/components/ui'

interface Props {
  params: { slug: string }
}

// Generate static paths for all projects
export function generateStaticParams() {
  return resumeData.projects.map((project) => ({
    slug: project.id,
  }))
}

// Generate metadata for each project
export function generateMetadata({ params }: Props): Metadata {
  const project = resumeData.projects.find((p) => p.id === params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.name,
    description: project.summary,
    keywords: [...project.techStack],
  }
}

/**
 * Case Study Detail Page
 * 
 * SOURCE: resume.ts projects[id]
 * Implements case study template from DEVELOPMENT_PLAN.md
 */
export default function CaseStudyPage({ params }: Props) {
  const project = resumeData.projects.find((p) => p.id === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back navigation */}
        <Link 
          href="/work"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <StatusBadge status={project.status as 'completed' | 'in-progress' | 'planned'} />
            <Badge variant="primary">{project.category}</Badge>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{project.name}</h1>
          <p className="text-xl text-[var(--muted)] mb-6">{project.summary}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {project.period}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {project.type}
            </span>
          </div>
        </header>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="primary" size="md">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        {/* Project Highlights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What I Built</h2>
          <Card>
            <ul className="space-y-4">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-[var(--muted)]">{highlight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(project.metrics).map(([key, value]) => (
              <Card key={key} className="text-center">
                <p className="text-2xl font-bold text-primary-500">{value}</p>
                <p className="text-sm text-[var(--muted)] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Problem Context (placeholder for expanded case studies) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Problem Context</h2>
          <Card>
            <p className="text-[var(--muted)]">
              This project addressed {project.type.toLowerCase()} challenges. 
              The goal was to build a robust system that could handle real-world data 
              and produce actionable insights for decision-making.
            </p>
          </Card>
        </section>

        {/* Architecture (placeholder for expanded case studies) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Architecture & Approach</h2>
          <Card className="font-mono text-sm overflow-x-auto">
            <pre className="text-[var(--muted)]">
{`┌─────────────────────────────────────────────────────────┐
│                     Data Pipeline                        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Raw Data ──▶ Preprocessing ──▶ Feature Engineering    │
│                      │                    │              │
│                      ▼                    ▼              │
│              Data Cleaning         Feature Selection     │
│                      │                    │              │
│                      └────────┬───────────┘              │
│                               │                          │
│                               ▼                          │
│                      Model Training                      │
│                               │                          │
│                               ▼                          │
│                      Evaluation & Tuning                 │
│                               │                          │
│                               ▼                          │
│                      Final Predictions                   │
│                                                          │
└─────────────────────────────────────────────────────────┘`}
            </pre>
          </Card>
        </section>

        {/* Lessons Learned */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key Lessons</h2>
          <Card>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-accent-green">✓</span>
                <p className="text-[var(--muted)]">
                  Feature engineering has outsized impact on model performance. 
                  Domain knowledge matters more than model complexity.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent-green">✓</span>
                <p className="text-[var(--muted)]">
                  Cross-validation is essential for reliable evaluation. 
                  Single train-test splits can be misleading.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent-green">✓</span>
                <p className="text-[var(--muted)]">
                  Start simple (Linear/Logistic Regression) before complex models. 
                  Baselines provide crucial context.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link href="/work">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              All Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
