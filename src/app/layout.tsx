import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChatWidget } from '@/components/chat'
import { resumeData } from '@/data/resume'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://kumleshkumar.dev'),
  title: {
    default: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    template: `%s | ${resumeData.personal.name}`,
  },
  description: resumeData.personal.positioning,
  keywords: [
    'Machine Learning',
    'Data Science',
    'Python',
    'ML Engineer',
    'Kumlesh Kumar',
    'Portfolio',
    'Deep Learning',
    'Scikit-learn',
    'TensorFlow',
    'PyTorch',
  ],
  authors: [{ name: resumeData.personal.name }],
  creator: resumeData.personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kumleshkumar.dev',
    siteName: `${resumeData.personal.name} Portfolio`,
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.personal.positioning,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${resumeData.personal.name} | ${resumeData.personal.title}`,
    description: resumeData.personal.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          {/* Skip link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          
          <Header />
          
          <main id="main-content" className="flex-1">
            {children}
          </main>
          
          <Footer />
          
          {/* AI Chat Widget */}
          <ChatWidget />
          
          {/* Vercel Analytics */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
