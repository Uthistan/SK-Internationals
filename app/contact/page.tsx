import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { ContactOffices } from "@/components/sections/ContactOffices";
import { ROUTES } from "@/components/layout/nav-links";
import { CONTACT_DESKS, OFFICE_HOURS } from "@/content/contacts";
import { ORGANIZATION, SITE_URL } from "@/lib/site";

const description =
  "Reach the SK Internationals desk that owns your file: customer service, operations, or compliance. Call, WhatsApp, email, or send an enquiry and we will respond within one business day.";

const HERO_IMAGE = "/images/heroes/contact2.png";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: ROUTES.contact },
  openGraph: {
    title: "Contact SK Internationals",
    description,
    url: ROUTES.contact,
    images: [HERO_IMAGE],
  },
};

/**
 * Every desk the page publishes, restated for search engines. Built from the
 * same list the page renders, so structured data cannot claim a channel the
 * page doesn't show — the general line leads, because it is the one a search
 * result should surface.
 */
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}${ROUTES.contact}`,
  mainEntity: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.streetAddress,
      addressLocality: ORGANIZATION.addressLocality,
      postalCode: ORGANIZATION.postalCode,
      addressRegion: ORGANIZATION.addressRegion,
      addressCountry: ORGANIZATION.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: ORGANIZATION.telephone,
        email: ORGANIZATION.email,
        areaServed: "Worldwide",
        hoursAvailable: OFFICE_HOURS,
      },
      ...CONTACT_DESKS.flatMap((desk) =>
        desk.contacts.map((contact) => ({
          "@type": "ContactPoint",
          contactType: desk.label,
          email: contact.email,
          ...(contact.phone ? { telephone: contact.phone } : {}),
          areaServed: "Worldwide",
        })),
      ),
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        // The promise the rest of the page then has to keep: named desks, named
        // people, and a number beside each one. A headline about "our team" or
        // "getting in touch" could sit on any forwarder's site — this one only
        // works if the register below it is real.
        title="Your Shipment Gets a Name, Not a Ticket Number"
        lead="Customer service, operations, compliance. The desk that owns your file is the one that replies."
        image={HERO_IMAGE}
        breadcrumb="Contact"
        route={ROUTES.contact}
        assurances={[
          "Replies within one business day",
          "24×7 while your cargo is in transit",
          "Moving cargo since 2011",
        ]}
      />
      <Contact />
      <ContactOffices />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
    </>
  );
}
