import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { ROUTES, type InternalHref } from "@/components/layout/nav-links";
import { SERVICE_PAGES } from "@/content/services";
import { ALL_CITIES, CITY_SEPARATOR } from "@/content/network";
import {
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { ORGANIZATION } from "@/lib/site";

interface ServiceLink {
  label: string;
  href: InternalHref;
}

// Every service now has a page of its own, so the footer is a real index of the
// section rather than fourteen links to the same URL.
const SERVICE_LINKS: ServiceLink[] = SERVICE_PAGES.map((service) => ({
  label: service.title,
  href: service.href,
}));

// Rail moves as an integrated mode within our freight and cross border work
// rather than a standalone service, so it has no page of its own — it is added
// here by hand, pointing at the index, and placed beside the other transport
// modes a logistics buyer scans the footer for.
const railInsertAt =
  SERVICE_LINKS.findIndex((l) => l.label === "Cross Border Road Solutions") + 1;
SERVICE_LINKS.splice(railInsertAt, 0, {
  label: "Rail Cargo",
  href: ROUTES.services,
});

const COMPANY_LINKS = [
  { label: "About", href: ROUTES.about },
  { label: "Industries", href: ROUTES.industries },
  { label: "Contact", href: ROUTES.contact },
  { label: "Request a Quote", href: ROUTES.requestQuote },
];

// Two of the three open a conversation rather than a profile, so each carries
// its own aria-label: the icon alone doesn't say who is being contacted.
const SOCIAL_LINKS = [
  {
    label: "SK Internationals on LinkedIn",
    href: ORGANIZATION.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: `Email SK Internationals at ${ORGANIZATION.email}`,
    href: `mailto:${ORGANIZATION.email}`,
    icon: MailIcon,
    external: false,
  },
  {
    label: "Message SK Internationals on WhatsApp",
    href: `https://wa.me/${ORGANIZATION.whatsapp}`,
    icon: WhatsAppIcon,
    external: true,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dot-pattern relative overflow-hidden bg-secondary">
      <Container>
        {/* Fifteen services in one column was most of the footer's height. Two
            columns halve it, which is what lets the padding come down without
            the block feeling crowded. */}
        <div className="grid gap-10 py-12 md:py-14 lg:grid-cols-[1fr_1.6fr_0.7fr] lg:gap-12">
          <div className="flex flex-col items-start gap-5">
            <Image
              src="/logo.png"
              alt="SK Internationals"
              width={256}
              height={146}
              className="h-14 w-auto"
            />

            <Heading as="h4" size="h3" className="max-w-xs text-white">
              Powering Businesses Through Reliable Logistics
            </Heading>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <Text
              as="p"
              size="caption"
              className="font-semibold tracking-widest text-accent! uppercase"
            >
              Our Services
            </Text>
            <ul className="mt-4 grid gap-x-8 gap-y-0.5 sm:grid-cols-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block border-b border-white/8 py-2 text-white/70! transition-colors hover:border-accent/40 hover:text-accent!"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <Text
              as="p"
              size="caption"
              className="font-semibold tracking-widest text-accent! uppercase"
            >
              Quick Links
            </Text>
            <ul className="mt-4 flex flex-col gap-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70! hover:text-accent!">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Moved out of the brand column into a rule of its own — these are the
            two lines here that belong to the whole footer rather than to a
            column. The cities lead: on a logistics site the footprint is the
            last thing a buyer checks before they close the tab. */}
        <div className="flex flex-col gap-2.5 border-t border-white/10 py-5 md:flex-row-reverse md:items-center md:justify-between md:gap-8">
          <Text as="p" size="caption" className="text-white/55!">
            {ALL_CITIES.join(CITY_SEPARATOR)}
          </Text>
          <Text as="p" size="caption" className="text-white/40!">
            © {year} SK Internationals. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
