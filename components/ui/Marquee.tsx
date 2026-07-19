import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode[];
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({ children, direction = "left", className }: MarqueeProps) {
  return (
    <div aria-hidden="true" className={cn("marquee overflow-hidden", className)}>
      <div
        className={cn(
          "marquee__track flex w-max gap-11 whitespace-nowrap",
          direction === "right" && "marquee__track--right",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
