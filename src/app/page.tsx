import { Hero } from '@/components/sections/Hero'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { SkillsAnalytics } from '@/components/sections/SkillsAnalytics'
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline'
import { ContactSection } from '@/components/sections/ContactSection'

/**
 * Home Page
 * 
 * Implements the hero-first approach from DEVELOPMENT_PLAN.md:
 * - One-sentence positioning (from resume.ts)
 * - Authority metrics (real, defensible)
 * - Interactive skills showcase
 * - Featured work preview
 * - Skills overview
 * - Experience timeline
 * - Contact CTA
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      {/* MetricsPanel integrated into Hero */}
      <ProjectsGrid limit={3} />
      <SkillsAnalytics />
      <ExperienceTimeline />
      <ContactSection />
    </>
  )
}
