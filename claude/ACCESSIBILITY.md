# ACCESSIBILITY.md — Accessibility Standards

WCAG AA is the enforced floor for this project, not an aspiration — see [Non-Negotiable Rules](../CLAUDE.md#non-negotiable-rules). This file is the technical implementation spec; [UX_GUIDELINES.md](UX_GUIDELINES.md#accessibility-rules) covers the flow-level rules that lead here.

---

## Table of Contents

1. [WCAG](#wcag)
2. [Keyboard Navigation](#keyboard-navigation)
3. [ARIA](#aria)
4. [Semantic HTML](#semantic-html)
5. [Focus Management](#focus-management)
6. [Contrast Rules](#contrast-rules)
7. [Screen Readers](#screen-readers)
8. [Accessibility Checklist](#accessibility-checklist)
9. [Related Documentation](#related-documentation)

---

## WCAG

Target: **WCAG 2.1 Level AA**, verified via automated tooling (axe, Lighthouse) plus manual keyboard/screen-reader passes — automated tools alone catch roughly a third of real issues.

| Principle | Applied here as |
|---|---|
| Perceivable | Contrast, alt text, captions if video is ever added |
| Operable | Full keyboard access, no seizure-inducing motion |
| Understandable | Clear labels, consistent navigation, plain-language errors |
| Robust | Semantic HTML parses correctly across assistive tech |

---

## Keyboard Navigation

- Every interactive element (links, buttons, form fields, custom components) is reachable and operable via keyboard alone.
- Tab order follows visual/DOM order — no `tabindex` values above `0`.
- A visible "Skip to content" link is the first focusable element on the page.
- Custom interactive components (mobile nav overlay, any dropdown) implement standard key behavior: `Escape` closes, arrow keys navigate where applicable.
- No keyboard trap — focus must always be able to move forward and backward, including out of any overlay.

---

## ARIA

- Use semantic HTML first; ARIA is a supplement for cases native HTML can't express, not a default.
- `aria-label` on icon-only buttons (e.g., mobile menu toggle, close buttons).
- `aria-expanded` on any disclosure trigger (mobile nav, accordions).
- `aria-live="polite"` region for form submission results (success/error) so screen reader users get the outcome without refocusing.
- Never add `role` or `aria-*` attributes that contradict the underlying element's native semantics.

---

## Semantic HTML

- One `<h1>` per page; heading levels never skip (no `h2` straight to `h4`) and are never chosen for visual size — see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#typography).
- Landmarks used correctly: `<header>`, `<nav>`, `<main>`, `<footer>`, one `<main>` per page.
- Buttons for actions (`<button>`), links for navigation (`<a href>`) — never a `<div onClick>` standing in for either.
- Form fields always paired with a real `<label>` (via `htmlFor`/`id`), never a placeholder acting as the only label — see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#forms).

---

## Focus Management

- Focus outline is always visible — never `outline: none` without a replacement focus style (see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#buttons) focus spec).
- On opening an overlay (mobile nav), focus moves into it; on close, focus returns to the trigger element.
- Route/section-level animated reveals must not steal or delay focus from a user actively tabbing through the page.

---

## Contrast Rules

| Content type | Minimum ratio |
|---|---|
| Normal text (< 18px) | 4.5:1 |
| Large text (≥ 18px bold or ≥ 24px) | 3:1 |
| UI components / icons carrying meaning | 3:1 |

Verified against [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#color-palette) token pairs:

| Pairing | Passes AA? |
|---|---|
| `text` (#111827) on `background` (#F8FAFC) | Yes |
| `text-secondary` (#6B7280) on `background` (#F8FAFC) | Yes (normal text) |
| White on `accent` (#F97316) | Verify at implementation — orange/white can sit near the AA boundary; use bold weight or increase size if it fails |
| `primary` (#0F172A) on `background` (#F8FAFC) | Yes |

Any new color pairing introduced must be checked against this table before shipping.

---

## Screen Readers

- Test critical flows (nav, quote form submission) with VoiceOver (macOS/iOS) and NVDA (Windows) at minimum before launch.
- Decorative images/icons get `alt=""` (or `aria-hidden="true"`); meaningful images get descriptive `alt` text — never "image of..." prefixes.
- Form validation errors are announced (via `aria-live` or `aria-describedby` linking the field to its error message), not only shown visually.
- Loading/submitting states are announced, not just visually indicated by a spinner.

---

## Accessibility Checklist

- [ ] Full keyboard pass: every action reachable, visible focus throughout
- [ ] Skip-to-content link present and functional
- [ ] One `h1`, no skipped heading levels
- [ ] All form fields have real, associated labels
- [ ] All images have correct `alt` (descriptive or empty, as appropriate)
- [ ] Color pairings checked against [Contrast Rules](#contrast-rules)
- [ ] `prefers-reduced-motion` respected — see [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md#performance-rules)
- [ ] Screen reader pass completed on the quote form flow
- [ ] Lighthouse Accessibility score ≥ 95 — see [PERFORMANCE.md](PERFORMANCE.md#lighthouse-targets)

### Anti-patterns

| Anti-pattern | Why it's rejected |
|---|---|
| `<div onClick>` instead of `<button>` | Not keyboard-operable, no semantic role |
| Placeholder text as the only label | Disappears on input, fails screen readers |
| `outline: none` with no replacement | Removes visible focus for keyboard users |
| Color as the only error indicator | Fails for colorblind users — pair with icon/text |
| Decorative icons without `aria-hidden` | Adds noise to screen reader output |

---

## Related Documentation

- [UX_GUIDELINES.md](UX_GUIDELINES.md) — flow-level accessibility rules
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — color and form specs referenced above
- [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md) — reduced-motion requirements
- [PERFORMANCE.md](PERFORMANCE.md) — shared Lighthouse scoring target
