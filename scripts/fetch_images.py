#!/usr/bin/env python3
"""
Download demo photography candidates from Unsplash's public CDN for the
Pepe Luis concept demo.

Images are downloaded to a staging folder first so they can be visually
reviewed before being assigned to final slots. This avoids trusting
search-engine metadata, which frequently mislabels food photography.

Nothing here is scraped from a restaurant's own profiles. These are
free-to-use stock photographs under the Unsplash License, used purely
as clearly-labelled demo placeholders.
"""

import os
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor

STAGING = os.path.join(os.path.dirname(__file__), "_staging")
CDN = "https://images.unsplash.com/{}?w=2200&q=80&fm=jpg&fit=max"

# Candidate pool: slug -> unsplash photo id
CANDIDATES = {
    "a-paella-grill": "photo-1694685367640-05d6624e57f1",
    "b-paella-shrimp": "photo-1768204039740-9e418a65328b",
    "c-paella-black": "photo-1602755088318-39b7a7e6482a",
    "d-grilled-fish-lemon": "photo-1751094069288-a2bcef5eb6c8",
    "e-mackerel": "photo-1622119843742-bd7afc4eac21",
    "f-fish-peppers": "photo-1750943083941-0b109b4ec08e",
    "g-fish-steel": "photo-1624938942691-67a3beafe0d0",
    "h-restaurant-dim": "photo-1675583690138-5242aee4c0c3",
    "i-warm-lights": "photo-1753019491860-128b7763f8ee",
    "j-interior-cozy": "photo-1758900393800-4e5d9d20c4d7",
    "k-table-lamp": "photo-1762806883627-4bcbfad98a2c",
    "l-dining-candles": "photo-1646473334251-827ea2e0b9ea",
    "m-table-setting": "photo-1768594407433-40b4b11039e8",
    "n-shared-table": "photo-1653611540493-b3a896319fbf",
    "o-bowl-food": "photo-1680405531955-8b4981bb1b0c",
    "p-octopus-lemon": "photo-1764397514678-3169fbd58430",
    "q-octopus-coals": "photo-1764397514323-e2fbf55e3091",
    "r-octopus-plating": "photo-1764397514727-32cbff5e5f9b",
    "s-oysters": "photo-1679694140422-aecfd3d5dd0b",
    "t-chef-paella": "photo-1749767138465-0e8595ebb969",
    "u-spain-grill": "photo-1723240906605-1f0ed36b5efb",
    "v-unknown-1": "photo-1534080564583-6be75777b70a",
    "w-unknown-2": "photo-1516684732162-798a0062be99",
    "x-unknown-3": "photo-1601050690597-df0568f70950",
}

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"


def fetch(item):
    slug, pid = item
    dest = os.path.join(STAGING, f"{slug}.jpg")
    if os.path.exists(dest) and os.path.getsize(dest) > 20000:
        return (slug, "cached", os.path.getsize(dest))
    req = urllib.request.Request(CDN.format(pid), headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = resp.read()
        if len(data) < 20000:
            return (slug, "too-small", len(data))
        with open(dest, "wb") as fh:
            fh.write(data)
        return (slug, "ok", len(data))
    except Exception as exc:  # noqa: BLE001
        return (slug, f"FAIL {exc}", 0)


def main():
    os.makedirs(STAGING, exist_ok=True)
    ok = fail = 0
    with ThreadPoolExecutor(max_workers=6) as pool:
        for slug, status, size in pool.map(fetch, CANDIDATES.items()):
            if status.startswith("FAIL"):
                fail += 1
                print(f"  {status[:60]:<62} {slug}")
            else:
                ok += 1
                print(f"  {status:<8} {size/1024:7.0f} KB  {slug}")
    print(f"\ndownloaded {ok} ok, {fail} failed -> {STAGING}")
    return 0


if __name__ == "__main__":
    sys.exit(main())