'use client'

import { useState, FormEvent } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { isValidEmail } from '@/lib/utils'

/**
 * Newsletter Signup Component
 * 
 * Simple newsletter signup form
 * Currently uses mailto as fallback (can integrate with services like:
 * - Buttondown
 * - ConvertKit
 * - Mailchimp
 * - Resend Audiences)
 */

interface NewsletterFormProps {
  variant?: 'inline' | 'card'
  className?: string
}

export function NewsletterForm({ variant = 'inline', className }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email')
      return
    }

    setStatus('loading')
    setError('')

    // Simulate API call - replace with actual newsletter service
    // Example with Buttondown:
    // const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    //   method: 'POST',
    //   headers: { Authorization: `Token ${BUTTONDOWN_API_KEY}` },
    //   body: JSON.stringify({ email }),
    // })

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just show success
      // In production, replace with actual API integration
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (variant === 'card') {
    return (
      <div className={`p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg ${className}`}>
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm text-[var(--muted)] mb-4">
          Get notified when I publish new articles about ML and data science.
          No spam, unsubscribe anytime.
        </p>
        
        {status === 'success' ? (
          <div className="flex items-center gap-2 text-accent-green">
            <Check className="w-5 h-5" />
            <span>Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="your@email.com"
                className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={status === 'loading'}
              />
              {error && (
                <p className="text-sm text-accent-red mt-1">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    )
  }

  // Inline variant
  return (
    <div className={className}>
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-accent-green">
          <Check className="w-5 h-5" />
          <span>Thanks for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-[var(--card)] border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={status === 'loading'}
              aria-label="Email address"
            />
            {error && (
              <p className="text-sm text-accent-red mt-1">{error}</p>
            )}
          </div>
          <Button 
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
