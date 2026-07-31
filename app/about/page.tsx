import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { About } from "@/components/sections/About";
import { Presence } from "@/components/sections/Presence";
import { WhyChooseSK } from "@/components/sections/WhyChooseSK";
import { CTABand } from "@/components/sections/CTABand";
import { ROUTES } from "@/components/layout/nav-links";

const description =
  "Established in 2011, SK Internationals is a full-service EXIM and logistics partner with offices in six Indian cities, built on transparency and lasting relationships.";

const HERO_IMAGE = "/images/heroes/about.jpg";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: ROUTES.about },
  openGraph: {
    title: "About SK Internationals",
    description,
    url: ROUTES.about,
    images: [HERO_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="More Than Logistics. Your Partner in Growth."
        lead="A decade of moving cargo for businesses that needed a partner who answers the phone and answers it straight."
        image={HERO_IMAGE}
        breadcrumb="About"
        route={ROUTES.about}
      />
      <About />
      <Presence />
      <WhyChooseSK />
      <CTABand />
    </>
  );
}
