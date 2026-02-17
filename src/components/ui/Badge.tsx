import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'secondary' | 'error'
  size?: 'sm' | 'md'
}

export function Badge({ 
  className, 
  variant = 'default', 
  size = 'sm',
  children, 
  ...props 
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        // Size variants
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-3 py-1': size === 'md',
        },
        // Color variants
        {
          'bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]': variant === 'default',
          'bg-primary-500/10 text-primary-500': variant === 'primary',
          'bg-accent-green/10 text-accent-green': variant === 'success',
          'bg-accent-yellow/10 text-accent-yellow': variant === 'warning',
          'bg-accent-red/10 text-accent-red': variant === 'danger' || variant === 'error',
          'border border-[var(--border)] text-[var(--muted)]': variant === 'outline',
          // Secondary: subtle/neutral badge
          'bg-[var(--card)] text-[var(--muted)]': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Skill level badge with specific styling
interface SkillBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  level: 'primary' | 'intermediate' | 'beginner'
}

export function SkillBadge({ level, children, className, ...props }: SkillBadgeProps) {
  const levelStyles = {
    primary: 'bg-primary-500/10 text-primary-500',
    intermediate: 'bg-accent-purple/10 text-accent-purple',
    beginner: 'bg-[var(--card)] text-[var(--muted)] border border-[var(--border)]',
  }

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5",
        levelStyles[level],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Status badge for projects
interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'completed' | 'in-progress' | 'planned'
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const statusConfig = {
    completed: { label: 'Completed', className: 'bg-accent-green/10 text-accent-green' },
    'in-progress': { label: 'In Progress', className: 'bg-accent-yellow/10 text-accent-yellow' },
    planned: { label: 'Planned', className: 'bg-[var(--card)] text-[var(--muted)]' },
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium rounded-full px-2.5 py-0.5",
        config.className,
        className
      )}
      {...props}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {config.label}
    </span>
  )
}
