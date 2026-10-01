import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Editorial experience statement.
 *
 * Asymmetric two-column composition: a tall portrait photograph offset against
 * a text column, which sets the page's rhythm. Deliberately no price, no
 * awards, no founding date — nothing that would need verification.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="gutter py-section"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
        {/* Portrait */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/experience/chef-paella-cooking.jpg"
              alt="Chef cuisinant une paella espagnole au-dessus d'un feu ouvert"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              quality={76}
              className="object-cover"
            />
          </div>
          {/* Offset rule detail, sitting on the frame's edge. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 -z-10 hidden size-40 border-b border-r border-terracotta/45 lg:block"
          />
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            id="experience-title"
            eyebrow="L'expérience"
            title={
              <>
                Une cuisine de partage,
                <br />
                <span className="italic text-terracotta">servie sans façon.</span>
              </>
            }
            subtitle={
              <>
                Pepe Luis est une table casablancaise consacrée à la cuisine
                espagnole et aux produits de la mer. On y vient pour la paella
                qu&apos;on partage, le poulpe grillé, et les assiettes qui se
                partagent au centre de la table.
              </>
            }
          />

          <Reveal index={4} className="mt-10 grid gap-7 sm:grid-cols-2">
            {[
              {
                title: "Le feu",
                body: "Une paella cuite à la poêle, servie dans le plat, comme elle doit l'être.",
              },
              {
                title: "La mer",
                body: "Poissons et fruits de mer choisis selon l'arrivage du jour.",
              },
              {
                title: "Le partage",
                body: "Des assiettes conçues pour voyager au centre de la table.",
              },
              {
                title: "Le rythme",
                body: "Un service décontracté, du déjeuner au petit matin.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-ink/15 pt-5">
                <h3 className="font-sans text-ui font-semibold uppercase tracking-[0.14em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-body leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal index={5} className="mt-12">
            <ButtonLink href="#signatures" variant="secondary" trailing="suite">
              Voir les signatures
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}