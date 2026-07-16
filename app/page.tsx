import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { TradeLanes } from "@/components/sections/TradeLanes";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { WhyChooseSK } from "@/components/sections/WhyChooseSK";
import { CTABand } from "@/components/sections/CTABand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <TradeLanes />
      <HowWeWork />
      <WhyChooseSK />
      <CTABand />
      <Contact />
    </>
  );
}
