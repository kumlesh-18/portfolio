import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

/**
 * Dynamic OG Image Generator
 * 
 * Generates custom Open Graph images for social sharing
 * Usage: /api/og?title=Page Title&subtitle=Optional subtitle
 */

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const title = searchParams.get('title') || 'Kumlesh Kumar'
  const subtitle = searchParams.get('subtitle') || 'Junior Machine Learning Engineer'
  const type = searchParams.get('type') || 'default' // default, article, project

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)',
          padding: '60px',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo/Initials */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            KK
          </div>
          <span style={{ color: '#888', fontSize: '24px' }}>kumleshkumar.dev</span>
        </div>

        {/* Type badge */}
        {type !== 'default' && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '60px',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: type === 'article' ? '#3b82f6' : '#8b5cf6',
              color: 'white',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {type}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? '52px' : '64px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: '#888',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Gradient accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '6px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
