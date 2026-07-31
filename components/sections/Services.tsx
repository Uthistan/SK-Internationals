import Image from "next/image";
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/components/layout/nav-links";
import { SERVICE_PAGES, type ServicePage } from "@/content/services";
import { DELIVERY_MODES } from "@/content/network";

/**
 * Reach is not a fourteenth service — it is the condition every one of them is
 * sold under, so it opens the section rather than taking a card in the grid.
 * The four modes are the first thing a buyer needs settled before they can
 * price anything below.
 */
function GlobalReach() {
  return (
    <div className="mb-20 rounded-3xl border border-border bg-surface p-9 md:mb-24 md:p-14">
      <div className="max-w-2xl">
        <span className="text-caption font-semibold tracking-widest text-accent uppercase">
          Global Reach
        </span>
        <Heading as="h2" size="h2" className="mt-5 text-text">
          As Far as Your Cargo Needs to Go
        </Heading>
        <Text as="p" size="body-lg" color="secondary" className="mt-5">
          A worldwide agent network moves your consignment by sea and air across
          every leg you hand us, with on-time pickup at one end and on-time
          delivery at the other.
        </Text>
      </div>

      <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {DELIVERY_MODES.map((mode) => (
          <div key={mode.name} className="border-t border-border pt-4">
            <dt className="text-body font-semibold text-text">{mode.name}</dt>
            <dd className="mt-2 text-body text-text-secondary">{mode.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ServiceCard({ service }: { service: ServicePage }) {
  return (
    <NextLink
      href={service.href}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <p className="text-caption font-semibold tracking-widest text-accent uppercase">
          {service.tag}
        </p>
        <Heading
          as="h2"
          size="h3"
          className="mt-2.5 flex items-start gap-2 text-text transition-colors group-hover:text-primary"
        >
          {service.title}
          <ArrowUpRight
            aria-hidden="true"
            size={18}
            strokeWidth={2}
            className="mt-1 shrink-0 text-border transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          />
        </Heading>
        <p className="mt-2 text-body text-text-secondary">{service.desc}</p>
      </div>
    </NextLink>
  );
}

/**
 * The services index. Each card opens the service's own page — the tab
 * switcher this replaced could only ever show one service at a time, which hid
 * thirteen of the fourteen from anyone scanning for the one they came for.
 */
export function Services() {
  return (
    <Section id="services" className="bg-surface-alt">
      <Container>
        <GlobalReach />

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>

        <div className="mt-24 flex flex-col items-start gap-8 rounded-3xl bg-secondary p-9 md:flex-row md:items-center md:justify-between md:p-14">
          <div className="max-w-xl">
            <Heading as="h2" size="h2" className="text-white">
              Need a Logistics Solution Tailored to Your Business?
            </Heading>
            <Text as="p" className="mt-2.5 text-white/70!">
              Every business has unique supply chain requirements. Speak with
              our team to discuss your logistics challenges, and we&rsquo;ll
              help you identify the most efficient solution for your
              operations.
            </Text>
          </div>
          <Button href={ROUTES.contact} className="shrink-0">
            Schedule a Consultation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
