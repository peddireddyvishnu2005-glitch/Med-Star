# Accessibility Specification (WCAG 2.2 AA) — MedStart

## 1. Compliance Checklist
- **Color Contrast**: Enforce minimum contrast ratio of 4.5:1 for normal text and 3:1 for large headings/UI components.
- **Keyboard Navigation**: Full focus ring visible (`focus-visible:ring-2 focus-visible:ring-sky-500`) on all interactive buttons, cards, inputs, and links.
- **ARIA Semantics**: Use semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<aside>`, `<footer>`) with explicit `aria-label`, `aria-expanded`, and `aria-live` for screen reader announcements during navigation guidance.
- **Reduced Motion**: Respect `prefers-reduced-motion` media queries for animations.
