import type { MetadataRoute } from "next";

import { ROUTES } from "@/components/layout/nav-links";
import { SERVICE_PAGES } from "@/content/services";
import { SITE_URL } from "@/lib/site";

// Priorities mirror the funnel: home and the two evaluation pages carry the
// most weight, contact converts, about supports. Individual service pages sit
// just under their index — they are where a search for a named service lands,
// but the index is what ranks for the category.
const PRIORITIES: Record<string, number> = {
  [ROUTES.home]: 1,
  [ROUTES.services]: 0.9,
  // The quote page is the conversion endpoint, so it ranks with the services
  // index rather than with the supporting pages.
  [ROUTES.requestQuote]: 0.9,
  [ROUTES.industries]: 0.8,
  [ROUTES.contact]: 0.8,
  [ROUTES.about]: 0.7,
};

const SERVICE_PRIORITY = 0.7;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // `ROUTES` already contains the export consultancy page, so the service list
  // is de-duplicated against it rather than emitting that URL twice.
  const namedRoutes: string[] = Object.values(ROUTES);
  const servicePaths = SERVICE_PAGES.map((service) => service.href).filter(
    (href) => !namedRoutes.includes(href),
  );

  return [...namedRoutes, ...servicePaths].map((route) => ({
    url: `${SITE_URL}${route === ROUTES.home ? "" : route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: PRIORITIES[route] ?? SERVICE_PRIORITY,
  }));
}
