import type { Metadata } from 'next'
import Link from 'next/link'
import { resumeData } from '@/data/resume'
import { Card, Badge, SkillsRadar, defaultMLSkills } from '@/components/ui'
import { SkillsCompact } from '@/components/sections/SkillsAnalytics'
import { TestimonialsSection, sampleTestimonials } from '@/components/sections'
import { GraduationCap, Briefcase, BookOpen, Heart, Target, AlertTriangle, FileText, Radar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${resumeData.personal.name} — background, values, and working style.`,
}

/**
 * About Page
 * 
 * SOURCE: resume.ts personal, education, experience, courses data
 * Implements About page structure from DEVELOPMENT_PLAN.md
 */
export default function AboutPage() {
  const { personal, education, courses, languages } = resumeData

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-[var(--muted)] mb-6">
              {personal.positioning}
            </p>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              <FileText className="w-5 h-5" />
              View Resume
            </Link>
          </header>

          {/* The Beginning */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <BookOpen className="w-6 h-6 text-primary-500" />
              The Beginning
            </h2>
            <Card>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  My journey into machine learning started with a simple question: 
                  <em> "Can data actually predict what happens next?"</em> 
                  That curiosity led me from writing my first Python script to building 
                  end-to-end ML pipelines.
                </p>
                <p className="text-[var(--muted)] leading-relaxed mb-4">
                  Currently pursuing B.Tech in Computer Science (Data Science) at 
                  <strong> National Institute of Science and Technology</strong>, 
                  I've complemented my formal education with hands-on projects and 
                  professional certifications from the University of Michigan and Coursera.
                </p>
                <p className="text-[var(--muted)] leading-relaxed">
                  What started as curiosity has become a passion for turning messy 
                  real-world data into actionable insights that solve real problems.
                </p>
              </div>
            </Card>
          </section>

          {/* How I Think Now */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Target className="w-6 h-6 text-primary-500" />
              How I Think Now
            </h2>
            <Card>
              <div className="space-y-4">
                <p className="text-[var(--muted)] leading-relaxed">
                  After building several ML systems, my engineering philosophy has crystallized 
                  around a few core beliefs:
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 font-bold">1.</span>
                    <div>
                      <strong>Data quality beats model complexity.</strong>
                      <p className="text-sm text-[var(--muted)]">
                        A simple model on clean data outperforms a complex model on messy data.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 font-bold">2.</span>
                    <div>
                      <strong>Understand before you optimize.</strong>
                      <p className="text-sm text-[var(--muted)]">
                        The best predictions come from understanding why something happens.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 font-bold">3.</span>
                    <div>
                      <strong>Reproducibility is non-negotiable.</strong>
                      <p className="text-sm text-[var(--muted)]">
                        If you can't reproduce your results, you don't understand them.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <Card key={edu.id}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      {edu.specialization && (
                        <p className="text-primary-500">{edu.specialization}</p>
                      )}
                    </div>
                    <Badge variant={edu.status === 'ongoing' ? 'warning' : 'success'}>
                      {edu.status === 'ongoing' ? 'In Progress' : 'Completed'}
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
                    ) : edu.institution}
                  </p>
                  <p className="text-sm text-[var(--muted)]">{edu.period}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Briefcase className="w-6 h-6 text-primary-500" />
              Professional Courses
            </h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <h3 className="font-semibold mb-1">{course.name}</h3>
                  <p className="text-sm text-primary-500 mb-2">
                    {course.provider} • {course.platform}
                  </p>
                  <p className="text-sm text-[var(--muted)] mb-3">{course.period}</p>
                  <ul className="space-y-1">
                    {course.topics.map((topic, idx) => (
                      <li key={idx} className="text-sm text-[var(--muted)] flex items-start gap-2">
                        <span className="text-primary-500">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Heart className="w-6 h-6 text-primary-500" />
              Values
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <h3 className="font-semibold text-primary-500 mb-2">Intellectual Honesty</h3>
                <p className="text-sm text-[var(--muted)]">
                  I say "I don't know" when I don't. I share failures alongside successes.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-primary-500 mb-2">Continuous Learning</h3>
                <p className="text-sm text-[var(--muted)]">
                  ML evolves fast. I dedicate time weekly to learning new techniques.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-primary-500 mb-2">Clear Communication</h3>
                <p className="text-sm text-[var(--muted)]">
                  Complex ideas should be explained simply. Jargon hides weak thinking.
                </p>
              </Card>
              <Card>
                <h3 className="font-semibold text-primary-500 mb-2">Ship & Iterate</h3>
                <p className="text-sm text-[var(--muted)]">
                  Perfect is the enemy of good. Working solutions beat theoretical perfection.
                </p>
              </Card>
            </div>
          </section>

          {/* Languages */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Languages</h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <Card key={lang.name} className="px-4 py-2">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-[var(--muted)]"> — {lang.level}</span>
                </Card>
              ))}
            </div>
          </section>

          {/* Working Style */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Working Style</h2>
            <Card>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent-green">✓</span>
                  <span className="text-[var(--muted)]">
                    I prefer async communication for deep work, with sync catchups for alignment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-green">✓</span>
                  <span className="text-[var(--muted)]">
                    I document as I build — code comments, READMEs, and decision logs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-green">✓</span>
                  <span className="text-[var(--muted)]">
                    I ask questions early rather than making assumptions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-green">✓</span>
                  <span className="text-[var(--muted)]">
                    I value honest feedback and give it respectfully in return
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Red Flags I Avoid */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <AlertTriangle className="w-6 h-6 text-accent-yellow" />
              Environments I Avoid
            </h2>
            <Card className="border-accent-yellow/20">
              <p className="text-sm text-[var(--muted)] mb-4">
                Being upfront about what doesn't work for me:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-accent-red">✕</span>
                  <span className="text-[var(--muted)]">
                    Teams where metrics don't matter (decisions by opinion, not evidence)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-red">✕</span>
                  <span className="text-[var(--muted)]">
                    Environments that punish honest mistake acknowledgment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-red">✕</span>
                  <span className="text-[var(--muted)]">
                    Pressure to deploy models without proper validation
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Skills Radar */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
              <Radar className="w-6 h-6 text-primary-500" />
              Skills Overview
            </h2>
            <Card>
              <SkillsRadar skills={defaultMLSkills} />
            </Card>
          </section>

          {/* Testimonials */}
          <TestimonialsSection testimonials={sampleTestimonials} />
        </div>
      </div>
    </div>
  )
}
