import { Briefcase, GraduationCap } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Card, Badge } from '@/components/ui'

/**
 * Experience Timeline
 * 
 * SOURCE: resume.ts experience and education data
 * - Data Science Trainee (Aug 2025 – Jan 2026)
 * - Junior ML Intern (Feb 2025 – May 2025)
 * - B.Tech CSE (Data Science) - NIST (Aug 2024 – Aug 2028)
 */

export function ExperienceTimeline() {
  const { experience, education } = resumeData

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Experience & Education</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            My journey in machine learning and data science.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Work Experience */}
          <div className="mb-12">
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
              <Briefcase className="w-5 h-5 text-primary-500" />
              Work Experience
            </h3>
            
            <div className="relative pl-8 border-l-2 border-[var(--border)] space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-[var(--background)]" />
                  
                  <Card className="ml-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-sm text-[var(--muted)]">
                          {exp.company} {'companyType' in exp && exp.companyType ? `(${exp.companyType})` : ''}
                        </p>
                      </div>
                      <Badge variant="primary">{exp.type}</Badge>
                    </div>
                    
                    <p className="text-sm text-[var(--muted)] mb-4">
                      {exp.period} • {exp.duration}
                    </p>
                    
                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-[var(--muted)] flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
              <GraduationCap className="w-5 h-5 text-primary-500" />
              Education
            </h3>
            
            <div className="relative pl-8 border-l-2 border-[var(--border)] space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-accent-purple border-4 border-[var(--background)]" />
                  
                  <Card className="ml-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold">{edu.degree}</h4>
                        {edu.specialization && (
                          <p className="text-sm text-primary-500">{edu.specialization}</p>
                        )}
                      </div>
                      <Badge variant={edu.status === 'ongoing' ? 'warning' : 'success'}>
                        {edu.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-[var(--muted)]">
                      {'url' in edu && edu.url ? (
                        <a 
                          href={edu.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary-500 transition-colors"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        edu.institution
                      )}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {edu.period} • {edu.location}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
