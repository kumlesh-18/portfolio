import type { Metadata } from 'next'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { resumeData } from '@/data/resume'

export const metadata: Metadata = {
  title: 'Work',
  description: `Case studies and projects by ${resumeData.personal.name}. End-to-end machine learning systems demonstrating real problem-solving.`,
}

/**
 * Work Page
 * 
 * SOURCE: resume.ts projects array
 * Lists all projects with case study format per DEVELOPMENT_PLAN.md
 */
export default function WorkPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl font-bold mb-4">My Work</h1>
        <p className="text-xl text-[var(--muted)] max-w-2xl">
          End-to-end machine learning projects. Each case study includes the problem context, 
          architecture decisions, trade-offs, and results.
        </p>
      </div>

      <ProjectsGrid showAll />
    </div>
  )
}
