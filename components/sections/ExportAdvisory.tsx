import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/components/layout/nav-links";
import { EXPORT_ADVISORY, EXPORT_STEPS } from "@/content/export-advisory";

/**
 * The full export consultancy offer. The home page carries the same five steps
 * as a teaser; the eight advisory areas below them exist only here, which is
 * what makes this page worth arriving at.
 */
export function ExportAdvisory() {
  return (
    <Section className="bg-surface-alt">
      <Container>
        <div className="max-w-2xl">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            How It Works
          </span>
          <Heading as="h2" size="h2" className="mt-5 text-text">
            Five Stages Between Here and Your First Shipment
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="mt-5">
            Most first-time exporters stall on paperwork, not on demand. We work
            through the sequence in order, so nothing surfaces at the port that
            should have been settled months earlier.
          </Text>
        </div>

        <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
          {EXPORT_STEPS.map((step) => (
            <li key={step.num} className="border-t border-border pt-4">
              <span className="text-caption font-semibold text-accent tabular-nums">
                {step.num}
              </span>
              <p className="mt-2 text-body font-medium text-text">
                {step.title}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-24 max-w-2xl md:mt-32">
          <span className="text-caption font-semibold tracking-widest text-accent uppercase">
            What We Advise On
          </span>
          <Heading as="h2" size="h2" className="mt-5 text-text">
            The Decisions That Decide Whether an Export Pays
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="mt-5">
            Every one of these is a place a shipment can lose money or time. We
            take each of them with you before the cargo is booked.
          </Text>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {EXPORT_ADVISORY.map((item, index) => (
            <div key={item.title} className="border-t border-border pt-5">
              <span className="text-caption font-semibold text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Heading as="h3" size="h3" className="mt-2 text-text">
                {item.title}
              </Heading>
              <p className="mt-2.5 text-body text-text-secondary">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start gap-8 rounded-3xl bg-secondary p-9 md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-xl">
            <Heading as="h2" size="h2" className="text-white">
              Not Sure Whether You&rsquo;re Ready to Export?
            </Heading>
            <Text as="p" className="mt-2.5 text-white/70!">
              That is the assessment, not a prerequisite for it. Tell us what
              you make and where you think it sells, and we&rsquo;ll tell you
              what stands between you and the first container.
            </Text>
          </div>
          <Button href={ROUTES.contact} className="shrink-0">
            Schedule an Export Consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
