import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { NAV_LINKS } from "@/components/layout/nav-links";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-[1.5fr_1fr] md:py-12">
          <div className="flex flex-col items-start gap-3">
            <Image
              src="/logo.png"
              alt="SK Internationals"
              width={256}
              height={146}
              className="h-12 w-auto"
            />
            <Text as="p" className="max-w-sm !text-white/70">
              Reliable sea, air, and surface logistics across the Gulf, Red
              Sea, and Indian Sub-Continent — since 2011.
            </Text>
            <Text as="p" size="caption" className="!text-white/50">
              Registered office: Singanallur, Coimbatore, India
            </Text>
            <Text as="p" size="caption" className="!text-white/50">
              Operational bases in Chennai &amp; Tuticorin, India
            </Text>
            <div className="mt-1 flex flex-col gap-1">
              <Link
                href="mailto:saravanakumaar@skinternationals.in"
                className="text-caption !text-white/70 hover:!text-white"
              >
                saravanakumaar@skinternationals.in
              </Link>
              <Link
                href="tel:+918870015754"
                className="text-caption !text-white/70 hover:!text-white"
              >
                +91 88700 15754
              </Link>
            </div>
          </div>

          <nav aria-label="Footer">
            <Text
              as="p"
              size="caption"
              className="font-semibold tracking-widest text-accent uppercase"
            >
              Navigate
            </Text>
            <ul className="mt-3 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="!text-white/70 hover:!text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-4 md:flex-row">
          <Text as="p" size="caption" className="!text-white/50">
            © {year} SK Internationals. All rights reserved.
          </Text>
          <Text as="p" size="caption" className="!text-white/50">
            Freight Forwarding · NVOCC · Est. 2011
          </Text>
        </div>
      </Container>
    </footer>
  );
}
