import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

// The vertical rhythm, expressed per edge from the same padding scale. Adjacent
// sections each contribute one edge, so a boundary between two "default"
// sections is intentionally the sum of both. A terminal band that sits directly
// on the section above it uses "flush-top" to drop its own top padding, leaving
// the gap above it as the single padding of the preceding section rather than a
// doubled one.
const SECTION_SPACING = {
  default: "py-20 md:py-32 lg:py-40",
  "flush-top": "pb-20 md:pb-32 lg:pb-40",
} as const;

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  as?: ElementType;
  children: ReactNode;
  spacing?: keyof typeof SECTION_SPACING;
}

export function Section({
  as: Tag = "section",
  spacing = "default",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    // Rest props pass through so callers can attach data attributes — the
    // header reads `data-header-scrim` off the hero to decide whether it may
    // stay transparent.
    <Tag className={cn(SECTION_SPACING[spacing], className)} {...rest}>
      {children}
    </Tag>
  );
}
