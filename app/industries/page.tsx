import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Industries } from "@/components/sections/Industries";
import { CTABand } from "@/components/sections/CTABand";
import { ROUTES } from "@/components/layout/nav-links";

const description =
  "Logistics for manufacturing, food and beverage, agriculture, textiles, engineering, retail supply chains, and export-focused SMEs across domestic and global markets.";

const HERO_IMAGE = "/images/industries/manufacturing.jpg";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description,
  alternates: { canonical: ROUTES.industries },
  openGraph: {
    title: "Industries We Serve",
    description,
    url: ROUTES.industries,
    images: [HERO_IMAGE],
  },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Trusted Across Diverse Industries"
        lead="Cargo behaves differently by sector. We plan around the handling, timing, and documentation each one actually demands."
        image={HERO_IMAGE}
        breadcrumb="Industries"
        route={ROUTES.industries}
      />
      <Industries />
      <CTABand />
    </>
  );
}
