import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Size variants
          {
            'text-sm px-3 py-1.5 rounded-md': size === 'sm',
            'text-sm px-4 py-2 rounded-lg': size === 'md',
            'text-base px-6 py-3 rounded-lg': size === 'lg',
          },
          // Color variants
          {
            'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700': variant === 'primary',
            'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card-hover)]': variant === 'secondary',
            'text-[var(--foreground)] hover:bg-[var(--card-hover)]': variant === 'ghost',
            'border border-primary-500 text-primary-500 hover:bg-primary-500/10': variant === 'outline',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
