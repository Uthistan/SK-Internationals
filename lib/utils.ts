export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * `tel:` accepts the leading plus and digits only — the spaces a number is
 * printed with break the dialler on some Android handsets rather than being
 * stripped, so every number on the site goes through here on its way to an href.
 */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
