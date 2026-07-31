import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CTABand } from "@/components/sections/CTABand";
import { ROUTES } from "@/components/layout/nav-links";
import { SERVICES } from "@/content/services";
import { ORGANIZATION, SITE_URL } from "@/lib/site";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Export consultancy also lives under /services, but its page is written by
// hand — Next resolves that static segment ahead of this one, so it is simply
// absent from SERVICES and never generated here.
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

function findService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) return {};

  const url = `${ROUTES.services}/${service.slug}`;

  return {
    title: service.title,
    description: service.body,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} | ${service.desc}`,
      description: service.body,
      url,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) notFound();

  const url = `${ROUTES.services}/${service.slug}` as const;

  // Filed under what the page sells. The company entity is already declared
  // once in the root layout, so this only references it as the provider.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.tag,
    description: service.body,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  };

  return (
    <>
      <PageHero
        eyebrow={service.tag}
        title={service.desc}
        lead={service.body}
        image={service.image}
        breadcrumb={service.title}
        route={url}
        parent={{ label: "Services", href: ROUTES.services }}
      />
      <ServiceDetail service={service} />
      <CTABand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
