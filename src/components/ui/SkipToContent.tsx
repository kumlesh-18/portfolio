'use client'

/**
 * Skip to Content Link
 * 
 * Accessibility feature that allows keyboard users to skip navigation
 * and jump directly to the main content.
 * 
 * Visible only on focus (keyboard navigation)
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      onClick={(e) => {
        e.preventDefault()
        const main = document.getElementById('main-content')
        if (main) {
          main.focus()
          main.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      Skip to main content
    </a>
  )
}
