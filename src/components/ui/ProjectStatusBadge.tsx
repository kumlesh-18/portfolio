import { Badge } from '@/components/ui'
import { CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Project Status Badge
 * 
 * Shows live status of deployed projects
 * Can integrate with GitHub Actions or other CI/CD status
 */

type ProjectStatus = 'live' | 'in-development' | 'archived' | 'maintenance'

interface ProjectStatusBadgeProps {
  status: ProjectStatus
  url?: string
  className?: string
  showLink?: boolean
}

const statusConfig: Record<ProjectStatus, {
  label: string
  icon: typeof CheckCircle
  variant: 'success' | 'error' | 'warning' | 'default'
  color: string
}> = {
  live: {
    label: 'Live',
    icon: CheckCircle,
    variant: 'success',
    color: 'text-accent-green',
  },
  'in-development': {
    label: 'In Development',
    icon: Clock,
    variant: 'warning',
    color: 'text-accent-orange',
  },
  archived: {
    label: 'Archived',
    icon: XCircle,
    variant: 'default',
    color: 'text-[var(--muted)]',
  },
  maintenance: {
    label: 'Maintenance',
    icon: Clock,
    variant: 'warning',
    color: 'text-accent-orange',
  },
}

export function ProjectStatusBadge({
  status,
  url,
  className,
  showLink = true,
}: ProjectStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  const content = (
    <Badge
      variant={config.variant}
      className={cn(
        'inline-flex items-center gap-1.5',
        url && showLink && 'cursor-pointer hover:opacity-80',
        className
      )}
    >
      {status === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
        </span>
      )}
      {status !== 'live' && <Icon className={cn('w-3 h-3', config.color)} />}
      {config.label}
      {url && showLink && <ExternalLink className="w-3 h-3 ml-1" />}
    </Badge>
  )

  if (url && showLink) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {content}
      </a>
    )
  }

  return content
}

/**
 * GitHub Actions Status Badge
 * 
 * Shows build/deploy status from GitHub Actions
 */
interface GitHubStatusBadgeProps {
  owner: string
  repo: string
  workflow?: string
  branch?: string
  className?: string
}

export function GitHubStatusBadge({
  owner,
  repo,
  workflow = 'ci.yml',
  branch = 'master',
  className,
}: GitHubStatusBadgeProps) {
  const badgeUrl = `https://github.com/${owner}/${repo}/actions/workflows/${workflow}/badge.svg?branch=${branch}`
  const actionsUrl = `https://github.com/${owner}/${repo}/actions`

  return (
    <a
      href={actionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-block', className)}
    >
      <img
        src={badgeUrl}
        alt="CI Status"
        className="h-5"
      />
    </a>
  )
}
