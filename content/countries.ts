import { Country } from "country-state-city";

export interface CountryOption {
  /** ISO 3166-1 alpha-2 — the value the form stores and posts. */
  value: string;
  /** Flag and name, the only things an option shows. */
  label: string;
  /** Name alone: what search matches, and what the notification email prints. */
  name: string;
}

/**
 * Every country, flag and name only, sorted by name.
 *
 * Derived from `country-state-city` rather than kept by hand so the list cannot
 * drift, and built once at module scope rather than per render. Origin and
 * destination read from this same constant — cross trade is a service we sell,
 * so neither end is pinned to India.
 *
 * The collation is pinned to `en` because this module is evaluated on the
 * server and again in the browser; an ambient locale would let the two orders
 * disagree and hydration would mismatch.
 */
export const COUNTRY_OPTIONS: CountryOption[] = Country.getAllCountries()
  .map(({ isoCode, name, flag }) => ({
    value: isoCode,
    label: `${flag} ${name}`,
    name,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

/**
 * ISO code to plain name, so the notification email names the country rather
 * than repeating the code the form posted.
 */
export const COUNTRY_LABELS: Record<string, string> = Object.fromEntries(
  COUNTRY_OPTIONS.map(({ value, name }) => [value, name]),
);
