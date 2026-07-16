import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type TextTag = "p" | "span" | "div";
type TextSize = "body-lg" | "body" | "caption";
type TextColor = "primary" | "secondary";

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: TextTag;
  size?: TextSize;
  color?: TextColor;
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<TextSize, string> = {
  "body-lg": "text-body-lg font-normal",
  body: "text-body font-normal",
  caption: "text-caption font-medium",
};

const colorClasses: Record<TextColor, string> = {
  primary: "text-text",
  secondary: "text-text-secondary",
};

export function Text({
  as: Tag = "p",
  size = "body",
  color = "primary",
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={cn(sizeClasses[size], colorClasses[color], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
