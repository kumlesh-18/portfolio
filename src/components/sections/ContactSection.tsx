'use client'

import { useState, FormEvent } from 'react'
import { Send, Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react'
import { resumeData } from '@/data/resume'
import { Card, Button } from '@/components/ui'
import { isValidEmail } from '@/lib/utils'

/**
 * Contact Section
 * 
 * SOURCE: resume.ts personal data
 * - Email: kumleshkumarofficial@gmail.com
 * - Phone: +91 9861838389
 * - LinkedIn: linkedin.com/in/kumlesh-kumar-9a0315338
 * - GitHub: github.com/kumlesh-18
 * - Location: Berhampur, Ganjam, India
 */

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactSection() {
  const { personal } = resumeData
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Create mailto link as fallback (no backend)
    const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`
    
    // Simulate brief delay then open email client
    await new Promise(resolve => setTimeout(resolve, 500))
    window.location.href = mailtoLink
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const contactMethods = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: personal.linkedin },
    { icon: Github, label: 'GitHub', value: 'View on GitHub', href: personal.github },
    { icon: MapPin, label: 'Location', value: personal.location, href: null },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Interested in working together? I'm open to ML/Data Science opportunities, 
            internships, and open source collaboration.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-accent-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-[var(--muted)] mb-4">
                  Your email client should have opened. If not, you can reach me directly at:
                </p>
                <a 
                  href={`mailto:${personal.email}`}
                  className="text-primary-500 hover:underline"
                >
                  {personal.email}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.name ? 'border-accent-red' : 'border-[var(--border)]'
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-accent-red mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.email ? 'border-accent-red' : 'border-[var(--border)]'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-accent-red mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${
                      errors.subject ? 'border-accent-red' : 'border-[var(--border)]'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-sm text-accent-red mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg border bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none ${
                      errors.message ? 'border-accent-red' : 'border-[var(--border)]'
                    }`}
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-sm text-accent-red mt-1">{errors.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Other Ways to Reach Me</h3>
            
            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon
                const content = (
                  <Card 
                    variant={method.href ? 'interactive' : 'default'}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--muted)]">{method.label}</p>
                      <p className="font-medium">{method.value}</p>
                    </div>
                  </Card>
                )

                if (method.href) {
                  return (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  )
                }

                return <div key={method.label}>{content}</div>
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
