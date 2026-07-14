# CODING_STANDARDS.md — Development Standards

Concrete engineering conventions for this repository. Where [CLAUDE.md](../CLAUDE.md) states the philosophy, this file states the rule.

---

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Naming Convention](#naming-convention)
3. [Component Rules](#component-rules)
4. [Hooks](#hooks)
5. [Utilities](#utilities)
6. [Imports](#imports)
7. [Code Style](#code-style)
8. [TypeScript Rules](#typescript-rules)
9. [Error Handling](#error-handling)
10. [File Naming](#file-naming)
11. [Git Commit Style](#git-commit-style)
12. [Review Checklist](#review-checklist)
13. [Related Documentation](#related-documentation)

---

## Folder Structure

```
sk-intl-landing/
├── app/                      # Next.js App Router — routes only
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── ui/                   # Primitive, design-system components (Button, Card, Input)
│   ├── sections/              # Page sections (Hero, Services, ProcessSection)
│   └── forms/                 # Form components (QuoteRequestForm)
├── hooks/                     # Custom hooks (useScrollTrigger, useReducedMotion)
├── lib/                       # Pure utilities, schemas, constants
│   ├── validations/            # Zod schemas
│   └── utils.ts
├── types/                     # Shared TypeScript types
├── content/                   # Structured copy/data (services list, industries list)
├── public/                    # Static assets
└── claude/                    # Documentation system (this folder)
```

Path alias `@/*` maps to project root (see `tsconfig.json`) — always import via `@/components/...`, never deep relative paths (`../../../`).

---

## Naming Convention

| Category | Convention | Example |
|---|---|---|
| Components | PascalCase | `ServiceCard.tsx` |
| Hooks | camelCase, `use` prefix | `useScrollProgress.ts` |
| Utilities | camelCase | `formatPhoneNumber.ts` |
| Types/Interfaces | PascalCase | `QuoteRequest`, `ServiceItem` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_QUOTE_ATTACHMENTS` |
| Zod schemas | camelCase, `Schema` suffix | `quoteRequestSchema` |

---

## Component Rules

1. One component per file; file name matches component name exactly.
2. Props always typed via an `interface` named `<Component>Props`.
3. Default to Server Components. Add `"use client"` only when the component needs interactivity, browser APIs, or a hook that requires it (state, effects, event handlers, Framer Motion, GSAP).
4. Keep client boundaries as small and low as possible — a whole section shouldn't be a Client Component just because one button inside it needs `onClick`.
5. No business logic inside JSX — extract to a function, hook, or utility.

```tsx
interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <div className="rounded-lg bg-surface p-6 shadow-sm">
      <Icon size={32} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

---

## Hooks

- Prefix with `use`, live in `hooks/` unless truly local to one component.
- Never call hooks conditionally or inside loops.
- GSAP-driven behavior is wrapped in a hook (or `useGSAP`) so cleanup is co-located with setup — see [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md#gsap-usage).
- A hook that only wraps a single `useState` with no added behavior is not a hook — inline it.

---

## Utilities

- Pure functions only in `lib/` — no side effects, no React imports.
- One clear responsibility per function; name describes the transformation (`formatPhoneNumber`, not `helper1`).
- Zod schemas live in `lib/validations/` and are the single source of truth for both runtime validation and inferred TypeScript types (`z.infer<typeof schema>`).

---

## Imports

Order, top to bottom, with a blank line between groups:

1. External packages (`react`, `next/*`, `gsap`, `framer-motion`)
2. Internal absolute imports (`@/components/...`, `@/lib/...`)
3. Relative imports (`./`, `../`)
4. Types (can be inlined with the above using `import type`)
5. Styles (if any component-level import)

```tsx
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { quoteRequestSchema } from "@/lib/validations/quote";

import type { ServiceItem } from "@/types";
```

---

## Code Style

- Enforced via `eslint-config-next` (`core-web-vitals` + `typescript`) — run `npm run lint` before considering work done.
- Prefer `const` over `let`; never `var`.
- No `console.log` left in committed code — use it for local debugging only.
- Arrow functions for callbacks and utilities; `function` declarations for components.
- No inline magic numbers for spacing/color/timing — pull from tokens defined in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) and [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md).

---

## TypeScript Rules

- `strict: true` is enforced in `tsconfig.json` — do not weaken it.
- No `any`. Use `unknown` and narrow, or model the real type.
- Prefer `interface` for object shapes/props, `type` for unions, intersections, and utility compositions.
- Derive types from Zod schemas wherever a schema already exists — don't hand-maintain a parallel interface.
- No non-null assertions (`!`) as a substitute for real narrowing, except where a library's own types force it (comment why).

---

## Error Handling

- Validate all form input with Zod at the boundary (React Hook Form's `zodResolver`) — never trust client input past that boundary.
- Wrap genuinely fallible async operations (form submission, external API calls) in try/catch; do not wrap synchronous, trusted internal logic defensively.
- User-facing errors are specific and actionable ("We couldn't send your request — check your connection and try again"), never a raw stack trace or generic "Something went wrong."
- Use an `error.tsx` boundary at the route level for unexpected render failures.

---

## File Naming

| File type | Convention | Example |
|---|---|---|
| App Router files | Next.js reserved names | `page.tsx`, `layout.tsx`, `error.tsx` |
| Components | PascalCase | `QuoteRequestForm.tsx` |
| Hooks | camelCase | `useReducedMotion.ts` |
| Utilities/lib | camelCase | `utils.ts`, `formatDate.ts` |
| Zod schemas | camelCase | `quoteRequestSchema.ts` |
| Types | camelCase file, PascalCase exports | `types/service.ts` → `ServiceItem` |

---

## Git Commit Style

Conventional Commits, imperative mood:

```
<type>(<scope>): <summary>

feat(hero): add staged GSAP reveal sequence
fix(quote-form): correct zod schema for phone validation
refactor(services): extract ServiceCard from ServicesSection
docs(claude): add motion timing tokens
```

| Type | Use |
|---|---|
| `feat` | New capability or section |
| `fix` | Bug fix |
| `refactor` | No behavior change |
| `perf` | Performance improvement |
| `docs` | Documentation only |
| `chore` | Tooling, deps, config |

---

## Review Checklist

Before opening/merging a PR, verify:

- [ ] Component is a Server Component unless it specifically needs `"use client"`
- [ ] No `any`, no unexplained non-null assertions
- [ ] No duplicated logic that should be a shared utility or hook
- [ ] Imports ordered per [Imports](#imports)
- [ ] Design values pulled from tokens, not hardcoded
- [ ] `npm run lint` passes clean
- [ ] Meets the full [Definition of Done](../CLAUDE.md#definition-of-done)

---

## Related Documentation

- [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md) — how these standards fit the overall system
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — the tokens referenced throughout this file
- [MOTION_GUIDELINES.md](MOTION_GUIDELINES.md) — animation-specific code conventions
- [CLAUDE.md](../CLAUDE.md) — the philosophy these rules implement
