import type { Metadata } from 'next'
import { Card, Badge } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Experiments',
  description: 'Experiments, prototypes, and learning projects documenting my curiosity and growth.',
}

/**
 * Experiments Page
 * 
 * Implements experiments section per DEVELOPMENT_PLAN.md
 * Documents learning projects and technical explorations
 */

const experiments = [
  {
    id: 'neural-network-from-scratch',
    title: 'Neural Network from Scratch',
    status: 'completed' as const,
    date: 'January 2025',
    category: 'Learning',
    hypothesis: 'Implementing backpropagation manually deepens understanding of how neural networks learn.',
    discovery: 'The math is simpler than expected once you break it down. Gradient descent is elegant.',
    techStack: ['Python', 'NumPy'],
    useInProduction: 'no',
    verdict: 'Use frameworks for production, but understand what happens under the hood.',
  },
  {
    id: 'feature-importance-comparison',
    title: 'Feature Importance Methods Comparison',
    status: 'completed' as const,
    date: 'December 2024',
    category: 'Performance',
    hypothesis: 'Different feature importance methods give different rankings. Which should you trust?',
    discovery: 'SHAP values are more reliable than built-in feature importance for correlated features.',
    techStack: ['Python', 'Scikit-learn', 'SHAP'],
    useInProduction: 'yes',
    verdict: 'Use SHAP for interpretable features, permutation importance for model-agnostic ranking.',
  },
  {
    id: 'data-augmentation-tabular',
    title: 'Data Augmentation for Tabular Data',
    status: 'completed' as const,
    date: 'November 2024',
    category: 'Tooling',
    hypothesis: 'Can SMOTE-like techniques actually improve model performance on imbalanced datasets?',
    discovery: 'Mixed results. SMOTE helps on some datasets but hurts on others. Threshold tuning often works better.',
    techStack: ['Python', 'imbalanced-learn', 'Scikit-learn'],
    useInProduction: 'it depends',
    verdict: 'Try threshold moving first. SMOTE is situational, not a universal solution.',
  },
]

export default function ExperimentsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Experiments</h1>
          <p className="text-xl text-[var(--muted)]">
            Learning happens through experimentation. These are my technical explorations — 
            hypotheses tested, discoveries made, and lessons learned.
          </p>
        </div>

        <div className="space-y-6">
          {experiments.map((exp) => (
            <Card key={exp.id} className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Main content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge variant={exp.status === 'completed' ? 'success' : 'warning'}>
                      {exp.status === 'completed' ? '✓ Completed' : '🔄 Ongoing'}
                    </Badge>
                    <Badge variant="default">{exp.category}</Badge>
                    <span className="text-sm text-[var(--muted)]">{exp.date}</span>
                  </div>

                  <h2 className="text-xl font-bold mb-3">{exp.title}</h2>

                  <div className="space-y-4 mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-primary-500 mb-1">Hypothesis</h3>
                      <p className="text-sm text-[var(--muted)]">{exp.hypothesis}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-accent-green mb-1">Discovery</h3>
                      <p className="text-sm text-[var(--muted)]">{exp.discovery}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Verdict sidebar */}
                <div className="lg:w-64 bg-[var(--background)] p-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[var(--border)]">
                  <h3 className="text-sm font-semibold text-[var(--muted)] mb-2">
                    Use in Production?
                  </h3>
                  <Badge 
                    variant={
                      exp.useInProduction === 'yes' ? 'success' : 
                      exp.useInProduction === 'no' ? 'danger' : 'warning'
                    }
                    size="md"
                    className="mb-3"
                  >
                    {exp.useInProduction === 'yes' ? 'Yes' : 
                     exp.useInProduction === 'no' ? 'No' : 'It Depends'}
                  </Badge>
                  <p className="text-xs text-[var(--muted)]">{exp.verdict}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Experiment methodology */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">How I Run Experiments</h2>
          <Card>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-500 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Hypothesis</h3>
                <p className="text-sm text-[var(--muted)]">Define what I want to learn or prove</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-500 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Setup</h3>
                <p className="text-sm text-[var(--muted)]">Build minimal test environment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-500 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Execute</h3>
                <p className="text-sm text-[var(--muted)]">Run tests and collect evidence</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-500 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Document</h3>
                <p className="text-sm text-[var(--muted)]">Share learnings, especially failures</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
