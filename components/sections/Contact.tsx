"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CircleCheck,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DESTINATION_GROUPS } from "@/content/destinations";
import { cn } from "@/lib/utils";

const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your company name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  destination: z.string().min(1, "Select a destination"),
  message: z.string().min(10, "Tell us a little more about your shipment"),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const inputClasses =
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-body text-text transition-all duration-200 placeholder:text-text-secondary/50 hover:border-text-secondary/40 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";

const labelClasses = "text-caption font-semibold text-text";

const WHATSAPP_HREF = `https://wa.me/918870015754?text=${encodeURIComponent(
  "Hi SK Internationals, I just submitted an enquiry on your website.",
)}`;

// Network canvas is authored wide (1200×440) and rendered in a matching
// wide band so the full route geometry stays visible rather than cropping.
const ORIGIN = { x: 772, y: 250 };

const TRADE_ROUTES = [
  { id: "usa", label: "USA", x: 196, y: 168, bow: -120 },
  { id: "europe", label: "Europe", x: 536, y: 116, bow: -70 },
  { id: "middle-east", label: "Middle East", x: 656, y: 196, bow: -34 },
  { id: "sea", label: "Southeast Asia", x: 918, y: 296, bow: 38 },
];

const INDIA_HUBS = [
  { x: ORIGIN.x, y: ORIGIN.y, label: "Chennai" },
  { x: 752, y: 286, label: "Tuticorin" },
];

/** Quadratic arc from the India origin to a destination, bowed for a flight-path feel. */
function routePath(x: number, y: number, bow: number) {
  const mx = (ORIGIN.x + x) / 2;
  const my = (ORIGIN.y + y) / 2 + bow;
  return `M${ORIGIN.x},${ORIGIN.y} Q${mx},${my} ${x},${y}`;
}

const DIRECT_CHANNELS = [
  {
    icon: Phone,
    label: "Call us",
    value: "+91 88700 15754",
    href: "tel:+918870015754",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "saravanakumaar@skinternationals.in",
    href: "mailto:saravanakumaar@skinternationals.in",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: WHATSAPP_HREF,
    external: true,
  },
];

const OFFICE_DETAILS = [
  {
    icon: MapPin,
    label: "Head office",
    lines: ["Coimbatore — 641033"],
  },
  {
    icon: MapPin,
    label: "Operational bases",
    lines: ["Chennai · Tuticorin", "Tamil Nadu, India"],
  },
  {
    icon: Clock,
    label: "Working hours",
    lines: ["Mon–Sat, 9:30am – 6:30pm IST"],
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
    defaultValues: { destination: "" },
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
    reset({ destination: "" });
    setSubmitted(false);
    setSubmitError(false);
  }

  return (
    <Section id="contact" className="bg-surface-alt">
      <Container>
        {/* The headline and lead live in the page hero above. */}
        <div ref={scopeRef}>
          {/* Global network band — wide aspect so the full route canvas is visible. */}
          <div
            data-reveal
            className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-secondary sm:aspect-2/1 lg:aspect-1200/440"
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
                cx={ORIGIN.x}
                cy={ORIGIN.y}
                r="190"
                fill="url(#contact-origin-glow)"
              />

              {TRADE_ROUTES.map((route) => (
                <path
                  key={route.id}
                  d={routePath(route.x, route.y, route.bow)}
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
                      path={routePath(route.x, route.y, route.bow)}
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
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="6"
                    fill="var(--color-accent)"
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
                  Global Reach
                </p>
                <p className="mt-2 max-w-sm text-h3 font-medium text-white">
                  Moving cargo across four major trade corridors.
                </p>
              </div>
              <p className="text-caption text-white/60">
                Serving the Persian &amp; Arabian Gulf, Red Sea, and Indian
                Sub-Continent lanes.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
            <div data-reveal className="flex flex-col gap-6">
              <div className="rounded-3xl border border-border bg-surface p-7 md:p-8">
                <p className="text-caption font-semibold tracking-widest text-accent uppercase">
                  Talk to us directly
                </p>
                <div className="mt-6 flex flex-col">
                  {DIRECT_CHANNELS.map(
                    ({ icon: Icon, label, value, href, external }) => (
                      <a
                        key={label}
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-4 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <Icon
                          aria-hidden="true"
                          size={20}
                          strokeWidth={1.75}
                          className="shrink-0 text-accent"
                        />
                        <span className="min-w-0">
                          <span className="block text-caption text-text-secondary">
                            {label}
                          </span>
                          <span className="block truncate text-body font-medium text-text transition-colors group-hover:text-accent">
                            {value}
                          </span>
                        </span>
                      </a>
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-7 md:p-8">
                <div className="flex flex-col gap-6">
                  {OFFICE_DETAILS.map(({ icon: Icon, label, lines }) => (
                    <div key={label} className="flex items-start gap-4">
                      <Icon
                        aria-hidden="true"
                        size={20}
                        strokeWidth={1.75}
                        className="mt-0.5 shrink-0 text-accent"
                      />
                      <div>
                        <p className="text-caption font-semibold text-text">
                          {label}
                        </p>
                        {lines.map((line) => (
                          <p
                            key={line}
                            className="mt-1 text-body text-text-secondary"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              data-reveal
              className="rounded-3xl border border-border bg-surface p-7 md:p-10"
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
                  className="flex flex-col gap-6"
                >
                  <div>
                    <Heading as="h2" size="h3" className="text-text">
                      Request a Quote
                    </Heading>
                    <Text as="p" color="secondary" className="mt-1.5">
                      Tell us about your shipment and we&rsquo;ll come back with
                      next steps.
                    </Text>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        Full name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className={cn(
                          inputClasses,
                          "mt-2",
                          errors.name && "border-error",
                        )}
                        {...register("name")}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          role="alert"
                          className="mt-1.5 text-caption text-error"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className={labelClasses}>
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Company name"
                        aria-invalid={!!errors.company}
                        aria-describedby={
                          errors.company ? "company-error" : undefined
                        }
                        className={cn(
                          inputClasses,
                          "mt-2",
                          errors.company && "border-error",
                        )}
                        {...register("company")}
                      />
                      {errors.company && (
                        <p
                          id="company-error"
                          role="alert"
                          className="mt-1.5 text-caption text-error"
                        >
                          {errors.company.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email
                      </label>
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
                          "mt-2",
                          errors.email && "border-error",
                        )}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          className="mt-1.5 text-caption text-error"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        Phone
                        <span className="ml-1 font-normal text-text-secondary">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 00000 00000"
                        className={cn(inputClasses, "mt-2")}
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="destination" className={labelClasses}>
                      Destination / country of export
                    </label>
                    <select
                      id="destination"
                      aria-invalid={!!errors.destination}
                      aria-describedby={
                        errors.destination ? "destination-error" : undefined
                      }
                      className={cn(
                        inputClasses,
                        "mt-2",
                        errors.destination && "border-error",
                      )}
                      defaultValue=""
                      {...register("destination")}
                    >
                      <option value="" disabled>
                        Select a destination
                      </option>
                      {DESTINATION_GROUPS.map((group) => (
                        <optgroup key={group.region} label={group.region}>
                          {group.destinations.map((destination) => (
                            <option
                              key={destination.value}
                              value={destination.value}
                            >
                              {destination.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.destination && (
                      <p
                        id="destination-error"
                        role="alert"
                        className="mt-1.5 text-caption text-error"
                      >
                        {errors.destination.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClasses}>
                      Shipment details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Cargo type, origin and destination, timelines…"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={cn(
                        inputClasses,
                        "mt-2 h-auto min-h-32 resize-y py-3",
                        errors.message && "border-error",
                      )}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="mt-1.5 text-caption text-error"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <p role="alert" className="text-caption text-error">
                      Something went wrong sending your enquiry. Please try
                      again, or email us directly at
                      saravanakumaar@skinternationals.in.
                    </p>
                  )}

                  <div className="flex flex-col gap-3">
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
                        "Request a Quote"
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
