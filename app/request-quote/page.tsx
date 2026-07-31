import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { RequestQuote } from "@/components/sections/RequestQuote";
import { ROUTES } from "@/components/layout/nav-links";

const description =
  "Tell us the mode, the lane, and the cargo. SK Internationals comes back with a written rate and transit time, usually within one business day.";

const HERO_IMAGE = "/images/heroes/contact.jpg";

export const metadata: Metadata = {
  title: "Request a Quote",
  description,
  alternates: { canonical: ROUTES.requestQuote },
  openGraph: {
    title: "Request a Freight Quote",
    description,
    url: ROUTES.requestQuote,
    images: [HERO_IMAGE],
  },
};

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a Quote"
        title="Quotes for Air, Ocean, Road & Rail Freight"
        lead="Share a few details about the shipment and we will come back with a rate and a transit time, not a callback to ask the same questions again."
        image={HERO_IMAGE}
        breadcrumb="Request a Quote"
        route={ROUTES.requestQuote}
      />
      <RequestQuote />
    </>
  );
}
