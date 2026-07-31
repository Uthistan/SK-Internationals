import { SERVICE_PAGES } from "@/content/services";

// Single source of truth for every internal destination. Nothing in the app
// should hardcode a route string — the multi-page split made drift between the
// header, footer, and in-section CTAs the most likely failure mode.
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  exportConsultancy: "/services/export-consultancy",
  industries: "/industries",
  contact: "/contact",
  // The structured quote flow. Kept off NAV_LINKS on purpose — it is the
  // header's single call to action, not another item competing with it.
  requestQuote: "/request-quote",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Any internal destination: a named route above, or one of the service detail
 * pages, whose addresses come from content and so cannot be enumerated here.
 * Keeping the second case typed against its section still rules out a bare
 * string wandering in.
 */
export type InternalHref = Route | `${typeof ROUTES.services}/${string}`;

export interface NavLink {
  label: string;
  href: InternalHref;
  /** One level only. A second would need a different nav pattern. */
  children?: NavLink[];
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  {
    label: "Services",
    href: ROUTES.services,
    // The parent stays a real destination — the submenu is a shortcut past the
    // index, not a replacement for it.
    children: SERVICE_PAGES.map((service) => ({
      label: service.title,
      href: service.href,
    })),
  },
  { label: "Industries", href: ROUTES.industries },
  { label: "Contact", href: ROUTES.contact },
];

/**
 * A nav item is current for its own route and, for a parent, for anything
 * nested beneath it — `/services/warehousing` must keep Services lit. The home
 * route is exact-match only, or it would claim every page.
 */
export function isRouteActive(pathname: string, href: InternalHref): boolean {
  if (href === ROUTES.home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Anchors from the previous single-page build. Hashes never reach the server,
// so these are resolved client-side in Providers rather than as redirects.
export const LEGACY_HASH_ROUTES: Record<string, Route> = {
  "#about": ROUTES.about,
  "#why-us": ROUTES.about,
  "#services": ROUTES.services,
  "#industries": ROUTES.industries,
  "#contact": ROUTES.contact,
};
