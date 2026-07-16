"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CircleCheck, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/components/ui/Link";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const enquirySchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().min(2, "Enter your company name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().optional(),
  tradeLane: z.string().min(1, "Select a trade lane"),
  message: z.string().min(10, "Tell us a little more about your shipment"),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const inputClasses =
  "h-12 w-full rounded-md border border-border bg-surface px-4 text-body text-text transition-colors focus:border-accent focus:outline-none";

const TRADE_LANES = [
  { value: "gulf", label: "Persian & Arabian Gulf" },
  { value: "red-sea", label: "Red Sea" },
  { value: "indian-subcontinent", label: "Indian Sub-Continent" },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { tradeLane: "" },
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
    reset({ tradeLane: "" });
    setSubmitted(false);
    setSubmitError(false);
  }

  return (
    <Section id="contact" className="bg-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <span className="text-caption font-semibold tracking-widest text-accent uppercase">
              Contact
            </span>
            <Heading as="h2" size="h1" className="max-w-md text-primary">
              Tell us about your shipment.
            </Heading>
            <Text as="p" size="body-lg" color="secondary" className="max-w-md">
              Whether you&rsquo;re a direct shipper or an overseas partner, a
              real person reviews every enquiry — we typically respond within
              one business day.
            </Text>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <Text as="p" size="caption" color="secondary">
                  Registered office: SMS Complex, No. 10, 1st Floor, Rani
                  Garden, Opposite Jayendra Saraswathy College, Singanallur,
                  Coimbatore - 641033
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <Text as="p" size="caption" color="secondary">
                  Operational bases in Chennai &amp; Tuticorin, India
                </Text>
              </div>
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <Link
                  href="mailto:saravanakumaar@skinternationals.in"
                  className="text-caption text-text-secondary"
                >
                  saravanakumaar@skinternationals.in
                </Link>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  aria-hidden="true"
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <Link
                  href="tel:+918870015754"
                  className="text-caption text-text-secondary"
                >
                  +91 88700 15754
                </Link>
              </div>
            </div>
          </div>

          <Card className="w-full">
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-start gap-4 py-6"
              >
                <CircleCheck
                  aria-hidden="true"
                  size={32}
                  strokeWidth={1.5}
                  className="text-success"
                />
                <Heading as="h3" size="h3" className="text-primary">
                  Enquiry received.
                </Heading>
                <Text as="p" color="secondary">
                  We typically respond within one business day with next steps.
                </Text>
                <Button variant="secondary" onClick={handleSendAnother}>
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-caption font-medium text-text"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
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
                      className="mt-1 text-caption text-error"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="text-caption font-medium text-text"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
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
                      className="mt-1 text-caption text-error"
                    >
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-caption font-medium text-text"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
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
                      className="mt-1 text-caption text-error"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-caption font-medium text-text"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={cn(inputClasses, "mt-2")}
                    {...register("phone")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tradeLane"
                    className="text-caption font-medium text-text"
                  >
                    Trade lane
                  </label>
                  <select
                    id="tradeLane"
                    aria-invalid={!!errors.tradeLane}
                    aria-describedby={
                      errors.tradeLane ? "tradeLane-error" : undefined
                    }
                    className={cn(
                      inputClasses,
                      "mt-2",
                      errors.tradeLane && "border-error",
                    )}
                    defaultValue=""
                    {...register("tradeLane")}
                  >
                    <option value="" disabled>
                      Select a trade lane
                    </option>
                    {TRADE_LANES.map((lane) => (
                      <option key={lane.value} value={lane.value}>
                        {lane.label}
                      </option>
                    ))}
                  </select>
                  {errors.tradeLane && (
                    <p
                      id="tradeLane-error"
                      role="alert"
                      className="mt-1 text-caption text-error"
                    >
                      {errors.tradeLane.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-caption font-medium text-text"
                  >
                    Shipment details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={cn(
                      inputClasses,
                      "mt-2 h-auto min-h-30 resize-y py-3",
                      errors.message && "border-error",
                    )}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1 text-caption text-error"
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
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
              </form>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
