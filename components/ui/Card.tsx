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
        "rounded-lg bg-surface p-6 shadow-sm md:p-8",
        interactive && "transition-shadow hover:shadow-md",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
