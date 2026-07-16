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
    <Tag id={id} className={cn("py-12 md:py-24", className)}>
      {children}
    </Tag>
  );
}
