# Portfolio

> A portfolio site designed to demonstrate how I think, design systems, make trade-offs, debug, and finish — not just list skills.

---

## Philosophy

This isn't a template. It's a system for showing engineering capability through evidence rather than claims.

**What makes this different:**

- Case studies with real failures, not just successes
- Systems documentation showing architectural thinking
- Experiments proving curiosity and learning
- Writing demonstrating clarity of thought
- The portfolio itself is a case study in building production software

---

## Structure

```
portfolio/
├── docs/                          # Meta documentation
│   ├── ARCHITECTURE.md           # Technical design
│   ├── DECISIONS.md              # ADR log
│   ├── ROADMAP.md               # Future plans
│   └── KNOWN_LIMITATIONS.md     # Honest constraints
├── content/
│   └── templates/                # Content templates
│       ├── case-study-template.md
│       ├── systems-article-template.md
│       ├── experiment-template.md
│       └── strategic-positioning-worksheet.md
├── src/                          # Source code (TBD)
├── public/                       # Static assets (TBD)
├── DEVELOPMENT_PLAN.md          # Master execution plan
└── README.md                     # You are here
```

---

## Getting Started

### 1. Strategic Positioning (Do This First)

Complete the positioning worksheet before writing any code:

```
content/templates/strategic-positioning-worksheet.md
```

This defines your identity, unfair advantage, and what problems your portfolio should attract.

### 2. Review the Development Plan

```
DEVELOPMENT_PLAN.md
```

12-week execution plan with detailed tasks for each phase.

### 3. Understand the Architecture

```
docs/ARCHITECTURE.md
```

Technical decisions and system design.

---

## Development

_Stack and setup instructions will be added once technology decisions are finalized._

---

## Content Workflow

### Adding a Case Study

1. Copy `content/templates/case-study-template.md`
2. Fill in ALL sections (failures are mandatory)
3. Create architecture diagrams
4. Add to case studies list

### Adding a Systems Article

1. Copy `content/templates/systems-article-template.md`
2. Document your philosophy and principles
3. Include real examples
4. Add to systems page

### Adding an Experiment

1. Copy `content/templates/experiment-template.md`
2. Document hypothesis, approach, and findings
3. Include code/demo links
4. Add to experiments page

---

## Quality Standards

### Performance

- Lighthouse 95+ all categories
- < 1.2s First Contentful Paint
- < 2.5s Largest Contentful Paint
- Zero Cumulative Layout Shift

### Accessibility

- WCAG 2.1 AA compliant
- Perfect keyboard navigation
- Screen reader tested
- Focus indicators visible

### Content

- No fake metrics
- No buzzwords
- Every project includes failure analysis
- All claims backed by evidence

---

## Documentation

| Document                                               | Purpose                |
| ------------------------------------------------------ | ---------------------- |
| [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md)             | Master execution plan  |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)           | Technical design       |
| [docs/DECISIONS.md](docs/DECISIONS.md)                 | Architecture decisions |
| [docs/ROADMAP.md](docs/ROADMAP.md)                     | Future plans           |
| [docs/KNOWN_LIMITATIONS.md](docs/KNOWN_LIMITATIONS.md) | Honest constraints     |

---

## License

_TBD_

---

## Contact

_TBD_

---

_This portfolio is itself a demonstration of how I approach building production software._
