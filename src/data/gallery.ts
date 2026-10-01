import type { GalleryImage } from "@/types";

/**
 * DEMO CONTENT — editorial gallery composition.
 *
 * Pure CSS Grid, no masonry dependency. The explicit column spans below are
 * what create the editorial rhythm; `aspect` is used only to hint the intended
 * crop at breakpoints where the span changes.
 *
 * Replace `src` with real photography of the restaurant. Width/height must be
 * updated to match the new files so `next/image` can reserve space.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/dining-candles.jpg",
    alt: "Table dressée pour un dîner convivial, bougies allumées",
    aspect: "portrait",
    width: 1500,
    height: 2250,
    caption: "La table",
  },
  {
    src: "/images/gallery/shared-bowls.jpg",
    alt: "Bols de cuisine méditerranéenne partagés à table",
    aspect: "portrait",
    width: 1500,
    height: 2249,
    caption: "À partager",
  },
  {
    src: "/images/gallery/table-setting.jpg",
    alt: "Table dressée de style méditerranéen, assiettes et verres",
    aspect: "landscape",
    width: 1500,
    height: 1000,
  },
  {
    src: "/images/dishes/octopus-gallega.jpg",
    alt: "Poulpe grillé avec roquette et quartier de citron",
    aspect: "portrait",
    width: 1500,
    height: 2250,
    caption: "Poulpe",
  },
  {
    src: "/images/gallery/grilled-fish-steel.jpg",
    alt: "Poisson grillé présenté sur une assiette en acier",
    aspect: "square",
    width: 1500,
    height: 1500,
  },
  {
    src: "/images/gallery/shared-table.jpg",
    alt: "Plats partagés disposés sur une table en bois",
    aspect: "landscape",
    width: 1500,
    height: 1000,
    caption: "Le partage",
  },
  {
    src: "/images/restaurant/interior-cozy.jpg",
    alt: "Salle chaleureuse avec tables dressées et éclairages doux",
    aspect: "portrait",
    width: 1500,
    height: 2000,
    caption: "La salle",
  },
  {
    src: "/images/dishes/paella-seafood.jpg",
    alt: "Assiette de paella aux gambas et aux calamars",
    aspect: "landscape",
    width: 1500,
    height: 1000,
  },
];

/**
 * Four-tile editorial feed for the Instagram section.
 *
 * DEMO ONLY — these are local stock photographs standing in for a feed. No
 * live Instagram content is fetched, and no follower counts, likes or
 * comments are displayed anywhere, because none could be verified.
 */
export const socialFeedImages = [
  {
    src: "/images/dishes/paella-pan.jpg",
    alt: "Aperçu de démonstration d'une publication Instagram : paella espagnole",
    width: 1500,
    height: 843,
  },
  {
    src: "/images/dishes/octopus-plating.jpg",
    alt: "Aperçu de démonstration d'une publication Instagram : poulpe grillé",
    width: 1500,
    height: 2250,
  },
  {
    src: "/images/gallery/dining-candles.jpg",
    alt: "Aperçu de démonstration d'une publication Instagram : table dressée",
    width: 1500,
    height: 2250,
  },
  {
    src: "/images/dishes/seafood-platter.jpg",
    alt: "Aperçu de démonstration d'une publication Instagram : plateau de fruits de mer",
    width: 1500,
    height: 1000,
  },
] as const;