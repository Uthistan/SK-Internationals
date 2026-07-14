# PERFORMANCE.md — Performance Standards

Performance is a feature of a premium brand experience — a slow site contradicts the "operationally excellent" positioning defined in [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md). These budgets are enforced, not aspirational.

---

## Table of Contents

1. [Bundle Budget](#bundle-budget)
2. [Image Optimization](#image-optimization)
3. [Font Strategy](#font-strategy)
4. [Lazy Loading](#lazy-loading)
5. [Animation Budget](#animation-budget)
6. [Caching](#caching)
7. [Lighthouse Targets](#lighthouse-targets)
8. [Performance Checklist](#performance-checklist)
9. [Related Documentation](#related-documentation)

---

## Bundle Budget

| Bundle | Budget (gzipped) |
|---|---|
| First Load JS (per route) | ≤ 170KB |
| Total CSS | ≤ 50KB |
| Any single dynamic chunk | ≤ 60KB |

Rules:
- GSAP and Framer Motion are heavy — import only the plugins/features used (`gsap/ScrollTrigger`, not the full GSAP bonus bundle).
- Run `next build` bundle analysis before merging any change that adds a dependency (see [Dependency Justification](TECH_ARCHITECTURE.md#dependency-justification)).
- No dependency is added without checking its bundle cost against this budget first.

---

## Image Optimization

- All images served through `next/image` — no raw `<img>` tags.
- Source format: AVIF/WebP with fallback handled automatically by `next/image`.
- Explicit `width`/`height` (or `fill` with a sized container) on every image to prevent layout shift (see [SEO.md](SEO.md#performance-seo) on CLS).
- Hero/above-the-fold images use `priority`; everything else lazy-loads by default.
- No image asset ships larger than necessary for its largest rendered size — no full-resolution source images for a 400px card.

---

## Font Strategy

- Manrope and Inter loaded via `next/font/google` — self-hosted at build time, not a runtime Google Fonts request (see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#typography)).
- `display: swap` to avoid invisible text during load.
- Only the weights actually used in the type scale are loaded — not the full family.
- No layout shift from font swap: size-adjust/fallback metrics handled by `next/font`'s automatic fallback matching.

---

## Lazy Loading

| Content | Strategy |
|---|---|
| Below-the-fold sections | Standard React lazy boundaries where a section is heavy (e.g., a section with a large GSAP timeline) |
| Images | Native lazy loading via `next/image` (default, except `priority` hero images) |
| Non-critical third-party scripts | Loaded via `next/script` with `strategy="lazyOnload"` or `worker` |

Never lazy-load content that's needed for the initial "who/what/why" understanding defined in [CLAUDE.md](../CLAUDE.md#mission) — lazy loading must not delay comprehension of the hero.

---

## Animation Budget

Ties directly to [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md#performance-rules):

| Rule | Limit |
|---|---|
| Concurrent animated elements in viewport | ≤ 6 |
| Parallax layers per section | 1 |
| GSAP ScrollTriggers active at once | Only those tied to sections in or near the viewport — kill/disable offscreen ones if profiling shows cost |
| Animated properties | `transform` and `opacity` only |

Any animation that measurably regresses INP or causes jank on a throttled 4x CPU test must be simplified before merge.

---

## Caching

- Static assets (fonts, images, JS/CSS chunks) served with long-lived immutable cache headers — handled automatically by Vercel's static asset pipeline for Next.js builds.
- HTML for static routes is generated at build time and served from Vercel's edge cache.
- No client-side data-fetching cache layer needed in this phase (no dynamic data) — revisit if [CMS integration](PROJECT.md#future-scope) is added.

---

## Lighthouse Targets

| Category | Target |
|---|---|
| Performance | ≥ 95 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

| Core Web Vital | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

Measured on throttled mobile (Lighthouse's default mobile profile), not just desktop — a desktop-only pass is not a valid performance check.

---

## Performance Checklist

- [ ] `next/image` used for all images, with explicit dimensions
- [ ] Fonts loaded via `next/font`, only required weights
- [ ] No dependency added without a bundle-size check
- [ ] Animations stay within the [Animation Budget](#animation-budget)
- [ ] Lighthouse run on mobile throttling, all four categories ≥ 95
- [ ] No layout shift introduced by lazy-loaded or animated content
- [ ] `next build` output reviewed for unexpectedly large chunks

### Anti-patterns

| Anti-pattern | Why it's rejected |
|---|---|
| Importing all of GSAP's bonus plugins for one effect | Bloats bundle for unused code |
| Raw `<img>` tags | Loses automatic optimization, format negotiation, lazy loading |
| Google Fonts loaded via `<link>` at runtime | Extra render-blocking request `next/font` avoids entirely |
| Animating a dozen elements simultaneously on scroll | Jank, missed animation budget |
| Shipping full-resolution source photography | Unnecessary payload, slower LCP |

---

## Related Documentation

- [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md) — animation performance rules referenced above
- [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md) — rendering strategy this budget assumes
- [SEO.md](SEO.md) — Core Web Vitals as a ranking factor
- [ACCESSIBILITY.md](ACCESSIBILITY.md) — Lighthouse accessibility target shared with this file
