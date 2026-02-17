'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

/**
 * Web Vitals Monitoring
 * 
 * Tracks Core Web Vitals for performance monitoring
 * Reports to console in dev, can be sent to analytics in production
 */

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vital] ${metric.name}:`, metric.value.toFixed(2))
    }

    // In production, send to analytics
    // Example: Send to Google Analytics
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // })

    // Or send to custom analytics endpoint
    // fetch('/api/vitals', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     id: metric.id,
    //   }),
    // })
  })

  return null
}

/**
 * Performance metrics explanation:
 * 
 * LCP (Largest Contentful Paint) - Loading performance
 *   Good: < 2.5s | Needs Improvement: 2.5-4s | Poor: > 4s
 * 
 * FID (First Input Delay) - Interactivity
 *   Good: < 100ms | Needs Improvement: 100-300ms | Poor: > 300ms
 * 
 * CLS (Cumulative Layout Shift) - Visual stability
 *   Good: < 0.1 | Needs Improvement: 0.1-0.25 | Poor: > 0.25
 * 
 * FCP (First Contentful Paint) - First render
 *   Good: < 1.8s | Needs Improvement: 1.8-3s | Poor: > 3s
 * 
 * TTFB (Time to First Byte) - Server response
 *   Good: < 800ms | Needs Improvement: 800-1800ms | Poor: > 1800ms
 */
