"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleCheck, Loader2, MessageCircle } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Field, Select, inputClasses } from "@/components/ui/FormField";
import { Link } from "@/components/ui/Link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDeskStatus } from "@/hooks/useDeskStatus";
import {
  CONTACT_DESKS,
  OFFICE_HOURS,
  type ContactDesk,
} from "@/content/contacts";
import { SERVICE_PAGES } from "@/content/services";
import { ROUTES } from "@/components/layout/nav-links";
import {
  ORGANIZATION,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_HREF,
  whatsappHref,
} from "@/lib/site";
import { cn, telHref } from "@/lib/utils";

/**
 * Six fields, three of them optional. Anyone who can already name a mode, a
 * lane, and a cargo belongs on the quote page, which asks those questions
 * properly — this form exists for the visitor who cannot yet. Company and
 * service are asked because they route the enquiry to the right desk before a
 * human reads it; neither is required, because neither is worth a lost lead.
 */
const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about what you need"),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const WHATSAPP_FOLLOWUP_HREF = whatsappHref(
  "Hi SK Internationals, I just submitted an enquiry on your website.",
);

/** Built from the service pages, so the picker can never offer work we don't publish. */
const SERVICE_OPTIONS = SERVICE_PAGES.map((service) => service.title);

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", {
    start: "top 85%",
    stagger: 0.12,
  });

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
        <div ref={scopeRef}>
          {/* No lead paragraph. The hero directly above already names the three
              desks; repeating it here only pushes the switchboard — the thing a
              visitor actually came for — further down the page. */}
          <div data-reveal>
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Talk to Us Directly
            </span>
            <Heading
              as="h2"
              size="h1"
              className="mt-5 max-w-3xl text-balance text-text"
            >
              Reach the Desk That Owns Your File
            </Heading>
          </div>

          <MainLine />

          {/* Register left, form right — and the form takes the larger share.
              It is the only bordered surface on the page and now the wider
              column too, so the eye lands on it before the register beside it.
              No extra weight is added to it; the weight is taken off
              everything else. */}
          <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[1fr_1.35fr] lg:items-start lg:gap-14 xl:gap-16">
            {/* The gap between desks is the only thing separating them, so it
                has to be unmistakable — wider than any space inside a desk. */}
            <div className="flex flex-col gap-20 lg:gap-24">
              {CONTACT_DESKS.map((desk) => (
                <DeskGroup key={desk.id} desk={desk} />
              ))}
            </div>

            <Card data-reveal className="shadow-sm lg:sticky lg:top-28 lg:p-10">
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
                  <Heading as="h3" size="h2" className="text-text">
                    Enquiry received.
                  </Heading>
                  <Text as="p" size="body-lg" color="secondary">
                    We typically respond within one business day with next
                    steps.
                  </Text>
                  <ButtonGroup className="mt-2 w-full">
                    <Button
                      href={WHATSAPP_FOLLOWUP_HREF}
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
                  <div className="border-b border-border pb-7">
                    <Heading as="h3" size="h2" className="text-text">
                      Send an Enquiry
                    </Heading>
                    <Text as="p" size="caption" color="secondary" className="mt-2.5">
                      Know your lane already?{" "}
                      <Link href={ROUTES.requestQuote} className="font-medium">
                        Request a quote
                      </Link>{" "}
                      instead.
                    </Text>
                  </div>

                  {/* Paired only where the two fields answer one question —
                      "who is asking" and "how do we reach you". Everything that
                      carries the enquiry itself runs full width. */}
                  <div className="grid gap-6 sm:grid-cols-2">
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
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className={cn(
                          inputClasses,
                          errors.name && "border-error",
                        )}
                        {...register("name")}
                      />
                    </Field>

                    <Field
                      id="company"
                      label={
                        <>
                          Company
                          <span className="ml-1.5 font-normal text-text-secondary normal-case">
                            (optional)
                          </span>
                        </>
                      }
                    >
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Your company"
                        className={inputClasses}
                        {...register("company")}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
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
                  </div>

                  <Field
                    id="service"
                    label={
                      <>
                        Service required
                        <span className="ml-1.5 font-normal text-text-secondary normal-case">
                          (optional)
                        </span>
                      </>
                    }
                  >
                    <Select
                      id="service"
                      defaultValue=""
                      {...register("service")}
                    >
                      <option value="">Not sure yet — advise me</option>
                      {SERVICE_OPTIONS.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field
                    id="message"
                    label="How can we help?"
                    required
                    error={errors.message?.message}
                  >
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="What you need, where it is going, and when…"
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={cn(
                        inputClasses,
                        "h-auto min-h-40 resize-y py-3.5",
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

                  <div className="flex flex-col gap-3 border-t border-border pt-6">
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
                        "Send Enquiry"
                      )}
                    </Button>
                    <Text
                      as="p"
                      size="caption"
                      color="secondary"
                      className="text-center"
                    >
                      Our team typically responds within one business day.
                    </Text>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * The switchboard, given the full measure of the page rather than the narrow
 * register column it used to sit in: one number, reachable three ways, for the
 * visitor who does not yet know which desk owns their question. Set at heading
 * scale because on a contact page the number *is* the headline — a 24px line
 * folded into a column read as a footnote to the desks below it.
 */
function MainLine() {
  return (
    <div
      data-reveal
      className="mt-12 grid gap-6 border-y border-border py-8 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-10 md:mt-14 md:py-10"
    >
      <div>
        <p className="text-caption font-semibold tracking-widest text-text-secondary uppercase">
          Main line
        </p>
        <a
          href={PHONE_HREF}
          className="mt-3 block text-h1 font-semibold text-text transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {PHONE_DISPLAY}
        </a>
      </div>

      {/* Flush right against the number's left edge: the alignment is what
          pairs the two, so neither needs a rule or a box to be read together. */}
      <div className="sm:text-right">
        <DeskStatus />
        <p className="mt-2.5 text-caption text-text-secondary">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            WhatsApp the same number
          </a>
          <span aria-hidden="true" className="px-2 text-border">
            ·
          </span>
          <a
            href={`mailto:${ORGANIZATION.email}`}
            className="wrap-break-word underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {ORGANIZATION.email}
          </a>
        </p>
      </div>
    </div>
  );
}

/**
 * Whether anyone is actually at the desk, in four words. Renders the published
 * hours on the server and swaps to live state once hydrated — the static line
 * is true at every hour, so a visitor without JavaScript is told something
 * correct rather than nothing.
 */
function DeskStatus() {
  const status = useDeskStatus();

  if (!status) {
    return <p className="text-caption text-text-secondary">{OFFICE_HOURS}</p>;
  }

  return (
    <p className="inline-flex items-center gap-2 text-caption text-text-secondary">
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          status.open ? "bg-success" : "bg-text-secondary/50",
        )}
      />
      {status.open
        ? `Open now · ${status.time} IST`
        : `Closed · replies next business day`}
    </p>
  );
}

/**
 * One desk, set as a typographic group rather than a card. The separation comes
 * from the space above the heading and the drop to caption on the purpose line —
 * a border around it would only repeat what the space already says.
 */
function DeskGroup({ desk }: { desk: ContactDesk }) {
  return (
    <div data-reveal>
      <Heading as="h3" size="h2" className="text-balance text-text">
        {desk.label}
      </Heading>
      <Text as="p" size="caption" color="secondary" className="mt-3 max-w-md">
        {desk.purpose}
      </Text>

      {/* Only the compliance desk carries these: that enquirer arrives holding a
          licence name rather than a shipment, and needs to see it written down
          before they believe the desk is the right one. */}
      {desk.topics && (
        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-caption">
          {desk.topics.map((topic, i) => (
            <span key={topic.href} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-border">
                  ·
                </span>
              )}
              <Link href={topic.href} className="text-text-secondary!">
                {topic.label}
              </Link>
            </span>
          ))}
        </p>
      )}

      {/* Two lines per person rather than three columns: the register column is
          now the narrower half of the page, and a three-column table there
          reads as a spreadsheet — name and number set against each other on one
          baseline, address beneath, reads as a directory. */}
      <ul className="mt-8">
        {desk.contacts.map(({ name, role, email, phone }) => (
          <li
            key={`${desk.id}-${email}`}
            className="group relative border-t border-border py-5 pl-4"
          >
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-full w-0.5 bg-transparent transition-colors duration-300 group-hover:bg-accent"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <span className="min-w-0">
                <span className="text-body-lg font-semibold text-text">
                  {/* Named "Main desk" rather than repeated from the heading —
                      a shared mailbox echoing the department title directly
                      above it says nothing the reader doesn't already know. */}
                  {name ?? "Main desk"}
                </span>
                {role && (
                  <span className="mt-0.5 block text-caption text-text-secondary">
                    {role}
                  </span>
                )}
              </span>

              {/* An em dash rather than nothing at all: a desk that publishes no
                  mobile is telling you something, and the column should keep
                  saying it as the eye runs down the list. */}
              {phone ? (
                <a
                  href={telHref(phone)}
                  className="text-body tabular-nums text-text-secondary transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {phone}
                </a>
              ) : (
                <span aria-hidden="true" className="text-body text-border">
                  —
                </span>
              )}
            </div>

            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block text-body wrap-break-word text-text-secondary transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
