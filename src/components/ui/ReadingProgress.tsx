'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Reading Progress Indicator
 * 
 * Shows a progress bar at the top of the page indicating
 * how far the user has scrolled through the content
 */

interface ReadingProgressProps {
  className?: string
  color?: string
}

export function ReadingProgress({ 
  className,
  color = 'var(--primary-500)'
}: ReadingProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling past 100px
      setIsVisible(globalThis.scrollY > 100)
    }

    globalThis.addEventListener('scroll', handleScroll, { passive: true })
    return () => globalThis.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 z-[100] origin-left',
        className
      )}
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${color}, var(--accent-purple))`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}
