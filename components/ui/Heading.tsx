import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "display" | "h1" | "h2" | "h3";

interface HeadingProps {
  as: HeadingLevel;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display font-bold",
  h1: "text-h1 font-bold",
  h2: "text-h2 font-semibold",
  h3: "text-h3 font-semibold",
};

export function Heading({ as: Tag, size = "h3", className, children }: HeadingProps) {
  return <Tag className={cn(sizeClasses[size], className)}>{children}</Tag>;
}
