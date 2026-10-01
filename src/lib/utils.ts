/** Joins conditional class names, dropping falsy entries. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Builds an in-page section href that also works from other routes.
 * On the homepage a bare `#id` is used; elsewhere it becomes `/#id` so the
 * nav links keep working on `/menu`.
 */
export function sectionHref(id: string, isHome: boolean): string {
  return isHome ? `#${id}` : `/#${id}`;
}

/** Clamps a number into an inclusive range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Today's date as YYYY-MM-DD in local time.
 *
 * Used as the `min` on the reservation date input. Computed in the browser
 * (not the server) so it reflects the visitor's own calendar day rather than
 * the server's timezone.
 */
export function todayISODate(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

/** Formats a date string (YYYY-MM-DD) as a readable French date. */
export function formatFrenchDate(iso: string): string {
  const parsed = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}