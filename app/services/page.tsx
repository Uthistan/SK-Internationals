import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { GlobalNetworkProcess } from "@/components/sections/GlobalNetworkProcess";
import { CTABand } from "@/components/sections/CTABand";
import { ROUTES } from "@/components/layout/nav-links";

const description =
  "Freight forwarding, customs clearance, warehousing, transportation, container handling, and export consultancy — coordinated by one team across global trade lanes.";

const HERO_IMAGE = "/images/services/container-handling.jpg";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: ROUTES.services },
  openGraph: {
    title: "Logistics & Trade Services",
    description,
    url: ROUTES.services,
    images: [HERO_IMAGE],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Integrated Logistics & Trade Solutions"
        lead="Six service lines, one shipment file. Every stage stays with the same team, so nothing is handed off and lost."
        image={HERO_IMAGE}
        breadcrumb="Services"
        route={ROUTES.services}
      />
      <Services />
      <GlobalNetworkProcess />
      <CTABand />
    </>
  );
}
