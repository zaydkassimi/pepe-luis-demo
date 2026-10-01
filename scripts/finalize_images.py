#!/usr/bin/env python3
"""
Finalise demo photography for the Pepe Luis concept.

Takes the reviewed staging pool, resizes to a sensible source size and
re-encodes as progressive JPEG, then writes a manifest describing the final
dimensions. The manifest keeps `width`/`height` in sync with the files on disk
so `next/image` can reserve space and avoid layout shift.

Every image here is a free-to-use Unsplash stock photograph used as a clearly
labelled demo placeholder. None was taken from the restaurant's own profiles.
"""

import json
import os
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
STAGING = os.path.join(HERE, "_staging")
OUT = os.path.join(ROOT, "public", "images")
MANIFEST = os.path.join(HERE, "image-manifest.json")

HERO_MAX_W = 2000
DEFAULT_MAX_W = 1500
QUALITY = 78

# slug -> (folder, filename, alt text)
PLACEMENTS = {
    "a-paella-grill": (
        "hero", "paella-grill.jpg",
        "Paella de fruits de mer dans une grande poêle, servie sur une table en bois",
    ),
    "b-paella-shrimp": (
        "dishes", "paella-seafood.jpg",
        "Assiette de paella aux gambas et aux calamars",
    ),
    "c-paella-black": (
        "dishes", "paella-pan.jpg",
        "Paella espagnole servie dans une poêle en fonte",
    ),
    "d-grilled-fish-lemon": (
        "dishes", "grilled-fish.jpg",
        "Poisson grillé avec citron et herbes fraîches",
    ),
    "e-mackerel": (
        "dishes", "grilled-mackerel.jpg",
        "Maquereau grillé accompagné d'un accompagnement",
    ),
    "g-fish-steel": (
        "gallery", "grilled-fish-steel.jpg",
        "Poisson grillé présenté sur une assiette en acier",
    ),
    "h-restaurant-dim": (
        "restaurant", "interior-evening.jpg",
        "Salle du restaurant éclairée à la bougie dans la soirée",
    ),
    "i-warm-lights": (
        "restaurant", "interior-warm-lights.jpg",
        "Lumières chaudes suspendues au-dessus de la salle",
    ),
    "j-interior-cozy": (
        "restaurant", "interior-cozy.jpg",
        "Salle chaleureuse avec tables dressées et éclairages doux",
    ),
    "l-dining-candles": (
        "gallery", "dining-candles.jpg",
        "Table dressée pour un dîner convivial, bougies allumées",
    ),
    "m-table-setting": (
        "gallery", "table-setting.jpg",
        "Table dressée de style méditerranéen, assiettes et verres",
    ),
    "n-shared-table": (
        "gallery", "shared-table.jpg",
        "Plats partagés disposés sur une table en bois",
    ),
    "o-bowl-food": (
        "gallery", "shared-bowls.jpg",
        "Bols de cuisine méditerranéenne partagés à table",
    ),
    "p-octopus-lemon": (
        "dishes", "octopus-gallega.jpg",
        "Poulpe grillé avec roquette et quartier de citron",
    ),
    "q-octopus-coals": (
        "dishes", "octopus-charcoal.jpg",
        "Tentacules de poulpe grillés sur des braises",
    ),
    "r-octopus-plating": (
        "dishes", "octopus-plating.jpg",
        "Poulpe grillé dressé par le chef avec herbes et citron",
    ),
    "s-oysters": (
        "dishes", "seafood-platter.jpg",
        "Plateau d'huîtres sur glace avec quartiers de citron",
    ),
    "u-spain-grill": (
        "experience", "chef-paella-cooking.jpg",
        "Chef cuisinant une paella espagnole au-dessus d'un feu ouvert",
    ),
    "k-table-lamp": (
        "menu", "menu-hero-lamp.jpg",
        "Table dressée éclairée par une lampe dans une salle sombre",
    ),
}


def main():
    manifest = {}
    total = 0
    for slug, (folder, filename, alt) in PLACEMENTS.items():
        src = os.path.join(STAGING, f"{slug}.jpg")
        if not os.path.exists(src):
            print(f"  MISSING source for {slug}")
            continue

        dest_dir = os.path.join(OUT, folder)
        os.makedirs(dest_dir, exist_ok=True)

        im = Image.open(src).convert("RGB")
        max_w = HERO_MAX_W if folder == "hero" else DEFAULT_MAX_W
        if im.width > max_w:
            h = round(im.height * max_w / im.width)
            im = im.resize((max_w, h), Image.LANCZOS)

        dest = os.path.join(dest_dir, filename)
        im.save(dest, "JPEG", quality=QUALITY, optimize=True, progressive=True)

        size = os.path.getsize(dest)
        total += size
        key = f"/images/{folder}/{filename}"
        manifest[key] = {"width": im.width, "height": im.height, "alt": alt}
        print(f"  {size/1024:6.0f} KB  {im.width}x{im.height:<5} {key}")

    with open(MANIFEST, "w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2, ensure_ascii=False)

    print(f"\n{len(manifest)} images, {total/1024/1024:.2f} MB total -> {OUT}")


if __name__ == "__main__":
    main()