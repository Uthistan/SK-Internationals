import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/components/layout/nav-links";
import { EXPORT_STEPS } from "@/content/export-advisory";

/**
 * Home page teaser for the export consultancy offer. It shows the shape of the
 * engagement and hands off — the eight advisory areas live on the page this
 * links to rather than being repeated here.
 */
export function ExportEnablement() {
  return (
    <Section className="relative overflow-hidden">
      <Image
        src="/images/export/export-enablement.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-secondary/92 via-secondary/78 to-secondary/45" />

      <Container className="relative z-10">
        <div>
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            Export Enablement
          </span>
          <Heading as="h2" size="h1" className="mt-4 max-w-lg text-white">
            Thinking of Exporting? We&rsquo;ll Guide Every Step.
          </Heading>
          <Text as="p" className="mt-4 max-w-lg text-white/75!">
            Exporting is more than shipping products across borders. We help
            businesses navigate strategy, documentation, compliance, and
            market entry with confidence.
          </Text>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
          {EXPORT_STEPS.map((step) => (
            <div key={step.num} className="border-t border-white/20 pt-4">
              <span className="text-caption font-semibold text-accent tabular-nums">
                {step.num}
              </span>
              <p className="mt-2 text-body font-medium text-white">
                {step.title}
              </p>
            </div>
          ))}
        </div>

        <Button href={ROUTES.exportConsultancy} className="mt-16">
          Explore Export Consultancy
        </Button>
      </Container>
    </Section>
  );
}
