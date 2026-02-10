'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Systems', href: '/systems' },
  { label: 'Experiments', href: '/experiments' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Now', href: '/now' },
  { label: 'Contact', href: '/contact' },
]

// Resume PDF path (in public folder)
export const RESUME_PDF_PATH = '/Kumlesh-Kumar-CV.pdf'

interface NavigationProps {
  mobile?: boolean
  onItemClick?: () => void
}

export function Navigation({ mobile = false, onItemClick }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation">
      <ul className={cn(
        "flex gap-1",
        mobile ? "flex-col" : "flex-row items-center"
      )}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href))
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-block",
                  "hover:bg-[var(--card-hover)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                  isActive 
                    ? "text-primary-500 bg-primary-500/10" 
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
