import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  as?: ElementType;
  children: ReactNode;
}

export function Section({
  as: Tag = "section",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    // Rest props pass through so callers can attach data attributes — the
    // header reads `data-header-scrim` off the hero to decide whether it may
    // stay transparent.
    <Tag className={cn("py-20 md:py-32 lg:py-40", className)} {...rest}>
      {children}
    </Tag>
  );
}
