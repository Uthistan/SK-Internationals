// Absolute origin, needed for canonicals, Open Graph, and the sitemap. Set
// NEXT_PUBLIC_SITE_URL per environment so preview deploys don't emit
// production canonicals.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skinternationals.in";

export const SITE_NAME = "SK Internationals";

// Mirrors the details rendered in the contact section — kept here only because
// structured data needs them outside that component's render.
export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "SK Internationals",
  foundingDate: "2011",
  email: "saravanakumaar@skinternationals.in",
  telephone: "+91-88700-15754",
  addressLocality: "Coimbatore",
  postalCode: "641033",
  addressRegion: "Tamil Nadu",
  addressCountry: "IN",
} as const;
