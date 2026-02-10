import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Brain, Database, Sparkles, Shield, BarChart, Code } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Systems',
  description: 'How I think about machine learning, data pipelines, and engineering challenges.',
}

/**
 * Systems Page
 * 
 * Implements systems/architecture articles per DEVELOPMENT_PLAN.md
 * These demonstrate engineering thinking beyond just code
 */

const systemsArticles = [
  {
    id: 'ml-pipeline-design',
    title: 'How I Design ML Pipelines',
    description: 'My approach to building reproducible, maintainable machine learning workflows.',
    icon: Brain,
    category: 'Machine Learning',
    topics: ['Data preprocessing', 'Feature engineering', 'Model training', 'Evaluation'],
  },
  {
    id: 'data-preprocessing',
    title: 'How I Handle Data Quality',
    description: 'Strategies for dealing with missing values, outliers, and data inconsistencies.',
    icon: Database,
    category: 'Data Engineering',
    topics: ['Data cleaning', 'Imputation', 'Outlier detection', 'Data validation'],
  },
  {
    id: 'feature-engineering',
    title: 'How I Approach Feature Engineering',
    description: 'The art and science of creating features that improve model performance.',
    icon: Sparkles,
    category: 'Machine Learning',
    topics: ['Domain knowledge', 'Feature creation', 'Selection methods', 'Dimensionality'],
  },
  {
    id: 'model-evaluation',
    title: 'How I Evaluate Models',
    description: 'Beyond accuracy: choosing the right metrics and validation strategies.',
    icon: BarChart,
    category: 'Machine Learning',
    topics: ['Cross-validation', 'Metric selection', 'Overfitting', 'Bias-variance'],
  },
  {
    id: 'code-organization',
    title: 'How I Organize ML Projects',
    description: 'Project structure, documentation, and reproducibility practices.',
    icon: Code,
    category: 'Engineering',
    topics: ['Project structure', 'Version control', 'Documentation', 'Reproducibility'],
  },
  {
    id: 'debugging-ml',
    title: 'How I Debug ML Systems',
    description: 'Systematic approaches to finding and fixing issues in machine learning code.',
    icon: Shield,
    category: 'Engineering',
    topics: ['Error analysis', 'Data debugging', 'Model debugging', 'Performance issues'],
  },
]

export default function SystemsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">How I Think</h1>
          <p className="text-xl text-[var(--muted)]">
            Engineering isn't just about writing code. These articles explain my approach 
            to designing systems, making trade-offs, and solving problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {systemsArticles.map((article) => {
            const Icon = article.icon
            return (
              <Link key={article.id} href={`/systems/${article.id}`}>
                <Card variant="interactive" className="h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="default" className="mb-2">
                          {article.category}
                        </Badge>
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <div className="px-6 pb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.topics.map((topic) => (
                        <span key={topic} className="text-xs text-[var(--muted)]">
                          #{topic.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                    
                    <span className="inline-flex items-center gap-2 text-primary-500 text-sm font-medium group">
                      Read article
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Philosophy section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">My Engineering Philosophy</h2>
          <Card>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary-500">Start Simple</h3>
                <p className="text-sm text-[var(--muted)]">
                  Begin with the simplest solution that could work. 
                  Complexity is easy to add, hard to remove.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary-500">Measure Everything</h3>
                <p className="text-sm text-[var(--muted)]">
                  Intuition is valuable, but data is invaluable. 
                  Every decision should be backed by measurement.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary-500">Document Decisions</h3>
                <p className="text-sm text-[var(--muted)]">
                  Code shows what, documentation shows why. 
                  Future-you will thank present-you.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
