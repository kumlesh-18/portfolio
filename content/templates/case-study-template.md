# Case Study Template

> Copy this template for each new case study. Fill in all sections — the failure section is mandatory.

---

# [Project Name]

**Timeline**: [Start Date] — [End Date]  
**Role**: [Your specific role]  
**Team Size**: [Number of people]  
**Status**: Production / Archived / Ongoing

---

## 1. Problem Context

### Business Pain

[What business problem existed? What was the cost of not solving it?]

### Technical Constraints

[What limitations did you face? Legacy systems, budget, timeline, team skills?]

### Why This Mattered

[What were the stakes? What would happen if this failed?]

---

## 2. System Constraints

| Dimension     | Reality                            |
| ------------- | ---------------------------------- |
| **Scale**     | [Users, requests/sec, data volume] |
| **Budget**    | [Money, time, resources available] |
| **Timeline**  | [How long you had]                 |
| **Team**      | [Size, experience levels]          |
| **Tech Debt** | [Existing constraints]             |

---

## 3. Architecture Decisions

### What I Chose

[Describe the architecture. Include a diagram.]

```
┌─────────────┐     ┌─────────────┐
│  Component  │────▶│  Component  │
└─────────────┘     └─────────────┘
        │
        ▼
┌─────────────┐
│  Component  │
└─────────────┘
```

### Key Technical Choices

| Choice | Technology/Approach | Rationale |
| ------ | ------------------- | --------- |
| [Area] | [What you chose]    | [Why]     |
| [Area] | [What you chose]    | [Why]     |
| [Area] | [What you chose]    | [Why]     |

### What I Rejected

| Alternative | Why Rejected |
| ----------- | ------------ |
| [Option]    | [Reason]     |
| [Option]    | [Reason]     |

---

## 4. Trade-offs Made

| Decision     | What We Gained | What We Sacrificed | Why Acceptable  |
| ------------ | -------------- | ------------------ | --------------- |
| [Decision 1] | [Benefit]      | [Cost]             | [Justification] |
| [Decision 2] | [Benefit]      | [Cost]             | [Justification] |
| [Decision 3] | [Benefit]      | [Cost]             | [Justification] |

---

## 5. Failure & Iteration

> **This section is mandatory.** Projects without failures aren't learning opportunities.

### What Broke

[Be honest. What failed? When? How did you discover it?]

### The Impact

[What was the damage? Users affected? Time lost? Money spent?]

### Root Cause

[What actually caused the failure? Go deeper than the surface.]

### How We Fixed It

[What did you do to resolve the immediate issue?]

### What I Learned

[What specific lessons did you extract?]

### What I'd Do Differently

[If you started over with current knowledge, what would change?]

---

## 6. Results

### Metrics

| Metric     | Before  | After   | Change          |
| ---------- | ------- | ------- | --------------- |
| [Metric 1] | [Value] | [Value] | [% or absolute] |
| [Metric 2] | [Value] | [Value] | [% or absolute] |
| [Metric 3] | [Value] | [Value] | [% or absolute] |

### Business Impact

[How did this affect the business? Revenue, users, efficiency?]

### Technical Impact

[How did this affect the system? Performance, maintainability?]

### Key Lesson

> [One sentence that captures the most important learning from this project.]

---

## Links

- **Live**: [URL if public]
- **Code**: [GitHub if open source]
- **Related Writing**: [Blog posts about this project]

---

## Tags

`[tag1]` `[tag2]` `[tag3]`

---

_Written: [Date]_  
_Last Updated: [Date]_
