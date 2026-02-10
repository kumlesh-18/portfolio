import type { Metadata } from 'next'
import { resumeData } from '@/data/resume'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${resumeData.personal.name}. Open for ML/Data Science opportunities.`,
}

/**
 * Contact Page
 * 
 * SOURCE: resume.ts personal contact data
 * Uses ContactSection component for form and info
 */
export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-[var(--muted)]">
            I'm always interested in hearing about new opportunities, 
            interesting projects, or just connecting with fellow engineers.
          </p>
        </div>
      </div>

      <ContactSection />
    </div>
  )
}
