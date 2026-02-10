# Architecture Decision Records

This document logs significant technical decisions for the portfolio project.

---

## ADR-001: Use Static Site Generation

**Date**: 2026-02-10  
**Status**: Accepted

### Context

The portfolio needs to be fast, reliable, and cheap to host. Content updates are infrequent (weekly at most).

### Decision

Use static site generation (SSG) instead of server-side rendering or client-side rendering.

### Consequences

**Positive:**

- Excellent performance (pre-built HTML)
- Free/cheap hosting on edge CDNs
- No server to maintain
- Great SEO out of the box

**Negative:**

- Content changes require rebuild
- No dynamic personalization
- Preview needs separate solution

### Alternatives Considered

- **SSR (Server-Side Rendering)**: Rejected — unnecessary complexity, ongoing server costs
- **SPA (Client-Side Rendering)**: Rejected — poor initial load, SEO challenges

---

## ADR-002: Content in MDX Format

**Date**: 2026-02-10  
**Status**: Accepted

### Context

Need a content format that supports rich text, code blocks, and custom components while remaining version-controllable.

### Decision

Use MDX (Markdown + JSX) for all content pages.

### Consequences

**Positive:**

- Familiar Markdown syntax
- Embed React components
- Type-safe with proper tooling
- Version controlled
- Easy migration

**Negative:**

- Build-time processing required
- Learning curve for non-developers
- Component coupling

### Alternatives Considered

- **Plain Markdown**: Rejected — no component embedding
- **CMS (Contentful, Sanity)**: Rejected — adds complexity, cost, and external dependency
- **Notion API**: Rejected — rate limits, format limitations

---

## ADR-003: Utility-First CSS with Tailwind

**Date**: 2026-02-10  
**Status**: Accepted

### Context

Need a styling approach that is fast to develop, produces minimal CSS, and maintains consistency.

### Decision

Use Tailwind CSS with design tokens defined as CSS custom properties.

### Consequences

**Positive:**

- Rapid development
- Automatic purging of unused styles
- Consistent spacing/sizing
- Great dark mode support

**Negative:**

- HTML can become verbose
- Learning curve
- Opinionated defaults

### Alternatives Considered

- **CSS Modules**: Considered — simpler but slower development
- **Styled Components**: Rejected — runtime overhead, SSG complexity
- **Plain CSS**: Rejected — maintenance burden at scale

---

## ADR-004: Theme System Design

**Date**: 2026-02-10  
**Status**: Accepted

### Context

Users expect dark/light mode. Need to support system preference detection and manual override with persistence.

### Decision

Implement class-based theming with:

1. System preference detection on load
2. Manual toggle with localStorage persistence
3. CSS custom properties for colors
4. No flash of wrong theme (FOWT)

### Consequences

**Positive:**

- Respects user preferences
- Instant toggle (no reload)
- No FOWT with proper implementation
- Simple CSS variable swapping

**Negative:**

- Requires inline script in <head>
- localStorage dependency

### Alternatives Considered

- **Media query only**: Rejected — no manual override
- **Cookie-based**: Rejected — unnecessary server involvement

---

## Template for Future Decisions

```markdown
## ADR-XXX: [Title]

**Date**: YYYY-MM-DD  
**Status**: Proposed | Accepted | Deprecated | Superseded

### Context

[What situation led to this decision?]

### Decision

[What was decided?]

### Consequences

**Positive:**

- [Benefit 1]
- [Benefit 2]

**Negative:**

- [Drawback 1]
- [Drawback 2]

### Alternatives Considered

- **[Alternative]**: [Why rejected]
```

---

_Add new decisions above the template._
