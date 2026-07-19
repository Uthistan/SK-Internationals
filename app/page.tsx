import { Hero } from "@/components/sections/Hero";
import { ServiceTicker } from "@/components/sections/ServiceTicker";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { GlobalNetworkProcess } from "@/components/sections/GlobalNetworkProcess";
import { Industries } from "@/components/sections/Industries";
import { ExportEnablement } from "@/components/sections/ExportEnablement";
import { FAQ } from "@/components/sections/FAQ";
import { WhyChooseSK } from "@/components/sections/WhyChooseSK";
import { CTABand } from "@/components/sections/CTABand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceTicker />
      <About />
      <Services />
      <GlobalNetworkProcess />
      <Industries />
      <ExportEnablement />
      <FAQ />
      <WhyChooseSK />
      <CTABand />
      <Contact />
    </>
  );
}
