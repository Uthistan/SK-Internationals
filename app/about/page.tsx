import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { About } from "@/components/sections/About";
import { WhyChooseSK } from "@/components/sections/WhyChooseSK";
import { CTABand } from "@/components/sections/CTABand";
import { ROUTES } from "@/components/layout/nav-links";

const description =
  "Established in 2011, SK Internationals is a logistics partner built on transparency and long-term relationships, led by a team with 20+ years of trade experience.";

const HERO_IMAGE = "/hero-port.jpg";

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
        lead="A decade of moving cargo for businesses that needed a partner who answers the phone — and answers it straight."
        image={HERO_IMAGE}
        breadcrumb="About"
        route={ROUTES.about}
      />
      <About />
      <WhyChooseSK />
      <CTABand />
    </>
  );
}
