import Image from "next/image";
import NextLink from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ROUTES, type Route } from "@/components/layout/nav-links";
import { SITE_URL } from "@/lib/site";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  /** Short label for the breadcrumb — the full title is usually too long. */
  breadcrumb: string;
  route: Route;
}

/**
 * Opening band for every route other than the home page. It carries the single
 * `h1` each page needs, keeps the fixed header clear of the content, and — via
 * `data-header-scrim` — tells the header it may stay transparent on arrival.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  breadcrumb,
  route,
}: PageHeroProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumb,
        item: `${SITE_URL}${route}`,
      },
    ],
  };

  return (
    <section
      data-header-scrim
      className="relative isolate flex min-h-[58svh] flex-col justify-end overflow-hidden bg-scrim pt-28 pb-14 md:min-h-[64svh] md:pt-40 md:pb-20"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-secondary/95 via-secondary/75 to-secondary/45"
      />

      <Container className="relative z-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li>
              <NextLink
                href={ROUTES.home}
                className="text-caption font-medium text-white/60 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Home
              </NextLink>
            </li>
            <li aria-hidden="true" className="flex items-center text-white/35">
              <ChevronRight size={14} strokeWidth={2} />
            </li>
            <li>
              <span
                aria-current="page"
                className="text-caption font-medium text-white/85"
              >
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        <span className="mt-8 block text-caption font-semibold tracking-widest text-accent uppercase">
          {eyebrow}
        </span>
        <Heading as="h1" size="h1" className="mt-4 max-w-3xl text-white">
          {title}
        </Heading>
        <Text as="p" size="body-lg" className="mt-5 max-w-xl text-white/80!">
          {lead}
        </Text>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </section>
  );
}
