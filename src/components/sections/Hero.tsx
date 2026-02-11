'use client'

import Link from 'next/link'
import { ArrowRight, Github, Linkedin, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { resumeData } from '@/data/resume'
import { Button, BGPattern } from '@/components/ui'

/**
 * Hero Section
 * 
 * SOURCE: resume.ts personal data
 * - Name: Kumlesh Kumar
 * - Title: Junior Machine Learning Engineer
 * - Positioning: ML Engineer building data products
 * 
 * Features:
 * - Entrance animations using Framer Motion
 * - Staggered reveal for visual hierarchy
 * - Background pattern and gradients
 */

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export function Hero() {
  const { personal } = resumeData

  return (
    <section className="relative py-20 lg:py-32">
      {/* Grid Background Pattern */}
      <BGPattern variant="grid" mask="fade-edges" size={32} fill="var(--border)" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-500/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-purple/5 rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div 
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] mb-6"
            variants={itemVariants}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
            </span>
            Available for ML/Data Science opportunities
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            variants={itemVariants}
          >
            <span className="block text-[var(--foreground)]">{personal.name}</span>
            <span className="block gradient-text mt-2">{personal.title}</span>
          </motion.h1>

          {/* Positioning statement */}
          <motion.p 
            className="text-xl lg:text-2xl text-[var(--muted)] max-w-2xl mb-8 leading-relaxed"
            variants={itemVariants}
          >
            {personal.positioning}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            variants={itemVariants}
          >
            <Link href="/work">
              <Button size="lg" className="group">
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/systems">
              <Button variant="secondary" size="lg">
                How I Think
              </Button>
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex items-center gap-4"
            variants={containerVariants}
          >
            <motion.a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-[var(--border)] hover:border-primary-500/50 hover:bg-[var(--card-hover)] transition-colors"
              aria-label="View GitHub profile"
              variants={socialVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-[var(--border)] hover:border-primary-500/50 hover:bg-[var(--card-hover)] transition-colors"
              aria-label="View LinkedIn profile"
              variants={socialVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={`mailto:${personal.email}`}
              className="p-3 rounded-lg border border-[var(--border)] hover:border-primary-500/50 hover:bg-[var(--card-hover)] transition-colors"
              aria-label="Send email"
              variants={socialVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-5 h-5" />
            </motion.a>
            <motion.span 
              className="text-sm text-[var(--muted)] ml-2"
              variants={itemVariants}
            >
              {personal.location}
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
