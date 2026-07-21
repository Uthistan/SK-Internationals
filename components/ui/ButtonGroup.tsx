import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

/**
 * Row of CTAs that stays a row on the smallest phones. Stacked buttons push the
 * secondary action below the fold and read as a form, so instead the group
 * becomes equal-width columns and the labels wrap inside them — which needs the
 * button's fixed height relaxed until the `sm` breakpoint.
 */
export function ButtonGroup({
  className,
  children,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "grid auto-cols-fr grid-flow-col gap-3",
        "*:h-auto *:min-h-12 *:px-4 *:py-2.5 *:text-caption *:leading-tight",
        "sm:flex sm:flex-wrap sm:items-center sm:gap-4",
        "sm:*:h-12 sm:*:min-h-0 sm:*:px-6 sm:*:py-0 sm:*:text-body",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
