import type { SignatureDish } from "@/types";

/**
 * DEMO CONTENT
 *
 * Dish names are drawn from the restaurant's publicly described positioning
 * (seafood, paella, octopus, grilled fish). Descriptions are intentionally
 * generic: no ingredients, provenance, allergens or technique have been
 * invented. Replace with the wording the restaurant actually uses.
 *
 * No prices appear on this section, and none are stored.
 */
export const signatureDishes: SignatureDish[] = [
  {
    id: "paella",
    name: "Paella",
    description:
      "Le riz emblématique de la cuisine espagnole, ici pensé pour mettre en valeur les produits de la mer.",
    image: "/images/dishes/paella-seafood.jpg",
    width: 1500,
    height: 1000,
    accent: "Arroz",
  },
  {
    id: "poulpe",
    name: "Poulpe à l'espagnole",
    description:
      "Une préparation de la mer aux chairs tendres, servie dans une assiette généreuse.",
    image: "/images/dishes/octopus-gallega.jpg",
    width: 1500,
    height: 2250,
    accent: "Pulpo",
  },
  {
    id: "poisson-grille",
    name: "Poisson grillé",
    description:
      "Un poisson grillé et présenté sans cérémonie, avec des accompagnements simples et frais.",
    image: "/images/dishes/grilled-fish.jpg",
    width: 1500,
    height: 1000,
    accent: "A la plancha",
  },
  {
    id: "saveurs-de-la-mer",
    name: "Saveurs de la mer",
    description:
      "Une composition plus large de fruits de mer, pensée pour être partagée au centre de la table.",
    image: "/images/dishes/seafood-platter.jpg",
    width: 1500,
    height: 1000,
    accent: "Mar",
  },
];