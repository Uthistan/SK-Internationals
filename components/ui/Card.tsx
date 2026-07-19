import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-border bg-surface p-7 md:p-9",
        interactive &&
          "transition-colors duration-300 ease-out hover:border-secondary/25",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
