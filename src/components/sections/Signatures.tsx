import Image from "next/image";
import { signatureDishes } from "@/data/signatureDishes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Signature dishes.
 *
 * Alternating image/text rows rather than a uniform grid, so the section reads
 * as an editorial sequence. Dish names use Manrope (text-dish) per the
 * typography system, with the Spanish accent word in the display face.
 */
export function Signatures() {
  return (
    <section
      id="signatures"
      aria-labelledby="signatures-title"
      className="on-dark bg-wine text-shell"
    >
      <div className="gutter py-section">
        <SectionHeading
          id="signatures-title"
          eyebrow="Les signatures"
          tone="light"
          align="center"
          title={
            <>
              Ce pour quoi on{" "}
              <span className="italic text-saffron">vient à table</span>
            </>
          }
          subtitle="Les assiettes qui font le lien avec la maison. Le détail des ingrédients est donné en salle."
        />

        <RevealGroup className="mt-16 flex flex-col gap-20 lg:mt-24 lg:gap-28">
          {signatureDishes.map((dish, index) => {
            const flipped = index % 2 === 1;
            return (
              <RevealItem key={dish.id}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    flipped ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      quality={78}
                      className="object-cover"
                    />
                  </div>

                  {/* Copy */}
                  <div className={flipped ? "lg:pr-8" : "lg:pl-8"}>
                    {dish.accent ? (
                      <p className="eyebrow text-saffron">{dish.accent}</p>
                    ) : null}

                    <h3 className="mt-4 font-sans text-dish font-semibold tracking-[-0.01em] text-shell">
                      {dish.name}
                    </h3>

                    <div
                      aria-hidden="true"
                      className="mt-6 h-px w-14 bg-shell/25"
                    />

                    <p className="mt-6 max-w-[44ch] text-body leading-relaxed text-shell/72">
                      {dish.description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal index={2} className="mt-20 flex justify-center lg:mt-28">
          <ButtonLink href="/menu" variant="onDark" size="md" trailing="carte">
            Voir la carte complète
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}