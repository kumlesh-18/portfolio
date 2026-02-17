import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { Quote, Star } from 'lucide-react'

/**
 * Testimonials Section
 * 
 * Display recommendations from colleagues/clients/professors
 */

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  relationship: string // e.g., "Former colleague", "Project mentor", "Professor"
  avatar?: string
  rating?: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  className?: string
}

export function TestimonialsSection({ 
  testimonials, 
  title = 'What People Say',
  className 
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null

  return (
    <section className={className}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-[var(--muted)] text-center mb-12 max-w-2xl mx-auto">
          Feedback from people I've worked with and learned from
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="p-6 flex flex-col h-full">
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary-500/30 mb-4" />

      {/* Quote text */}
      <blockquote className="text-[var(--foreground)] flex-1 mb-6 leading-relaxed">
        "{testimonial.quote}"
      </blockquote>

      {/* Rating if provided */}
      {testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating!
                  ? 'text-accent-orange fill-accent-orange'
                  : 'text-[var(--border)]'
              }`}
            />
          ))}
        </div>
      )}

      {/* Author info */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 font-medium">
          {testimonial.author
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{testimonial.author}</p>
          <p className="text-sm text-[var(--muted)] truncate">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>

        <Badge variant="secondary" className="text-xs whitespace-nowrap">
          {testimonial.relationship}
        </Badge>
      </div>
    </Card>
  )
}

// Sample testimonials data
export const sampleTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: "Kumlesh demonstrated exceptional problem-solving skills during our ML training program. His ability to break down complex problems into manageable components is impressive.",
    author: "Training Mentor",
    role: "Senior Data Scientist",
    company: "Analytics & ML Training Program",
    relationship: "Mentor",
    rating: 5,
  },
  {
    id: '2',
    quote: "A dedicated learner who consistently delivers quality work. His churn prediction project showed real understanding of both the technical and business aspects of ML.",
    author: "Project Supervisor",
    role: "ML Team Lead",
    company: "AI Solutions Lab",
    relationship: "Supervisor",
    rating: 5,
  },
  {
    id: '3',
    quote: "Great attention to detail in data preprocessing and feature engineering. Always eager to learn and improve. Would recommend for any ML/data science role.",
    author: "Prof. Data Science",
    role: "Associate Professor",
    company: "NIST",
    relationship: "Professor",
    rating: 4,
  },
]
