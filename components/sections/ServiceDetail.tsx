import NextLink from "next/link";
import { CircleCheck } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/components/layout/nav-links";
import { SERVICE_PAGES, type ServiceItem } from "@/content/services";

interface ServiceDetailProps {
  service: ServiceItem;
}

/**
 * The body of a service page: everything the line covers, then a route out to
 * the rest. The headline and summary are carried by the page hero above it, so
 * this opens straight into the substance.
 */
export function ServiceDetail({ service }: ServiceDetailProps) {
  const others = SERVICE_PAGES.filter(
    (page) => page.href !== `/services/${service.slug}`,
  );

  return (
    <>
      <Section className="bg-surface-alt">
        <Container>
          <div className="max-w-2xl">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              What This Covers
            </span>
            <Heading as="h2" size="h2" className="mt-5 text-text">
              Everything Handled Under {service.title}
            </Heading>
            <Text as="p" size="body-lg" color="secondary" className="mt-5">
              One team holds the file from first instruction to final delivery.
              These are the pieces of it you never have to chase separately.
            </Text>
          </div>

          {/* Two columns rather than three: these lists run from five short
              labels to seventeen, and several are full sentences that would
              wrap badly in a narrower track. */}
          <ul className="mt-14 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-border pt-4"
              >
                <CircleCheck
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <span className="text-body font-medium text-text">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-col items-start gap-8 rounded-3xl bg-secondary p-9 md:flex-row md:items-center md:justify-between md:p-14">
            <div className="max-w-xl">
              <Heading as="h2" size="h2" className="text-white">
                Have a Shipment That Needs {service.title}?
              </Heading>
              <Text as="p" className="mt-2.5 text-white/70!">
                Tell us the cargo, the route, and the deadline. We&rsquo;ll come
                back with what it takes and what it costs.
              </Text>
            </div>
            <Button href={ROUTES.contact} className="shrink-0">
              Discuss This Service
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading as="h2" size="h2" className="text-text">
            Explore Our Other Services
          </Heading>
          <Text as="p" size="body-lg" color="secondary" className="mt-4 max-w-xl">
            Most shipments touch more than one of these. They are run by the
            same team, on the same file.
          </Text>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {others.map((page) => (
              <li key={page.href}>
                <NextLink
                  href={page.href}
                  className="inline-flex rounded-full border border-border bg-surface px-5 py-2.5 text-caption font-semibold tracking-wide text-text-secondary transition-colors duration-300 hover:border-primary/40 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {page.title}
                </NextLink>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
