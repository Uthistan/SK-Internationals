import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { SERVICES } from "@/content/services";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons/SocialIcons";

const SERVICE_LINKS = SERVICES.map((service) => ({
  label: service.title,
  href: "#services",
}));

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Contact", href: "#contact" },
  { label: "Request a Quote", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dot-pattern relative overflow-hidden bg-secondary">
      <Container>
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <div className="flex flex-col items-start gap-6">
            <Image
              src="/logo.png"
              alt="SK Internationals"
              width={256}
              height={146}
              className="h-20 w-auto"
            />

            <Heading as="h4" size="h3" className="max-w-sm text-white">
              Powering Businesses Through Reliable Logistics
            </Heading>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>

            <Text as="p" size="caption" className="text-white/40!">
              © {year} SK Internationals. All rights reserved.
            </Text>
          </div>

          <nav aria-label="Services">
            <Text
              as="p"
              size="caption"
              className="font-semibold tracking-widest text-accent! uppercase"
            >
              Our Services
            </Text>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70! hover:text-accent!">
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
            <ul className="mt-4 flex flex-col gap-2.5">
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
      </Container>
    </footer>
  );
}
