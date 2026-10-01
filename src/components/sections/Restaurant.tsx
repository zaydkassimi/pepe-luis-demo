import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * The restaurant itself: interior photography plus the practical details
 * (address, hours). The map call to action only appears once `mapsUrl` has
 * been verified — a "Get directions" button pointing nowhere is worse than no
 * button at all.
 */
export function Restaurant() {
  return (
    <section
      id="restaurant"
      aria-labelledby="restaurant-title"
      className="on-dark bg-ink text-shell"
    >
      <div className="gutter py-section">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              id="restaurant-title"
              eyebrow="Le restaurant"
              tone="light"
              title={
                <>
                  Une salle
                  <br />
                  <span className="italic text-saffron">chaleureuse</span>
                </>
              }
              subtitle="Un espace convivial, aux tons chauds, pensé pour les dîners qui s'éternisent."
            />

            <Reveal index={3} className="mt-10 space-y-6 border-t border-shell/15 pt-8">
              <div className="flex gap-5">
                <p className="eyebrow w-24 shrink-0 pt-1 text-shell/40">
                  Adresse
                </p>
                <address className="not-italic">
                  <p className="text-body leading-relaxed text-shell/85">
                    {siteConfig.addressShort}
                  </p>
                  {siteConfig.addressLine2 ? (
                    <p className="text-body leading-relaxed text-shell/85">
                      {siteConfig.addressLine2}
                    </p>
                  ) : null}
                </address>
              </div>

              <div className="flex gap-5">
                <p className="eyebrow w-24 shrink-0 pt-1 text-shell/40">
                  Horaires
                </p>
                <div>
                  <p className="text-body leading-relaxed text-shell/85">
                    {siteConfig.openingHours.display}
                  </p>
                  {!siteConfig.openingHours.verified ? (
                    <p className="mt-1.5 font-sans text-ui text-shell/45">
                      Horaires à confirmer.
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>

            <Reveal index={4} className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="#reservation" variant="onDark">
                Réserver
              </ButtonLink>
              {siteConfig.mapsUrl ? (
                <ButtonLink href={siteConfig.mapsUrl} variant="ghost" className="border-shell/35 text-shell hover:border-shell hover:bg-shell hover:text-ink">
                  Itinéraire
                </ButtonLink>
              ) : null}
            </Reveal>
          </div>

          {/* Paired interiors */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Reveal className="mt-12">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/restaurant/interior-warm-lights.jpg"
                  alt="Lumières chaudes suspendues au-dessus de la salle"
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  quality={74}
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal index={2}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/restaurant/interior-evening.jpg"
                  alt="Salle du restaurant éclairée à la bougie dans la soirée"
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  quality={74}
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}