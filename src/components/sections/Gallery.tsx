import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cx } from "@/lib/utils";

/**
 * Editorial gallery.
 *
 * Hand-placed column spans on an explicit 12-column grid. A real masonry layout
 * was rejected deliberately: it reorders content per viewport, which makes the
 * section impossible to art-direct and gives screen-reader users a sequence
 * that changes with window size.
 *
 * Spans below are tuned for 1 / 2 / 3 columns; each image carries explicit
 * intrinsic dimensions so nothing shifts while loading.
 */
const SPANS: Record<string, string> = {
  "/images/gallery/dining-candles.jpg": "col-span-6 md:col-span-5 row-span-2",
  "/images/gallery/shared-bowls.jpg": "col-span-6 md:col-span-3 row-span-2",
  "/images/gallery/table-setting.jpg": "col-span-6 md:col-span-4",
  "/images/dishes/octopus-gallega.jpg": "col-span-6 md:col-span-4",
  "/images/gallery/grilled-fish-steel.jpg": "col-span-6 md:col-span-4",
  "/images/gallery/shared-table.jpg": "col-span-6 md:col-span-7",
  "/images/restaurant/interior-cozy.jpg": "col-span-6 md:col-span-5 row-span-2",
  "/images/dishes/paella-seafood.jpg": "col-span-6 md:col-span-7",
};

export function Gallery() {
  return (
    <section
      id="galerie"
      aria-labelledby="gallery-title"
      className="gutter py-section"
    >
      <SectionHeading
        id="gallery-title"
        eyebrow="La galerie"
        title={
          <>
            L&apos;ambiance,
            <br />
            <span className="italic text-terracotta">en images</span>
          </>
        }
        subtitle={
          <>
            Photographies de démonstration. Elles seront remplacées par les
            images du restaurant.
          </>
        }
      />

      <RevealGroup className="mt-14 grid grid-cols-12 gap-4 md:gap-6 lg:mt-20">
        {galleryImages.map((image, index) => (
          <RevealItem
            key={image.src}
            className={cx(SPANS[image.src] ?? "col-span-6 md:col-span-4")}
          >
            <figure
              className={cx(
                "group relative h-full overflow-hidden bg-stone",
                index < 2 ? "aspect-[3/4] md:aspect-[2/3]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 42vw, (min-width: 1024px) 32vw, 100vw"
                quality={74}
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />

              {image.caption ? (
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 pt-12">
                  <span className="eyebrow text-shell/90">{image.caption}</span>
                </figcaption>
              ) : null}
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}