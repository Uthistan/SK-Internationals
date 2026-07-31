import { ROUTES, type Route } from "@/components/layout/nav-links";
import { SERVICE_PAGES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { OFFICE_CITY_COUNT } from "@/content/network";

export interface OverviewEntry {
  num: string;
  title: string;
  desc: string;
  /** Concrete figure, not a marketing adjective — it does the persuading. */
  meta: string;
  cue: string;
  href: Route;
  image: string;
}

// Counted from the lists themselves. Hardcoded, these drifted the moment the
// service pages were split out — the row promised seven and the page delivered
// fourteen, which is the one place a precise number costs more than no number.
export const OVERVIEW_ENTRIES: OverviewEntry[] = [
  {
    num: "01",
    title: "What We Do",
    desc: "Freight forwarding, customs clearance, warehousing, transportation, container handling, and export consultancy, all coordinated by one team on one shipment file.",
    meta: `${SERVICE_PAGES.length} service lines`,
    cue: "Explore our services",
    href: ROUTES.services,
    image: "/images/overview/what-we-do.jpg",
  },
  {
    num: "02",
    title: "Who We Move For",
    desc: "Manufacturers, agricultural exporters, textile mills, engineering firms, retail supply chains, and SMEs shipping abroad for the first time.",
    meta: `${INDUSTRIES.length} sectors served`,
    cue: "See the industries we serve",
    href: ROUTES.industries,
    image: "/images/overview/who-we-move-for.jpg",
  },
  {
    num: "03",
    title: "Who We Are",
    desc: "Established in 2011, running as a 3PL and 4PL partner with local teams across India and agents at the far end of every lane we ship.",
    meta: `${OFFICE_CITY_COUNT} city offices since 2011`,
    cue: "Read our story",
    href: ROUTES.about,
    image: "/images/overview/who-we-are.jpg",
  },
];
