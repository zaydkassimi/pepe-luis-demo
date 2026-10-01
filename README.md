# Pepe Luis — concept web

> **Démonstration non officielle.** Ce dépôt est un concept de site vitrine
> réalisé pour une présentation commerciale. Il ne s'agit pas du site officiel
> du restaurant et n'est ni validé ni approuvé par lui.

Site vitrine deux pages pour **Pepe Luis**, restaurant de cuisine espagnole et
de fruits de mer à Casablanca. Interface en français, mise en page éditoriale,
photographie en propre.

- `/` — page d'accueil : expérience, signatures, galerie, restaurant, réservation, contact
- `/menu` — la carte

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.8 (App Router, Turbopack) |
| React | 19.3.0 |
| Langage | TypeScript 5.9.3 (`strict`, `noUncheckedIndexedAccess`) |
| Styles | Tailwind CSS 4.3.3 |
| Animations | Framer Motion 13.5 |
| Icônes | lucide-react 1.49.0 |

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
```

## Vérification

```bash
npx tsc --noEmit   # types
npm run lint       # eslint (Next 16 a retiré `next lint`)
npm run build      # build de production
```

## Polices

Deux familles, via `next/font/google` :

- **Instrument Serif** — titres uniquement, poids `400` (normal + italique).
- **Manrope** — tout le reste : corps de texte, navigation, boutons, libellés,
  noms de plats, formulaires. Variable `200` à `800`, sans italique véritable.

Les deux familles sont exposées par les variables CSS `--font-display` et
`--font-sans`, que les utilitaires Tailwind `font-display` / `font-sans`
reprennent via `@theme inline` dans `src/app/globals.css`. Ne pas les renommer
sans adapter ce bloc.

## Contenu de démonstration

Le projet est livré sans aucune donnée inventée. Les points suivants sont
délibérément absents et doivent provenir du restaurant avant toute mise en
ligne :

- **Prix** — `price` vaut `null` partout dans `src/data/menu.ts`. La colonne de
  prix ne s'affiche que si au moins un prix réel est fourni (`menuHasPrices`).
  Aucun prix plausible n'a été inventé.
- **Allergènes et régimes** — aucune mention « sans gluten », « végétarien » ou
  « halal ». Ce sont des affirmations de santé et de conformité.
- **Listes d'ingrédients** — les descriptions restent volontairement vagues.
- **Distinctions, avis, témoignages, notes** — rien n'a été fabriqué.
- **Coordonnées** — téléphone, WhatsApp, e-mail et lien vers la carte restent
  vides tant qu'ils ne sont pas confirmés. Les sources publiques se
  contredisent sur ces informations ; les composants masquent l'interface
  correspondante au lieu d'afficher un lien mort.

La photographie fournie est un jeu de démonstration (Unsplash), à remplacer par
des photographies du restaurant — voir `public/images/README.md`.

## Configurer le site réel

Tout passe par `src/config/site.ts` :

1. Renseigner `phone`, `whatsapp`, `email`, `mapsUrl` et `reservationUrl`.
2. Passer `openingHours.verified` à `true` une fois les horaires confirmés.
3. Renseigner `url` avec l'origine de production, requis pour les images Open Graph.
4. Passer `demoMode` à `false`.
5. Remplacer `src/data/menu.ts` et `public/images/`.

Le formulaire de réservation ne fait **aucun appel réseau**. Il valide
localement, puis affiche explicitement la mention suivante :
« Démo : aucune réservation n'a été transmise au restaurant. »

## Déploiement

Standard Vercel : import du dépôt, aucune variable d'environnement requise.

```bash
npm run build
```

## Scripts

- `scripts/fetch_images.py` — récupère les candidates Unsplash.
- `scripts/finalize_images.py` — redimensionne, recompresse et génère
  `scripts/image-manifest.json`.

## Accessibilité et mouvement

- Lien d'évitement, repères ARIA, focus visible.
- Cibles tactiles : les boutons et champs font au moins 44px de haut. Les liens
  de texte en ligne (navigation, pied de page) mesurent 19 à 22px à cause de leur
  corps, et utilisent donc la classe `hit` — un pseudo-élément transparent qui
  étend la zone cliquable au minimum de 24px prévu par WCAG 2.2 (SC 2.5.8)
  sans rien modifier à la mise en page.
- `prefers-reduced-motion` neutralise les animations et le défilement fluide.
- La galerie utilise des spans de colonnes explicites plutôt qu'un masonry :
  l'ordre de lecture ne change pas selon la largeur de fenêtre. Les cadres ne
  portent pas `h-full` : un pourcentage de hauteur se calcule sur la plus haute
  élément de la ligne, et `aspect-ratio` en déduirait une largeur supérieure à
  celle de la colonne.

## Favicon

`src/app/icon.svg` est un monogramme typographique provisoire, dans la palette
de la marque. Le restaurant n'a pas de logo officiel et aucun n'a été inventé :
remplacez ce fichier par le logo réel avant la mise en ligne.