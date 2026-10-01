/** Menu category identifiers. Order here drives the rendered menu order. */
export type MenuCategory =
  | "a-partager"
  | "entrees"
  | "poissons"
  | "paellas"
  | "plats"
  | "desserts";

export type MenuItem = {
  id: string;
  name: string;
  /**
   * DEMO CONTENT — generic, deliberately non-specific descriptions.
   * Replace with the wording the restaurant actually uses.
   */
  description?: string;
  category: MenuCategory;
  /**
   * Always null in the demo. Prices are deliberately absent rather than
   * invented — see the note in `src/data/menu.ts`.
   */
  price?: string | null;
  featured?: boolean;
  /** Marks the item as placeholder copy pending the real menu. */
  isDemo?: boolean;
};

export type GalleryImage = {
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
  /** Intrinsic source dimensions, used to reserve space and avoid CLS. */
  width: number;
  height: number;
  /** Optional short caption revealed on hover. Decorative when omitted. */
  caption?: string;
};

export type SignatureDish = {
  id: string;
  name: string;
  description: string;
  image: string;
  width: number;
  height: number;
  /** Short Spanish or French label used as an editorial accent. */
  accent?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type ContactChannel = {
  id: "phone" | "whatsapp" | "email" | "instagram";
  label: string;
  value: string;
  href: string;
  /** Channels that leave the site open in a new tab. */
  external?: boolean;
};

/** Shape of the reservation inquiry form. */
export type ReservationFieldName =
  | "name"
  | "phone"
  | "partySize"
  | "date"
  | "time"
  | "message";

export type ReservationValues = Record<ReservationFieldName, string>;

export type ReservationErrors = Partial<
  Record<ReservationFieldName, string>
>;