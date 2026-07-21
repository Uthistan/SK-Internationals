// Single source of truth for every internal destination. Nothing in the app
// should hardcode a route string — the multi-page split made drift between the
// header, footer, and in-section CTAs the most likely failure mode.
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  contact: "/contact",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavLink {
  label: string;
  href: Route;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Services", href: ROUTES.services },
  { label: "Industries", href: ROUTES.industries },
  { label: "Contact", href: ROUTES.contact },
];

// Anchors from the previous single-page build. Hashes never reach the server,
// so these are resolved client-side in Providers rather than as redirects.
export const LEGACY_HASH_ROUTES: Record<string, Route> = {
  "#about": ROUTES.about,
  "#why-us": ROUTES.about,
  "#services": ROUTES.services,
  "#industries": ROUTES.industries,
  "#contact": ROUTES.contact,
};
