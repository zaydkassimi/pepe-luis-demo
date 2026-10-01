# Photographies

## ⚠️ Ce sont des images de démonstration

Les 20 fichiers de ce dossier proviennent d'Unsplash et **ne représentent pas
le restaurant, ses plats ni son personnel**. Ils servent uniquement à habiller la
présentation.

Avant toute mise en ligne, remplacer l'ensemble du dossier par des
photographies réelles. Le menu dépend entièrement de ces visuels.

## Remplacement

1. Conserver la structure de sous-dossiers, ou adapter les chemins dans :
   - `src/data/gallery.ts` (`galleryImages`, `socialFeedImages`)
   - `src/data/signatureDishes.ts` (`signatureDishes`)
   - `src/components/sections/` (`Hero`, `Experience`, `Gallery`, `Restaurant`,
     `app/menu/page.tsx`)
2. Mettre à jour `width` et `height` dans ces fichiers pour chaque nouvelle
   image. `next/image` s'en sert pour réserver la place exacte : sans cela la
   page saute au chargement (CLS).
3. Régénérer le manifeste :

```bash
python scripts/finalize_images.py
```

Le script redimensionne, recompresse en JPEG progressif et réécrit
`scripts/image-manifest.json` (chemin, dimensions, texte alternatif).

## Taille

Recompresser avant d'ajouter au dépôt : viser environ 1500 px de côté maximum et
un poids sous 300 Ko par image. Les déclinaisons AVIF et WebP sont générées à la
volée par `next/image` au moment du build, il n'est donc pas utile de les
stocker ici.

## Textes alternatifs

Chaque image porte un `alt` en français décrivant ce qui est visible. Les
décrire en français, sans mention de « photo de » ni de marque d'eau. Si une
image est purement décorative, passer une chaîne vide plutôt qu'une description
approximative.