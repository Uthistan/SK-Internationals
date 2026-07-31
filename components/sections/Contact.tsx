"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowUpRight,
  CircleCheck,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Field, inputClasses } from "@/components/ui/FormField";
import { Link } from "@/components/ui/Link";
import { PlaneIcon, ShipIcon, TruckIcon } from "@/components/ui/VehicleIcons";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LOCATIONS, type LocationRole } from "@/content/network";
import { ROUTES } from "@/components/layout/nav-links";
import { ORGANIZATION } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Four fields. Anyone who can already name a mode, a lane, and a cargo belongs
 * on the quote page, which asks those questions properly — this form exists for
 * the visitor who cannot yet, and every field it adds is one more reason for
 * them to close the tab.
 */
const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about what you need"),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const PHONE_DISPLAY = ORGANIZATION.telephone.replace(/-/g, " ");
const PHONE_HREF = `tel:${ORGANIZATION.telephone.replace(/[^+\d]/g, "")}`;

const WHATSAPP_HREF = `https://wa.me/${ORGANIZATION.whatsapp}?text=${encodeURIComponent(
  "Hi SK Internationals, I just submitted an enquiry on your website.",
)}`;

// Network canvas is authored wide (1200×440) and rendered in a matching
// wide band so the full route geometry stays visible rather than cropping.
// Two origins, not one: every arc used to leave Chennai — a seaport — which
// made even this decorative band argue that we are a sea-only forwarder.
const SEA_ORIGIN = { x: 772, y: 250 };
const AIR_ORIGIN = { x: 742, y: 122 };

const TRADE_ROUTES = [
  { id: "usa", label: "USA", mode: "air", x: 196, y: 168, bow: -120 },
  { id: "europe", label: "Europe", mode: "air", x: 536, y: 116, bow: -78 },
  { id: "middle-east", label: "Middle East", mode: "sea", x: 656, y: 196, bow: -34 },
  { id: "sea", label: "Southeast Asia", mode: "sea", x: 918, y: 296, bow: 38 },
] as const;

// Sea gateways read as filled discs, the air gateway as an open ring — the same
// solid/open distinction the network map on /services uses.
const INDIA_HUBS = [
  { x: SEA_ORIGIN.x, y: SEA_ORIGIN.y, label: "Chennai", mode: "sea" },
  { x: 752, y: 286, label: "Tuticorin", mode: "sea" },
  { x: AIR_ORIGIN.x, y: AIR_ORIGIN.y, label: "Delhi", mode: "air" },
] as const;

// Labels are carried for screen readers only — three silhouettes read faster
// than three captions, but a shape alone must never be the sole carrier.
const TRANSPORT_MODES = [
  { label: "Sea freight", icon: ShipIcon },
  { label: "Air freight", icon: PlaneIcon },
  { label: "Road freight", icon: TruckIcon },
];

interface NetworkBandProps {
  prefersReducedMotion: boolean;
}

/** Quadratic arc from the gateway of the given mode out to a destination. */
function routePath(x: number, y: number, bow: number, mode: "sea" | "air") {
  const origin = mode === "air" ? AIR_ORIGIN : SEA_ORIGIN;
  const mx = (origin.x + x) / 2;
  const my = (origin.y + y) / 2 + bow;
  return `M${origin.x},${origin.y} Q${mx},${my} ${x},${y}`;
}

const DIRECT_CHANNELS = [
  {
    icon: Phone,
    label: "Call us",
    value: PHONE_DISPLAY,
    href: PHONE_HREF,
  },
  {
    icon: Mail,
    label: "Email us",
    value: ORGANIZATION.email,
    href: `mailto:${ORGANIZATION.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message the operations desk",
    href: WHATSAPP_HREF,
    external: true,
  },
];

/** Cities listed by role, so a branch office is never mistaken for a port desk. */
function citiesWithRole(role: LocationRole) {
  return LOCATIONS.filter((location) => location.role === role)
    .map((location) => location.city)
    .join(" · ");
}

// A label/value register rather than an icon-and-heading stack: the label
// already names the thing, so an icon beside it would only pad the row.
const CONTACT_DETAILS: { label: string; lines: string[] }[] = [
  {
    label: "Head office",
    lines: ["Coimbatore, Tamil Nadu, India"],
  },
  { label: "Branch offices", lines: [citiesWithRole("Branch office")] },
  { label: "Port operations", lines: [citiesWithRole("Port operations")] },
  {
    label: "Office hours",
    lines: ["Monday to Saturday, 9:30am to 6:30pm IST"],
  },
  {
    label: "Operations desk",
    lines: [
      "24x7 Customer Service with frequent updates on your shipment transit",
    ],
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", {
    start: "top 85%",
    stagger: 0.12,
  });
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
  });

  async function onSubmit(values: EnquiryFormValues) {
    setSubmitError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError(true);
    }
  }

  function handleSendAnother() {
    reset();
    setSubmitted(false);
    setSubmitError(false);
  }

  return (
    <Section id="contact" className="bg-surface-alt">
      <Container>
        {/* The headline and lead live in the page hero above. */}
        <div ref={scopeRef}>
          <NetworkBand prefersReducedMotion={prefersReducedMotion} />

          {/* Details left, form right. The details column is set on the page
              itself rather than in a card of its own — the boxed stack that
              stood here competed with the form for the eye, and the site reads
              in hairline rules everywhere else. */}
          <div className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <span className="text-caption font-semibold tracking-widest text-accent uppercase">
                Talk to Us Directly
              </span>
              <Heading as="h2" size="h2" className="mt-5 text-text">
                Reach the Desk, Not a Queue
              </Heading>
              <Text as="p" color="secondary" className="mt-4">
                One team owns your file. These three channels reach it — the
                operations desk answers outside office hours too.
              </Text>

              <div className="mt-10 border-t border-border">
                {DIRECT_CHANNELS.map(
                  ({ icon: Icon, label, value, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center justify-between gap-5 border-b border-border py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="min-w-0">
                        <span className="flex items-center gap-2.5 text-caption font-semibold tracking-widest text-text-secondary uppercase">
                          <Icon
                            aria-hidden="true"
                            size={15}
                            strokeWidth={2}
                            className="shrink-0"
                          />
                          {label}
                        </span>
                        <span className="mt-2 block text-body-lg font-semibold wrap-break-word text-text transition-colors duration-300 group-hover:text-primary">
                          {value}
                        </span>
                      </span>
                      {/* Same affordance as the site-overview rows: an outline
                          disc that fills on intent, rather than a coloured icon
                          sitting permanently lit. */}
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
                      >
                        <ArrowUpRight size={17} strokeWidth={2} />
                      </span>
                    </a>
                  ),
                )}
              </div>

              <p className="mt-14 text-caption font-semibold tracking-widest text-text-secondary uppercase">
                Where to Find Us
              </p>
              <dl className="mt-5 border-t border-border">
                {CONTACT_DETAILS.map(({ label, lines }) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-border py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
                  >
                    <dt className="text-caption font-medium text-text-secondary">
                      {label}
                    </dt>
                    <dd className="text-body text-text">
                      {lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The one elevated surface in the section, because it is the one
                thing here a visitor is meant to act on. */}
            <div
              data-reveal
              className="rounded-3xl border border-border bg-surface p-7 shadow-sm md:p-10 lg:p-12"
            >
              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-start gap-4 py-8"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                    <CircleCheck
                      aria-hidden="true"
                      size={28}
                      strokeWidth={1.5}
                      className="text-success"
                    />
                  </span>
                  <Heading as="h2" size="h2" className="text-text">
                    Enquiry received.
                  </Heading>
                  <Text as="p" size="body-lg" color="secondary">
                    We typically respond within one business day with next
                    steps.
                  </Text>
                  <ButtonGroup className="mt-2 w-full">
                    <Button
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <MessageCircle aria-hidden="true" size={18} />
                        Continue on WhatsApp
                      </span>
                    </Button>
                    <Button variant="secondary" onClick={handleSendAnother}>
                      Send another enquiry
                    </Button>
                  </ButtonGroup>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-7"
                >
                  <div className="border-b border-border pb-7">
                    <Heading as="h2" size="h2" className="text-text">
                      Send Us a Message
                    </Heading>
                    <Text as="p" color="secondary" className="mt-2.5">
                      Four fields. Tell us what you need and the right person
                      will reply. Know your lane already?{" "}
                      <Link href={ROUTES.requestQuote} className="font-medium">
                        Request a quote
                      </Link>{" "}
                      instead.
                    </Text>
                  </div>

                  {/* One field per row. A lead-gen form is scanned top to
                      bottom, and paired columns halve the completion rate on
                      phones where the pair collapses anyway. */}
                  <Field
                    id="name"
                    label="Full name"
                    required
                    error={errors.name?.message}
                  >
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={cn(
                        inputClasses,
                        errors.name && "border-error",
                      )}
                      {...register("name")}
                    />
                  </Field>

                  <Field
                    id="email"
                    label="Email"
                    required
                    error={errors.email?.message}
                  >
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={cn(
                        inputClasses,
                        errors.email && "border-error",
                      )}
                      {...register("email")}
                    />
                  </Field>

                  <Field
                    id="phone"
                    label={
                      <>
                        Phone
                        <span className="ml-1.5 font-normal text-text-secondary normal-case">
                          (optional)
                        </span>
                      </>
                    }
                  >
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 00000 00000"
                      className={inputClasses}
                      {...register("phone")}
                    />
                  </Field>

                  <Field
                    id="message"
                    label="How can we help?"
                    required
                    error={errors.message?.message}
                  >
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="What you need, where it is going, and when…"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={cn(
                        inputClasses,
                        "h-auto min-h-36 resize-y py-3.5",
                        errors.message && "border-error",
                      )}
                      {...register("message")}
                    />
                  </Field>

                  {submitError && (
                    <p role="alert" className="text-caption text-error">
                      Something went wrong sending your enquiry. Please try
                      again, or email us directly at {ORGANIZATION.email}.
                    </p>
                  )}

                  <div className="flex flex-col gap-3 border-t border-border pt-7">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-14 w-full text-body-lg"
                    >
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2
                            aria-hidden="true"
                            size={18}
                            className="animate-spin"
                          />
                          Sending…
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                    <Text
                      as="p"
                      size="caption"
                      color="secondary"
                      className="text-center"
                    >
                      We typically respond within one business day.
                    </Text>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The reach statement that opens the section: four corridors drawn out of the
 * ports of loading, with the modes that serve them named beneath. Extracted
 * from the render because it is a self-contained canvas — everything else on
 * this page is a control a visitor acts on.
 */
function NetworkBand({ prefersReducedMotion }: NetworkBandProps) {
  return (
    <div
      data-reveal
      className="relative mb-16 aspect-4/3 w-full overflow-hidden rounded-3xl bg-secondary sm:aspect-2/1 md:mb-20 lg:aspect-1200/440"
    >
      <div
        aria-hidden="true"
        className="animate-grid-drift absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.10]"
      />

      <svg
        viewBox="0 0 1200 440"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="contact-origin-glow">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity="0.45"
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity="0"
            />
          </radialGradient>
          <linearGradient id="contact-route-fade" x1="0" x2="1">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity="0.15"
            />
            <stop
              offset="55%"
              stopColor="var(--color-accent)"
              stopOpacity="0.85"
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity="0.35"
            />
          </linearGradient>
        </defs>

        <circle
          cx={SEA_ORIGIN.x}
          cy={SEA_ORIGIN.y}
          r="190"
          fill="url(#contact-origin-glow)"
        />

        {TRADE_ROUTES.map((route) => (
          <path
            key={route.id}
            d={routePath(route.x, route.y, route.bow, route.mode)}
            fill="none"
            stroke="url(#contact-route-fade)"
            strokeWidth="1.75"
            strokeDasharray="5 8"
            strokeLinecap="round"
          />
        ))}

        {!prefersReducedMotion &&
          TRADE_ROUTES.map((route, i) => (
            <circle key={route.id} r="4" fill="var(--color-accent)">
              <animateMotion
                dur={`${4.5 + i * 0.7}s`}
                repeatCount="indefinite"
                path={routePath(route.x, route.y, route.bow, route.mode)}
              />
            </circle>
          ))}

        {TRADE_ROUTES.map((route) => (
          <g key={route.id}>
            <circle
              cx={route.x}
              cy={route.y}
              r="4"
              fill="rgba(255,255,255,.9)"
            />
            <circle
              cx={route.x}
              cy={route.y}
              r="10"
              fill="none"
              stroke="rgba(255,255,255,.28)"
            />
            <text
              x={route.x}
              y={route.y - 22}
              textAnchor="middle"
              className="fill-white/75 text-[13px] font-semibold"
            >
              {route.label}
            </text>
          </g>
        ))}

        {INDIA_HUBS.map((hub) => (
          <g key={hub.label}>
            {!prefersReducedMotion && (
              <circle
                cx={hub.x}
                cy={hub.y}
                r="6"
                fill="var(--color-accent)"
                className="animate-route-ping"
              />
            )}
            {/* Filled for a seaport, open for an air gateway — the same
                distinction the /services map makes, so the two graphics teach
                one visual language rather than two. */}
            <circle
              cx={hub.x}
              cy={hub.y}
              r="6"
              fill={
                hub.mode === "sea" ? "var(--color-accent)" : "var(--color-secondary)"
              }
              stroke="var(--color-accent)"
              strokeWidth={hub.mode === "sea" ? 0 : 2.5}
            />
            <text
              x={hub.x}
              y={hub.y + 26}
              textAnchor="middle"
              className="fill-white text-[13px] font-bold"
            >
              {hub.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-linear-to-t from-secondary via-secondary/70 to-transparent p-6 md:p-9">
        <div>
          <p className="text-caption font-semibold tracking-widest text-accent uppercase">
            Our Network
          </p>
          <p className="mt-2 max-w-sm text-h3 font-medium text-white">
            Agents at the far end of every lane we ship.
          </p>
        </div>
        <div className="max-w-xs">
          {/* The three legs the corridors above are actually run on,
                    drawn in the house set rather than pulled from an icon
                    library, so they sit in the same hand as the map. */}
          <ul className="flex items-center gap-4 md:justify-end">
            {TRANSPORT_MODES.map(({ label, icon: Icon }, i) => (
              <li key={label} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden="true" className="h-5 w-px bg-white/20" />
                )}
                <Icon className="h-5 w-auto text-white/75" />
                <span className="sr-only">{label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3.5 text-caption text-white/60 md:text-right">
            Sea, air, and road freight across the Gulf, Red Sea, Europe, the
            Americas, and South East Asia.
          </p>
        </div>
      </div>
    </div>
  );
}
