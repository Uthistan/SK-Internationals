import { ROUTES, type Route } from "@/components/layout/nav-links";

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

export const OVERVIEW_ENTRIES: OverviewEntry[] = [
  {
    num: "01",
    title: "What We Do",
    desc: "Freight forwarding, customs clearance, warehousing, transportation, container handling, and export consultancy — coordinated by one team, on one shipment file.",
    meta: "6 service lines",
    cue: "Explore our services",
    href: ROUTES.services,
    image: "/images/services/freight-forwarding.jpg",
  },
  {
    num: "02",
    title: "Who We Move For",
    desc: "Manufacturers, agricultural exporters, textile mills, engineering firms, retail supply chains, and SMEs shipping abroad for the first time.",
    meta: "7 sectors served",
    cue: "See the industries we serve",
    href: ROUTES.industries,
    image: "/images/industries/manufacturing.jpg",
  },
  {
    num: "03",
    title: "Who We Are",
    desc: "Established in 2011 and run by a team carrying 20+ years of combined trade experience — built on transparency and long-term partnerships, not transactions.",
    meta: "Operating since 2011",
    cue: "Read our story",
    href: ROUTES.about,
    image: "/hero-port.jpg",
  },
];
