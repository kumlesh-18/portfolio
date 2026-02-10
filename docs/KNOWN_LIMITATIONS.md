# Known Limitations

> Honest documentation of current constraints and trade-offs.

---

## Technical Limitations

### 1. No Real-Time Features

**What**: No live updates, real-time comments, or dynamic content
**Why**: Static site architecture, no backend
**Workaround**: None needed — portfolio doesn't require real-time
**Will Address**: Not planned

### 2. No Server-Side Search

**What**: Search (if implemented) is client-side only
**Why**: No server, static hosting
**Workaround**: Client-side fuzzy search with pre-built index
**Will Address**: v1.1 if search is added

### 3. Build Required for Content Updates

**What**: Content changes require rebuild and deploy
**Why**: Static site generation model
**Workaround**: CI/CD makes this ~2 minutes
**Will Address**: Not an issue with proper automation

---

## Content Limitations

### 1. Limited Case Studies Initially

**What**: Launching with 3-4 case studies
**Why**: Quality over quantity, thorough documentation takes time
**Workaround**: Adding more post-launch
**Will Address**: v1.1+

### 2. No Client Project Details

**What**: Some professional work cannot be detailed
**Why**: NDA, confidentiality agreements
**Workaround**: Discuss patterns and learnings without specifics
**Will Address**: Not possible for protected work

---

## Design Limitations

### 1. Limited Animation

**What**: Minimal motion design
**Why**: Performance priority, accessibility, reduced motion support
**Workaround**: Subtle, purposeful animations only
**Will Address**: May enhance in v2.0

### 2. No Custom Illustrations

**What**: Using diagrams and code, not custom art
**Why**: Not an illustrator, authenticity over polish
**Workaround**: High-quality diagrams and screenshots
**Will Address**: May commission illustrations later

---

## Browser Support

### Fully Supported

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Degraded Experience

- Internet Explorer (not supported)
- Safari < 14 (CSS features may not work)
- No-JS browsers (content readable, no interactivity)

---

## Accessibility Gaps

### Known Issues

- [ ] Complex diagrams need better alt text
- [ ] Some code blocks may be hard to navigate with screen reader
- [ ] PDF downloads not fully accessible

### Committed to Fixing

All accessibility issues are treated as bugs, not features.

---

## Performance Trade-offs

### Accepted Trade-offs

| Feature             | Cost     | Benefit                        |
| ------------------- | -------- | ------------------------------ |
| Syntax highlighting | +20KB JS | Essential for code readability |
| Theme toggle        | +5KB JS  | User preference matters        |
| Analytics           | +1KB JS  | Understanding audience         |

### Rejected for Performance

- Heavy animation libraries
- Video backgrounds
- Web fonts (using system fonts)
- Third-party embeds on initial load

---

_This document will be updated as limitations are discovered or resolved._

_Last Updated: 2026-02-10_
