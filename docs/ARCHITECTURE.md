# Portfolio Architecture

> This document describes the technical architecture of the portfolio site.

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN / Edge                           │
├─────────────────────────────────────────────────────────────┤
│                    Static Site (SSG)                        │
├──────────────┬──────────────┬──────────────┬───────────────┤
│    Pages     │   Content    │  Components  │    Assets     │
│  (Routes)    │    (MDX)     │    (React)   │  (Optimized)  │
└──────────────┴──────────────┴──────────────┴───────────────┘
```

## Design Principles

### 1. Static First

- All pages pre-rendered at build time
- Zero server-side runtime required
- Content changes trigger rebuilds

### 2. Progressive Enhancement

- Core content works without JavaScript
- JavaScript enhances interactivity
- Graceful degradation for older browsers

### 3. Performance Budget

| Metric              | Budget  |
| ------------------- | ------- |
| Initial JS          | < 50KB  |
| Total Page Weight   | < 500KB |
| Time to Interactive | < 3s    |

### 4. Content as Code

- All content in version control
- MDX for rich content
- Type-safe frontmatter

## Component Architecture

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── Layout.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Link.tsx
│   └── ThemeToggle.tsx
├── content/
│   ├── CaseStudy.tsx
│   ├── SystemArticle.tsx
│   ├── Experiment.tsx
│   └── BlogPost.tsx
└── pages/
    ├── Home/
    ├── Work/
    ├── Systems/
    └── ...
```

## Content Model

### Case Study

```typescript
interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  featured: boolean;

  // Sections
  problemContext: string;
  constraints: Constraint[];
  architectureDecisions: Decision[];
  tradeoffs: Tradeoff[];
  failures: Failure[];
  results: Result[];
}
```

### System Article

```typescript
interface SystemArticle {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: "api" | "failure" | "scale" | "code" | "security" | "data";

  // Content
  philosophy: string;
  principles: Principle[];
  antiPatterns: string[];
}
```

## Styling Strategy

- **Approach**: Utility-first (Tailwind CSS)
- **Design Tokens**: CSS custom properties for theming
- **Dark Mode**: Class-based with system preference detection
- **Typography**: System font stack with custom headings

## Performance Strategy

### Images

- Next-gen formats (WebP, AVIF)
- Responsive srcsets
- Lazy loading below fold
- Blur placeholders

### JavaScript

- Route-based code splitting
- Dynamic imports for heavy components
- No unnecessary client-side hydration

### CSS

- Critical CSS inlined
- Unused styles purged
- Minimal specificity

## SEO Strategy

- Static meta tags per page
- JSON-LD structured data
- Automatic sitemap generation
- Semantic HTML structure

## Deployment Pipeline

```
Push to main
     │
     ▼
┌─────────────┐
│   Lint      │
│   Type Check│
│   Test      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Build     │
│   (SSG)     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Deploy to  │
│    Edge     │
└─────────────┘
```

## Monitoring

- **Analytics**: Privacy-respecting (Plausible/Umami)
- **Performance**: Core Web Vitals tracking
- **Errors**: Client-side error boundary with reporting

## Security

- Content Security Policy headers
- No inline scripts (except critical CSS)
- Subresource Integrity for external resources
- Regular dependency updates

---

_Last Updated: 2026-02-10_
