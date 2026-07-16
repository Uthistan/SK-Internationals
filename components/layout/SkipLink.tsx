import { Link } from "@/components/ui/Link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:shadow-lg"
    >
      Skip to content
    </Link>
  );
}
