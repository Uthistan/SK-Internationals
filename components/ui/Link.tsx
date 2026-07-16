import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type LinkVariant = "default" | "accent" | "inverse";

interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {
  variant?: LinkVariant;
}

const variantClasses: Record<LinkVariant, string> = {
  default: "text-text hover:text-accent",
  accent: "text-accent",
  inverse: "text-white hover:text-accent",
};

export function Link({ variant = "default", className, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
