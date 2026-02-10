import { Briefcase, Brain, BookOpen, Award, Database, Clock } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Card } from '@/components/ui'

/**
 * Metrics Panel
 * 
 * SOURCE: resume.ts metrics data
 * All metrics are real and defensible from the resume
 */

const metricsConfig = [
  {
    key: 'projectsCompleted',
    label: 'ML Projects',
    icon: Briefcase,
    value: resumeData.metrics.projectsCompleted,
    suffix: '',
    description: 'End-to-end systems built',
  },
  {
    key: 'modelsBuilt',
    label: 'Models Trained',
    icon: Brain,
    value: resumeData.metrics.modelsBuilt,
    suffix: '+',
    description: 'Different algorithms implemented',
  },
  {
    key: 'publications',
    label: 'Publications',
    icon: BookOpen,
    value: resumeData.metrics.publications,
    suffix: '',
    description: 'Technical papers written',
  },
  {
    key: 'monthsExperience',
    label: 'Months Experience',
    icon: Clock,
    value: resumeData.metrics.monthsExperience,
    suffix: '',
    description: 'Industry training & internship',
  },
  {
    key: 'coursesCompleted',
    label: 'ML Courses',
    icon: Award,
    value: resumeData.metrics.coursesCompleted,
    suffix: '',
    description: 'Professional certifications',
  },
  {
    key: 'datasetsAnalyzed',
    label: 'Datasets',
    icon: Database,
    value: resumeData.metrics.datasetsAnalyzed,
    suffix: '',
    description: 'Analyzed and processed',
  },
]

export function MetricsPanel() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">By The Numbers</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Real metrics from my work. Each number is defensible and represents actual completed work.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metricsConfig.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.key} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-500/10 text-primary-500 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold mb-1">
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-sm font-medium mb-1">{metric.label}</div>
                <div className="text-xs text-[var(--muted)]">{metric.description}</div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
