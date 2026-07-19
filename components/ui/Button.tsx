import NextLink from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButtonProps = ButtonOwnProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLinkProps = ButtonOwnProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseClasses =
  "inline-flex h-12 items-center justify-center rounded-md px-6 text-body font-medium transition-all active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-40";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-[0_0_20px_rgba(234,88,12,0.35)] hover:bg-primary-hover hover:shadow-[0_0_30px_rgba(234,88,12,0.55)]",
  secondary:
    "border border-secondary text-secondary hover:border-primary hover:text-primary",
  ghost: "text-secondary hover:text-primary",
};

export function Button({ variant = "primary", className, children, href, ...rest }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <NextLink
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </NextLink>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
