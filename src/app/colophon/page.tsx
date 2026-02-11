import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { 
  Code2, 
  Palette, 
  Server, 
  Zap, 
  Shield, 
  Accessibility,
  GitBranch,
  Cloud,
  Heart
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Colophon',
  description: 'How this portfolio was built - technologies, tools, and design decisions.',
}

/**
 * Colophon Page
 * 
 * Documents how this site was built per DEVELOPMENT_PLAN.md
 * Shows tech stack, design decisions, and principles
 */

const techStack = {
  framework: [
    { name: 'Next.js 14', description: 'React framework with App Router', icon: Code2 },
    { name: 'React 18', description: 'UI library', icon: Code2 },
    { name: 'TypeScript', description: 'Type-safe JavaScript', icon: Code2 },
  ],
  styling: [
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: Palette },
    { name: 'CSS Variables', description: 'Dark/light theme support', icon: Palette },
    { name: 'Framer Motion', description: 'Animation library', icon: Zap },
  ],
  ai: [
    { name: 'Groq API', description: 'AI chatbot backend', icon: Server },
    { name: 'Llama 3', description: 'Large language model', icon: Server },
  ],
  tools: [
    { name: 'VS Code', description: 'Code editor', icon: Code2 },
    { name: 'Git', description: 'Version control', icon: GitBranch },
    { name: 'GitHub', description: 'Repository hosting', icon: Cloud },
    { name: 'Vercel', description: 'Deployment platform', icon: Cloud },
  ],
}

const principles = [
  {
    title: 'Performance First',
    description: 'Targeting 95+ Lighthouse scores across all categories. Bundle size under 200KB.',
    icon: Zap,
  },
  {
    title: 'Accessibility',
    description: 'WCAG 2.1 AA compliant. Keyboard navigable. Screen reader friendly.',
    icon: Accessibility,
  },
  {
    title: 'Semantic HTML',
    description: 'Proper heading hierarchy, landmarks, and meaningful markup.',
    icon: Code2,
  },
  {
    title: 'Privacy',
    description: 'No tracking cookies. Minimal analytics. Respect for user privacy.',
    icon: Shield,
  },
]

const designDecisions = [
  {
    decision: 'Static Site Generation',
    rationale: 'Content rarely changes. SSG provides best performance and security.',
  },
  {
    decision: 'No External Fonts',
    rationale: 'System font stack for instant rendering. No layout shift.',
  },
  {
    decision: 'Dark Mode Default',
    rationale: 'Most developers prefer dark mode. Respects system preference.',
  },
  {
    decision: 'Minimal JavaScript',
    rationale: 'Progressive enhancement. Core content works without JS.',
  },
  {
    decision: 'Single Source of Truth',
    rationale: 'All data in resume.ts. No content duplication or drift.',
  },
]

export default function ColophonPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Colophon</h1>
            <p className="text-xl text-[var(--muted)]">
              How this portfolio was built. A peek behind the curtain at the 
              technologies, tools, and decisions that shaped this site.
            </p>
          </div>

          {/* Tech Stack */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Framework */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary-500" />
                  Framework
                </h3>
                <ul className="space-y-3">
                  {techStack.framework.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-[var(--muted)]">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Styling */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-accent-purple" />
                  Styling
                </h3>
                <ul className="space-y-3">
                  {techStack.styling.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-[var(--muted)]">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* AI */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-accent-green" />
                  AI Integration
                </h3>
                <ul className="space-y-3">
                  {techStack.ai.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-[var(--muted)]">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Tools */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-accent-orange" />
                  Tools & Deployment
                </h3>
                <ul className="space-y-3">
                  {techStack.tools.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-[var(--muted)]">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* Design Principles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Design Principles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((principle) => {
                const Icon = principle.icon
                return (
                  <Card key={principle.title} className="p-6">
                    <div className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary-500 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">{principle.title}</h3>
                        <p className="text-sm text-[var(--muted)]">{principle.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Key Decisions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Key Decisions</h2>
            <Card className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-[var(--border)]">
                    <th className="pb-3 font-semibold">Decision</th>
                    <th className="pb-3 font-semibold">Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {designDecisions.map((item, index) => (
                    <tr 
                      key={item.decision}
                      className={index !== designDecisions.length - 1 ? 'border-b border-[var(--border)]' : ''}
                    >
                      <td className="py-3 pr-4">
                        <span className="font-medium">{item.decision}</span>
                      </td>
                      <td className="py-3 text-[var(--muted)]">
                        {item.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>

          {/* Credits */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Credits & Inspiration</h2>
            <Card className="p-6">
              <p className="text-[var(--muted)] mb-4">
                This portfolio was inspired by the belief that portfolios should 
                demonstrate how you think, not just list what you know.
              </p>
              <p className="text-[var(--muted)] mb-4">
                Special thanks to the open-source community for the amazing tools 
                that made this possible.
              </p>
              <p className="flex items-center gap-2 text-[var(--muted)]">
                Built with <Heart className="w-4 h-4 text-accent-red" /> by{' '}
                <Link href="/about" className="text-primary-500 hover:underline">
                  Kumlesh Kumar
                </Link>
              </p>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
