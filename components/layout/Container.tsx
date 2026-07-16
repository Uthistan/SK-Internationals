import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-full px-4 md:max-w-180 md:px-6 lg:max-w-240 xl:max-w-300 xl:px-8 2xl:max-w-330",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
