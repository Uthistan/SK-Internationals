"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleCheck, Loader2, MessageCircle } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Field, Select, inputClasses } from "@/components/ui/FormField";
import { Link } from "@/components/ui/Link";
import { ROUTES } from "@/components/layout/nav-links";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { COUNTRY_GROUPS } from "@/content/countries";
import {
  CARGO_TYPES,
  MOVEMENT_TYPES,
  SHIPMENT_PURPOSES,
  SHIPPING_MODES,
} from "@/content/quote";
import { ORGANIZATION } from "@/lib/site";
import { cn } from "@/lib/utils";

const quoteSchema = z.object({
  mode: z.string().min(1, "Choose how you would like to ship"),
  movement: z.string().min(1, "Choose a movement type"),
  origin: z.string().min(1, "Select where the cargo ships from"),
  destination: z.string().min(1, "Select where the cargo ships to"),
  cargo: z.string().min(1, "Select what you are shipping"),
  quantity: z.string().min(1, "Tell us the approximate quantity"),
  purpose: z.string().min(1, "Choose commercial or personal"),
  name: z.string().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const WHATSAPP_HREF = `https://wa.me/${ORGANIZATION.whatsapp}?text=${encodeURIComponent(
  "Hi SK Internationals, I just requested a quote on your website.",
)}`;

/** Country options are identical at both ends — cross trade is a service we sell. */
function CountryOptions() {
  return (
    <>
      {COUNTRY_GROUPS.map((group) => (
        <optgroup key={group.region} label={group.region}>
          {group.countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  );
}

/**
 * The structured quote request. Split into two groups — the shipment, then how
 * to reach you — because eleven fields in one run reads as an interrogation,
 * and a buyer abandons an over-qualifying form (see BUSINESS_CONTEXT
 * anti-patterns). The contact page keeps the short, unstructured route for
 * anyone not ready to specify a lane.
 */
export function RequestQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef, "[data-reveal]", { start: "top 85%", stagger: 0.12 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      mode: "",
      movement: "",
      origin: "",
      destination: "",
      cargo: "",
      purpose: "",
    },
  });

  async function onSubmit(values: QuoteFormValues) {
    setSubmitError(false);
    try {
      const response = await fetch("/api/quote", {
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
    <Section id="request-quote" className="bg-surface-alt">
      <Container>
        <div ref={scopeRef} className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              What Happens Next
            </span>
            <Heading as="h2" size="h2" className="mt-5 text-text">
              A Real Rate, Not a Callback
            </Heading>
            <Text as="p" color="secondary" className="mt-4">
              Give us the lane and the cargo and we come back with what it costs
              and how long it takes. If something is still undecided, choose
              &ldquo;not sure&rdquo; and we will work it out with you.
            </Text>

            <ul className="mt-10 border-t border-border">
              {[
                "We read it the same working day",
                "You get a written rate, not a discovery call",
                "One team owns the file from quote to delivery",
              ].map((item) => (
                <li
                  key={item}
                  className="border-b border-border py-4 text-body text-text"
                >
                  {item}
                </li>
              ))}
            </ul>

            <Text as="p" color="secondary" className="mt-8">
              Not ready to specify a lane?{" "}
              <Link href={ROUTES.contact} className="font-medium">
                Send us a message instead
              </Link>
              .
            </Text>
          </div>

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
                  Quote request received.
                </Heading>
                <Text as="p" size="body-lg" color="secondary">
                  We typically respond within one business day with a rate and
                  transit time.
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
                    Request another quote
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
                    Request a Quote
                  </Heading>
                  <Text as="p" color="secondary" className="mt-2.5">
                    Share some quick details and we will get back to you
                    shortly.
                  </Text>
                </div>

                <Field
                  id="mode"
                  label="How would you like to ship?"
                  required
                  error={errors.mode?.message}
                >
                  <Select
                    id="mode"
                    invalid={!!errors.mode}
                    aria-describedby={errors.mode ? "mode-error" : undefined}
                    defaultValue=""
                    {...register("mode")}
                  >
                    <option value="" disabled>
                      Select a shipping mode
                    </option>
                    {SHIPPING_MODES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  id="movement"
                  label="Movement type"
                  required
                  error={errors.movement?.message}
                >
                  <Select
                    id="movement"
                    invalid={!!errors.movement}
                    aria-describedby={
                      errors.movement ? "movement-error" : undefined
                    }
                    defaultValue=""
                    {...register("movement")}
                  >
                    <option value="" disabled>
                      Select a movement type
                    </option>
                    {MOVEMENT_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  id="origin"
                  label="Where are you shipping from?"
                  required
                  error={errors.origin?.message}
                >
                  <Select
                    id="origin"
                    invalid={!!errors.origin}
                    aria-describedby={errors.origin ? "origin-error" : undefined}
                    defaultValue=""
                    {...register("origin")}
                  >
                    <option value="" disabled>
                      Select origin country
                    </option>
                    <CountryOptions />
                  </Select>
                </Field>

                <Field
                  id="destination"
                  label="Where are you shipping to?"
                  required
                  error={errors.destination?.message}
                >
                  <Select
                    id="destination"
                    invalid={!!errors.destination}
                    aria-describedby={
                      errors.destination ? "destination-error" : undefined
                    }
                    defaultValue=""
                    {...register("destination")}
                  >
                    <option value="" disabled>
                      Select destination country
                    </option>
                    <CountryOptions />
                  </Select>
                </Field>

                <Field
                  id="cargo"
                  label="What are you shipping?"
                  required
                  error={errors.cargo?.message}
                >
                  <Select
                    id="cargo"
                    invalid={!!errors.cargo}
                    aria-describedby={errors.cargo ? "cargo-error" : undefined}
                    defaultValue=""
                    {...register("cargo")}
                  >
                    <option value="" disabled>
                      Select cargo type
                    </option>
                    {CARGO_TYPES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field
                  id="quantity"
                  label="Approximate quantity"
                  required
                  error={errors.quantity?.message}
                >
                  <input
                    id="quantity"
                    type="text"
                    placeholder="e.g. 12 pallets, 2 x 40ft, 850 kg"
                    aria-invalid={!!errors.quantity}
                    aria-describedby={
                      errors.quantity ? "quantity-error" : undefined
                    }
                    className={cn(inputClasses, errors.quantity && "border-error")}
                    {...register("quantity")}
                  />
                </Field>

                <Field
                  id="purpose"
                  label="Commercial or personal?"
                  required
                  error={errors.purpose?.message}
                >
                  <Select
                    id="purpose"
                    invalid={!!errors.purpose}
                    aria-describedby={
                      errors.purpose ? "purpose-error" : undefined
                    }
                    defaultValue=""
                    {...register("purpose")}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    {SHIPMENT_PURPOSES.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Field>

                {/* The reference form had no contact fields at all, which would
                    leave us a shipment we cannot reply to. */}
                <div className="border-t border-border pt-7">
                  <p className="text-caption font-semibold tracking-widest text-text-secondary uppercase">
                    How We Reach You
                  </p>
                </div>

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
                    className={cn(inputClasses, errors.name && "border-error")}
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
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(inputClasses, errors.email && "border-error")}
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
                  label={
                    <>
                      Anything else
                      <span className="ml-1.5 font-normal text-text-secondary normal-case">
                        (optional)
                      </span>
                    </>
                  }
                >
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Ready date, special handling, target transit time…"
                    className={cn(inputClasses, "h-auto min-h-32 resize-y py-3.5")}
                    {...register("message")}
                  />
                </Field>

                {submitError && (
                  <p role="alert" className="text-caption text-error">
                    Something went wrong sending your request. Please try again,
                    or email us directly at {ORGANIZATION.email}.
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
                      "Send Request"
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
      </Container>
    </Section>
  );
}
