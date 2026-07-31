import type { ComponentPropsWithRef, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Taller than the 48px floor and squared to `radius-md`, on the off-white page
 * tone rather than the panel's white — the field reads as a recess in the card
 * instead of a box drawn on top of it. Focus moves the border to accent and
 * lifts the fill to white.
 */
export const inputClasses =
  "h-14 w-full rounded-md border border-border bg-background px-4 text-body text-text transition-colors duration-200 placeholder:text-text-secondary/45 hover:border-text-secondary/45 focus:border-accent focus:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-accent/30";

export const labelClasses =
  "text-caption font-semibold tracking-wide text-text uppercase";

interface FieldProps {
  id: string;
  label: ReactNode;
  error?: string;
  /** Marks the control required for sighted users; `required` on the input carries it for AT. */
  required?: boolean;
  children: ReactNode;
}

/**
 * Label, control, and inline error in one rhythm. Shared by the enquiry and
 * quote forms so a change to field spacing can never apply to only one of them.
 */
export function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-error">
            *
          </span>
        )}
      </label>
      <div className="mt-2.5">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-caption text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectProps extends ComponentPropsWithRef<"select"> {
  invalid?: boolean;
}

/**
 * Native select — fully keyboard operable per DESIGN_SYSTEM — with the OS arrow
 * suppressed and our own chevron drawn in, because the platform arrow is the
 * one control that would not match anything else on the page.
 */
export function Select({ invalid, className, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(inputClasses, "appearance-none pr-12", invalid && "border-error", className)}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-secondary"
      />
    </div>
  );
}
