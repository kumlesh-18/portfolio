import { resumeData } from '@/data/resume'
import { Card, SkillBadge } from '@/components/ui'
import { cn, getSkillLevelText, skillLevelToPercent } from '@/lib/utils'

/**
 * Skills Analytics
 * 
 * SOURCE: resume.ts skills data
 * - Programming & Core
 * - Data Analysis & Preprocessing
 * - Machine Learning
 * - Deep Learning
 * - Model Evaluation
 */

export function SkillsAnalytics() {
  const { skills } = resumeData

  return (
    <section className="py-16 bg-[var(--card)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Skills derived from real project experience. Level indicates depth of hands-on usage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([key, category]) => (
            <Card key={key} className="bg-[var(--background)]">
              <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
              <div className="space-y-3">
                {category.items.map((skill) => (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-[var(--muted)]">
                        {getSkillLevelText(skill.level)}
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--card)] rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          {
                            'bg-primary-500': skill.level === 'primary',
                            'bg-accent-purple': skill.level === 'intermediate',
                            'bg-[var(--muted)]': skill.level === 'beginner',
                          }
                        )}
                        style={{ width: `${skillLevelToPercent(skill.level)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Skills legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <span className="text-sm text-[var(--muted)]">Proficient (90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-purple" />
            <span className="text-sm text-[var(--muted)]">Intermediate (70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--muted)]" />
            <span className="text-sm text-[var(--muted)]">Familiar (50%)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Skill type definition
type Skill = {
  name: string
  level: 'primary' | 'intermediate' | 'beginner'
  category: string
}

// Compact skill display for other pages
export function SkillsCompact() {
  const allSkills: Skill[] = Object.values(resumeData.skills).flatMap(
    (cat) => cat.items as unknown as Skill[]
  )
  const primarySkills = allSkills.filter((s) => s.level === 'primary')

  return (
    <div className="flex flex-wrap gap-2">
      {primarySkills.map((skill) => (
        <SkillBadge key={skill.name} level={skill.level}>
          {skill.name}
        </SkillBadge>
      ))}
    </div>
  )
}
