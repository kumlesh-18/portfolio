import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, StatusBadge, Button } from '@/components/ui'

/**
 * Projects Grid
 * 
 * SOURCE: resume.ts projects array
 * - Customer Churn Prediction System
 * - House Price Prediction System  
 * - Handwritten Digit Recognition
 */

interface ProjectsGridProps {
  showAll?: boolean
  limit?: number
}

export function ProjectsGrid({ showAll = false, limit = 3 }: ProjectsGridProps) {
  const projects = showAll 
    ? resumeData.projects 
    : resumeData.projects.filter(p => p.featured).slice(0, limit)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Featured Work</h2>
            <p className="text-[var(--muted)] max-w-2xl">
              End-to-end machine learning projects demonstrating data analysis, model development, and real-world problem solving.
            </p>
          </div>
          {!showAll && (
            <Link href="/work" className="hidden sm:flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors">
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} variant="interactive" className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <StatusBadge status={project.status as 'completed' | 'in-progress' | 'planned'} />
                  <span className="text-xs text-[var(--muted)]">{project.period}</span>
                </div>
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <CardDescription className="text-sm">
                  {project.type}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-sm text-[var(--muted)] mb-4">
                  {project.summary}
                </p>

                {/* Key highlights */}
                <ul className="space-y-2 mb-4">
                  {project.highlights.slice(0, 3).map((highlight, idx) => (
                    <li key={idx} className="text-sm text-[var(--muted)] flex items-start gap-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="border-t border-[var(--border)] pt-4 mt-4">
                <Link href={`/work/${project.id}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-center group">
                    View Case Study
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {!showAll && (
          <div className="mt-8 text-center sm:hidden">
            <Link href="/work">
              <Button variant="outline">
                View all projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
