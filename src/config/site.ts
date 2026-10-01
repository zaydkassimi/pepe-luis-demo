/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH FOR BUSINESS INFORMATION
 * ============================================================================
 *
 * This project is an UNOFFICIAL sales concept. It is not the restaurant's
 * website and must not be presented as one.
 *
 * Everything below marked `VERIFY BEFORE LAUNCH` is unconfirmed. Public
 * directories disagree about contact details, so nothing has been guessed.
 * Empty strings mean "not verified" — components read these values and hide
 * the corresponding UI entirely rather than rendering a broken link.
 *
 * To make this a real site:
 *   1. Fill in phone / whatsapp / email / mapsUrl / reservationUrl.
 *   2. Set `openingHours.verified` to true once hours are confirmed.
 *   3. Set `demoMode` to false.
 *   4. Set `url` to the production origin (used for OG image metadata).
 *   5. Replace the demo menu in `src/data/menu.ts` and the demo photography
 *      in `public/images/`.
 */

export type SiteConfig = {
  name: string;
  city: string;
  country: string;
  countryCode: string;
  descriptor: string;
  tagline: string;
  description: string;
  instagramHandle: string;
  instagramUrl: string;
  phone: string;
  whatsapp: string;
  email: string;
  addressShort: string;
  addressLine2: string;
  mapsUrl: string;
  openingHours: {
    display: string;
    verified: boolean;
  };
  reservationUrl: string;
  demoMode: boolean;
  url: string;
};

/**
 * Explicitly typed rather than `as const`.
 *
 * With `as const`, an empty field like `whatsapp: ""` is inferred as the literal
 * type `""`, so a guard such as `if (!siteConfig.whatsapp) return null` narrows
 * the value to `never` and the following `.replace()` fails to typecheck — the
 * error only appears once someone fills the field in, by which point it reads
 * as unrelated. Typing the fields as `string` keeps the guard honest.
 */
export const siteConfig: SiteConfig = {
  /** Brand name. Do not prefix with "Chez" — the trade name is "Pepe Luis". */
  name: "Pepe Luis",
  city: "Casablanca",
  country: "Maroc",
  countryCode: "MA",

  /** Short descriptor used in the footer and OG tags. */
  descriptor: "Cuisine espagnole · Casablanca",

  /** One-line positioning statement. */
  tagline: "Le goût de la mer, le rythme de l'Espagne.",

  /** Used for <meta name="description"> and the default OG description. */
  description:
    "Pepe Luis, cuisine espagnole et fruits de mer à Casablanca. Une table pour partager la paella, le poulpe et les produits de la mer.",

  /**
   * VERIFY BEFORE LAUNCH.
   * Publicly listed handle. Kept as the only always-usable contact channel,
   * because it is the one detail we can actually evidence.
   */
  instagramHandle: "pepeluiscasablanca",
  instagramUrl: "https://www.instagram.com/pepeluiscasablanca/",

  /**
   * VERIFY BEFORE LAUNCH — leave empty until confirmed directly with the
   * restaurant. Do not copy these from a directory listing: public sources
   * conflict, and a wrong phone number on a restaurant demo is worse than no
   * phone number at all.
   *
   * Expected formats: phone "+212 5 22 00 00 00", whatsapp "212522000000".
   */
  phone: "",
  whatsapp: "",
  email: "",

  /**
   * Street-level address is only partially public: tourism listings place the
   * restaurant around Rue de Normandie, but no verified street number exists.
   * The number is intentionally omitted rather than invented.
   *
   * VERIFY BEFORE LAUNCH — add mapsUrl (a Google Maps or Apple Maps deep link)
   * to enable the "Itinéraire" call to action. While empty, no map link and
   * no coordinates are rendered anywhere.
   */
  addressShort: "Rue de Normandie, Casablanca",
  addressLine2: "",
  mapsUrl: "",

  /**
   * VERIFY BEFORE LAUNCH.
   * Publicly listed direction is 12h00–00h00. Treated as unverified because
   * opening hours change, and because this demo renders a static label rather
   * than a computed "open now" status (which would need timezone-aware logic
   * and could easily show the wrong thing).
   */
  openingHours: {
    display: "Tous les jours · 12h00 — 00h00",
    /** Set to true only once the restaurant has confirmed the hours above. */
    verified: false,
  },

  /**
   * VERIFY BEFORE LAUNCH — an external booking engine URL, if one is used.
   * While empty, "Réserver" links scroll to the on-page demo inquiry form.
   */
  reservationUrl: "",

  /**
   * Demo flag. When true the UI shows the "présentation de démonstration"
   * notes on the menu and keeps the unofficial-concept footer disclosure.
   * Set to false once real menu content and verified data are in place.
   */
  demoMode: true,

  /** Production origin, e.g. "https://example.com". Empty disables OG image URLs. */
  url: "",
};

/**
 * Primary navigation. These are in-page sections on the homepage; the Navbar
 * rewrites them to `/#id` when rendered on another route.
 */
export const navItems = [
  { label: "L'expérience", href: "#experience" },
  { label: "Les signatures", href: "#signatures" },
  { label: "La galerie", href: "#galerie" },
  { label: "Le restaurant", href: "#restaurant" },
  { label: "Contact", href: "#contact" },
] as const;

/** Formats a WhatsApp number into a wa.me deep link. Returns null if unset. */
export function getWhatsAppUrl(): string | null {
  if (!siteConfig.whatsapp) return null;
  return `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;
}

/** Returns a tel: href, or null when no phone number has been verified. */
export function getPhoneHref(): string | null {
  if (!siteConfig.phone) return null;
  return `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;
}

/** Returns a mailto: href, or null when no email has been verified. */
export function getMailHref(): string | null {
  if (!siteConfig.email) return null;
  return `mailto:${siteConfig.email}`;
}

/**
 * The primary reservation destination.
 * Prefers a verified booking engine; otherwise falls back to the on-page form.
 */
export function getReservationHref(): string {
  return siteConfig.reservationUrl || "#reservation";
}