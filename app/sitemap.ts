import type { MetadataRoute } from "next";

import { ROUTES } from "@/components/layout/nav-links";
import { SITE_URL } from "@/lib/site";

// Priorities mirror the funnel: home and the two evaluation pages carry the
// most weight, contact converts, about supports.
const PRIORITIES: Record<string, number> = {
  [ROUTES.home]: 1,
  [ROUTES.services]: 0.9,
  [ROUTES.industries]: 0.8,
  [ROUTES.contact]: 0.8,
  [ROUTES.about]: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(ROUTES).map((route) => ({
    url: `${SITE_URL}${route === ROUTES.home ? "" : route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: PRIORITIES[route],
  }));
}
