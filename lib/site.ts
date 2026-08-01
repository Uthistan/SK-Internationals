import { telHref } from "@/lib/utils";

// Absolute origin, needed for canonicals, Open Graph, and the sitemap. Set
// NEXT_PUBLIC_SITE_URL per environment so preview deploys don't emit
// production canonicals.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skinternationals.in";

export const SITE_NAME = "SK Internationals";

// Mirrors the details rendered in the contact section — kept here only because
// structured data needs them outside that component's render. Who answers, by
// desk, lives in `content/contacts.ts`.
export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "SK Internationals",
  foundingDate: "2011",
  email: "saravanakumaar@skinternationals.in",
  telephone: "+91-88700-15754",
  streetAddress:
    "SMS Complex, No. 10, 1st Floor, Rani Garden, Opposite Jayendra Saraswathy College, Singanallur",
  // wa.me accepts digits only: no plus sign, spaces, or separators.
  whatsapp: "918870015754",
  linkedin: "https://www.linkedin.com/company/skinternationals/",
  addressLocality: "Coimbatore",
  postalCode: "641033",
  addressRegion: "Tamil Nadu",
  addressCountry: "IN",
} as const;

/** The general line, in the two forms every caller-facing surface needs. */
export const PHONE_DISPLAY = ORGANIZATION.telephone.replace(/-/g, " ");
export const PHONE_HREF = telHref(ORGANIZATION.telephone);

/**
 * wa.me pre-types the message and stops — the visitor still presses send, so
 * the text may be specific to where they clicked from without speaking for them.
 */
export function whatsappHref(message: string): string {
  return `https://wa.me/${ORGANIZATION.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = whatsappHref(
  "Hi SK Internationals, I have a shipment enquiry.",
);

/**
 * The registered office, broken where a letter would break it. Rendered line by
 * line on the contact page; joined for the map query, which wants one string.
 */
export const OFFICE_ADDRESS_LINES = [
  "SMS Complex, No. 10, 1st Floor",
  "Rani Garden, Opposite Jayendra Saraswathy College",
  "Singanallur, Coimbatore – 641033",
  "Tamil Nadu, India",
];

const MAPS_QUERY = encodeURIComponent(OFFICE_ADDRESS_LINES.join(", "));

/**
 * Opens the address in whichever maps app the visitor's device prefers. A link
 * rather than an embed: an iframe would import Google's palette and pin styling
 * into a page whose whole problem was visual noise, and load a third-party
 * frame on a page whose job is a phone number.
 */
export const MAPS_DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
