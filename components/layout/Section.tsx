import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ as: Tag = "section", id, className, children }: SectionProps) {
  return (
    <Tag id={id} className={cn("py-20 md:py-32 lg:py-40", className)}>
      {children}
    </Tag>
  );
}
