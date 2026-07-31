import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { ExportAdvisory } from "@/components/sections/ExportAdvisory";
import { CTABand } from "@/components/sections/CTABand";
import { ROUTES } from "@/components/layout/nav-links";
import { ORGANIZATION, SITE_URL } from "@/lib/site";

const description =
  "Export advisory for businesses entering international markets: readiness assessment, documentation, DGFT and customs compliance, Incoterms, incentives, logistics planning, and market entry.";

const HERO_IMAGE = "/images/services/export-consultancy.jpg";

export const metadata: Metadata = {
  title: "Export Consultancy",
  description,
  alternates: { canonical: ROUTES.exportConsultancy },
  openGraph: {
    title: "Export Consultancy",
    description,
    url: ROUTES.exportConsultancy,
    images: [HERO_IMAGE],
  },
};

// Named as a service rather than the organization, so search engines file this
// page under what it sells instead of duplicating the company entity already
// declared in the root layout.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Export Consultancy",
  serviceType: "Export advisory and trade compliance consulting",
  description,
  url: `${SITE_URL}${ROUTES.exportConsultancy}`,
  provider: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: SITE_URL,
  },
  areaServed: "Worldwide",
};

export default function ExportConsultancyPage() {
  return (
    <>
      <PageHero
        eyebrow="Export Advisory"
        title="Enter Global Markets Without Guessing"
        lead="Exporting is a sequence of decisions long before it is a shipment. We take you through documentation, compliance, costing, and market entry so the first container leaves on solid ground."
        image={HERO_IMAGE}
        breadcrumb="Export Consultancy"
        route={ROUTES.exportConsultancy}
        parent={{ label: "Services", href: ROUTES.services }}
      />
      <ExportAdvisory />
      {/* The advisory section sits on bg-surface-alt, so the CTA starts a new
          background band here and keeps its top padding. */}
      <CTABand flushWithPrevious={false} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
