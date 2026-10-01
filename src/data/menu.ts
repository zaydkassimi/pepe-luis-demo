import type { MenuCategory, MenuItem } from "@/types";

/**
 * ============================================================================
 * DEMO CONTENT
 * ============================================================================
 *
 * Replace this entire file with the restaurant's verified current menu before
 * any production use. Nothing in it has been confirmed by the restaurant.
 *
 * Deliberate omissions — do not fill these in without a source:
 *
 *   • `price` is `null` everywhere. Believable-looking prices were refused
 *     because an invented price on a real restaurant's demo is a commercial
 *     error, not a design detail. The UI renders no price column at all when
 *     every price is absent, so the menu still looks finished without them.
 *   • No allergen statements. Any "sans gluten / végétarien / halal" claim
 *     would be a health and compliance risk.
 *   • No ingredient lists. Descriptions stay generic on purpose.
 *   • `isDemo: true` on every item so the UI can show one discreet note.
 *
 * The set is intentionally short (4 items per category, 6 categories) so that
 * swapping in a real menu of any size is a data edit, not a redesign.
 */

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "a-partager", label: "À partager" },
  { id: "entrees", label: "Entrées" },
  { id: "poissons", label: "Poissons & fruits de mer" },
  { id: "paellas", label: "Paellas" },
  { id: "plats", label: "Plats" },
  { id: "desserts", label: "Douceurs" },
];

export const menuItems: MenuItem[] = [
  // --- À partager ---------------------------------------------------------
  {
    id: "partage-mer",
    name: "Sélection de fruits de mer",
    description: "Une assortment de fruits de mer à partager au centre de la table.",
    category: "a-partager",
    price: null,
    isDemo: true,
  },
  {
    id: "partage-charcuterie",
    name: "Planche de charcuteries",
    description: "Jambon ibérique et charcuterie servies avec du pain chaud.",
    category: "a-partager",
    price: null,
    isDemo: true,
  },
  {
    id: "partage-fromages",
    name: "Planche de fromages",
    description: "Une sélection de fromages à partager.",
    category: "a-partager",
    price: null,
    isDemo: true,
  },
  {
    id: "partage-tapas",
    name: "Tapas du jour",
    description: "Petites assiettes du moment, pensées pour être grignotées à plusieurs.",
    category: "a-partager",
    price: null,
    isDemo: true,
  },

  // --- Entrées ------------------------------------------------------------
  {
    id: "entree-huîtres",
    name: "Huîtres",
    description: "Une sélection d'huîtres, servies très froides.",
    category: "entrees",
    price: null,
    featured: true,
    isDemo: true,
  },
  {
    id: "entree-moules",
    name: "Moules",
    description: "Moules cuites et servies dans leur bouillon.",
    category: "entrees",
    price: null,
    isDemo: true,
  },
  {
    id: "entree-calamar",
    name: "Calamars",
    description: "Calamars légèrement grillés, servis avec une sauce légère.",
    category: "entrees",
    price: null,
    isDemo: true,
  },
  {
    id: "entree-tarte",
    name: "Tarte aux légumes",
    description: "Une part de tarte salée, selon l arrivage.",
    category: "entrees",
    price: null,
    isDemo: true,
  },

  // --- Poissons & fruits de mer ------------------------------------------
  {
    id: "poisson-du-jour",
    name: "Poisson du jour",
    description: "Le poisson du jour, grillé et servi avec son accompagnement.",
    category: "poissons",
    price: null,
    featured: true,
    isDemo: true,
  },
  {
    id: "poisson-grille",
    name: "Poisson grillé",
    description: "Un poisson grillé, servi avec des accompagnements simples et frais.",
    category: "poissons",
    price: null,
    isDemo: true,
  },
  {
    id: "poulpe-espagnole",
    name: "Poulpe à l'espagnole",
    description: "Poulpe à l espagnole, servi en assiette généreuse.",
    category: "poissons",
    price: null,
    featured: true,
    isDemo: true,
  },
  {
    id: "fruit-de-mer",
    name: "Assiette de fruits de mer",
    description: "Une assiette de fruits de mer selon l'arrivage du jour.",
    category: "poissons",
    price: null,
    isDemo: true,
  },

  // --- Paellas ------------------------------------------------------------
  {
    id: "paella-mer",
    name: "Paella de fruits de mer",
    description: "La paella aux fruits de mer, un classique de la maison.",
    category: "paellas",
    price: null,
    featured: true,
    isDemo: true,
  },
  {
    id: "paella-mixte",
    name: "Paella mixte",
    description: "Une paella plus variée, selon l arrivage.",
    category: "paellas",
    price: null,
    isDemo: true,
  },
  {
    id: "paella-legumes",
    name: "Paella de légumes",
    description: "Une paella aux légumes de saison.",
    category: "paellas",
    price: null,
    isDemo: true,
  },
  {
    id: "paella-flamenco",
    name: "Paella flamenco",
    description: "Une paella généreuse à partager, servie à la paella.",
    category: "paellas",
    price: null,
    isDemo: true,
  },

  // --- Plats --------------------------------------------------------------
  {
    id: "plat-poulpe",
    name: "Poulpe à l'espagnole",
    description: "Poulpe à l espagnole, un plat généreux de la cuisine espagnole.",
    category: "plats",
    price: null,
    isDemo: true,
  },
  {
    id: "plat-gras-poisson",
    name: "Morceau de poisson grillé",
    description: "Un morceau de poisson grillé, servi avec son accompagnement.",
    category: "plats",
    price: null,
    isDemo: true,
  },
  {
    id: "plat-mixte",
    name: "Assiette mixte",
    description: "Une assiette de fruits de mer, à partager.",
    category: "plats",
    price: null,
    isDemo: true,
  },
  {
    id: "plat-jour",
    name: "Plat du jour",
    description: "Un plat du jour, selon l arrivage et l inspiration de la maison.",
    category: "plats",
    price: null,
    isDemo: true,
  },

  // --- Douceurs -----------------------------------------------------------
  {
    id: "dessert-tiramisu",
    name: "Tiramisu maison",
    description: "Un tiramisu maison, dans la version espagnole.",
    category: "desserts",
    price: null,
    isDemo: true,
  },
  {
    id: "dessert-coulis",
    name: "Dessert du moment",
    description: "Un dessert du moment, selon l arrivage.",
    category: "desserts",
    price: null,
    isDemo: true,
  },
  {
    id: "dessert-flanc",
    name: "Flanc pâtissier",
    description: "Un flanc pâtissier, servi très frais.",
    category: "desserts",
    price: null,
    isDemo: true,
  },
  {
    id: "dessert-fruits",
    name: "Fruits de saison",
    description: "Une assiette de fruits de saison.",
    category: "desserts",
    price: null,
    isDemo: true,
  },
];

/**
 * The homepage preview shows a deliberately small, representative slice.
 * Pulling by `featured` keeps the homepage in step with the full menu
 * automatically when real data replaces this file.
 */
export const homepageMenuPreview: MenuItem[] = [
  "paella-mer",
  "poulpe-espagnole",
  "poisson-du-jour",
  "fruit-de-mer",
  "partage-mer",
  "paella-flamenco",
  "partage-tapas",
  "dessert-tiramisu",
]
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => item !== undefined);

/** Groups the full menu by category, preserving `menuCategories` order. */
export function getMenuByCategory(): { id: MenuCategory; label: string; items: MenuItem[] }[] {
  return menuCategories.map((category) => ({
    ...category,
    items: menuItems.filter((item) => item.category === category.id),
  }));
}

/** True when at least one item has a price. Drives whether a price column shows. */
export const menuHasPrices = menuItems.some(
  (item) => typeof item.price === "string" && item.price.length > 0,
);