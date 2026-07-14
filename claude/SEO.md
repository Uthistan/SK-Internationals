# SEO.md — Search Engine Optimization Strategy

How this site earns and keeps organic visibility. Implementation uses the Next.js App Router Metadata API exclusively — no third-party SEO package is needed for this scope (see [Dependency Justification](TECH_ARCHITECTURE.md#dependency-justification)).

---

## Table of Contents

1. [Metadata](#metadata)
2. [Open Graph](#open-graph)
3. [Structured Data](#structured-data)
4. [Robots](#robots)
5. [Sitemap](#sitemap)
6. [Keyword Strategy](#keyword-strategy)
7. [Technical SEO](#technical-seo)
8. [Performance SEO](#performance-seo)
9. [Checklist](#checklist)
10. [Related Documentation](#related-documentation)

---

## Metadata

Defined via the Next.js Metadata API (`export const metadata` in `app/layout.tsx`, overridden per-route where needed).

| Field | Rule |
|---|---|
| `title` | Template pattern: `%s — SK Internationals`; homepage uses the full brand + value prop |
| `description` | 150–160 characters, states service + differentiator, no keyword stuffing |
| `keywords` | Not relied upon (ignored by major engines) — omit or keep minimal |
| `canonical` | Set explicitly per route to prevent duplicate-content issues |
| `viewport` / `themeColor` | Set once in root layout |

```tsx
export const metadata: Metadata = {
  title: {
    default: "SK Internationals — Global B2B Freight & Logistics",
    template: "%s — SK Internationals",
  },
  description: "SK Internationals delivers reliable, transparent freight forwarding and logistics for businesses moving cargo across global trade lanes.",
};
```

---

## Open Graph

Every page defines OG tags via the same Metadata API — required for credible link previews when shared in B2B contexts (LinkedIn, email).

| Field | Rule |
|---|---|
| `og:title` / `og:description` | Mirrors page metadata, not duplicated content |
| `og:image` | Custom 1200×630 branded image per major section/page, not a generic logo crop |
| `og:type` | `website` |
| `twitter:card` | `summary_large_image` |

---

## Structured Data

Implement via JSON-LD, injected through a `<script type="application/ld+json">` in the root layout.

| Schema | Use |
|---|---|
| `Organization` | Company name, logo, contact point, social profiles |
| `LocalBusiness` or `Organization` + `address` | If a physical HQ/office is confirmed (see [BUSINESS_CONTEXT.md](BUSINESS_CONTEXT.md)) |
| `BreadcrumbList` | Only if/when multi-page structure expands (see [Future Scope](PROJECT.md#future-scope)) |
| `FAQPage` | Only if a real FAQ section ships — never fabricated for SEO padding |

---

## Robots

`app/robots.ts` (Next.js file convention) generates `robots.txt` at build time:

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://[production-domain]/sitemap.xml",
  };
}
```

No routes are disallowed in this phase — the entire site is meant to be indexed. Revisit if a client portal or staging environment is introduced.

---

## Sitemap

`app/sitemap.ts` (Next.js file convention) generates `sitemap.xml` at build time, listing every public route with `lastModified`, `changeFrequency`, and `priority`.

| Route | Priority |
|---|---|
| `/` | 1.0 |
| `/privacy`, `/terms` | 0.3 |

Expand this table as routes are added — never let the sitemap silently drift out of sync with actual routes.

---

## Keyword Strategy

`DRAFT — validate against real search volume and confirmed trade lanes`

| Intent | Example targets |
|---|---|
| Category | "B2B freight forwarding," "logistics partner for [industry]" |
| Service-specific | "customs clearance services," "ocean freight forwarding" |
| Trade-lane specific (once confirmed) | "[origin] to [destination] freight forwarding" |
| Trust/comparison | "reliable freight forwarder for [industry]" |

Section headlines and body copy should naturally incorporate these without violating [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md#writing-style) — never keyword-stuff at the cost of readability.

---

## Technical SEO

- Semantic HTML and correct heading hierarchy (one `h1` per page) — see [ACCESSIBILITY.md](ACCESSIBILITY.md#semantic-html).
- Every route has a unique, accurate `<title>` and `description`.
- Internal links use descriptive anchor text, not "click here."
- All images have meaningful `alt` text (also an accessibility requirement).
- No orphaned pages — every route reachable via the nav or footer.

---

## Performance SEO

Core Web Vitals are a ranking factor — [PERFORMANCE.md](PERFORMANCE.md) budgets are also SEO requirements, not just a UX nicety:

| Vital | Target |
|---|---|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |

Motion must not introduce layout shift — see [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md#performance-rules).

---

## Checklist

- [ ] Unique title + description per route
- [ ] Canonical URL set
- [ ] Open Graph + Twitter card image present and branded
- [ ] `Organization` JSON-LD present
- [ ] `robots.ts` and `sitemap.ts` reflect actual routes
- [ ] One `h1` per page, logical heading order
- [ ] All images have accurate `alt` text
- [ ] Core Web Vitals within [PERFORMANCE.md](PERFORMANCE.md) budgets

### Anti-patterns

| Anti-pattern | Why it's rejected |
|---|---|
| Keyword-stuffed headlines | Hurts readability and modern ranking algorithms alike |
| Generic `og:image` (just the logo on white) | Weak click-through on shared links |
| Fabricated FAQ schema with no real FAQ content | Structured-data spam risk, can trigger manual action |
| Duplicate `description` across routes | Confuses search engines about page uniqueness |

---

## Related Documentation

- [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) — headline/copy rules that keyword strategy must respect
- [PERFORMANCE.md](PERFORMANCE.md) — Core Web Vitals budgets
- [ACCESSIBILITY.md](ACCESSIBILITY.md) — semantic HTML requirements shared with technical SEO
- [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md) — rendering strategy this SEO approach depends on
