"use client";

import { useRef } from "react";

import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: number;
  suffix?: string;
  /** Unit rendered after the figure, e.g. "years" — omit where the label carries it. */
  unit?: string;
  label: string;
  className?: string;
}

export function StatCard({
  value,
  suffix = "+",
  unit,
  label,
  className,
}: StatCardProps) {
  const valueRef = useRef<HTMLDivElement>(null);
  useCountUp(valueRef, value);

  return (
    <div
      className={cn("border-t border-border pt-6", className)}
    >
      <div
        aria-label={unit ? `${value}${suffix} ${unit}` : `${value}${suffix}`}
        className="flex items-baseline gap-0.5 text-display font-semibold text-text"
      >
        <span ref={valueRef} aria-hidden="true">
          0
        </span>
        <span aria-hidden="true" className="text-accent">
          {suffix}
        </span>
        {unit && (
          <span
            aria-hidden="true"
            className="ml-1.5 text-h3 font-medium text-text-secondary"
          >
            {unit}
          </span>
        )}
      </div>
      <p className="mt-3 max-w-40 text-caption font-medium text-text-secondary">
        {label}
      </p>
    </div>
  );
}
