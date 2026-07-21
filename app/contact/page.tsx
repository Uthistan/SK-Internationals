import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { ROUTES } from "@/components/layout/nav-links";

const description =
  "Tell us about your shipment or export plan. Reach the SK Internationals team by phone, email, or WhatsApp, or send an enquiry and we will respond with next steps.";

const HERO_IMAGE = "/images/services/transportation.jpg";

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

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Have a Logistics Requirement or Planning Your Next Export?"
        lead="Send us the shipment details you have. If something is still undecided, tell us that too — we will work from there."
        image={HERO_IMAGE}
        breadcrumb="Contact"
        route={ROUTES.contact}
      />
      <Contact />
    </>
  );
}
